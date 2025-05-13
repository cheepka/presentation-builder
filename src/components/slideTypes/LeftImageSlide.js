import React from 'react';
import EditableText from '../slideEditor/EditableText';
import UploadableImage from '../slideEditor/UploadableImage';

/**
 * LeftImageSlide Component
 * 
 * Displays a slide with an image on the left and text on the right.
 * Supports direct inline editing of all elements.
 * 
 * @param {Object} props
 * @param {Object} props.slide - Slide data
 * @param {Function} props.onUpdate - Callback for updating slide content
 * @param {Function} props.onImageChange - Callback for handling image changes
 */
function LeftImageSlide({ slide, onUpdate, onImageChange }) {
  // Handle text updates
  const handleTextChange = (field, value) => {
    onUpdate(field, value);
  };
  
  // Handle bullet point changes
  const handleBulletPointChange = (index, value) => {
    const newBulletPoints = [...(slide.bulletPoints || [])];
    newBulletPoints[index] = value;
    onUpdate('bulletPoints', newBulletPoints);
  };
  
  // Add a new bullet point
  const addBulletPoint = () => {
    const newBulletPoints = [...(slide.bulletPoints || []), "New point"];
    onUpdate('bulletPoints', newBulletPoints);
  };
  
  // Remove a bullet point
  const removeBulletPoint = (index) => {
    const newBulletPoints = [...(slide.bulletPoints || [])];
    newBulletPoints.splice(index, 1);
    onUpdate('bulletPoints', newBulletPoints);
  };
  
  return (
    <div className="w-full h-full flex">
      {/* Left image section */}
      <div className="w-1/2 bg-gray-800 relative">
        <UploadableImage
          initialImage={slide.images?.main?.url}
          onImageChange={(imageData) => onImageChange(imageData)}
          position="main"
          className="w-full h-full"
          alt="Left side image"
          placeholderColor="#4a4a4a"
        />
      </div>
      
      {/* Right content section */}
      <div className="w-1/2 bg-gray-900 p-8 flex flex-col justify-center">
        <div className="ml-4">
          <EditableText
            value={slide.title}
            onChange={(value) => handleTextChange('title', value)}
            as="h3"
            textClassName="text-4xl font-bold text-white mb-6"
            textStyle="bold"
          />
          
          {slide.content && (
            <div className="text-white">
              <EditableText
                value={slide.content}
                onChange={(value) => handleTextChange('content', value)}
                textClassName="text-sm"
                multiline={true}
                placeholder="Add content text here"
              />
            </div>
          )}
          
          {slide.bulletPoints && slide.bulletPoints.length > 0 && (
            <div className="text-white mt-4">
              <div className="mb-2 text-sm text-gray-300">Bullet Points:</div>
              <ul className="list-disc pl-5 space-y-2">
                {slide.bulletPoints.map((point, i) => (
                  <li key={i} className="flex items-start group">
                    <EditableText
                      value={point}
                      onChange={(value) => handleBulletPointChange(i, value)}
                      textClassName="text-sm flex-1"
                    />
                    {slide.bulletPoints.length > 1 && (
                      <button 
                        onClick={() => removeBulletPoint(i)}
                        className="ml-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Remove bullet point"
                      >
                        ✕
                      </button>
                    )}
                  </li>
                ))}
              </ul>
              
              <button
                onClick={addBulletPoint}
                className="mt-2 text-blue-400 hover:text-blue-300 text-sm flex items-center"
              >
                + Add bullet point
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LeftImageSlide;
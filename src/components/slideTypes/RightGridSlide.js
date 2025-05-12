import React from 'react';
import EditableText from '../slideEditor/EditableText';
import UploadableImage from '../slideEditor/UploadableImage';
import { getPlaceholderColor } from '../../utils/slideTemplates';

/**
 * RightGridSlide Component
 * 
 * Displays a slide with text on the left and three images in a grid on the right.
 * Supports direct inline editing of all elements.
 * 
 * @param {Object} props
 * @param {Object} props.slide - Slide data
 * @param {Function} props.onUpdate - Callback for updating slide content
 * @param {Function} props.onImageChange - Callback for handling image changes
 */
function RightGridSlide({ slide, onUpdate, onImageChange }) {
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
  
  // Handle image changes for the grid
  const handleGridImageChange = (position, imageData) => {
    onImageChange({
      ...imageData,
      position
    });
  };
  
  return (
    <div className="w-full h-full flex">
      {/* Left content section */}
      <div className="w-1/2 bg-gray-900 p-8 flex flex-col justify-center">
        <div className="ml-4">
          <EditableText
            value={slide.title}
            onChange={(value) => handleTextChange('title', value)}
            as="h3"
            textClassName="text-4xl font-bold text-white mb-6"
            textStyle="bold"
          />
          
          <div className="text-white">
            <EditableText
              value={slide.content}
              onChange={(value) => handleTextChange('content', value)}
              textClassName="text-sm"
              multiline={true}
              placeholder="Add content text here"
            />
            
            {slide.bulletPoints && (
              <div className="mt-6">
                <ul className="ml-6 list-decimal">
                  {slide.bulletPoints.map((point, i) => (
                    <li key={i} className="mb-1 flex items-start group">
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
      
      {/* Right image grid section */}
      <div className="w-1/2 grid grid-cols-1 grid-rows-3 gap-1">
        <div className="relative">
          <UploadableImage
            initialImage={slide.images?.grid1?.url}
            onImageChange={(imageData) => handleGridImageChange('grid1', imageData)}
            position="grid1"
            className="w-full h-full"
            alt="Top grid image"
            placeholderColor={getPlaceholderColor('grid1')}
          />
        </div>
        <div className="relative">
          <UploadableImage
            initialImage={slide.images?.grid2?.url}
            onImageChange={(imageData) => handleGridImageChange('grid2', imageData)}
            position="grid2"
            className="w-full h-full"
            alt="Middle grid image"
            placeholderColor={getPlaceholderColor('grid2')}
          />
        </div>
        <div className="relative">
          <UploadableImage
            initialImage={slide.images?.grid3?.url}
            onImageChange={(imageData) => handleGridImageChange('grid3', imageData)}
            position="grid3"
            className="w-full h-full"
            alt="Bottom grid image"
            placeholderColor={getPlaceholderColor('grid3')}
          />
        </div>
      </div>
    </div>
  );
}

export default RightGridSlide;
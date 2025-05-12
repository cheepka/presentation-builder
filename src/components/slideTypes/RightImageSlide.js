import React from 'react';
import EditableText from '../slideEditor/EditableText';
import UploadableImage from '../slideEditor/UploadableImage';

/**
 * RightImageSlide Component
 * 
 * Displays a slide with text on the left and an image on the right.
 * Supports direct inline editing of all elements.
 * 
 * @param {Object} props
 * @param {Object} props.slide - Slide data
 * @param {Function} props.onUpdate - Callback for updating slide content
 * @param {Function} props.onImageChange - Callback for handling image changes
 */
function RightImageSlide({ slide, onUpdate, onImageChange }) {
  // Handle text updates
  const handleTextChange = (field, value) => {
    onUpdate(field, value);
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
        </div>
      </div>
      
      {/* Right image section */}
      <div className="w-1/2 bg-gray-800 relative">
        <UploadableImage
          initialImage={slide.images?.main?.url}
          onImageChange={(imageData) => onImageChange(imageData)}
          position="main"
          className="w-full h-full"
          alt="Right side image"
          placeholderColor="#4a4a4a"
        />
      </div>
    </div>
  );
}

export default RightImageSlide;
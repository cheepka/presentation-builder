import React from 'react';
import EditableText from '../slideEditor/EditableText';
import UploadableImage from '../slideEditor/UploadableImage';

/**
 * FullImageSlide Component
 * 
 * Displays a full-image slide with title, subtitle, and attribution.
 * Supports direct inline editing of all elements.
 * 
 * @param {Object} props
 * @param {Object} props.slide - Slide data
 * @param {Function} props.onUpdate - Callback for updating slide content
 * @param {Function} props.onImageChange - Callback for handling image changes
 */
function FullImageSlide({ slide, onUpdate, onImageChange }) {
  // Handle text updates
  const handleTextChange = (field, value) => {
    onUpdate(field, value);
  };
  
  return (
    <div className="w-full h-full relative overflow-hidden">
      {/* Background image area */}
      <div className="absolute inset-0 z-0">
        <UploadableImage
          initialImage={slide.images?.main?.url}
          onImageChange={(imageData) => onImageChange(imageData)}
          position="main"
          className="w-full h-full"
          alt="Background image"
          placeholderColor="#4a4a4a"
        />
      </div>
      
      {/* Darkening overlay for better text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-50 z-10 pointer-events-none"></div>
      
      {/* Content overlay */}
      <div className="absolute inset-0 flex items-center justify-end z-20 pointer-events-none">
        <div className="w-1/2 p-10 text-white text-right">
          {/* Each editable element needs to have pointer-events-auto to be clickable */}
          <div className="pointer-events-auto inline-block">
            <EditableText
              value={slide.title}
              onChange={(value) => handleTextChange('title', value)}
              as="h3"
              textClassName="text-6xl font-bold mb-2"
              textStyle="bold"
            />
          </div>
          
          <div className="pointer-events-auto inline-block">
            <EditableText
              value={slide.subtitle}
              onChange={(value) => handleTextChange('subtitle', value)}
              as="h4"
              textClassName="text-xl mb-6"
              placeholder="Add a subtitle"
            />
          </div>
          
          <div className="mt-12 pointer-events-auto inline-block">
            <EditableText
              value={slide.attribution}
              onChange={(value) => handleTextChange('attribution', value)}
              textClassName="text-sm text-gray-300"
              placeholder="Add attribution"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FullImageSlide;
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
      {/* Background image */}
      <div className="absolute inset-0">
        <UploadableImage
          initialImage={slide.images?.main?.url}
          onImageChange={(imageData) => onImageChange(imageData)}
          position="main"
          className="w-full h-full"
          alt="Background image"
          placeholderColor="#4a4a4a"
        />
      </div>
      
      {/* Content overlay */}
      <div className="absolute inset-0 flex items-center justify-end">
        <div className="w-1/2 p-10 text-white z-10 text-right">
          <EditableText
            value={slide.title}
            onChange={(value) => handleTextChange('title', value)}
            as="h3"
            textClassName="text-6xl font-bold mb-2"
            textStyle="bold"
          />
          
          <EditableText
            value={slide.subtitle}
            onChange={(value) => handleTextChange('subtitle', value)}
            as="h4"
            textClassName="text-xl mb-6"
            placeholder="Add a subtitle"
          />
          
          <div className="mt-12">
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
import React from 'react';
import EditableText from '../slideEditor/EditableText';
import UploadableImage from '../slideEditor/UploadableImage';
import { getPlaceholderColor } from '../../utils/slideTemplates';

/**
 * ImageGridSlide Component
 * 
 * Displays a slide with a 3x3 grid of images and an optional overlay title.
 * Supports direct inline editing of all elements.
 * 
 * @param {Object} props
 * @param {Object} props.slide - Slide data
 * @param {Function} props.onUpdate - Callback for updating slide content
 * @param {Function} props.onImageChange - Callback for handling image changes
 */
function ImageGridSlide({ slide, onUpdate, onImageChange }) {
  // Handle text updates
  const handleTextChange = (field, value) => {
    onUpdate(field, value);
  };
  
  // Handle image changes
  const handleImageChange = (position, imageData) => {
    onImageChange({
      ...imageData,
      position
    });
  };
  
  return (
    <div className="w-full h-full">
      <div className="grid grid-cols-3 grid-rows-3 gap-1 h-full">
        {Array(9).fill(0).map((_, i) => (
          <div key={i} className="relative">
            <UploadableImage
              initialImage={slide.images?.[`grid${i+1}`]?.url}
              onImageChange={(imageData) => handleImageChange(`grid${i+1}`, imageData)}
              position={`grid${i+1}`}
              className="w-full h-full"
              alt={`Grid image ${i+1}`}
              placeholderColor={getPlaceholderColor(`grid${i+1}`)}
            />
          </div>
        ))}
      </div>
      
      {/* Title overlay - only shown if showTitle is true */}
      {slide.showTitle !== false && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-gray-900 bg-opacity-70 px-6 py-3">
            <EditableText
              value={slide.title}
              onChange={(value) => handleTextChange('title', value)}
              as="h3"
              textClassName="text-4xl font-bold text-white"
              textStyle="bold"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageGridSlide;
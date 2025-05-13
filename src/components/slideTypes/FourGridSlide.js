import React, { useCallback } from 'react';
import EditableText from '../slideEditor/EditableText';
import UploadableImage from '../slideEditor/UploadableImage';
import { getPlaceholderColor } from '../../utils/slideTemplates';

/**
 * FourGridSlide Component
 * 
 * Displays a slide with a 2x2 grid of images and an optional overlay title.
 * Supports direct inline editing of all elements.
 * 
 * @param {Object} props
 * @param {Object} props.slide - Slide data
 * @param {Function} props.onUpdate - Callback for updating slide content
 * @param {Function} props.onImageChange - Callback for handling image changes
 */
function FourGridSlide({ slide, onUpdate, onImageChange }) {
  // Handle text updates
  const handleTextChange = (field, value) => {
    onUpdate(field, value);
  };
  
  // Handle image changes for a specific grid position
  const handleGridImageChange = useCallback((position, imageData) => {
    // Make sure we're preserving all other images
    const updatedImageData = imageData ? {
      ...imageData,
      position // Ensure position is set correctly
    } : null;
    
    // Call the parent's onImageChange with the correct position
    onImageChange(updatedImageData);
  }, [onImageChange]);
  
  return (
    <div className="w-full h-full">
      <div className="grid grid-cols-2 grid-rows-2 gap-1 h-full">
        <div className="relative">
          <UploadableImage
            initialImage={slide.images?.grid1?.url}
            onImageChange={(imageData) => handleGridImageChange('grid1', imageData)}
            position="grid1"
            className="w-full h-full"
            alt="Top left image"
            placeholderColor={getPlaceholderColor('grid1')}
          />
        </div>
        <div className="relative">
          <UploadableImage
            initialImage={slide.images?.grid2?.url}
            onImageChange={(imageData) => handleGridImageChange('grid2', imageData)}
            position="grid2"
            className="w-full h-full"
            alt="Top right image"
            placeholderColor={getPlaceholderColor('grid2')}
          />
        </div>
        <div className="relative">
          <UploadableImage
            initialImage={slide.images?.grid3?.url}
            onImageChange={(imageData) => handleGridImageChange('grid3', imageData)}
            position="grid3"
            className="w-full h-full"
            alt="Bottom left image"
            placeholderColor={getPlaceholderColor('grid3')}
          />
        </div>
        <div className="relative">
          <UploadableImage
            initialImage={slide.images?.grid4?.url}
            onImageChange={(imageData) => handleGridImageChange('grid4', imageData)}
            position="grid4"
            className="w-full h-full"
            alt="Bottom right image"
            placeholderColor={getPlaceholderColor('grid4')}
          />
        </div>
      </div>
      
      {/* Title overlay - only shown if showTitle is true */}
      {slide.showTitle !== false && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-gray-900 bg-opacity-70 px-6 py-3 z-10">
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

export default FourGridSlide;
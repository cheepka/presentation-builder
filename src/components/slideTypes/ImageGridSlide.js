import React, { useCallback } from 'react';
import UploadableImage from '../slideEditor/UploadableImage';
import { getPlaceholderColor } from '../../utils/slideTemplates';

/**
 * ImageGridSlide Component
 * 
 * Displays a slide with a 3x3 grid of images.
 * No title overlay as per requirements.
 * 
 * @param {Object} props
 * @param {Object} props.slide - Slide data
 * @param {Function} props.onUpdate - Callback for updating slide content
 * @param {Function} props.onImageChange - Callback for handling image changes
 */
function ImageGridSlide({ slide, onUpdate, onImageChange }) {
  // Handle image changes for a specific grid position
  const handleGridImageChange = useCallback((imageData) => {
    // Make sure we're preserving all other images
    const updatedImageData = imageData ? {
      ...imageData,
      position: imageData.position // Ensure position is set correctly
    } : null;
    
    // Handle image swapping if swapData is present
    if (imageData && imageData.swappedWith && imageData.swapData) {
      // First notify about the current image change
      onImageChange(updatedImageData);
      
      // Then handle the swap by triggering another change for the original position
      if (imageData.swapData) {
        onImageChange({
          ...imageData.swapData,
          position: imageData.swappedWith
        });
      } else {
        // If there was no image in the target, clear the source position
        onImageChange({
          position: imageData.swappedWith,
          url: null
        });
      }
    } else {
      // Regular image change (no swap)
      onImageChange(updatedImageData);
    }
  }, [onImageChange]);
  
  return (
    <div className="w-full h-full relative">
      {/* Image Grid with minimal padding to maximize space */}
      <div className="grid grid-cols-3 grid-rows-3 gap-0.5 h-full w-full">
        {Array(9).fill(0).map((_, i) => {
          const gridPosition = `grid${i+1}`;
          return (
            <div key={i} className="relative aspect-square bg-white dark:bg-gray-900">
              <UploadableImage
                initialImage={slide.images?.[gridPosition]?.url}
                onImageChange={(imageData) => handleGridImageChange(imageData)}
                position={gridPosition}
                className="absolute inset-0"
                alt={`Grid image ${i+1}`}
                placeholderColor={getPlaceholderColor(gridPosition)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ImageGridSlide;
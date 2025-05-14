import React, { useCallback } from 'react';
import UploadableImage from '../slideEditor/UploadableImage';
import { getPlaceholderColor } from '../../utils/slideTemplates';

/**
 * FourGridSlide Component
 * 
 * Displays a slide with a 2x2 grid of images.
 * No title overlay as per requirements.
 * 
 * @param {Object} props
 * @param {Object} props.slide - Slide data
 * @param {Function} props.onUpdate - Callback for updating slide content
 * @param {Function} props.onImageChange - Callback for handling image changes
 */
function FourGridSlide({ slide, onUpdate, onImageChange }) {
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
      {/* 2x2 Image Grid with optimal space utilization */}
      <div className="grid grid-cols-2 grid-rows-2 gap-1 h-full w-full">
        {[1, 2, 3, 4].map((num) => {
          const gridPosition = `grid${num}`;
          const labels = ["Top left", "Top right", "Bottom left", "Bottom right"];
          return (
            <div key={num} className="relative overflow-hidden flex items-center justify-center">
              <div className="pt-[75%] relative w-full h-full"> {/* Creates a 4:3 aspect ratio using padding trick */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <UploadableImage
                    initialImage={slide.images?.[gridPosition]?.url}
                    onImageChange={(imageData) => handleGridImageChange(imageData)}
                    position={gridPosition}
                    className="w-full h-full"
                    alt={`${labels[num-1]} image`}
                    placeholderColor={getPlaceholderColor(gridPosition)}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FourGridSlide;
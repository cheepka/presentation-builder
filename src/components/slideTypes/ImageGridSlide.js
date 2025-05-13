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
    <div className="w-full h-full relative">
      {/* Image Grid with minimal padding to maximize space */}
      <div className="grid grid-cols-3 grid-rows-3 gap-0.5 h-full w-full">
        {Array(9).fill(0).map((_, i) => {
          const gridPosition = `grid${i+1}`;
          return (
            <div key={i} className="relative overflow-hidden flex items-center justify-center">
              <div className="pt-[100%] relative w-full h-full"> {/* Creates a perfect square using padding trick */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <UploadableImage
                    initialImage={slide.images?.[gridPosition]?.url}
                    onImageChange={(imageData) => handleGridImageChange(gridPosition, imageData)}
                    position={gridPosition}
                    className="w-full h-full"
                    alt={`Grid image ${i+1}`}
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

export default ImageGridSlide;
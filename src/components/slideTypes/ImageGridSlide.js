import React, { useCallback } from 'react';
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
  
  // Toggle title display
  const toggleTitleDisplay = () => {
    onUpdate('showTitle', slide.showTitle === false ? true : false);
  };
  
  return (
    <div className="w-full h-full relative">
      {/* Image Grid with minimal padding to maximize space */}
      <div className="grid grid-cols-3 grid-rows-3 gap-0.5 h-full w-full">
        {Array(9).fill(0).map((_, i) => {
          const gridPosition = `grid${i+1}`;
          return (
            <div key={i} className="relative overflow-hidden">
              <div className="pt-[100%] relative"> {/* Creates a perfect square using padding trick */}
                <div className="absolute inset-0">
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
      
      {/* Toggle title button */}
      <button 
        onClick={toggleTitleDisplay}
        className="absolute top-2 right-2 bg-white bg-opacity-75 rounded-full p-1 shadow-sm z-20 hover:bg-opacity-100"
        title={slide.showTitle === false ? "Show title" : "Hide title"}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
        </svg>
      </button>
      
      {/* Title overlay - only shown if showTitle is true */}
      {slide.showTitle !== false && (
        <div className="absolute bottom-0 inset-x-0 flex items-center justify-center">
          <div className="bg-gray-900 bg-opacity-70 px-4 py-2 z-10 w-full">
            <EditableText
              value={slide.title}
              onChange={(value) => handleTextChange('title', value)}
              as="h3"
              textClassName="text-xl font-bold text-white text-center"
              textStyle="bold"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageGridSlide;
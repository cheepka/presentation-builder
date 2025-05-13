import React from 'react';
import SlideControls from './SlideControls';

/**
 * EditableSlide Component
 * 
 * A base component for slide types that implements direct editing capabilities.
 * Acts as a container for specific slide type components.
 * 
 * @param {Object} props
 * @param {Object} props.slide - Slide data object
 * @param {number} props.index - Index of the slide in the presentation
 * @param {number} props.totalSlides - Total number of slides in the presentation
 * @param {Function} props.onUpdate - Callback for updating slide content (index, field, value) => void
 * @param {Function} props.onMoveUp - Callback for moving slide up
 * @param {Function} props.onMoveDown - Callback for moving slide down
 * @param {Function} props.onDelete - Callback for deleting slide
 * @param {Function} [props.onDuplicate] - Callback for duplicating slide (optional)
 * @param {React.ReactNode} props.children - Content of the slide (specific slide type)
 * @param {string} [props.className=''] - Additional CSS classes
 */
function EditableSlide({
  slide,
  index,
  totalSlides,
  onUpdate,
  onMoveUp,
  onMoveDown,
  onDelete,
  onDuplicate,
  children,
  className = ''
}) {
  // Update a specific field in the slide
  const handleUpdate = (field, value) => {
    onUpdate(index, field, value);
  };
  
  // Handle image change
  const handleImageChange = (imageData) => {
    const currentImages = slide.images || {};
    
    if (!imageData) {
      // Handle image removal - default to 'main' position if none specified
      const position = 'main';
      const updatedImages = { ...currentImages };
      delete updatedImages[position];
      handleUpdate('images', updatedImages);
      return;
    }
    
    // Handle image update
    const position = imageData.position || 'main';
    const updatedImages = {
      ...currentImages,
      [position]: {
        url: imageData.url,
        name: imageData.name,
        type: imageData.type
      }
    };
    
    handleUpdate('images', updatedImages);
  };
  
  // Prepare props to pass down to children
  const childProps = {
    slide,
    onUpdate: handleUpdate,
    onImageChange: handleImageChange
  };
  
  return (
    <div className={`bg-white rounded-lg shadow-lg overflow-hidden mb-8 ${className}`}>
      {/* Slide content */}
      <div className="aspect-video bg-gray-900 relative">
        {/* Render the slide type specific component with props */}
        {React.Children.map(children, child => 
          React.cloneElement(child, childProps)
        )}
      </div>
      
      {/* Slide controls */}
      <div className="p-3 bg-gray-50 border-t border-gray-200 flex justify-end items-center">
        <SlideControls 
          slideIndex={index}
          totalSlides={totalSlides}
          onMoveUp={onMoveUp}
          onMoveDown={onMoveDown}
          onDelete={onDelete}
          onDuplicate={onDuplicate}
        />
      </div>
    </div>
  );
}

export default EditableSlide;
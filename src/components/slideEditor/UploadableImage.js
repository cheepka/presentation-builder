import React, { useState, useRef, useEffect } from 'react';
import { ImageIcon } from 'lucide-react';
import ImageSelectModal from '../ImageSelectModal';

/**
 * UploadableImage Component
 * 
 * A component that represents an image slot in a slide with options to:
 * - Select an image from the library via a modal
 * - Clear/remove a set image
 * 
 * @param {Object} props
 * @param {string} [props.initialImage] - URL of initial image to display
 * @param {Function} props.onImageChange - Callback when image is selected/changed
 * @param {string} [props.className=''] - Additional CSS classes
 * @param {string} [props.position='main'] - Position identifier for multi-image slides
 * @param {string} [props.placeholderColor=''] - Background color for placeholder
 * @param {string} [props.alt='Slide image'] - Alt text for the image
 */
function UploadableImage({
  initialImage,
  onImageChange,
  className = '',
  position = 'main',
  placeholderColor = '',
  alt = 'Slide image'
}) {
  const [previewUrl, setPreviewUrl] = useState(initialImage || null);
  const [isHovering, setIsHovering] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Reset state if initialImage changes
  useEffect(() => {
    if (initialImage) {
      setPreviewUrl(initialImage);
    } else {
      setPreviewUrl(null);
    }
  }, [initialImage]);

  // Clean up object URLs on unmount
  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);
  
  const clearImage = (e) => {
    e.stopPropagation();
    
    // Clean up object URL if it exists
    if (previewUrl && previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(previewUrl);
    }
    
    // Reset to placeholder
    setPreviewUrl(null);
    
    // Call callback with null and position to indicate clearing
    if (onImageChange) {
      onImageChange({
        position,
        url: null
      });
    }
  };
  
  const openImageSelectModal = (e) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };
  
  const handleSelectImage = (imageData) => {
    // Update the preview URL
    setPreviewUrl(imageData.url);
    
    // Call the callback with the selected image data
    if (onImageChange) {
      onImageChange(imageData);
    }
  };

  // Calculate placeholder background style
  const placeholderStyle = placeholderColor ? 
    { backgroundColor: placeholderColor } : 
    { backgroundColor: '#f3f4f6' }; // Light gray default

  return (
    <>
      <div 
        className={`relative cursor-default group ${className}`}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {previewUrl ? (
          // Image preview
          <div className="w-full h-full relative">
            <img 
              src={previewUrl} 
              alt={alt}
              className="w-full h-full object-cover"
            />
            
            {/* Hover overlay with actions */}
            <div className={`absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-200 ${isHovering ? 'opacity-100' : 'opacity-0'} flex flex-col justify-between`}>
              <div className="flex justify-end p-2">
                <button
                  type="button"
                  onClick={openImageSelectModal}
                  className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-2 py-1 rounded mr-2 transition-colors"
                >
                  Change Image
                </button>
                <button
                  type="button"
                  onClick={clearImage}
                  className="bg-red-500 hover:bg-red-600 text-white text-xs px-2 py-1 rounded transition-colors"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ) : (
          // Empty state with select button - improved centering
          <div 
            className="w-full h-full flex items-center justify-center"
            style={placeholderStyle}
          >
            <div className="flex flex-col items-center justify-center gap-2 text-center">
              <ImageIcon size={32} className="text-gray-400 mx-auto" />
              <button
                type="button"
                onClick={openImageSelectModal}
                className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1 rounded transition-colors mx-auto"
              >
                Select from Library
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Image Selection Modal */}
      <ImageSelectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelectImage={handleSelectImage}
        position={position}
      />
    </>
  );
}

export default UploadableImage;
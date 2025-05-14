import React, { useState, useRef, useEffect } from 'react';
import { Upload } from 'lucide-react';
import ImageSelectModal from '../ImageSelectModal';

/**
 * UploadableImage Component
 * 
 * A component that represents an image slot in a slide with options to:
 * - Click anywhere on the space to select/change an image
 * - Drag images to swap positions
 * - Visual indication on hover with border
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
  const [isDragging, setIsDragging] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

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
    e.preventDefault();
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

  // Drag and drop handlers
  const handleDragStart = (e) => {
    // Store the position data
    e.dataTransfer.setData('application/json', JSON.stringify({
      position: position,
      url: previewUrl
    }));
    setIsDragging(true);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    
    try {
      const data = JSON.parse(e.dataTransfer.getData('application/json'));
      if (data.type === 'image') {
        onImageChange({
          url: data.src,
          id: data.id,
          position
        });
      }
    } catch (error) {
      console.error('Error handling drop:', error);
    }
  };

  return (
    <>
      <div 
        className={`w-full h-full relative group cursor-pointer ${className} ${
          isHovering ? 'ring-2 ring-blue-500' : ''
        } transition-all duration-200`}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onClick={openImageSelectModal}
        draggable="true"
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        style={{ opacity: isDragging ? 0.5 : 1 }}
      >
        {previewUrl ? (
          // Image preview with centered content
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
            <img 
              src={previewUrl} 
              alt={alt}
              className="h-full w-auto min-w-full object-cover"
              draggable="false" // Prevent default image drag behavior
            />
            
            {/* Hover overlay */}
            <div className={`absolute inset-0 bg-black transition-opacity ${isHovering ? 'bg-opacity-40' : 'bg-opacity-0'}`}>
              <div className="absolute top-2 right-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    clearImage(e);
                  }}
                  className="bg-red-500 hover:bg-red-600 text-white text-xs px-2 py-1 rounded transition-colors"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ) : (
          // Empty state placeholder
          <div 
            className={`absolute inset-0 ${placeholderColor} dark:bg-gray-800 flex flex-col items-center justify-center ${isDragOver ? 'bg-blue-50 dark:bg-gray-700' : ''}`}
          >
            <Upload className="w-6 h-6 text-gray-400 dark:text-gray-500 mb-2" />
            <span className="text-sm text-gray-500 dark:text-gray-400">Add Image</span>
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
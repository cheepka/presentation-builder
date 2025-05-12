import React, { useState, useRef, useEffect } from 'react';
import { Upload, X, ImageIcon } from 'lucide-react';

/**
 * UploadableImage Component
 * 
 * An enhanced version of the ImageUpload component that supports direct click-to-upload
 * functionality for the new UI design.
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
  const fileInputRef = useRef(null);

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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file is an image
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Create a preview URL for the selected file
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    // Call the callback with the file and URL
    if (onImageChange) {
      onImageChange({
        file,
        url,
        name: file.name,
        size: file.size,
        type: file.type,
        position
      });
    }
  };

  const clearImage = (e) => {
    e.stopPropagation();
    
    // Clean up object URL if it exists
    if (previewUrl && previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(previewUrl);
    }
    
    // Reset to placeholder
    setPreviewUrl(null);
    
    // Clear the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    
    // Call callback with null to indicate clearing
    if (onImageChange) {
      onImageChange(null);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Calculate placeholder background style
  const placeholderStyle = placeholderColor ? 
    { backgroundColor: placeholderColor } : 
    { backgroundColor: '#f3f4f6' }; // Light gray default

  return (
    <div 
      className={`relative cursor-pointer group ${className}`}
      onClick={triggerFileInput}
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
          
          {/* Hover overlay */}
          <div className={`absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center transition-opacity duration-200 ${isHovering ? 'opacity-100' : 'opacity-0'}`}>
            <div className="text-white text-center">
              <Upload size={32} className="mx-auto mb-2" />
              <p className="text-sm">Replace Image</p>
            </div>
          </div>
          
          {/* Remove button */}
          <button
            type="button"
            onClick={clearImage}
            className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors z-10"
            title="Remove image"
          >
            <X size={18} className="text-red-600" />
          </button>
        </div>
      ) : (
        // Placeholder when no image is selected
        <div 
          className="w-full h-full flex flex-col items-center justify-center"
          style={placeholderStyle}
        >
          <div className={`text-center p-4 transition-opacity duration-200 ${isHovering ? 'opacity-90' : 'opacity-60'}`}>
            <ImageIcon size={32} className="mx-auto mb-3 text-gray-500" />
            <p className="text-sm text-gray-600 font-medium">Click to add image</p>
            <p className="text-xs text-gray-500 mt-1">or drag and drop</p>
          </div>
        </div>
      )}
      
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}

export default UploadableImage;
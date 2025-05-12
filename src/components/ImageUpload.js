import React, { useState, useRef, useEffect } from 'react';
import { Upload, X } from 'lucide-react';

/**
 * ImageUpload Component
 * 
 * A reusable component for handling image uploads with preview functionality
 * 
 * @param {Object} props
 * @param {string} [props.initialImage] - URL of initial image to display
 * @param {Function} props.onImageChange - Callback when image is selected/changed
 * @param {string} [props.className] - Additional CSS classes
 */
function ImageUpload({ 
  initialImage, 
  onImageChange, 
  className = ''
}) {
  const [previewUrl, setPreviewUrl] = useState(initialImage || null);
  const [isPlaceholder, setIsPlaceholder] = useState(!initialImage);
  const fileInputRef = useRef(null);

  // Reset state if initialImage changes
  useEffect(() => {
    if (initialImage) {
      setPreviewUrl(initialImage);
      setIsPlaceholder(false);
    } else {
      setPreviewUrl(null);
      setIsPlaceholder(true);
    }
  }, [initialImage]);

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
    setIsPlaceholder(false);

    // Call the callback with the file and URL
    if (onImageChange) {
      onImageChange({
        file,
        url,
        name: file.name,
        size: file.size,
        type: file.type
      });
    }
  };

  const clearImage = () => {
    // Reset to placeholder
    setPreviewUrl(null);
    setIsPlaceholder(true);
    
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

  return (
    <div className={`relative group ${className}`}>
      <div 
        className="relative w-full h-full overflow-hidden bg-gray-100 rounded border border-gray-300 cursor-pointer transition-all duration-200 hover:bg-gray-200 flex items-center justify-center"
        onClick={triggerFileInput}
      >
        {/* If we have a preview URL, show the image */}
        {previewUrl ? (
          <img 
            src={previewUrl} 
            alt="Preview" 
            className="w-full h-full object-cover"
          />
        ) : (
          // Empty placeholder with just an upload icon
          <Upload size={24} className="text-gray-400" />
        )}
        
        {/* Remove button - only show if we have an image */}
        {!isPlaceholder && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              clearImage();
            }}
            className="absolute top-2 right-2 p-1 bg-white bg-opacity-90 rounded-full shadow hover:bg-opacity-100 z-10"
            title="Remove image"
          >
            <X size={16} className="text-red-600" />
          </button>
        )}
      </div>
      
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

export default ImageUpload;
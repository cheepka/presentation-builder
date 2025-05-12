import React, { useState, useRef, useEffect } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

/**
 * ImageUpload Component
 * 
 * A reusable component for handling image uploads with preview functionality
 * 
 * @param {Object} props
 * @param {string} [props.initialImage] - URL of initial image to display
 * @param {string} [props.placeholderSize='600x400'] - Size of placeholder image if no image is uploaded
 * @param {Function} props.onImageChange - Callback when image is selected/changed
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.label='Upload Image'] - Label text for the upload button
 */
function ImageUpload({ 
  initialImage, 
  placeholderSize = '600x400',
  onImageChange, 
  className = '', 
  label = 'Upload Image' 
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
      <div className="relative w-full h-full overflow-hidden bg-gray-100 rounded border border-gray-300">
        {/* Only show image if we have a preview URL */}
        {previewUrl ? (
          <img 
            src={previewUrl} 
            alt="Preview" 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full"></div>
        )}
        
        {/* Overlay controls that show on hover */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center">
          <div className="flex space-x-2">
            <button
              type="button"
              onClick={triggerFileInput}
              className="p-2 bg-white bg-opacity-90 rounded-full shadow hover:bg-opacity-100"
              title="Upload Image"
            >
              <Upload size={20} className="text-gray-800" />
            </button>
            
            {!isPlaceholder && (
              <button
                type="button"
                onClick={clearImage}
                className="p-2 bg-white bg-opacity-90 rounded-full shadow hover:bg-opacity-100"
                title="Remove image"
              >
                <X size={20} className="text-red-600" />
              </button>
            )}
          </div>
        </div>
        
        {/* Placeholder overlay when no image */}
        {isPlaceholder && (
          <div 
            className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 cursor-pointer"
            onClick={triggerFileInput}
          >
            <ImageIcon size={36} />
            <span className="mt-2 text-sm">{label}</span>
          </div>
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
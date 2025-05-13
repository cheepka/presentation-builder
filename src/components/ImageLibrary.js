// ImageLibrary.js
// Component for displaying and managing uploaded images

import React, { useRef } from 'react';
import { usePresentation } from '../context/PresentationContext';
import { Upload, X } from 'lucide-react';
import { ACTIONS } from '../context/PresentationContext';
import { createImageObject, isValidImageFile, isValidImageSize } from '../utils/imageUtils';

/**
 * Component for displaying and managing the image library
 * @returns {React.ReactElement} The ImageLibrary component
 */
const ImageLibrary = () => {
  const { state, dispatch } = usePresentation();
  const { imageLibrary } = state;
  const fileInputRef = useRef(null);
  
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };
  
  const handleFileChange = async (event) => {
    const files = Array.from(event.target.files);
    
    if (files.length === 0) return;
    
    // Process each file
    for (const file of files) {
      // Validate file type
      if (!isValidImageFile(file)) {
        alert(`${file.name} is not a valid image file. Please upload JPEG, PNG, GIF, or WebP files.`);
        continue;
      }
      
      // Validate file size
      if (!isValidImageSize(file, 5)) { // 5MB limit
        alert(`${file.name} is too large. Maximum file size is 5MB.`);
        continue;
      }
      
      try {
        // Create image object with base64 data
        const imageObject = await createImageObject(file);
        
        // Add to library
        dispatch({
          type: ACTIONS.ADD_IMAGE,
          payload: imageObject
        });
      } catch (error) {
        console.error('Error processing image:', error);
        alert(`Failed to process ${file.name}. Please try again.`);
      }
    }
    
    // Reset file input
    event.target.value = '';
  };
  
  const handleImageDelete = (imageId) => {
    dispatch({
      type: ACTIONS.REMOVE_IMAGE,
      payload: imageId
    });
  };
  
  const handleDragStart = (event, image) => {
    // Set the data to be transferred during drag operations
    event.dataTransfer.setData('application/json', JSON.stringify({
      type: 'image',
      id: image.id,
      src: image.src
    }));
    
    // Set a drag image preview
    const img = new Image();
    img.src = image.src;
    event.dataTransfer.setDragImage(img, 10, 10);
  };

  return (
    <div className="h-full">
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/jpeg, image/png, image/gif, image/webp"
        multiple
        onChange={handleFileChange}
      />
      
      {/* Image library container */}
      <div className="p-2">
        {imageLibrary.length === 0 ? (
          // Empty state
          <div className="text-center py-6 text-gray-500">
            <p>No images yet</p>
            <p className="text-sm mb-4">Upload images to use in your slides</p>
            <button
              className="inline-flex items-center px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors text-sm"
              onClick={handleUploadClick}
            >
              <Upload size={16} className="mr-1" />
              Upload Images
            </button>
          </div>
        ) : (
          <>
            {/* Image grid */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              {imageLibrary.map((image) => (
                <div 
                  key={image.id}
                  className="relative group rounded overflow-hidden border border-gray-200 aspect-square"
                >
                  {/* Image thumbnail */}
                  <img
                    src={image.src}
                    alt={image.name}
                    className="w-full h-full object-cover cursor-grab"
                    draggable
                    onDragStart={(e) => handleDragStart(e, image)}
                  />
                  
                  {/* Delete button overlay (visible on hover) */}
                  <button
                    className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => handleImageDelete(image.id)}
                    title="Remove from library"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
            
            {/* Upload button */}
            <button
              className="w-full flex items-center justify-center px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors text-sm"
              onClick={handleUploadClick}
            >
              <Upload size={16} className="mr-1" />
              Upload More Images
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ImageLibrary;

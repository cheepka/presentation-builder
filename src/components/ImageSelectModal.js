import React, { useEffect, useState, useRef } from 'react';
import { X, Upload, ZoomIn, ZoomOut } from 'lucide-react';
import { usePresentation } from '../context/PresentationContext';
import { ACTIONS } from '../context/PresentationContext';
import { createImageObject, isValidImageFile, isValidImageSize } from '../utils/imageUtils';

/**
 * Modal component for selecting images from the library
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether the modal is open
 * @param {Function} props.onClose - Function to close the modal
 * @param {Function} props.onSelectImage - Function called when an image is selected
 * @param {string} props.position - Position identifier of the image slot being filled
 */
const ImageSelectModal = ({ isOpen, onClose, onSelectImage, position }) => {
  const { state, dispatch } = usePresentation();
  const { imageLibrary } = state;
  const [isClosing, setIsClosing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const fileInputRef = useRef(null);
  const [gridSize, setGridSize] = useState('medium'); // 'small', 'medium', or 'large'
  
  // Animation duration constant - used for both CSS and JS timing
  const ANIMATION_DURATION = 300;
  
  // Handle modal visibility state
  useEffect(() => {
    if (isOpen) {
      setShowModal(true);
      setIsClosing(false);
    } else if (showModal) {
      // Start closing animation before hiding modal
      setIsClosing(true);
      const timer = setTimeout(() => {
        setShowModal(false);
      }, ANIMATION_DURATION);
      return () => clearTimeout(timer);
    }
  }, [isOpen, showModal]);

  // Add keyboard event listener for Escape key
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    if (showModal && !isClosing) {
      // Add event listener when the modal opens
      document.addEventListener('keydown', handleKeyDown);
    }

    // Clean up event listener when component unmounts or modal closes
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showModal, isClosing]);

  // Unified close handler with animation
  const handleClose = () => {
    if (!isClosing) {
      setIsClosing(true);
      // Call the onClose prop after animation fully completes
      setTimeout(() => {
        onClose();
      }, ANIMATION_DURATION);
    }
  };

  // Handle backdrop click to close
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  // Handle selecting an image
  const handleSelectImage = (image) => {
    onSelectImage({
      url: image.src,
      id: image.id,
      name: image.name,
      size: image.size,
      type: image.type,
      position
    });
    handleClose();
  };
  
  // Image upload functionality
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
  
  // Get scale value based on grid size
  const getScaleValue = (size) => {
    switch (size) {
      case 'small': return 0.5;  // 4 columns
      case 'medium': return 0.75; // 2 columns
      case 'large': return 1;    // 1 column
      default: return 0.75;
    }
  };

  const getGridColumns = (size) => {
    switch (size) {
      case 'small': return 'grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-2';
      case 'medium': return 'grid-cols-1 sm:grid-cols-2 gap-2';
      case 'large': return 'grid-cols-1 gap-2';
      default: return 'grid-cols-1 sm:grid-cols-2 gap-2';
    }
  };

  if (!showModal) return null;

  return (
    <div 
      className={`fixed inset-0 flex items-center justify-center z-50 transition-all duration-300 ${
        isClosing ? 'opacity-0' : 'opacity-100'
      } bg-black ${isClosing ? 'bg-opacity-0' : 'bg-opacity-50'} modal-container`}
      onClick={handleBackdropClick}
    >
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/jpeg, image/png, image/gif, image/webp"
        multiple
        onChange={handleFileChange}
      />
      
      <div 
        className={`bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[80vh] flex flex-col modal-content transition-all duration-300 ${
          isClosing 
            ? 'opacity-0 translate-y-4' 
            : 'opacity-100 translate-y-0'
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b p-4">
          <h3 className="text-lg font-medium">Select an Image</h3>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-grow">
          {imageLibrary.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No images in your library yet</p>
              <p className="text-sm mt-4 mb-6">Upload images directly from here or from the image library panel</p>
              <button
                className="inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors"
                onClick={handleUploadClick}
              >
                <Upload size={18} className="mr-2" />
                Upload Images
              </button>
            </div>
          ) : (
            <>
              {/* Grid size controls */}
              <div className="mb-6 flex items-center justify-center space-x-2 border-b pb-4">
                <button
                  onClick={() => setGridSize('small')}
                  className={`p-2 rounded ${
                    gridSize === 'small' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                  title="Small thumbnails"
                >
                  <div className="grid grid-cols-3 gap-0.5">
                    {[...Array(9)].map((_, i) => (
                      <div key={i} className="w-1.5 h-1.5 bg-current" />
                    ))}
                  </div>
                </button>
                <button
                  onClick={() => setGridSize('medium')}
                  className={`p-2 rounded ${
                    gridSize === 'medium'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                  title="Medium thumbnails"
                >
                  <div className="grid grid-cols-2 gap-0.5">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="w-2 h-2 bg-current" />
                    ))}
                  </div>
                </button>
                <button
                  onClick={() => setGridSize('large')}
                  className={`p-2 rounded ${
                    gridSize === 'large'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                  title="Large thumbnails"
                >
                  <div className="w-3 h-3 bg-current" />
                </button>
              </div>

              {/* Image grid */}
              <div className={`grid ${getGridColumns(gridSize)}`}>
                {imageLibrary.map((image) => (
                  <div
                    key={image.id}
                    onClick={() => handleSelectImage(image)}
                    className="relative group cursor-pointer"
                  >
                    <div className="w-full pb-[56.25%] relative">
                      <div className="absolute inset-0 overflow-hidden">
                        <img
                          src={image.src}
                          alt={image.name || "Library image"}
                          className="w-full h-full object-contain bg-gray-50"
                        />
                        <div className="absolute inset-0 ring-1 ring-transparent hover:ring-blue-500 transition-all" />
                        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="border-t p-4 flex justify-between">
          {imageLibrary.length > 0 && (
            <button
              onClick={handleUploadClick}
              className="px-4 py-2 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors flex items-center"
            >
              <Upload size={16} className="mr-1" />
              Add More
            </button>
          )}
          <div className="ml-auto">
            <button
              onClick={handleClose}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageSelectModal; 
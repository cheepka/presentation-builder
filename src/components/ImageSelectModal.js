import React from 'react';
import { X } from 'lucide-react';
import { usePresentation } from '../context/PresentationContext';

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
  const { state } = usePresentation();
  const { imageLibrary } = state;

  // Handle backdrop click to close
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
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
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 modal-container"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[80vh] flex flex-col modal-content">
        {/* Header */}
        <div className="flex justify-between items-center border-b p-4">
          <h3 className="text-lg font-medium">Select an Image</h3>
          <button
            onClick={onClose}
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
              <p className="text-sm mt-2">Upload some images from the image library panel first</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
              {imageLibrary.map((image) => (
                <div
                  key={image.id}
                  onClick={() => handleSelectImage(image)}
                  className="aspect-square border rounded overflow-hidden cursor-pointer hover:border-blue-500 hover:shadow-md transition-all transform hover:scale-105"
                >
                  <img
                    src={image.src}
                    alt={image.name || "Library image"}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t p-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageSelectModal; 
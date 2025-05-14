import React, { useEffect, useState } from 'react';
import { X, FileText, File } from 'lucide-react';
import { usePresentation } from '../context/PresentationContext';

/**
 * Modal component for selecting knowledge items from the library
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether the modal is open
 * @param {Function} props.onClose - Function to close the modal
 * @param {Function} props.onSelectKnowledge - Function called when a knowledge item is selected
 */
const KnowledgeSelectModal = ({ isOpen, onClose, onSelectKnowledge }) => {
  const { state } = usePresentation();
  const { knowledgeLibrary } = state;
  const [isClosing, setIsClosing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  
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

  // Handle selecting a knowledge item
  const handleSelectKnowledge = (item) => {
    onSelectKnowledge(item);
    handleClose();
  };

  // Icon component based on item type
  const ItemIcon = ({ type }) => {
    if (type === 'pdf') return <File size={20} />;
    if (type === 'text') return <FileText size={20} />;
    return <FileText size={20} />;
  };

  if (!showModal) return null;

  return (
    <div 
      className={`fixed inset-0 flex items-center justify-center z-50 transition-all duration-300 ${
        isClosing ? 'opacity-0' : 'opacity-100'
      } bg-black ${isClosing ? 'bg-opacity-0' : 'bg-opacity-50'} modal-container`}
      onClick={handleBackdropClick}
    >
      <div 
        className={`bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[80vh] flex flex-col modal-content transition-all duration-300 ${
          isClosing 
            ? 'opacity-0 translate-y-4' 
            : 'opacity-100 translate-y-0'
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b p-4">
          <h3 className="text-lg font-medium">Select Knowledge Item</h3>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-grow">
          {knowledgeLibrary.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No knowledge items in your library yet</p>
              <p className="text-sm mt-2">Add text notes or upload PDF files from the knowledge library panel first</p>
            </div>
          ) : (
            <div className="space-y-2">
              {knowledgeLibrary.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleSelectKnowledge(item)}
                  className="p-3 border rounded flex items-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all"
                >
                  <div className="mr-3 text-gray-500">
                    <ItemIcon type={item.type} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{item.originalFilename}</h4>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t p-4 flex justify-end">
          <button
            onClick={handleClose}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeSelectModal; 
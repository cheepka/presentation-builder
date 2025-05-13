import React from 'react';
import { ChevronUp, ChevronDown, Trash2, Copy } from 'lucide-react';

/**
 * SlideControls Component
 * 
 * Provides control buttons for managing slides (move up, move down, delete, duplicate).
 * Used in the EditableSlide component for direct slide management.
 * 
 * @param {Object} props
 * @param {number} props.slideIndex - Index of the slide
 * @param {number} props.totalSlides - Total number of slides
 * @param {Function} props.onMoveUp - Callback for moving slide up
 * @param {Function} props.onMoveDown - Callback for moving slide down
 * @param {Function} props.onDelete - Callback for deleting slide
 * @param {Function} [props.onDuplicate] - Callback for duplicating slide (optional)
 * @param {string} [props.className=''] - Additional CSS classes
 * @param {boolean} [props.showDuplicate=true] - Whether to show the duplicate button
 */
function SlideControls({
  slideIndex,
  totalSlides,
  onMoveUp,
  onMoveDown,
  onDelete,
  onDuplicate,
  className = '',
  showDuplicate = true
}) {
  const isFirst = slideIndex === 0;
  const isLast = slideIndex === totalSlides - 1;
  
  return (
    <div className={`inline-flex bg-white rounded shadow-sm ${className}`}>
      {/* Move Up Button */}
      <button
        onClick={() => onMoveUp(slideIndex)}
        disabled={isFirst}
        className={`p-2 hover:bg-gray-100 border-r border-gray-300 rounded-l transition-colors ${isFirst ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700'}`}
        title="Move slide up"
      >
        <ChevronUp size={16} />
      </button>
      
      {/* Move Down Button */}
      <button
        onClick={() => onMoveDown(slideIndex)}
        disabled={isLast}
        className={`p-2 hover:bg-gray-100 border-r border-gray-300 transition-colors ${isLast ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700'}`}
        title="Move slide down"
      >
        <ChevronDown size={16} />
      </button>
      
      {/* Delete Button */}
      <button
        onClick={() => onDelete(slideIndex)}
        className="p-2 hover:bg-red-50 text-red-600 hover:text-red-700 transition-colors border-r border-gray-300"
        title="Delete slide"
      >
        <Trash2 size={16} />
      </button>
      
      {/* Duplicate Button (Optional) */}
      {showDuplicate && onDuplicate && (
        <button
          onClick={() => onDuplicate(slideIndex)}
          className="p-2 hover:bg-blue-50 text-blue-600 hover:text-blue-700 transition-colors rounded-r"
          title="Duplicate slide"
        >
          <Copy size={16} />
        </button>
      )}
    </div>
  );
}

export default SlideControls;
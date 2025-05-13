// EditableText.js
// A reusable component for editing text inline

import React, { useState, useRef, useEffect } from 'react';
import { usePresentation } from '../context/PresentationContext';
import { ACTIONS } from '../context/PresentationContext';

/**
 * A component that allows for inline text editing
 * 
 * @param {Object} props - Component props
 * @param {string} props.text - The current text content
 * @param {string} props.slideId - ID of the slide containing this text
 * @param {string} props.field - The field name in the slide object (e.g., 'title', 'subtitle')
 * @param {number} props.index - Optional index if the text is part of an array (e.g., bullet points)
 * @param {string} props.className - CSS class names to apply to the text element
 * @param {React.ElementType} props.as - HTML element to render (default: 'p')
 * @returns {React.ReactElement} The editable text component
 */
const EditableText = ({ 
  text, 
  slideId, 
  field, 
  index, 
  className = '', 
  as: Component = 'p'
}) => {
  const { state, dispatch } = usePresentation();
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(text);
  const inputRef = useRef(null);
  
  // Find the slide index from the ID
  const slideIndex = state.slides.findIndex(slide => slide.id === slideId);
  
  // Handle click to enter edit mode
  const handleClick = () => {
    setIsEditing(true);
  };
  
  // Handle blur to exit edit mode and save changes
  const handleBlur = () => {
    setIsEditing(false);
    saveChanges();
  };
  
  // Handle key press events
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      // Enter without shift = save and exit
      e.preventDefault();
      setIsEditing(false);
      saveChanges();
    } else if (e.key === 'Escape') {
      // Escape = cancel edit
      setIsEditing(false);
      setEditedText(text); // Revert to original
    }
  };
  
  // Save changes to the context
  const saveChanges = () => {
    if (editedText !== text) {
      // Get the current slide
      const currentSlide = { ...state.slides[slideIndex] };
      
      // Update the appropriate field based on the type of field
      if (index !== undefined && Array.isArray(currentSlide[field])) {
        // If it's an array item (like bullet points)
        const updatedArray = [...currentSlide[field]];
        updatedArray[index] = editedText;
        currentSlide[field] = updatedArray;
      } else {
        // If it's a direct property
        currentSlide[field] = editedText;
      }
      
      // Dispatch the update action
      dispatch({
        type: ACTIONS.UPDATE_SLIDE,
        payload: {
          index: slideIndex,
          slide: currentSlide
        }
      });
    }
  };
  
  // Focus the input when entering edit mode
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);
  
  // In edit mode, render an input
  if (isEditing) {
    return (
      <textarea
        ref={inputRef}
        value={editedText}
        onChange={(e) => setEditedText(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={`w-full bg-white border-2 border-blue-400 p-1 rounded ${className}`}
        style={{ resize: 'none', minHeight: '1em' }}
        autoFocus
      />
    );
  }
  
  // In display mode, render the text with the specified component type
  return (
    <Component 
      className={`cursor-text hover:bg-blue-50 ${className}`} 
      onClick={handleClick}
    >
      {text}
    </Component>
  );
};

export default EditableText;
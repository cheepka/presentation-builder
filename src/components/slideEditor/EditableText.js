import React, { useState, useRef, useEffect } from 'react';

/**
 * EditableText Component
 * 
 * A text component that supports direct inline editing.
 * Replaces modal-based text editing with in-place editing functionality.
 * 
 * @param {Object} props
 * @param {string} props.value - Current text value
 * @param {Function} props.onChange - Callback when text is changed (value) => void
 * @param {string} [props.placeholder='Click to edit'] - Placeholder text when empty
 * @param {string} [props.className=''] - Additional CSS classes
 * @param {string} [props.textClassName=''] - CSS classes for the text element
 * @param {string} [props.as='p'] - HTML element to render ('p', 'h1', 'h2', etc.)
 * @param {boolean} [props.multiline=false] - Whether to allow multiline editing (renders textarea instead of input)
 * @param {string} [props.textStyle=''] - Text styling (e.g., 'bold', 'italic')
 */
function EditableText({
  value,
  onChange,
  placeholder = 'Click to edit',
  className = '',
  textClassName = '',
  as = 'p',
  multiline = false,
  textStyle = ''
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(value || '');
  const inputRef = useRef(null);
  
  // Update local state when prop value changes
  useEffect(() => {
    setEditedText(value || '');
  }, [value]);
  
  // Focus input when editing starts
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      
      // Place cursor at the end of text
      if (inputRef.current.type !== 'textarea') {
        const length = inputRef.current.value.length;
        inputRef.current.setSelectionRange(length, length);
      }
    }
  }, [isEditing]);
  
  // Determine text style classes
  let textStyleClasses = '';
  switch (textStyle) {
    case 'bold':
      textStyleClasses = 'font-bold';
      break;
    case 'italic':
      textStyleClasses = 'italic';
      break;
    case 'underline':
      textStyleClasses = 'underline';
      break;
    default:
      break;
  }
  
  // Start editing
  const handleClick = () => {
    setIsEditing(true);
  };
  
  // Finish editing and save changes
  const handleBlur = () => {
    setIsEditing(false);
    if (onChange && editedText !== value) {
      onChange(editedText);
    }
  };
  
  // Handle text changes
  const handleChange = (e) => {
    setEditedText(e.target.value);
  };
  
  // Handle key press (Enter to save, Escape to cancel)
  const handleKeyDown = (e) => {
    if (!multiline && e.key === 'Enter') {
      e.preventDefault();
      inputRef.current.blur();
    }
    if (e.key === 'Escape') {
      setEditedText(value || '');
      setIsEditing(false);
    }
  };
  
  // Render text display when not editing
  const renderText = () => {
    const TextComponent = as;
    const isEmpty = !value || value.trim() === '';
    
    const textContent = isEmpty ? (
      <span className="text-gray-400">{placeholder}</span>
    ) : (
      value
    );
    
    return (
      <TextComponent 
        className={`group cursor-pointer hover:bg-gray-100 hover:bg-opacity-50 px-1 -mx-1 rounded transition-colors ${textStyleClasses} ${textClassName}`}
        onClick={handleClick}
      >
        {textContent}
        <span className="ml-1 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity">✎</span>
      </TextComponent>
    );
  };
  
  // Render editing input/textarea
  const renderInput = () => {
    if (multiline) {
      return (
        <textarea
          ref={inputRef}
          value={editedText}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className={`w-full px-2 py-1 border border-blue-400 rounded bg-white shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 ${textStyleClasses} ${textClassName}`}
          autoComplete="off"
          rows={3}
        />
      );
    }
    
    return (
      <input
        ref={inputRef}
        type="text"
        value={editedText}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={`w-full px-2 py-1 border border-blue-400 rounded bg-white shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 ${textStyleClasses} ${textClassName}`}
        autoComplete="off"
      />
    );
  };
  
  return (
    <div className={`editable-text ${className}`}>
      {isEditing ? renderInput() : renderText()}
    </div>
  );
}

export default EditableText;
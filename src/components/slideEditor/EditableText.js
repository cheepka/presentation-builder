import React, { useState, useRef, useEffect } from 'react';

/**
 * EditableText Component
 * 
 * A component that renders as normal text but becomes editable when clicked.
 * 
 * @param {Object} props
 * @param {string} props.value - The text content to display and edit
 * @param {Function} props.onChange - Callback when text is changed
 * @param {string} props.as - HTML tag to render (h1, h2, p, span, etc.)
 * @param {string} [props.textClassName] - Classes to apply to the text
 * @param {string} [props.textStyle] - Text style (normal, bold, italic)
 * @param {string} [props.placeholder] - Placeholder text when value is empty
 */
function EditableText({ 
  value = '',
  onChange,
  as = 'p',
  textClassName = '',
  textStyle = 'normal',
  placeholder = 'Click to edit text'
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(value);
  const inputRef = useRef(null);
  
  // Update text state when value prop changes
  useEffect(() => {
    setText(value);
  }, [value]);
  
  // Auto-focus when editing starts
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      // Set cursor at end of text
      inputRef.current.setSelectionRange(
        inputRef.current.value.length,
        inputRef.current.value.length
      );
    }
  }, [isEditing]);

  // Handle clicks outside to save changes
  useEffect(() => {
    function handleClickOutside(event) {
      if (isEditing && inputRef.current && !inputRef.current.contains(event.target)) {
        saveChanges();
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isEditing, text]);

  // Save changes and exit edit mode
  const saveChanges = () => {
    onChange(text);
    setIsEditing(false);
  };
  
  // Handle enter key to save
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      saveChanges();
    } else if (event.key === 'Escape') {
      setIsEditing(false);
      setText(value); // Revert to original value
    }
  };
  
  // Determine font weight and style
  let fontStyles = {};
  if (textStyle === 'bold') fontStyles.fontWeight = 'bold';
  if (textStyle === 'italic') fontStyles.fontStyle = 'italic';
  
  // Determine which HTML element to render
  const Element = as;
  
  if (isEditing) {
    // Show editable textarea
    return (
      <textarea
        ref={inputRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={saveChanges}
        style={{
          width: '100%',
          minHeight: '1.5em',
          padding: '0.25em',
          ...fontStyles
        }}
        className={`border border-blue-400 rounded ${textClassName}`}
        placeholder={placeholder}
      />
    );
  }
  
  // Show static text that becomes editable when clicked
  return (
    <Element
      onClick={() => setIsEditing(true)}
      className={`cursor-text ${textClassName} hover:bg-blue-50 hover:ring-1 hover:ring-blue-200 hover:rounded transition-all duration-100`}
      style={fontStyles}
    >
      {value || <span className="text-gray-400">{placeholder}</span>}
    </Element>
  );
}

export default EditableText;
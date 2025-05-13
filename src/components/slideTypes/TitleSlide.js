import React from 'react';
import EditableText from '../slideEditor/EditableText';

/**
 * TitleSlide Component
 * 
 * Displays a simple title slide with title and subtitle.
 * Supports direct inline editing of all elements.
 * 
 * @param {Object} props
 * @param {Object} props.slide - Slide data
 * @param {Function} props.onUpdate - Callback for updating slide content
 */
function TitleSlide({ slide, onUpdate }) {
  // Handle text updates
  const handleTextChange = (field, value) => {
    onUpdate(field, value);
  };
  
  return (
    <div className="w-full h-full bg-gray-100 flex flex-col items-center justify-center p-12 text-center">
      <EditableText
        value={slide.title || "Presentation Title"}
        onChange={(value) => handleTextChange('title', value)}
        as="h1"
        textClassName="text-5xl font-bold mb-8 text-gray-800"
        textStyle="bold"
      />
      
      <EditableText
        value={slide.subtitle || "Subtitle or Author Information"}
        onChange={(value) => handleTextChange('subtitle', value)}
        as="h2"
        textClassName="text-2xl text-gray-600"
      />
    </div>
  );
}

export default TitleSlide; 
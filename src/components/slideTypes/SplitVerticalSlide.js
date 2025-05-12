import React from 'react';
import EditableText from '../slideEditor/EditableText';
import UploadableImage from '../slideEditor/UploadableImage';
import { getPlaceholderColor } from '../../utils/slideTemplates';

/**
 * SplitVerticalSlide Component
 * 
 * Displays a slide with text on the left and two vertically stacked images on the right.
 * Supports direct inline editing of all elements.
 * 
 * @param {Object} props
 * @param {Object} props.slide - Slide data
 * @param {Function} props.onUpdate - Callback for updating slide content
 * @param {Function} props.onImageChange - Callback for handling image changes
 */
function SplitVerticalSlide({ slide, onUpdate, onImageChange }) {
  // Handle text updates
  const handleTextChange = (field, value) => {
    onUpdate(field, value);
  };
  
  // Handle image changes
  const handleImageChange = (position, imageData) => {
    onImageChange({
      ...imageData,
      position
    });
  };
  
  return (
    <div className="w-full h-full flex">
      {/* Left content section */}
      <div className="w-1/2 bg-gray-900 p-8 flex flex-col justify-center">
        <div className="ml-4">
          <EditableText
            value={slide.title}
            onChange={(value) => handleTextChange('title', value)}
            as="h3"
            textClassName="text-4xl font-bold text-white mb-6"
            textStyle="bold"
          />
          
          {slide.content && (
            <div className="text-white">
              <EditableText
                value={slide.content}
                onChange={(value) => handleTextChange('content', value)}
                textClassName="text-sm"
                multiline={true}
                placeholder="Add content text here"
              />
            </div>
          )}
        </div>
      </div>
      
      {/* Right split image section */}
      <div className="w-1/2 grid grid-rows-2 gap-1">
        <div className="relative">
          <UploadableImage
            initialImage={slide.images?.top?.url}
            onImageChange={(imageData) => handleImageChange('top', imageData)}
            position="top"
            className="w-full h-full"
            alt="Top image"
            placeholderColor={getPlaceholderColor('top')}
          />
        </div>
        <div className="relative">
          <UploadableImage
            initialImage={slide.images?.bottom?.url}
            onImageChange={(imageData) => handleImageChange('bottom', imageData)}
            position="bottom"
            className="w-full h-full"
            alt="Bottom image"
            placeholderColor={getPlaceholderColor('bottom')}
          />
        </div>
      </div>
    </div>
  );
}

export default SplitVerticalSlide;
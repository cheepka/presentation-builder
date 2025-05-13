// SlideEditor.js
// Component for editing the current slide

import React from 'react';
import { ACTIONS, usePresentation } from '../context/PresentationContext';
import { TEMPLATE_TYPES } from '../utils/slideTemplates';

// Import slide type components
import TitleSlide from './slideTypes/TitleSlide';
import FullImageSlide from './slideTypes/FullImageSlide';
import RightImageSlide from './slideTypes/RightImageSlide';
import LeftImageSlide from './slideTypes/LeftImageSlide';
import ImageGridSlide from './slideTypes/ImageGridSlide';
import FourGridSlide from './slideTypes/FourGridSlide';
import SplitVerticalSlide from './slideTypes/SplitVerticalSlide';

/**
 * Component for displaying and editing the current slide
 * @returns {React.ReactElement} The SlideEditor component
 */
const SlideEditor = () => {
  const { state, dispatch } = usePresentation();
  const { slides, currentSlideIndex } = state;
  
  // If there are no slides, display empty state
  if (slides.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full w-full p-8 text-center">
        <div className="text-gray-500 mb-4">
          <p className="text-xl mb-2">No slides yet</p>
          <p>Add a slide using the "Add Slide" button or select a template from the right panel</p>
        </div>
      </div>
    );
  }
  
  const currentSlide = slides[currentSlideIndex];
  
  // Handle slide updates
  const handleSlideUpdate = (field, value) => {
    const updatedSlide = { ...currentSlide };
    
    if (field.includes('.')) {
      // Handle nested fields like "content.0"
      const [parent, child] = field.split('.');
      updatedSlide[parent][parseInt(child)] = value;
    } else {
      updatedSlide[field] = value;
    }
    
    dispatch({
      type: ACTIONS.UPDATE_SLIDE,
      payload: {
        index: currentSlideIndex,
        slide: updatedSlide
      }
    });
  };
  
  // Handle image changes
  const handleImageChange = (imageData) => {
    const updatedSlide = { ...currentSlide };
    const currentImages = updatedSlide.images || {};
    
    // If no image data, remove the image from the position
    if (!imageData || !imageData.url) {
      if (imageData && imageData.position) {
        const updatedImages = { ...currentImages };
        delete updatedImages[imageData.position];
        updatedSlide.images = updatedImages;
      }
    } else {
      // Update with new image
      const position = imageData.position || 'main';
      const updatedImages = {
        ...currentImages,
        [position]: {
          url: imageData.url,
          id: imageData.id,
          name: imageData.name,
          size: imageData.size,
          type: imageData.type
        }
      };
      updatedSlide.images = updatedImages;
    }
    
    dispatch({
      type: ACTIONS.UPDATE_SLIDE,
      payload: {
        index: currentSlideIndex,
        slide: updatedSlide
      }
    });
  };
  
  // Render slide content based on template type
  const renderSlideContent = () => {
    switch (currentSlide.type) {
      case TEMPLATE_TYPES.TITLE:
        return <TitleSlide slide={currentSlide} onUpdate={handleSlideUpdate} />;
        
      case TEMPLATE_TYPES.FULL_IMAGE:
        return <FullImageSlide slide={currentSlide} onUpdate={handleSlideUpdate} onImageChange={handleImageChange} />;
        
      case TEMPLATE_TYPES.TEXT_RIGHT_IMAGE:
        return <RightImageSlide slide={currentSlide} onUpdate={handleSlideUpdate} onImageChange={handleImageChange} />;
        
      case TEMPLATE_TYPES.TEXT_LEFT_IMAGE:
        return <LeftImageSlide slide={currentSlide} onUpdate={handleSlideUpdate} onImageChange={handleImageChange} />;
        
      case TEMPLATE_TYPES.IMAGE_GRID:
        return <ImageGridSlide slide={currentSlide} onUpdate={handleSlideUpdate} onImageChange={handleImageChange} />;
        
      case TEMPLATE_TYPES.FOUR_GRID:
        return <FourGridSlide slide={currentSlide} onUpdate={handleSlideUpdate} onImageChange={handleImageChange} />;
        
      case TEMPLATE_TYPES.SPLIT_VERTICAL:
        return <SplitVerticalSlide slide={currentSlide} onUpdate={handleSlideUpdate} onImageChange={handleImageChange} />;
        
      default:
        return (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">Unknown slide type</p>
          </div>
        );
    }
  };
  
  // Slide container with 16:9 aspect ratio
  return (
    <div className="relative bg-white shadow-lg" style={{ width: '960px', height: '540px' }}>
      {renderSlideContent()}
    </div>
  );
};

export default SlideEditor;
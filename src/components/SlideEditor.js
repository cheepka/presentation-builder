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
 * Component for displaying and editing all slides in a scrollable view
 * @returns {React.ReactElement} The SlideEditor component
 */
const SlideEditor = () => {
  const { state, dispatch } = usePresentation();
  const { slides, currentSlideIndex } = state;
  const slideRefs = React.useRef({});
  
  // Scroll to current slide when it changes
  React.useEffect(() => {
    if (slideRefs.current[currentSlideIndex]) {
      slideRefs.current[currentSlideIndex].scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  }, [currentSlideIndex]);
  
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
  
  // Handle slide updates
  const handleSlideUpdate = (index, field, value) => {
    const updatedSlide = { ...slides[index] };
    
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
        index: index,
        slide: updatedSlide
      }
    });
  };
  
  // Handle image changes
  const handleImageChange = (index, imageData) => {
    const updatedSlide = { ...slides[index] };
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
        index: index,
        slide: updatedSlide
      }
    });
  };
  
  // Set the current slide for detailed editing
  const setCurrentSlide = (index) => {
    dispatch({
      type: 'set_current_slide',
      payload: index
    });
  };
  
  // Render slide content based on template type
  const renderSlideContent = (slide, index) => {
    switch (slide.type) {
      case TEMPLATE_TYPES.TITLE:
        return <TitleSlide slide={slide} onUpdate={(field, value) => handleSlideUpdate(index, field, value)} />;
        
      case TEMPLATE_TYPES.FULL_IMAGE:
        return <FullImageSlide slide={slide} onUpdate={(field, value) => handleSlideUpdate(index, field, value)} onImageChange={(imageData) => handleImageChange(index, imageData)} />;
        
      case TEMPLATE_TYPES.TEXT_RIGHT_IMAGE:
        return <RightImageSlide slide={slide} onUpdate={(field, value) => handleSlideUpdate(index, field, value)} onImageChange={(imageData) => handleImageChange(index, imageData)} />;
        
      case TEMPLATE_TYPES.TEXT_LEFT_IMAGE:
        return <LeftImageSlide slide={slide} onUpdate={(field, value) => handleSlideUpdate(index, field, value)} onImageChange={(imageData) => handleImageChange(index, imageData)} />;
        
      case TEMPLATE_TYPES.IMAGE_GRID:
        return <ImageGridSlide slide={slide} onUpdate={(field, value) => handleSlideUpdate(index, field, value)} onImageChange={(imageData) => handleImageChange(index, imageData)} />;
        
      case TEMPLATE_TYPES.FOUR_GRID:
        return <FourGridSlide slide={slide} onUpdate={(field, value) => handleSlideUpdate(index, field, value)} onImageChange={(imageData) => handleImageChange(index, imageData)} />;
        
      case TEMPLATE_TYPES.SPLIT_VERTICAL:
        return <SplitVerticalSlide slide={slide} onUpdate={(field, value) => handleSlideUpdate(index, field, value)} onImageChange={(imageData) => handleImageChange(index, imageData)} />;
        
      default:
        return (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">Unknown slide type</p>
          </div>
        );
    }
  };
  
  // Render all slides in a scrollable container
  return (
    <div className="w-full h-full overflow-y-auto p-8 flex flex-col items-center">
      {slides.map((slide, index) => (
        <div 
          key={slide.id} 
          className="mb-16"
          ref={el => slideRefs.current[index] = el}
        >
          <div className="text-gray-600 text-sm mb-2 ml-2">
            Slide {index + 1}
          </div>
          <div 
            className={`relative bg-white shadow-lg ${index === currentSlideIndex ? 'ring-2 ring-blue-500' : 'hover:ring-2 hover:ring-blue-300'}`}
            style={{ width: '960px', height: '540px' }}
            onClick={() => setCurrentSlide(index)}
          >
            {renderSlideContent(slide, index)}
          </div>
        </div>
      ))}
      {/* Add some padding at the bottom for better scrolling experience */}
      <div className="h-20"></div>
    </div>
  );
};

export default SlideEditor;
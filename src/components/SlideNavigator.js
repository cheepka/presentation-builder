// SlideNavigator.js
// Left panel component showing slide thumbnails and providing navigation

import React from 'react';
import { usePresentation } from '../../context/PresentationContext';
import { Plus, Trash2, Copy, ArrowUp, ArrowDown } from 'lucide-react';
import { TEMPLATE_TYPES } from '../../utils/slideTemplates';

/**
 * Component for displaying slide thumbnails and navigation in the left panel
 * @returns {React.ReactElement} The SlideNavigator component
 */
const SlideNavigator = () => {
  const { state, dispatch } = usePresentation();
  const { slides, currentSlideIndex } = state;

  const addNewSlide = () => {
    // For now, add a default title slide
    dispatch({
      type: 'add_slide',
      payload: {
        id: Date.now().toString(),
        type: TEMPLATE_TYPES.TITLE,
        title: 'New Slide',
        subtitle: 'Add content here',
        backgroundImage: null,
      }
    });
  };

  const deleteSlide = (index) => {
    if (slides.length <= 1) {
      alert('Cannot delete the only slide in the presentation');
      return;
    }
    
    dispatch({
      type: 'delete_slide',
      payload: index
    });
  };

  const duplicateSlide = (index) => {
    const slideToClone = slides[index];
    const clonedSlide = { ...slideToClone, id: Date.now().toString() };
    
    dispatch({
      type: 'add_slide',
      payload: clonedSlide
    });
  };

  const moveSlide = (fromIndex, direction) => {
    const toIndex = direction === 'up' ? fromIndex - 1 : fromIndex + 1;
    
    // Validate bounds
    if (toIndex < 0 || toIndex >= slides.length) {
      return;
    }
    
    dispatch({
      type: 'reorder_slide', 
      payload: { fromIndex, toIndex }
    });
  };

  const setCurrentSlide = (index) => {
    dispatch({
      type: 'set_current_slide',
      payload: index
    });
  };

  // Helper function to render a basic slide thumbnail based on type
  const renderSlideThumbnail = (slide) => {
    switch (slide.type) {
      case TEMPLATE_TYPES.TITLE:
        return (
          <div className="w-full h-full flex flex-col justify-center items-center p-2 text-xs text-center">
            <div className="font-bold truncate w-full">{slide.title}</div>
            <div className="truncate w-full">{slide.subtitle}</div>
          </div>
        );
      
      case TEMPLATE_TYPES.FULL_IMAGE:
        return (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-xs">
            <div className="absolute inset-0 flex items-center justify-center">
              <span>{slide.title}</span>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="w-full h-full flex items-center justify-center text-xs">
            <span>{slide.title || 'Slide'}</span>
          </div>
        );
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-800">Slides</h2>
      </div>
      
      {/* Slide list */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {slides.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No slides yet</p>
            <p className="text-sm">Click the + button to add your first slide</p>
          </div>
        ) : (
          slides.map((slide, index) => (
            <div 
              key={slide.id} 
              className={`relative group border-2 ${
                index === currentSlideIndex ? 'border-blue-500' : 'border-gray-200'
              } rounded-lg bg-white overflow-hidden`}
            >
              {/* Slide number */}
              <div className="absolute top-1 left-1 bg-gray-100 rounded-full w-5 h-5 flex items-center justify-center text-xs text-gray-600">
                {index + 1}
              </div>
              
              {/* Slide thumbnail */}
              <div 
                className="h-24 cursor-pointer"
                onClick={() => setCurrentSlide(index)}
              >
                {renderSlideThumbnail(slide)}
              </div>
              
              {/* Control buttons (visible on hover) */}
              <div className="absolute bottom-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity p-1 flex bg-white bg-opacity-80 rounded-tl-md border-t border-l border-gray-200">
                {index > 0 && (
                  <button 
                    className="p-1 text-gray-700 hover:text-blue-500"
                    onClick={() => moveSlide(index, 'up')}
                    title="Move up"
                  >
                    <ArrowUp size={14} />
                  </button>
                )}
                
                {index < slides.length - 1 && (
                  <button 
                    className="p-1 text-gray-700 hover:text-blue-500"
                    onClick={() => moveSlide(index, 'down')}
                    title="Move down"
                  >
                    <ArrowDown size={14} />
                  </button>
                )}
                
                <button 
                  className="p-1 text-gray-700 hover:text-blue-500"
                  onClick={() => duplicateSlide(index)}
                  title="Duplicate slide"
                >
                  <Copy size={14} />
                </button>
                
                <button 
                  className="p-1 text-gray-700 hover:text-red-500"
                  onClick={() => deleteSlide(index)}
                  title="Delete slide"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      
      {/* Add slide button */}
      <div className="p-4 border-t border-gray-200">
        <button
          className="w-full flex items-center justify-center py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors"
          onClick={addNewSlide}
        >
          <Plus size={18} className="mr-1" />
          Add Slide
        </button>
      </div>
    </div>
  );
};

export default SlideNavigator;

// SlideNavigator.js
// Left panel component showing slide thumbnails and providing navigation

import React, { useState } from 'react';
import { usePresentation } from '../context/PresentationContext';
import { Plus, Trash2, Copy, ArrowUp, ArrowDown } from 'lucide-react';
import { TEMPLATE_TYPES } from '../utils/slideTemplates';

/**
 * Component for displaying slide thumbnails and navigation in the left panel
 * @returns {React.ReactElement} The SlideNavigator component
 */
const SlideNavigator = () => {
  const { state, dispatch } = usePresentation();
  const { slides, currentSlideIndex } = state;
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dropTargetIndex, setDropTargetIndex] = useState(null);

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

  // Handle starting the drag
  const handleDragStart = (e, index) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.dropEffect = 'move';
    setDraggedIndex(index);
    
    // Set empty data to prevent default behavior
    e.dataTransfer.setData('text/plain', '');
  };

  // Handle dragging over a drop zone
  const handleDragOverDropZone = (e, index) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = 'move';
    setDropTargetIndex(index);
  };

  // Handle dropping the slide
  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (draggedIndex === null) return;
    
    // Calculate the actual target index
    let targetIndex = dropIndex;
    if (dropIndex > draggedIndex) {
      targetIndex -= 1; // Adjust for the fact that we're moving the slide down
    }
    
    // Don't reorder if dropping in the same position
    if (targetIndex === draggedIndex) {
      setDraggedIndex(null);
      setDropTargetIndex(null);
      return;
    }

    // First dispatch the reorder
    dispatch({
      type: 'reorder_slide',
      payload: { fromIndex: draggedIndex, toIndex: targetIndex }
    });

    // If we're moving the current slide, update the current slide index after animation
    if (currentSlideIndex === draggedIndex) {
      // Wait for the slide reordering animation to complete
      setTimeout(() => {
        dispatch({
          type: 'set_current_slide',
          payload: targetIndex
        });
      }, 200); // Slightly longer than our CSS transition to ensure smooth animation
    } else if (
      // If we're moving a slide between the current slide and the start
      (draggedIndex < currentSlideIndex && targetIndex >= currentSlideIndex) ||
      (draggedIndex > currentSlideIndex && targetIndex <= currentSlideIndex)
    ) {
      // Adjust the current slide index based on the direction of movement
      const newCurrentIndex = draggedIndex < currentSlideIndex ? 
        currentSlideIndex - 1 : 
        currentSlideIndex + 1;
      
      setTimeout(() => {
        dispatch({
          type: 'set_current_slide',
          payload: newCurrentIndex
        });
      }, 200);
    }
    
    setDraggedIndex(null);
    setDropTargetIndex(null);
  };

  // Handle drag end (cleanup if dropped outside)
  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDropTargetIndex(null);
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
    <div className="h-full flex flex-col bg-white dark:bg-gray-800 transition-colors duration-200">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-medium text-gray-800 dark:text-white">Slides</h2>
      </div>
      
      {/* Slide list container */}
      <div 
        className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900 transition-colors duration-200"
        onDragOver={(e) => {
          e.preventDefault();
          e.dataTransfer.dropEffect = 'move';
          
          // Find the closest drop zone based on mouse position
          const container = e.currentTarget;
          const containerRect = container.getBoundingClientRect();
          const mouseY = e.clientY - containerRect.top;
          
          // Get all slide elements
          const slides = container.querySelectorAll('.slide-item');
          let closestDropZoneIndex = 0;
          
          // Find the closest drop zone by comparing with slide positions
          for (let i = 0; i < slides.length; i++) {
            const slideRect = slides[i].getBoundingClientRect();
            const slideMiddle = slideRect.top + (slideRect.height / 2) - containerRect.top;
            
            if (mouseY > slideMiddle) {
              closestDropZoneIndex = i + 1;
            }
          }
          
          setDropTargetIndex(closestDropZoneIndex);
        }}
        onDrop={(e) => {
          e.preventDefault();
          e.stopPropagation();
          
          if (draggedIndex === null || dropTargetIndex === null) return;
          
          // Calculate the actual target index
          let targetIndex = dropTargetIndex;
          if (dropTargetIndex > draggedIndex) {
            targetIndex -= 1;
          }
          
          // Don't reorder if dropping in the same position
          if (targetIndex === draggedIndex) {
            setDraggedIndex(null);
            setDropTargetIndex(null);
            return;
          }
          
          dispatch({
            type: 'reorder_slide',
            payload: { fromIndex: draggedIndex, toIndex: targetIndex }
          });
          
          setDraggedIndex(null);
          setDropTargetIndex(null);
        }}
      >
        <div className="flex flex-col relative">
          {/* First drop zone */}
          <div 
            className={`
              transition-all duration-200 ease-out
              ${dropTargetIndex === 0 && draggedIndex !== 0
                ? 'h-24 bg-blue-50 border border-blue-200 rounded-lg my-2' 
                : 'h-2 my-0'
              }
            `}
          >
            {dropTargetIndex === 0 && draggedIndex !== 0 && (
              <div className="h-full flex items-center justify-center">
                <div className="w-full border border-dashed border-blue-200 rounded m-2"></div>
              </div>
            )}
          </div>
          
          {slides.map((slide, index) => (
            <React.Fragment key={slide.id}>
            <div 
                className={`slide-item relative group border-2 ${
                index === currentSlideIndex ? 'border-blue-500' : 'border-gray-200 dark:border-gray-700'
                } rounded-lg bg-white overflow-hidden h-24 flex-shrink-0 select-none
                  ${draggedIndex === index ? 'opacity-20' : ''}`}
                draggable="true"
                onDragStart={(e) => handleDragStart(e, index)}
                onDragEnd={handleDragEnd}
            >
              {/* Slide number */}
              <div className="absolute top-1 left-1 bg-gray-100 dark:bg-gray-700 rounded-full w-5 h-5 flex items-center justify-center text-xs text-gray-600 dark:text-gray-300 select-none">
                {index + 1}
              </div>
              
              {/* Slide thumbnail */}
              <div 
                  className="h-full w-full select-none"
                onClick={() => setCurrentSlide(index)}
              >
                {renderSlideThumbnail(slide)}
              </div>
              
                {/* Action buttons */}
              <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 flex items-center space-x-1">
                <button
                  className="p-1 text-blue-500 hover:text-red-500 dark:text-gray-300"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteSlide(index);
                  }}
                  title="Delete slide"
                >
                  <Trash2 size={14} />
                </button>
                <button
                  className="p-1 text-blue-500 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                  onClick={(e) => {
                    e.stopPropagation();
                    duplicateSlide(index);
                  }}
                  title="Duplicate slide"
                >
                  <Copy size={14} />
                </button>
                <button
                  className="p-1 text-blue-500 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                  onClick={(e) => {
                    e.stopPropagation();
                    moveSlide(index, 'up');
                  }}
                  title="Move up"
                  disabled={index === 0}
                >
                  <ArrowUp size={14} />
                </button>
                <button
                  className="p-1 text-blue-500 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                  onClick={(e) => {
                    e.stopPropagation();
                    moveSlide(index, 'down');
                  }}
                  title="Move down"
                  disabled={index === slides.length - 1}
                >
                  <ArrowDown size={14} />
                </button>
              </div>
            </div>
              
              {/* Drop zone after each slide */}
              <div 
                className={`
                  transition-all duration-200 ease-out
                  ${dropTargetIndex === index + 1 && draggedIndex !== index && draggedIndex !== index + 1
                    ? 'h-24 bg-blue-50 border border-blue-200 rounded-lg my-2' 
                    : 'h-2 my-0'
                  }
                `}
              >
                {dropTargetIndex === index + 1 && draggedIndex !== index && draggedIndex !== index + 1 && (
                  <div className="h-full flex items-center justify-center">
                    <div className="w-full border border-dashed border-blue-200 rounded m-2"></div>
                  </div>
                )}
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
      
      {/* Add new slide button */}
      <div className="p-4 bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <button
          className="w-full flex items-center justify-center px-4 py-2 border border-blue-300 dark:border-gray-600 rounded-lg text-blue-500 dark:text-gray-300 bg-blue-50 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-gray-600 transition-colors duration-200"
          onClick={addNewSlide}
        >
          <Plus size={18} className="mr-2" />
          Add Slide
        </button>
      </div>
    </div>
  );
};

export default SlideNavigator;

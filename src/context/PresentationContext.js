import React, { createContext, useState, useContext } from 'react';

// Create context
const PresentationContext = createContext();

/**
 * PresentationProvider Component
 * 
 * A context provider for global state management in the Presentation Builder.
 * Handles slides state, editing state, and presentation metadata.
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components
 */
export function PresentationProvider({ children }) {
  // State for slides
  const [slides, setSlides] = useState([]);
  
  // State for current presentation
  const [currentPresentation, setCurrentPresentation] = useState({ 
    name: 'Untitled', 
    id: Date.now() 
  });
  
  // State for editing
  const [editingState, setEditingState] = useState({
    activeElement: null,  // id of the currently edited element
    activeType: null,     // type of editing (text, image, etc.)
    activeSlideIndex: null // index of slide being edited
  });
  
  // Add a new slide from template
  const addSlide = (template) => {
    const newSlide = {
      uniqueId: Date.now().toString(),
      type: template.type,
      title: template.defaultTitle || 'New Slide',
      content: template.defaultContent || '',
      images: {},
      // Add additional template-specific properties
      ...template.defaultProps
    };
    
    setSlides([...slides, newSlide]);
  };
  
  // Remove a slide
  const removeSlide = (index) => {
    const newSlides = [...slides];
    newSlides.splice(index, 1);
    setSlides(newSlides);
    
    // If the active slide was deleted or was after the deleted slide, update activeSlideIndex
    if (editingState.activeSlideIndex !== null) {
      if (editingState.activeSlideIndex === index) {
        // The active slide was deleted
        setEditingState({
          ...editingState,
          activeSlideIndex: null,
          activeElement: null,
          activeType: null
        });
      } else if (editingState.activeSlideIndex > index) {
        // Active slide was after the deleted slide
        setEditingState({
          ...editingState,
          activeSlideIndex: editingState.activeSlideIndex - 1
        });
      }
    }
  };
  
  // Update a slide
  const updateSlide = (index, field, value) => {
    const newSlides = [...slides];
    
    // If field is an object, we're updating multiple fields
    if (typeof field === 'object') {
      newSlides[index] = {
        ...newSlides[index],
        ...field
      };
    } else {
      // Update a single field
      newSlides[index] = {
        ...newSlides[index],
        [field]: value
      };
    }
    
    setSlides(newSlides);
  };
  
  // Move a slide
  const moveSlide = (index, direction) => {
    const newSlides = [...slides];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (newIndex < 0 || newIndex >= newSlides.length) return;
    
    const slideToMove = newSlides[index];
    newSlides.splice(index, 1);
    newSlides.splice(newIndex, 0, slideToMove);
    
    setSlides(newSlides);
    
    // Update activeSlideIndex if the active slide was moved
    if (editingState.activeSlideIndex === index) {
      setEditingState({
        ...editingState,
        activeSlideIndex: newIndex
      });
    } else if (editingState.activeSlideIndex === newIndex) {
      // If the active slide was the one being swapped with
      setEditingState({
        ...editingState,
        activeSlideIndex: index
      });
    }
  };
  
  // Duplicate a slide
  const duplicateSlide = (index) => {
    const slideToClone = slides[index];
    const newSlide = {
      ...JSON.parse(JSON.stringify(slideToClone)), // Deep clone
      uniqueId: Date.now().toString() // New unique ID
    };
    
    const newSlides = [...slides];
    newSlides.splice(index + 1, 0, newSlide);
    setSlides(newSlides);
  };
  
  // Start editing an element
  const startEditing = (slideIndex, elementId, type) => {
    setEditingState({
      activeSlideIndex: slideIndex,
      activeElement: elementId,
      activeType: type
    });
  };
  
  // Finish editing
  const finishEditing = (value) => {
    const { activeSlideIndex, activeElement, activeType } = editingState;
    
    if (activeSlideIndex !== null && activeElement !== null) {
      // For text elements, update the corresponding field
      if (activeType === 'text') {
        updateSlide(activeSlideIndex, activeElement, value);
      }
      // Other element types can be handled similarly
    }
    
    // Reset editing state
    setEditingState({
      activeSlideIndex: activeSlideIndex, // Keep active slide
      activeElement: null,
      activeType: null
    });
  };
  
  // Cancel editing
  const cancelEditing = () => {
    setEditingState({
      ...editingState,
      activeElement: null,
      activeType: null
    });
  };
  
  // Set active slide (without editing)
  const setActiveSlide = (index) => {
    setEditingState({
      ...editingState,
      activeSlideIndex: index
    });
  };
  
  return (
    <PresentationContext.Provider 
      value={{
        // State
        slides,
        currentPresentation,
        editingState,
        
        // Slide management
        addSlide,
        removeSlide,
        updateSlide,
        moveSlide,
        duplicateSlide,
        
        // Editing
        startEditing,
        finishEditing,
        cancelEditing,
        setActiveSlide,
        
        // Presentation management
        setCurrentPresentation
      }}
    >
      {children}
    </PresentationContext.Provider>
  );
}

// Custom hook for using the context
export function usePresentation() {
  return useContext(PresentationContext);
}

export default PresentationContext;
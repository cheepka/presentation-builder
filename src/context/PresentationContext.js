// PresentationContext.js
// Provides global state management for the presentation

import { createContext, useContext, useReducer } from 'react';
import { createSlideFromTemplate, TEMPLATE_TYPES } from '../utils/slideTemplates';

// Initial state
const initialState = {
  slides: [
    // Start with a default title slide
    createSlideFromTemplate(TEMPLATE_TYPES.TITLE)
  ],
  currentSlideIndex: 0,
  imageLibrary: [],
  knowledgeLibrary: [],
};

// Action types
export const ACTIONS = {
  ADD_SLIDE: 'add_slide',
  UPDATE_SLIDE: 'update_slide',
  DELETE_SLIDE: 'delete_slide',
  REORDER_SLIDE: 'reorder_slide',
  SET_CURRENT_SLIDE: 'set_current_slide',
  ADD_IMAGE: 'add_image',
  REMOVE_IMAGE: 'remove_image',
  ADD_KNOWLEDGE: 'add_knowledge',
  REMOVE_KNOWLEDGE: 'remove_knowledge',
};

// Reducer function
function presentationReducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD_SLIDE:
      const newSlide = action.payload;
      return {
        ...state,
        slides: [...state.slides, newSlide],
        currentSlideIndex: state.slides.length,
      };
      
    case ACTIONS.UPDATE_SLIDE:
      const { index, field, value } = action.payload;
      
      // Create a copy of the slides array for immutability
      const updatedSlides = [...state.slides];
      
      // Update the specific field in the slide at the specified index
      updatedSlides[index] = {
        ...updatedSlides[index],
        [field]: value,
      };
      
      return {
        ...state,
        slides: updatedSlides,
      };
      
    case ACTIONS.DELETE_SLIDE:
      // Don't allow deleting if there's only one slide left
      if (state.slides.length <= 1) {
        return state;
      }
      
      const deleteIndex = action.payload;
      const remainingSlides = state.slides.filter((_, i) => i !== deleteIndex);
      
      // Adjust the currentSlideIndex if needed
      let newCurrentSlideIndex = state.currentSlideIndex;
      if (deleteIndex <= state.currentSlideIndex) {
        newCurrentSlideIndex = Math.max(0, state.currentSlideIndex - 1);
      }
      
      return {
        ...state,
        slides: remainingSlides,
        currentSlideIndex: newCurrentSlideIndex,
      };
      
    case ACTIONS.REORDER_SLIDE:
      const { fromIndex, toIndex } = action.payload;
      const reorderedSlides = [...state.slides];
      const [movedSlide] = reorderedSlides.splice(fromIndex, 1);
      reorderedSlides.splice(toIndex, 0, movedSlide);
      
      // Adjust currentSlideIndex if the current slide was moved or if the order affects its position
      let adjustedCurrentIndex = state.currentSlideIndex;
      if (state.currentSlideIndex === fromIndex) {
        // Current slide was moved
        adjustedCurrentIndex = toIndex;
      } else if (
        (fromIndex < state.currentSlideIndex && toIndex >= state.currentSlideIndex) ||
        (fromIndex > state.currentSlideIndex && toIndex <= state.currentSlideIndex)
      ) {
        // Movement affects current slide index
        adjustedCurrentIndex = 
          fromIndex < state.currentSlideIndex 
            ? state.currentSlideIndex - 1 
            : state.currentSlideIndex + 1;
      }
      
      return {
        ...state,
        slides: reorderedSlides,
        currentSlideIndex: adjustedCurrentIndex,
      };
      
    case ACTIONS.SET_CURRENT_SLIDE:
      return {
        ...state,
        currentSlideIndex: action.payload,
      };
      
    case ACTIONS.ADD_IMAGE:
      return {
        ...state,
        imageLibrary: [...state.imageLibrary, action.payload],
      };
      
    case ACTIONS.REMOVE_IMAGE:
      return {
        ...state,
        imageLibrary: state.imageLibrary.filter(img => img.id !== action.payload),
      };
      
    case ACTIONS.ADD_KNOWLEDGE:
      return {
        ...state,
        knowledgeLibrary: [...state.knowledgeLibrary, action.payload],
      };
      
    case ACTIONS.REMOVE_KNOWLEDGE:
      return {
        ...state,
        knowledgeLibrary: state.knowledgeLibrary.filter(item => item.id !== action.payload),
      };
      
    default:
      return state;
  }
}

// Create context
const PresentationContext = createContext();

// Provider component
export function PresentationProvider({ children }) {
  const [state, dispatch] = useReducer(presentationReducer, initialState);
  
  return (
    <PresentationContext.Provider value={{ state, dispatch }}>
      {children}
    </PresentationContext.Provider>
  );
}

// Custom hook for using the context
export function usePresentation() {
  const context = useContext(PresentationContext);
  if (!context) {
    throw new Error('usePresentation must be used within a PresentationProvider');
  }
  return context;
}

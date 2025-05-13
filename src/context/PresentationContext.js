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
};

// Reducer function
function presentationReducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD_SLIDE:
      return {
        ...state,
        slides: [...state.slides, action.payload],
        currentSlideIndex: state.slides.length, // Set the new slide as current
      };
      
    case ACTIONS.UPDATE_SLIDE:
      return {
        ...state,
        slides: state.slides.map((slide, index) => 
          index === action.payload.index ? action.payload.slide : slide
        ),
      };
      
    case ACTIONS.DELETE_SLIDE:
      // Handle new current slide index after deletion
      let newIndex = state.currentSlideIndex;
      if (state.slides.length > 1) {
        if (action.payload === state.currentSlideIndex) {
          // If deleting current slide, move to previous (or next if it's the first slide)
          newIndex = action.payload === 0 ? 0 : action.payload - 1;
        } else if (action.payload < state.currentSlideIndex) {
          // If deleting a slide before the current, adjust the index
          newIndex = state.currentSlideIndex - 1;
        }
      } else {
        newIndex = 0;
      }

      return {
        ...state,
        slides: state.slides.filter((_, index) => index !== action.payload),
        currentSlideIndex: newIndex,
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

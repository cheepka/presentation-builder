# Presentation Builder Refactoring Plan

This document outlines the structured approach for refactoring the Presentation Builder application from a monolithic component architecture to a modular component structure. This plan addresses Issue #3 and sets up the foundation for implementing future features.

## Current Status Review

### Image Upload Implementation (Issue #1)
The image upload functionality appears to be mostly complete, with the following status:

**Working Features:**
- ImageUpload component handles file selection, preview, and removal
- Integration with slide editor modal
- Storage of image data in slide objects
- Display of uploaded images in slide previews

**Improvement Areas:**
- Image size validation and optimization
- Better error handling for uploads
- Memory management for object URLs
- Consistent placeholder implementation

### Monolithic Architecture Issues
The current App.js file:
- Is over 1,000 lines of code
- Manages multiple concerns (UI, state, business logic)
- Has limited separation of concerns
- Makes testing and extension difficult

## Proposed Component Structure

```
src/
├── components/
│   ├── App.js                    # Main application container
│   ├── Header.js                 # Application header with title and actions
│   ├── layout/
│   │   └── ThreeColumnLayout.js  # Main layout component
│   ├── templates/
│   │   ├── TemplateLibrary.js    # Library of slide templates
│   │   └── TemplateItem.js       # Individual template option
│   ├── slides/
│   │   ├── SlideList.js          # List of slides with reordering options
│   │   ├── SlideListItem.js      # Individual slide in the list
│   │   └── SlidePreview.js       # Preview of all slides
│   ├── editor/
│   │   ├── SlideEditor.js        # Modal for editing slide content
│   │   ├── TextEditor.js         # Text editing controls
│   │   ├── BulletPointEditor.js  # Bullet point editing functionality
│   │   └── ImageEditor.js        # Image selection/upload controls
│   └── slideTypes/               # Components for each slide type
│       ├── FullImageSlide.js
│       ├── RightImageSlide.js
│       ├── LeftImageSlide.js
│       ├── RightGridSlide.js
│       ├── ImageGridSlide.js
│       ├── SplitVerticalSlide.js
│       └── FourGridSlide.js
├── hooks/                        # Custom hooks 
│   ├── useSlideManagement.js     # Hooks for slide CRUD operations
│   └── useLocalStorage.js        # Hook for saving/loading from localStorage
├── context/                      # Context providers
│   └── PresentationContext.js    # Global state management
└── utils/                        # Utility functions
    ├── slideTemplates.js         # Template definitions and defaults
    └── imageUtils.js             # Image processing utilities
```

## State Management Approach

We'll implement a Context API-based state management system:

```javascript
// PresentationContext.js
import React, { createContext, useState, useContext } from 'react';

const PresentationContext = createContext();

export function PresentationProvider({ children }) {
  const [slides, setSlides] = useState([/* initial slides */]);
  const [currentPresentation, setCurrentPresentation] = useState({ name: 'Untitled', id: Date.now() });
  
  // Slide management functions
  const addSlide = (template) => {/* implementation */};
  const removeSlide = (index) => {/* implementation */};
  const updateSlide = (index, data) => {/* implementation */};
  const moveSlide = (index, direction) => {/* implementation */};
  
  return (
    <PresentationContext.Provider value={{
      slides,
      currentPresentation,
      addSlide,
      removeSlide,
      updateSlide,
      moveSlide,
      setCurrentPresentation
    }}>
      {children}
    </PresentationContext.Provider>
  );
}

// Custom hook for using the context
export function usePresentation() {
  return useContext(PresentationContext);
}
```

## Component Responsibilities

1. **App.js**: Overall application structure and routing (if added later)
2. **TemplateLibrary.js**: Display template options and handle template selection
3. **SlideList.js**: Display and manage the list of slides, handle reordering
4. **SlidePreview.js**: Render all slides with their correct templates
5. **SlideEditor.js**: Modal with form controls for editing a selected slide
6. **Slide Type Components**: Render specific slide layouts based on type

## Implementation Strategy

### Phase 1: Extract Data and Utilities
1. Move template definitions to slideTemplates.js
2. Create image utility functions in imageUtils.js
3. Set up the context provider structure

### Phase 2: Core Component Extraction
1. Extract Header component
2. Create ThreeColumnLayout component
3. Implement the slide type components
4. Create the SlideList and SlideListItem components

### Phase 3: Editor Refactoring
1. Extract SlideEditor component
2. Create specialized editor sub-components
3. Connect editor with context

### Phase 4: Integration
1. Update App.js to use the new component structure
2. Ensure all features work with the new architecture
3. Add proper prop-types validation
4. Implement memoization for performance

### Phase 5: Save/Load Implementation
1. Create useLocalStorage hook for persistence
2. Add save/load UI elements
3. Implement presentation management features

## Benefits of Refactoring

1. **Improved Maintainability**: Smaller components are easier to understand and update
2. **Better Testing**: Components with clear responsibilities are easier to test in isolation
3. **Enhanced Reusability**: Components can be reused in different contexts
4. **Easier Feature Extensions**: Adding new features becomes simpler with modular code
5. **Performance Improvements**: More targeted re-renders with proper component boundaries

## Implementation Timeline

| Phase | Estimated Effort | Key Deliverables |
|-------|-----------------|------------------|
| 1     | 2-3 hours       | Context and utilities |
| 2     | 4-5 hours       | Core component structure |
| 3     | 3-4 hours       | Editor components |
| 4     | 2-3 hours       | Integration and testing |
| 5     | 4-5 hours       | Save/load functionality |

## Testing Strategy

1. Create unit tests for individual components
2. Implement integration tests for key user flows
3. Add snapshot tests for UI components
4. Test edge cases for slide management

## Pull Request Plan

We'll implement this refactoring in multiple PRs:

1. PR #1: Context and Utilities Setup
2. PR #2: Core Components Implementation
3. PR #3: Editor Refactoring
4. PR #4: Integration and Cleanup
5. PR #5: Save/Load Functionality

This approach allows for incremental review and integration while maintaining a working application throughout the refactoring process.

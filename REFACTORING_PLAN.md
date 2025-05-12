# Presentation Builder Refactoring Plan (Updated)

This document outlines the revised approach for refactoring the Presentation Builder application, incorporating the UI redesign detailed in [UI_REDESIGN_PLAN.md](https://github.com/cheepka/presentation-builder/blob/feature/ui-redesign/UI_REDESIGN_PLAN.md).

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

### UI Design Issues
- Two separate panels (Template Library and Slides) with some redundant functionality
- Modal-based editing that interrupts workflow
- Lack of direct interaction with slide content

## Revised Component Structure

```
src/
├── components/
│   ├── App.js                       # Main application container
│   ├── Header.js                    # Application header with title and actions
│   ├── layout/
│   │   └── TwoPanelLayout.js        # Updated layout with two panels instead of three
│   ├── slideLibrary/
│   │   ├── SlideLibrary.js          # Simplified library of slide templates
│   │   └── TemplateItem.js          # Individual template option
│   ├── slideEditor/
│   │   ├── EditableSlide.js         # Slide with direct editing capabilities
│   │   ├── EditableText.js          # Text with inline editing functionality
│   │   ├── EditableBulletList.js    # Bullet list with inline editing functionality
│   │   ├── UploadableImage.js       # Image area with direct upload capabilities
│   │   └── SlideControls.js         # Controls for slide management (move, delete)
│   └── slideTypes/                  # Components for each slide type
│       ├── FullImageSlide.js
│       ├── RightImageSlide.js
│       ├── LeftImageSlide.js
│       ├── RightGridSlide.js
│       ├── ImageGridSlide.js
│       ├── SplitVerticalSlide.js
│       └── FourGridSlide.js
├── hooks/                           # Custom hooks 
│   ├── useSlideManagement.js        # Hooks for slide CRUD operations
│   ├── useEditableText.js           # Hook for handling inline text editing
│   ├── useBulletListEditing.js      # Hook for managing inline bullet point editing
│   ├── useImageUpload.js            # Hook for handling direct image uploads
│   └── useLocalStorage.js           # Hook for saving/loading from localStorage
├── context/                         # Context providers
│   └── PresentationContext.js       # Global state management
└── utils/                           # Utility functions
    ├── slideTemplates.js            # Template definitions and defaults
    └── imageUtils.js                # Image processing utilities
```

## State Management Approach

We'll implement a Context API-based state management system with additional state for handling inline editing:

```javascript
// PresentationContext.js
import React, { createContext, useState, useContext } from 'react';

const PresentationContext = createContext();

export function PresentationProvider({ children }) {
  const [slides, setSlides] = useState([/* initial slides */]);
  const [currentPresentation, setCurrentPresentation] = useState({ name: 'Untitled', id: Date.now() });
  const [editingState, setEditingState] = useState({
    activeElement: null,  // id of the currently edited element
    activeType: null,     // type of editing (text, bullet, image, etc.)
    activeSlideIndex: null, // index of slide being edited
  });
  
  // Slide management functions
  const addSlide = (template) => {/* implementation */};
  const removeSlide = (index) => {/* implementation */};
  const updateSlide = (index, data) => {/* implementation */};
  const moveSlide = (index, direction) => {/* implementation */};
  
  // Direct editing functions
  const startEditing = (elementId, type, slideIndex) => {/* implementation */};
  const finishEditing = (newValue) => {/* implementation */};
  const cancelEditing = () => {/* implementation */};
  
  // Bullet list specific functions
  const addBulletPoint = (slideIndex, afterIndex) => {/* implementation */};
  const removeBulletPoint = (slideIndex, bulletIndex) => {/* implementation */};
  const moveBulletPoint = (slideIndex, bulletIndex, direction) => {/* implementation */};
  
  return (
    <PresentationContext.Provider value={{
      slides,
      currentPresentation,
      editingState,
      addSlide,
      removeSlide,
      updateSlide,
      moveSlide,
      startEditing,
      finishEditing,
      cancelEditing,
      addBulletPoint,
      removeBulletPoint,
      moveBulletPoint,
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

1. **App.js**: Overall application structure
2. **SlideLibrary.js**: Display template options for adding to the presentation
3. **EditableSlide.js**: Container for slide content with direct editing capabilities
4. **EditableText.js**: Text component that can be edited inline (for all text elements)
5. **EditableBulletList.js**: Component for inline bullet point editing with add/remove controls
6. **UploadableImage.js**: Image component with direct upload functionality
7. **SlideControls.js**: Controls for slide management (up, down, delete)
8. **Slide Type Components**: Render specific slide layouts using editable components

## Revised Implementation Strategy

### Phase 1: Extract Data and Utilities
1. Move template definitions to slideTemplates.js
2. Create image utility functions in imageUtils.js
3. Set up the context provider structure with inline editing support

### Phase 2: Core Component Extraction
1. Extract Header component
2. Create TwoPanelLayout component (replacing ThreeColumnLayout)
3. Create the new SlideLibrary component (simplified from TemplateLibrary)
4. Implement the base editable components:
   - EditableText (for all text including titles, paragraphs)
   - EditableBulletList (for bullet point lists with inline editing)
   - UploadableImage (for direct image uploads)
   - SlideControls (for slide management)

### Phase 3: Slide Type Implementation
1. Create EditableSlide as a base component
2. Implement each slide type using editable components:
   - FullImageSlide
   - RightImageSlide
   - LeftImageSlide
   - RightGridSlide
   - ImageGridSlide
   - SplitVerticalSlide
   - FourGridSlide

### Phase 4: Integration
1. Update App.js to use the new component structure
2. Implement direct editing interactions for all element types
3. Ensure bullet point editing works seamlessly inline
4. Connect slide controls to slide management functions
5. Ensure all features work with the new architecture

### Phase 5: Save/Load Implementation
1. Create useLocalStorage hook for persistence
2. Add save/load UI elements in the header
3. Implement presentation management features

## Benefits of the Revised Approach

1. **Improved User Experience**: Fully direct interaction with all slide content
2. **Streamlined Workflow**: Complete elimination of modal dialogs for editing
3. **Simplified Interface**: Two-panel design instead of three panels
4. **Consistent Editing Model**: All elements (text, bullets, images) follow the same direct-editing pattern
5. **All Previous Benefits**: Maintainability, testability, reusability, etc.

## Implementation Timeline

| Phase | Estimated Effort | Key Deliverables |
|-------|-----------------|------------------|
| 1     | 2-3 hours       | Context and utilities |
| 2     | 5-6 hours       | Core editable components |
| 3     | 4-5 hours       | Slide type implementations |
| 4     | 3-4 hours       | Integration and testing |
| 5     | 4-5 hours       | Save/load functionality |

## Testing Strategy

1. Create unit tests for individual components
2. Test inline editing interactions for all element types
3. Test bullet point addition, removal, and editing
4. Test image upload functionality
5. Test slide management with the new controls
6. Ensure keyboard accessibility

## Pull Request Plan

We'll implement this refactoring in multiple PRs:

1. PR #1: Context and Utilities Setup
2. PR #2: Core Editable Components
3. PR #3: Slide Type Implementation
4. PR #4: Integration and Testing
5. PR #5: Save/Load Functionality

All changes will be implemented in the `feature/ui-redesign` branch for thorough testing before merging to main.

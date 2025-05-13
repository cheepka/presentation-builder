# UI Redesign Implementation Documentation

This document provides a comprehensive guide to the UI redesign implementation for the Presentation Builder project. It describes the component architecture, key implementation details, and important considerations for future development.

## Architecture Overview

### Layout Components
- **TwoPanelLayout**: Main layout with header, left panel (Slide Library), and right panel (Preview)
- **Header**: Application header with title and action buttons

### Core Components
- **EditableText**: Universal component for inline text editing
- **UploadableImage**: Component for direct image uploads with drag-and-drop support
- **SlideControls**: Controls for slide management (up, down, delete, duplicate)
- **SlideLibrary**: Simplified sidebar showing available templates and current slides
- **EditableSlide**: Base component for all slide types with unified editing capabilities

### Slide Type Components
- **FullImageSlide**: Full-screen background image with overlay text
- **RightImageSlide**: Text on left, image on right
- **LeftImageSlide**: Image on left, text and bullet points on right
- **RightGridSlide**: Text on left, three images in grid on right
- **SplitVerticalSlide**: Text on left, two vertically stacked images on right
- **ImageGridSlide**: 3x3 grid of images with optional title overlay
- **FourGridSlide**: 2x2 grid of images with optional title overlay

### State Management
- **PresentationContext**: Global context provider for application state
- Manages slides, editing state, and presentation metadata
- Provides functions for slide operations (add, remove, update, move, duplicate)

### Utility Modules
- **slideTemplates.js**: Definitions for all slide templates
- **imageUtils.js**: Utilities for image processing and optimization

## Key Implementation Details

### Direct Editing Approach
All content is directly editable in-place without modal dialogs:
- Text elements become editable on click
- Images are uploadable by clicking or drag-and-drop
- Slide management controls are directly accessible

### Z-Index Layering (Important!)
Particularly in FullImageSlide:
- Image background: z-index: 0
- Darkening overlay: z-index: 10 (with pointer-events-none)
- Text content: z-index: 20 (with pointer-events-none on container, pointer-events-auto on editable elements)

### Image Handling
Critical for correct operation:
- Always preserve the entire images object when updating a single position
- Use position identifiers (e.g., 'main', 'grid1', 'top') to track multiple images
- Handle image removal by deleting the specific position from the images object

### User Interactions
- Text editing triggered by click, completed on blur or Enter
- Image uploads triggered by click or drag-and-drop
- Slide management via explicit control buttons

## Technical Challenges & Solutions

### Preventing Z-Index Issues
- Text overlays must be higher z-index than images
- Darkening overlays must use pointer-events-none
- Editable elements need pointer-events-auto to receive clicks

### Maintaining Image State
- Grid layouts require preserving multiple image states
- Image state must be updated without resetting other images
- Position identifiers must be consistent throughout the application

### Supporting Multiple Editing Modes
- Text elements need direct focus handling
- Images need both click and drag-and-drop support
- Controls need proper event propagation handling

## Future Development Considerations

### Planned Enhancements
- Drag-and-drop slide reordering
- Export to PDF/PowerPoint
- Custom theming support
- Collaborative editing

### Technical Debt
- Consider additional performance optimizations for image handling
- Further componentization of text editing functionality
- Implement more robust error handling for edge cases

### Testing Priorities
- Full testing of all slide types and interactions
- Cross-browser compatibility testing
- Keyboard accessibility testing
- Mobile responsiveness testing

## Common Issues & Troubleshooting

### Image Upload Issues
- If images don't appear, check console for object URL errors
- Ensure image state is being properly preserved in the slide object
- Verify image position identifiers are consistent

### Text Editing Problems
- If text isn't editable, check for z-index or pointer-event issues
- Verify EditableText component is receiving correct props
- Ensure event propagation isn't being blocked

### Layout Rendering Issues
- If layout appears broken, check container CSS, especially flex properties
- Verify z-index stacking contexts
- Check for pointer-events settings that may block interactions

---

This document will be updated as the implementation progresses. For questions or clarification, please refer to the GitHub issues or contact the development team.
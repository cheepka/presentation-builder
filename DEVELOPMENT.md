# Development Documentation

## Project Overview
The Presentation Builder is a web-based application that allows users to create customizable presentations with various slide templates. It is built with React and styled with Tailwind CSS, focusing on a clean, intuitive interface.

## Current Development Status
As of May 13, 2025, we have implemented a complete refactoring of the application in the `feature/rebuild-optimized` branch. This refactoring addresses bugs in the previous implementation and improves the overall architecture.

### Implemented Features
- **Centralized State Management**: Using React Context API with a reducer pattern
- **Three-Panel Layout**:
  - Left panel: Slide navigator with slide thumbnails and controls (PowerPoint/Keynote style)
  - Center panel: Active slide editor showing the current slide
  - Right panel: Tools section with accordion menus for image library and slide templates
- **Slide Management**:
  - Adding slides from templates
  - Deleting slides
  - Duplicating slides
  - Reordering slides
  - Selecting current slide for editing
- **Image Library**:
  - Image upload functionality
  - Library storage of images for reuse across slides
  - Basic image management (viewing/deleting)
- **Slide Templates**:
  - Seven different slide layouts (Title, Full Image, Text with Left/Right Image, etc.)
  - Visual representation of templates
  - Easy template selection
- **Inline Text Editing**:
  - Click-to-edit functionality for all text elements
  - Support for titles, subtitles, and bullet points
  - Keyboard shortcuts for saving (Enter) and canceling (Escape)
  - Visual feedback for editable elements
  - See `docs/INLINE_TEXT_EDITING.md` for detailed documentation

### Pending Features
- **Advanced Editing**:
  - Rich text formatting for text content
  - Direct image manipulation and replacement
- **Drag and Drop**:
  - Full drag-and-drop support for slides in the navigator
  - Drag-and-drop from image library to slide content
- **Save/Load Functionality**:
  - Saving presentations to local storage
  - Loading saved presentations
  - Export functionality
- **Advanced Features**:
  - Presentation mode
  - Multiple presentation management
  - Additional slide customization options

## Architecture
The application follows a component-based architecture with careful separation of concerns:

### State Management
- `PresentationContext.js`: Provides global state and actions via React Context and useReducer
- Actions defined for all slide and image operations
- Immutable state updates to prevent bugs

### Component Structure
- Core Layout:
  - `App.js`: Main application component
  - `Header.js`: Application header with actions
  - `MainLayout.js`: Three-panel layout manager
  - `Accordion.js`: Collapsible section component for the right panel

- Left Panel:
  - `SlideNavigator.js`: Manages the slide list and operations

- Center Panel:
  - `SlideEditor.js`: Displays and handles editing of the current slide
  - `EditableText.js`: Provides inline text editing functionality

- Right Panel:
  - `RightPanel.js`: Organizes tools into accordion sections
  - `ImageLibrary.js`: Manages uploaded images
  - `TemplateLibrary.js`: Displays available slide templates

### Utilities
- `slideTemplates.js`: Defines slide types and template creation
- `imageUtils.js`: Provides image handling functionality

## Known Issues
The current implementation is a working framework with basic editing capabilities. It still lacks more advanced features like rich text formatting and drag-and-drop.

## Next Development Steps
1. Add drag-and-drop functionality for images
2. Develop rich text formatting capabilities
3. Implement save/load functionality
4. Add presentation export features

## Development Guidelines
- Use functional components with React hooks
- Maintain clean separation of concerns
- Follow existing naming conventions
- Keep components small and focused
- Use the reducer pattern for all state changes
- Implement proper error handling
- Add detailed comments for complex logic

## Testing Guidelines
- Test all state transitions
- Verify proper slide management
- Test image uploads with various file types
- Ensure consistent behavior across browsers
- Verify that slide content is properly maintained when navigating
- Test text editing functionality across all slide types

## File Structure
```
src/
├── components/             # React components
│   ├── EditableText.js     # Text editing component
│   ├── Header.js           # Application header
│   ├── ImageLibrary.js     # Image upload and management
│   ├── RightPanel.js       # Right panel with accordions
│   ├── SlideEditor.js      # Current slide editor
│   ├── SlideNavigator.js   # Left panel slide management
│   ├── TemplateLibrary.js  # Slide template selection
│   └── layout/             # Layout components
│       ├── Accordion.js    # Collapsible panel component
│       └── MainLayout.js   # Three-panel layout structure
├── context/                # Context providers
│   └── PresentationContext.js # Global state management
├── utils/                  # Utility functions
│   ├── imageUtils.js       # Image handling utilities
│   └── slideTemplates.js   # Slide template definitions
├── App.js                  # Main application component
├── index.css               # Global styles
└── index.js                # Application entry point
```

## Documentation
Additional documentation is available in the `docs/` directory:
- `INLINE_TEXT_EDITING.md`: Details about the text editing implementation

# Changelog

All notable changes to the Presentation Builder project will be documented in this file.

## [0.2.0] - 2025-05-12

### Added
- Image upload functionality:
  - Clean, minimalist image upload component
  - Support for uploading different images based on template type
  - Image preview in editing modal
  - Remove/replace options for uploaded images
  - Simple gray placeholders for empty image slots
- Toggle option to hide title overlays in image grid templates
  - Image-only grid templates (9-grid and 4-grid) now default to no title overlay
  - Option to toggle title display in slide editor

### Changed
- Enhanced slide data structure to store image information
- Improved edit modal with dedicated image upload section
- Updated slide templates to use uploaded images when available
- Simplified UI with cleaner placeholders and more intuitive controls

## [0.1.0] - 2025-05-12

### Added
- Initial project structure with React and Tailwind CSS
- Seven slide template types:
  - Full Image with Title
  - Text + Right Image
  - Text + Left Image
  - Text + Triple Image
  - 9-Image Grid
  - Text + Dual Image
  - 4-Image Grid
- Slide management functionality:
  - Add slides from template library
  - Remove slides
  - Reorder slides with up/down controls
- Slide content editing:
  - Edit text content
  - Edit bullet points (add, remove, modify)
  - Edit attribution
- Visual preview of all slide layouts
- Responsive layout with three-panel design

### Technical Notes
- Using placeholder colors for image placeholders
- Single-component architecture with state management
- Tailwind CSS for styling

## Future Planned Enhancements
- Save/load presentations
- Export to PDF/PowerPoint
- User authentication
- Component modularization
- Additional slide templates
- Drag and drop slide reordering
- Media embedding (videos, interactive elements)
- Custom theming support
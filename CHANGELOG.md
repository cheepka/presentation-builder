# Changelog

All notable changes to the Presentation Builder project will be documented in this file.

## [0.2.0] - 2025-05-12

### Added
- Image upload functionality:
  - Custom `ImageUpload` component for file selection and preview
  - Support for uploading different images based on template type
  - Image preview in editing modal
  - Remove/replace options for uploaded images
  - Automatic placeholder fallback

### Changed
- Enhanced slide data structure to store image information
- Improved edit modal with dedicated image upload section
- Updated slide templates to use uploaded images when available

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
- Using placeholder.com for image placeholders
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
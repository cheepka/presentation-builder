# Project Roadmap & Notes

This document contains project planning notes, feature ideas, and development decisions for the Presentation Builder project.

## Architectural Decisions

### Single Component vs. Modular Approach
- **Current Implementation**: Single component architecture for simplicity in initial version
- **Future Direction**: Modularize into separate components:
  - TemplateLibrary
  - SlideManager
  - SlidePreview
  - EditModal
  - Individual slide type components

### State Management
- **Current Implementation**: React useState hooks
- **Future Consideration**: Context API or Redux for more complex state requirements

### Image Handling
- **Current Implementation**: Placeholder images via placeholder.com
- **Decision**: Used placeholders to focus on core functionality first
- **Next Steps**: Implement file upload with preview and storage

## Feature Prioritization

### High Priority (For v0.2.0)
1. Image upload functionality
2. Save/load presentations to local storage
3. Responsive design improvements

### Medium Priority (For v0.3.0)
1. Export functionality (PDF, PNG)
2. Additional slide templates
3. Component modularization

### Low Priority (Future Versions)
1. User authentication
2. Cloud storage integration
3. Collaborative editing
4. Custom themes

## Design Decisions

### Layout
- Three-panel layout chosen for intuitive workflow:
  - Left: Template library for easy access
  - Center: Slide management for organization
  - Right: Preview for immediate visual feedback

### Styling
- Using Tailwind CSS for rapid development
- Dark sidebar with light content area for visual separation
- Modal editing interface to focus user attention

## Technical Notes

### Placeholder Images
- Using placeholder.com with specific dimensions matching the design requirements
- Will need to implement proper image handling with optimization

### Slide Templates
- Each template type has specific properties and layout structure
- Template data structure designed to be extensible

## Future Enhancements - Detailed Notes

### Image Upload
- Need to implement file input component
- Add image processing for optimization
- Consider using object URLs for preview
- Update image references in slide objects

### Save/Load
- Implement local storage serialization
- Add presentation naming functionality
- Create presentation management interface

### Export Options
- Research HTML to PDF/PNG conversion options
- Consider using html2canvas for screenshots
- Investigate PowerPoint export libraries
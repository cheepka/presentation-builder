# UI Redesign Plan

This document outlines the plans for redesigning the Presentation Builder UI to create a more streamlined user experience.

## Current UI Issues
- Two separate menus (Template Library and Slides) with redundant functionality
- Modal-based editing disrupts workflow
- Complex image upload process
- Limited direct interaction with slides

## Proposed Changes

### 1. Streamlined Sidebar
- Rename "Template Library" to "Slide Library"
- Focus solely on displaying available slide templates
- Remove the separate "Slides" panel
- Maintain the same template options:
  - Full Image with Title
  - Text + Right Image
  - Text + Left Image
  - Text + Triple Image
  - 9-Image Grid
  - Text + Dual Image
  - 4-Image Grid

### 2. Direct Slide Editing
- Enable 100% direct inline editing of all slide content
- When clicking on any text element (including titles, paragraphs, and bullet points):
  - Make text directly editable in place
  - Apply changes in real-time as the user types
- Replace all modal editors with in-place editing
- For bullet points:
  - Allow direct inline editing of each bullet point by clicking on it
  - Show add/remove bullet controls directly within the slide when editing
  - Allow direct manipulation of bullet order
- Apply changes immediately without confirmation dialogs

### 3. Improved Image Handling
- Make entire image placeholder areas clickable for upload
- Show upload indicator/overlay on hover
- Allow direct drag-and-drop of images onto placeholders
- Provide immediate visual feedback when an image is selected
- Maintain the ability to remove/replace images

### 4. Slide Management Controls
- Add slide control buttons in the area where "Edit Content" currently appears
- Include the following controls for each slide:
  - Move Up
  - Move Down
  - Delete
  - (Optional) Duplicate
- Consider adding drag-and-drop reordering in a future update

## Implementation Approach

### Phase 1: Component Structure Updates
1. Create new SlideLibrary component (simplified from current TemplateLibrary)
2. Create EditableSlide component with direct editing capabilities
3. Create EditableText component for all inline text editing (titles, paragraphs, bullet points)
4. Create EditableBulletList component for inline bullet point editing
5. Create UploadableImage component for direct image uploads
6. Create SlideControls component for slide management

### Phase 2: Layout Changes
1. Update main layout to use a two-panel design instead of three panels
2. Left panel: Slide Library
3. Right panel: Slide Preview with direct editing
4. Update styling to maintain visual consistency

### Phase 3: Interaction Implementation
1. Implement direct text editing for all text elements using focus/blur events
2. Implement inline bullet point editing with add/remove functionality
3. Implement clickable image areas with upload functionality
4. Implement slide management controls
5. Add appropriate hover states and visual indicators

### Phase 4: Testing & Refinement
1. Test all interactions for usability
2. Optimize for different screen sizes
3. Ensure keyboard accessibility
4. Refine visual design and interactions based on testing

## Technical Considerations

### State Management
- Update state management to handle direct editing of all elements
- Track focus state for editable elements
- Maintain slide order state for reordering

### Performance
- Optimize rendering to prevent unnecessary rerenders
- Use memoization for slide components
- Implement proper cleanup for event listeners

### Accessibility
- Ensure keyboard navigation works for all controls
- Add appropriate ARIA attributes for editable regions
- Provide clear focus indicators

## Expected Benefits
- More intuitive user experience
- Faster slide creation and editing
- Reduced context switching
- More direct interaction with content
- Cleaner, more modern interface

## Mockup
```
+--------------------+----------------------------------------------+
|                    |                                              |
|   Slide Library    |                                              |
|                    |                                              |
| +--------------+   |                                              |
| | Full Image   |   |          Directly Editable                   |
| | with Title   |   |          Slide Content                       |
| +--------------+   |                                              |
|                    |                                              |
| +--------------+   |          +---------------------------+       |
| | Text + Right |   |          |                           |       |
| | Image        |   |          |  Clickable Image Area     |       |
| +--------------+   |          |  (Upload on Click)        |       |
|                    |          |                           |       |
| +--------------+   |          +---------------------------+       |
| | Text + Left  |   |                                              |
| | Image        |   |          • Directly Editable Bullet          |
| +--------------+   |          • Click to Edit Any Bullet          |
|                    |          • Add/Remove Controls Inline        |
| +--------------+   |                                              |
| | Text + Triple|   |                              +-----------+   |
| | Image        |   |                              | Up  Down  |   |
| +--------------+   |                              | Del Dupl  |   |
|                    |                              +-----------+   |
+--------------------+----------------------------------------------+
```

This plan will be implemented incrementally to ensure the application remains functional throughout the redesign process.

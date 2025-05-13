# Presentation Builder

A web-based application for creating customizable presentations with various slide templates. Built with React and styled with Tailwind CSS.

## Features

- Create presentations with seven different slide layouts:
  - Full Image with Title
  - Text + Right Image
  - Text + Left Image
  - Text + Triple Image (Right Grid)
  - 9-Image Grid
  - Text + Dual Image (Split Vertical)
  - 4-Image Grid

- Direct slide management:
  - Add, duplicate, and remove slides
  - Reorder slides with move up/down controls
  - View presentation preview

- Image management:
  - Upload images to a central library
  - Reuse images across multiple slides

## Project Structure

The application follows a modular component architecture:

```
src/
├── components/              # React components
│   ├── Header.js            # Application header
│   ├── ImageLibrary.js      # Image upload and library management
│   ├── RightPanel.js        # Right panel with accordions
│   ├── SlideEditor.js       # Slide editing component
│   ├── SlideNavigator.js    # Left panel slide navigation
│   ├── TemplateLibrary.js   # Slide template selection
│   └── layout/              # Layout components
│       ├── Accordion.js     # Collapsible accordion component
│       └── MainLayout.js    # Three-panel layout structure
├── context/                 # Context providers
│   └── PresentationContext.js  # Global state management
├── utils/                   # Utility functions
│   ├── imageUtils.js        # Image handling utilities
│   └── slideTemplates.js    # Slide template definitions
└── App.js                   # Main application component
```

## Development Status

### Current Implementation (feature/rebuild-optimized)

- ✅ Three-panel layout similar to professional presentation software
- ✅ Slide navigator in left panel (PowerPoint/Keynote style)
- ✅ Slide editor with basic template rendering in center panel
- ✅ Right panel with accordion menus for:
  - Image Library - Upload and manage images
  - Template Library - Select different slide layouts
- ✅ Basic slide management (add, delete, reorder, duplicate)
- ✅ Central state management with React Context API
- ✅ Responsive design with Tailwind CSS

### Planned Enhancements

- [ ] Interactive text editing directly on slides
- [ ] Drag and drop for images from library to slides
- [ ] More customization options for each slide type
- [ ] Save/load functionality for presentations
- [ ] Export options (PDF, images)
- [ ] Presentation mode for slideshows

## Technology Stack

- **React**: Frontend library for building the user interface
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Context API**: For global state management

## Development

### Prerequisites

- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/cheepka/presentation-builder.git
   ```

2. Navigate to the project directory:
   ```
   cd presentation-builder
   ```

3. Checkout the optimized rebuild branch:
   ```
   git checkout feature/rebuild-optimized
   ```

4. Install dependencies:
   ```
   npm install
   ```

5. Start the development server:
   ```
   npm start
   ```

6. Open your browser and navigate to `http://localhost:3000`

### Development Workflow

1. Create a feature branch for new development:
   ```
   git checkout -b feature/your-feature-name
   ```

2. Implement your changes

3. Submit a pull request for review

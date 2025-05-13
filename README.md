# Presentation Builder

A web-based application for creating customizable presentations with various slide templates. Built with React and styled with Tailwind CSS.

## Features

- Create presentations with seven different slide layouts:
  - Title Slide
  - Text + Right Image
  - Text + Left Image
  - Full Image with Title
  - 9-Image Grid
  - 4-Image Grid
  - Split Vertical (Text + Two Images)

- Comprehensive slide management:
  - Add slides from templates
  - Duplicate existing slides
  - Delete unwanted slides
  - Reorder slides using up/down controls
  - Navigate between slides with simple clicks

- Image library system:
  - Upload and store images
  - Reuse images across multiple slides
  - Manage your image collection

- Professional, intuitive interface:
  - Three-panel layout inspired by desktop presentation software
  - Clean, modern design with a focus on usability
  - Accordion menus for tool organization

## Project Structure

The application follows a modular component architecture:

```
src/
├── components/             # React components
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
└── index.js                # Application entry point
```

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

3. Check out the optimized version:
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

## Current Status

This project is currently in active development. The `feature/rebuild-optimized` branch contains a completely rewritten version with improved architecture and bug fixes. For detailed development notes, please see:

- [DEVELOPMENT.md](./DEVELOPMENT.md) - Comprehensive development documentation
- [NOTES.md](./NOTES.md) - Latest development notes and decisions

## Planned Features

- Inline text editing for all slide content
- Drag-and-drop functionality for images and slides
- Save/load functionality for presentations
- Export to PDF/PowerPoint
- Custom theming options
- Presentation mode

## Contribute

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is available under the MIT License.

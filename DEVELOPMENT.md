# Development Guide for Presentation Builder

This document provides an overview of the Presentation Builder project structure, component organization, and development guidelines.

## Project Overview

Presentation Builder is a web-based application that allows users to create customizable presentations using various slide templates. The application is built with React and styled with Tailwind CSS.

## Project Structure

```
presentation-builder/
├── public/                 # Static assets and HTML template
├── src/                    # Source code
│   ├── App.js              # Main Presentation Builder component
│   ├── index.js            # React entry point
│   └── index.css           # Tailwind CSS imports
├── package.json            # Dependencies and scripts
├── tailwind.config.js      # Tailwind CSS configuration
└── .gitignore              # Git ignore rules
```

## Core Components

The application is currently structured as a single-component application with the following logical sections:

1. **Template Library** - Left sidebar with available slide templates
2. **Slide Management** - Middle section for organizing and ordering slides
3. **Preview Area** - Right section showing visual previews of slides
4. **Edit Modal** - Popup for editing slide content

## Template Types

The application supports the following slide templates:

1. `fullImage` - Full background image with title overlay
2. `rightImage` - Text on left, image on right
3. `leftImage` - Image on left, text on right
4. `rightGrid` - Text on left, three images stacked on right
5. `imageGrid` - 9-image grid with title overlay
6. `splitVertical` - Text on left, two images stacked on right
7. `fourGrid` - 2x2 image grid with title overlay

## Naming Conventions

- **Component Functions**: PascalCase (e.g., `PresentationBuilder`)
- **Variables/Constants**: camelCase (e.g., `templateLibrary`)
- **Template IDs**: kebab-case (e.g., `text-image-right`)
- **CSS Classes**: Follow Tailwind CSS conventions

## State Management

The application currently uses React's `useState` for state management with the following key state objects:

- `slides` - Array of slide objects in the presentation
- `editingSlide` - Currently selected slide for editing
- `editForm` - Form data for the editing modal

## Future Enhancements

Potential areas for enhancement include:

1. Component Modularization - Break down into smaller, reusable components
2. Image Upload Functionality - Replace placeholder images with user uploads
3. Save/Load Presentations - Persistence mechanisms for created presentations
4. Export Options - Export to PDF, PowerPoint, or other formats
5. Responsive Design Improvements - Better mobile support

## Development Workflow

1. Create a feature branch for new enhancements
2. Implement the feature with appropriate tests
3. Update documentation to reflect changes
4. Create a pull request for review
5. Merge to main after approval

## Style Guide

- Use functional components with hooks
- Keep components focused on a single responsibility
- Document complex logic with clear comments
- Use Tailwind CSS classes for styling
- Follow the existing pattern for template creation and management
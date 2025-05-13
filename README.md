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

- Direct inline editing of all slide content:
  - Edit text directly on slides
  - Upload custom images with drag-and-drop support
  - Manage bullet points

- Slide Management:
  - Add, duplicate, and remove slides
  - Reorder slides with move up/down controls
  - View presentation preview

## Project Structure

The application follows a modular component architecture:

```
src/
├── components/              # React components
│   ├── Header.js            # Application header
│   ├── ImageUpload.js       # Image upload functionality
│   ├── layout/              # Layout components
│   ├── slideEditor/         # Components for editing slides
│   ├── slideLibrary/        # Slide template library
│   └── slideTypes/          # Specific slide type implementations
├── context/                 # Context providers
│   └── PresentationContext.js  # Global state management
├── utils/                   # Utility functions
│   └── slideTemplates.js    # Slide template definitions
└── App.js                   # Main application component
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

3. Install dependencies:
   ```
   npm install
   ```

4. Start the development server:
   ```
   npm start
   ```

5. Open your browser and navigate to `http://localhost:3000`

### Development Workflow

1. Create a feature branch for new development:
   ```
   git checkout -b feature/your-feature-name
   ```

2. Implement your changes

3. Submit a pull request for review

## Future Enhancements

- Save/load functionality for presentations
- Export to PDF/PowerPoint
- Additional slide templates
- Drag and drop slide reordering
- Custom theming options

## Contribute

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is available under the MIT License.

# Presentation Builder

A React application for creating and editing slide-based presentations with customizable templates and image integration.

## Features

- Intuitive slide editor with multiple template options
- Image library with upload functionality
- Inline text editing for slides
- Image selection modal for template images
- Responsive design

## Getting Started

### Prerequisites

- Node.js 14.x or higher
- npm or yarn

### Installation

1. Clone the repository:
```
git clone https://github.com/cheepka/presentation-builder.git
cd presentation-builder
```

2. Install dependencies:
```
npm install
```

3. Start the development server:
```
npm start
```

## Working with AI Assistants

This section provides guidelines for both AI agents and human collaborators to effectively work with this repository.

### Version Control Guidelines

- We use semantic versioning (X.Y.Z format)
- Each significant feature release is tagged (e.g., v0.2.0)
- Feature branches are named `feature/feature-name`
- Bug fix branches are named `fix/issue-description`

### Effective AI Agent Prompts

When working with AI assistants on this project, use these prompt templates for best results:

#### Starting a new feature

```
I'm working on the presentation-builder project (github.com/cheepka/presentation-builder), 
currently at version X.Y.Z. Please help me create a new feature branch called 
'feature/feature-name' to implement [feature description].
```

#### Exploring the codebase

```
Please explore the presentation-builder repository to understand its structure. 
Focus on [specific area of interest] and explain how it's implemented.
```

#### Working with specific versions

```
I need to reference version X.Y.Z of the presentation-builder. Please check out 
that version tag and help me understand [specific question about that version].
```

#### Analyzing changes

```
Please analyze the changes between vX.Y.Z and vA.B.C of the presentation-builder
to summarize what functionality was added or modified.
```

### Repository Structure

- `src/components/` - React components
  - `slideEditor/` - Components for slide editing functionality  
  - `slideTypes/` - Template components for different slide layouts
- `src/context/` - React context providers for state management
- `src/utils/` - Utility functions and helpers

### Development Workflow

1. Always create a feature branch from a stable version tag
2. Implement and test changes locally
3. Commit with descriptive messages following conventional commits
4. Push changes and create pull requests to the appropriate branch
5. After merging, tag significant releases with a new version number

## License

This project is licensed under the MIT License - see the LICENSE file for details.

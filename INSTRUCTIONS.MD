# Presentation Builder Project Instructions

## [AGENT HANDOFF PROTOCOL - READ FIRST]

When taking over this project from another agent or session:

1. **Determine Current Working Branch (MANDATORY STEP)**:
   ```javascript
   // First, determine which branch the user wants to work on in this session
   // DO NOT assume it's the main branch
   // Ask clearly if not specified at the beginning of the conversation
   ```

2. **Active Branches to Be Aware Of**:
   - `main`: Main production branch (DO NOT modify directly)
   - `feature/ui-redesign`: UI redesign work branch
   - `feature/image-upload`: Image upload functionality branch
   - `feature/fix-multiple-image-upload`: Bug fix branch for image grid issue

3. **Verify Branch Before Any Modifications**:
   ```javascript
   // ALWAYS confirm with the user which branch they want to work with
   // Sample check
   git branch -a  // To see all branches
   git checkout [branch-name]  // To switch to the right branch
   ```

4. **Never Make Assumptions About Current Branch**:
   - Always ask/verify which branch the user is working on at the start of a session
   - If there's ambiguity, clarify before proceeding with any code changes
   - Even with the same user, the working branch may change between conversations

5. **Retrieve Branch-Specific Context**:
   ```javascript
   // After confirming the branch, check its current state
   get_file_contents({owner: "cheepka", repo: "presentation-builder", path: "src/App.js", ref: "[branch-name]"});
   ```

6. **Status Check Before Proceeding**:
   - Summarize your understanding of the current branch state to the human
   - Confirm which branch to work on before making any changes
   - Validate your approach before implementing code changes

## Project Overview
You're working on the "Presentation Builder" project, a web-based application that allows users to create customizable presentations with various slide templates. The application is built with React and styled with Tailwind CSS.

Repository: https://github.com/cheepka/presentation-builder

## Current Implementation
The application currently features:

### Seven slide template types:
- Full Image with Title
- Text + Right Image
- Text + Left Image
- Text + Triple Image
- 9-Image Grid
- Text + Dual Image
- 4-Image Grid

### Core functionality:
- Adding slides from templates
- Editing slide content including text and bullet points
- Reordering slides
- Visual preview of slide layouts
- Image upload functionality (added in v0.2.0)

### Technical characteristics:
- Single React component architecture (App.js)
- Tailwind CSS for styling
- Local state management with React hooks
- Image upload component for handling file selection

## Project Structure
```
presentation-builder/
├── public/                 # Static assets and HTML template
├── src/                    # Source code
│   ├── App.js              # Main Presentation Builder component
│   ├── components/         # React components
│   │   └── ImageUpload.js  # Component for image uploads
│   ├── index.js            # React entry point
│   └── index.css           # Tailwind CSS imports
├── package.json            # Dependencies and scripts
├── tailwind.config.js      # Tailwind CSS configuration
├── DEVELOPMENT.md          # Development guidelines
├── CHANGELOG.md            # Version history
├── NOTES.md                # Project decisions and planning
└── .gitignore              # Git ignore rules
```

## Current Development Priorities
The following issues have been created in the repository:

### Issue #1: Implement Image Upload Functionality ✅ (Completed)
- Replace placeholder images with user uploads
- Add file input component for image selection
- Show image preview and handle uploads

### Issue #2: Implement Save/Load Functionality
- Save presentations to local storage
- Allow naming and managing saved presentations
- Load saved presentations

### Issue #3: Refactor App into Modular Components
- Break down App.js into logical component groups
- Create a clean component hierarchy
- Improve maintainability and testability

## Known Issues
- When adding multiple images to grid templates (9-Image Grid or 4-Image Grid), adding a new image can overwrite previously added images instead of preserving them. This is due to how the image state is managed in the `saveEdits` function.

## Development Guidelines

### Code Style
- Use functional components with React hooks
- Follow existing naming conventions:
  - Component Functions: PascalCase
  - Variables/Constants: camelCase
  - Template IDs: kebab-case
  - CSS Classes: Follow Tailwind CSS conventions

### GitHub & Git Workflow

#### [!!! CRITICAL !!!] REPOSITORY INTERACTION RULES:
1. **NEVER modify the main branch directly**
   - ALWAYS create a feature branch before making ANY code changes
   - NEVER commit directly to the main branch
   - ALL changes MUST go through a pull request workflow

2. **Proper Feature Branch Workflow**
   - Create a feature branch for new changes
   - Make changes only on that feature branch
   - Submit a pull request for review
   - Wait for approval before merging

#### Working with GitHub

When working with this repository, use the following GitHub functions:

```javascript
// To find the repository
search_repositories({query: "cheepka/presentation-builder"});

// To view files
get_file_contents({owner: "cheepka", repo: "presentation-builder", path: "src/App.js"});

// To check commit history
list_commits({owner: "cheepka", repo: "presentation-builder"});

// To create a new branch (ALWAYS DO THIS FIRST)
create_branch({
  owner: "cheepka", 
  repo: "presentation-builder", 
  branch: "feature/your-feature-name"
});

// To submit changes (ONLY TO FEATURE BRANCHES)
push_files({
  owner: "cheepka", 
  repo: "presentation-builder", 
  branch: "feature/your-feature-name",
  files: [{path: "path/to/file", content: "file content"}],
  message: "Description of changes"
});

// To create a pull request
create_pull_request({
  owner: "cheepka", 
  repo: "presentation-builder", 
  title: "Fix image grid issue", 
  body: "This PR addresses issue #X by...", 
  head: "feature/your-feature-name", 
  base: "main"
});
```

### When Providing Solutions

When asked to provide a solution to a problem:

1. **Analyze**: First, thoroughly examine the codebase to understand the issue
2. **Explain**: Provide a clear explanation of the issue and how it can be fixed
3. **Provide Code**: Show the code changes that would fix the issue
4. **DO NOT IMPLEMENT**: Wait for explicit permission before creating any branches or submitting any code
5. **No Direct Changes**: NEVER create/update files on the main branch directly

### Collaborating with Humans

When working with developers:

1. Always check the existing repository structure first
2. Read DEVELOPMENT.md, NOTES.md, and CHANGELOG.md to understand context
3. Present your recommendations in a clear, concise manner
4. Be explicit about the branch workflow to be used
5. Suggest proper Git/GitHub commands for the developer to execute

### Feature Implementation Steps

1. Create a feature branch from main
2. Implement the feature with proper testing
3. Document your changes with clear comments
4. Update documentation if needed
5. Create a pull request with a detailed description
6. Wait for review before merging

## Future Directions
Beyond the current issues, future enhancements may include:

- Export to PDF/PowerPoint
- Additional slide templates
- Drag and drop slide reordering
- Custom theming support
- Collaborative editing features

When working on this project, always refer to the detailed documentation in DEVELOPMENT.md, NOTES.md, and CHANGELOG.md for more specific guidance.
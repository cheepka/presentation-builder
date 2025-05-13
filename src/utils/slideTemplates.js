// slideTemplates.js
// Defines all available slide templates for the presentation builder

// Template IDs - used for identifying template types
export const TEMPLATE_TYPES = {
  TITLE: 'title-slide',
  TEXT_RIGHT_IMAGE: 'text-right-image',
  TEXT_LEFT_IMAGE: 'text-left-image',
  FULL_IMAGE: 'full-image',
  IMAGE_GRID: 'image-grid-9',
  FOUR_GRID: 'four-grid',
  SPLIT_VERTICAL: 'split-vertical',
};

// Template definitions
export const slideTemplates = [
  {
    id: TEMPLATE_TYPES.TITLE,
    name: 'Title Slide',
    description: 'Title and subtitle with optional background image',
    createSlide: () => ({
      type: TEMPLATE_TYPES.TITLE,
      title: 'Presentation Title',
      subtitle: 'Subtitle or Author Information',
      backgroundImage: null,
    })
  },
  {
    id: TEMPLATE_TYPES.TEXT_RIGHT_IMAGE,
    name: 'Text with Right Image',
    description: 'Text content with an image on the right',
    createSlide: () => ({
      type: TEMPLATE_TYPES.TEXT_RIGHT_IMAGE,
      title: 'Section Title',
      content: [
        'Bullet point 1',
        'Bullet point 2',
        'Bullet point 3'
      ],
      image: null,
    })
  },
  {
    id: TEMPLATE_TYPES.TEXT_LEFT_IMAGE,
    name: 'Text with Left Image',
    description: 'Text content with an image on the left',
    createSlide: () => ({
      type: TEMPLATE_TYPES.TEXT_LEFT_IMAGE,
      title: 'Section Title',
      content: [
        'Bullet point 1',
        'Bullet point 2',
        'Bullet point 3'
      ],
      image: null,
    })
  },
  {
    id: TEMPLATE_TYPES.FULL_IMAGE,
    name: 'Full Image',
    description: 'Full-screen image with a title overlay',
    createSlide: () => ({
      type: TEMPLATE_TYPES.FULL_IMAGE,
      title: 'Image Title',
      image: null,
    })
  },
  {
    id: TEMPLATE_TYPES.IMAGE_GRID,
    name: '9-Image Grid',
    description: 'Grid of 9 images',
    createSlide: () => ({
      type: TEMPLATE_TYPES.IMAGE_GRID,
      title: 'Image Collection',
      images: Array(9).fill(null),
    })
  },
  {
    id: TEMPLATE_TYPES.FOUR_GRID,
    name: '4-Image Grid',
    description: 'Grid of 4 images',
    createSlide: () => ({
      type: TEMPLATE_TYPES.FOUR_GRID,
      title: 'Key Visual Points',
      images: Array(4).fill(null),
    })
  },
  {
    id: TEMPLATE_TYPES.SPLIT_VERTICAL,
    name: 'Split Vertical',
    description: 'Text with two vertically stacked images',
    createSlide: () => ({
      type: TEMPLATE_TYPES.SPLIT_VERTICAL,
      title: 'Comparison',
      content: [
        'Description point 1',
        'Description point 2'
      ],
      images: [null, null],
    })
  },
];

// Helper function to get a template by ID
export function getTemplateById(id) {
  return slideTemplates.find(template => template.id === id);
}

// Helper function to create a new slide from a template
export function createSlideFromTemplate(templateId) {
  const template = getTemplateById(templateId);
  if (!template) {
    throw new Error(`Template with ID ${templateId} not found`);
  }
  
  // Create a new slide with a unique ID
  return {
    id: generateUniqueId(),
    ...template.createSlide(),
  };
}

// Helper to generate a unique ID for slides
function generateUniqueId() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

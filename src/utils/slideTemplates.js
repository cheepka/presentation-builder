/**
 * Slide template definitions for the Presentation Builder
 * 
 * This file contains all the template definitions for the different slide types.
 * Each template includes:
 * - id: unique identifier
 * - name: display name
 * - type: slide type key used throughout the application
 * - defaultTitle: default title to use when creating a new slide
 * - defaultContent: default content text
 * - defaultProps: additional default properties specific to this template
 */

const slideTemplates = [
  {
    id: 'title-slide',
    name: 'Full Image with Title',
    type: 'fullImage',
    defaultTitle: 'Your Title Here',
    defaultContent: '',
    defaultProps: {
      subtitle: 'Subtitle Text Here',
      attribution: 'Your Name / Company'
    }
  },
  {
    id: 'text-image-right',
    name: 'Text + Right Image',
    type: 'rightImage',
    defaultTitle: 'Section Title',
    defaultContent: 'This is where you can add your main content. Describe your products, services, or key messages here. This text block supports multiple paragraphs.',
    defaultProps: {}
  },
  {
    id: 'text-image-left',
    name: 'Text + Left Image',
    type: 'leftImage',
    defaultTitle: 'Feature Overview',
    defaultContent: 'Use this space to highlight features, benefits, or any important information you want to convey to your audience.',
    defaultProps: {
      bulletPoints: [
        "First key point goes here",
        "Second important feature or benefit",
        "Third compelling reason or example"
      ]
    }
  },
  {
    id: 'text-with-triple-image',
    name: 'Text + Triple Image',
    type: 'rightGrid',
    defaultTitle: 'Key Services',
    defaultContent: 'This area can contain your main content description. The bullet points below can highlight specific features or services.',
    defaultProps: {
      bulletPoints: [
        "First key point goes here",
        "Second important feature or benefit",
        "Third compelling reason or example"
      ]
    }
  },
  {
    id: 'nine-image-grid',
    name: '9-Image Grid',
    type: 'imageGrid',
    defaultTitle: 'Portfolio',
    defaultContent: '',
    defaultProps: {
      showTitle: false
    }
  },
  {
    id: 'text-dual-image',
    name: 'Text + Dual Image',
    type: 'splitVertical',
    defaultTitle: 'Multi-Purpose Content',
    defaultContent: 'This layout combines text with dual images. Ideal for comparing before/after scenarios or showing related concepts side by side.',
    defaultProps: {}
  },
  {
    id: 'four-image-grid',
    name: '4-Image Grid',
    type: 'fourGrid',
    defaultTitle: 'Product Showcase',
    defaultContent: '',
    defaultProps: {
      showTitle: false
    }
  }
];

/**
 * Get placeholder background color for grid positions
 * @param {string|number} position - Position identifier (e.g., 'grid1', 'top', etc.)
 * @returns {string} - CSS color string
 */
export const getPlaceholderColor = (position) => {
  // Extract digits from positions like 'grid1' or use a default
  const positionIndex = typeof position === 'string' ? 
    parseInt(position.replace(/[^0-9]/g, '') || '0', 10) : 
    0;
  
  // Calculate a shade of gray, alternating between lighter and darker
  const baseValue = 50 + (positionIndex * 5) % 20;
  return `rgb(${baseValue}, ${baseValue}, ${baseValue})`;
};

export default slideTemplates;
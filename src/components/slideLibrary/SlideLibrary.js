import React from 'react';
import { Layout, Image, Plus } from 'lucide-react';

/**
 * SlideLibrary Component
 * 
 * A simplified version of the template library that shows available slide templates.
 * Replaces both the Template Library and Slides panels from the original design.
 * 
 * @param {Object} props
 * @param {Array} props.templates - Available slide templates
 * @param {Function} props.onAddTemplate - Callback for adding a template (templateId) => void
 * @param {Array} props.slides - Current slides in the presentation
 * @param {number} [props.activeSlideIndex] - Index of the currently active slide (if any)
 * @param {Function} [props.onSelectSlide] - Callback for selecting a slide (index) => void
 * @param {string} [props.className=''] - Additional CSS classes
 */
function SlideLibrary({
  templates,
  onAddTemplate,
  slides,
  activeSlideIndex,
  onSelectSlide,
  className = ''
}) {
  return (
    <div className={`flex flex-col h-full ${className}`}>
      <h2 className="text-xl font-semibold mb-4">Slide Library</h2>
      
      {/* Template Section */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-2">Templates</h3>
        <div className="space-y-2">
          {templates.map(template => (
            <div 
              key={template.id} 
              className="p-3 border border-gray-700 rounded hover:bg-gray-700 cursor-pointer transition"
              onClick={() => onAddTemplate(template.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {template.type.includes('Image') ? <Image size={16} /> : <Layout size={16} />}
                  <span>{template.name}</span>
                </div>
                <Plus size={16} className="text-gray-400" />
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Slide Thumbnails Section */}
      {slides.length > 0 && (
        <div className="flex-1 overflow-y-auto">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-2">Current Slides</h3>
          <div className="space-y-2">
            {slides.map((slide, index) => (
              <div
                key={slide.uniqueId}
                className={`p-2 border rounded cursor-pointer transition ${
                  index === activeSlideIndex 
                    ? 'border-blue-500 bg-gray-700' 
                    : 'border-gray-700 hover:bg-gray-700'
                }`}
                onClick={() => onSelectSlide && onSelectSlide(index)}
              >
                <div className="flex items-center space-x-2">
                  <span className="text-gray-400 w-6 text-center">{index + 1}</span>
                  <span className="truncate">{slide.title || 'Untitled Slide'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Empty State */}
      {slides.length === 0 && (
        <div className="flex-1 flex flex-col items-center justify-center text-gray-500 border border-gray-700 border-dashed rounded p-6">
          <Layout size={32} className="mb-3" />
          <p className="text-center text-sm">Add templates to create your presentation</p>
        </div>
      )}
    </div>
  );
}

export default SlideLibrary;
// TemplateLibrary.js
// Component for displaying and selecting slide templates

import React from 'react';
import { usePresentation } from '../../context/PresentationContext';
import { ACTIONS } from '../../context/PresentationContext';
import { slideTemplates, createSlideFromTemplate } from '../../utils/slideTemplates';

/**
 * Component for displaying and selecting from available slide templates
 * @returns {React.ReactElement} The TemplateLibrary component
 */
const TemplateLibrary = () => {
  const { dispatch } = usePresentation();
  
  const handleTemplateSelect = (templateId) => {
    // Create a new slide based on the selected template
    const newSlide = createSlideFromTemplate(templateId);
    
    // Add it to the presentation
    dispatch({
      type: ACTIONS.ADD_SLIDE,
      payload: newSlide
    });
  };
  
  // Basic visual representation of each template type
  const renderTemplatePreview = (template) => {
    switch (template.id) {
      case 'title-slide':
        return (
          <div className="flex flex-col items-center justify-center h-full p-1">
            <div className="w-3/5 h-2 bg-gray-600 mb-1 rounded-sm"></div>
            <div className="w-4/5 h-1 bg-gray-400 rounded-sm"></div>
          </div>
        );
        
      case 'text-right-image':
        return (
          <div className="flex h-full">
            <div className="w-2/3 p-1 flex flex-col">
              <div className="w-4/5 h-1.5 bg-gray-600 mb-2 rounded-sm"></div>
              <div className="space-y-1">
                <div className="w-full h-1 bg-gray-400 rounded-sm"></div>
                <div className="w-full h-1 bg-gray-400 rounded-sm"></div>
                <div className="w-2/3 h-1 bg-gray-400 rounded-sm"></div>
              </div>
            </div>
            <div className="w-1/3 bg-gray-300 h-full rounded-sm"></div>
          </div>
        );
        
      case 'text-left-image':
        return (
          <div className="flex h-full">
            <div className="w-1/3 bg-gray-300 h-full rounded-sm"></div>
            <div className="w-2/3 p-1 flex flex-col">
              <div className="w-4/5 h-1.5 bg-gray-600 mb-2 rounded-sm"></div>
              <div className="space-y-1">
                <div className="w-full h-1 bg-gray-400 rounded-sm"></div>
                <div className="w-full h-1 bg-gray-400 rounded-sm"></div>
                <div className="w-2/3 h-1 bg-gray-400 rounded-sm"></div>
              </div>
            </div>
          </div>
        );
        
      case 'full-image':
        return (
          <div className="relative h-full bg-gray-300 rounded-sm">
            <div className="absolute inset-x-0 bottom-0 bg-gray-800 bg-opacity-50 p-1">
              <div className="w-1/2 h-1.5 bg-white rounded-sm"></div>
            </div>
          </div>
        );
        
      case 'image-grid-9':
        return (
          <div className="grid grid-cols-3 grid-rows-3 gap-0.5 h-full">
            {Array(9).fill(0).map((_, index) => (
              <div key={index} className="bg-gray-300 rounded-sm"></div>
            ))}
          </div>
        );
        
      case 'four-grid':
        return (
          <div className="flex flex-col h-full">
            <div className="h-1/4 flex items-center justify-center">
              <div className="w-1/2 h-1.5 bg-gray-600 rounded-sm"></div>
            </div>
            <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-0.5">
              {Array(4).fill(0).map((_, index) => (
                <div key={index} className="bg-gray-300 rounded-sm"></div>
              ))}
            </div>
          </div>
        );
        
      case 'split-vertical':
        return (
          <div className="flex h-full">
            <div className="w-2/3 p-1 flex flex-col">
              <div className="w-4/5 h-1.5 bg-gray-600 mb-2 rounded-sm"></div>
              <div className="space-y-1">
                <div className="w-full h-1 bg-gray-400 rounded-sm"></div>
                <div className="w-2/3 h-1 bg-gray-400 rounded-sm"></div>
              </div>
            </div>
            <div className="w-1/3 flex flex-col h-full space-y-0.5">
              <div className="flex-1 bg-gray-300 rounded-sm"></div>
              <div className="flex-1 bg-gray-300 rounded-sm"></div>
            </div>
          </div>
        );
        
      default:
        return (
          <div className="flex items-center justify-center h-full">
            <div className="w-1/2 h-1.5 bg-gray-600 rounded-sm"></div>
          </div>
        );
    }
  };

  return (
    <div className="h-full">
      <div className="p-2 grid grid-cols-2 gap-2">
        {slideTemplates.map((template) => (
          <button
            key={template.id}
            className="flex flex-col border border-gray-200 rounded shadow-sm overflow-hidden hover:border-blue-400 hover:shadow transition-all"
            onClick={() => handleTemplateSelect(template.id)}
            title={template.description}
          >
            {/* Template preview */}
            <div className="h-16 p-1 bg-white">
              {renderTemplatePreview(template)}
            </div>
            
            {/* Template name */}
            <div className="bg-gray-50 p-1 border-t border-gray-200 text-xs font-medium text-gray-700 truncate">
              {template.name}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TemplateLibrary;

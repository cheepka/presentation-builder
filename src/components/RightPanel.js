// RightPanel.js
// Right panel with accordions for image library and template library

import React from 'react';
import Accordion from './layout/Accordion';
import ImageLibrary from './ImageLibrary';
import TemplateLibrary from './TemplateLibrary';

/**
 * Component that organizes the right panel with accordions
 * @returns {React.ReactElement} The RightPanel component
 */
const RightPanel = () => {
  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-800">Tools</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        <Accordion title="Image Library" defaultOpen={true}>
          <ImageLibrary />
        </Accordion>
        
        <Accordion title="Slide Templates" defaultOpen={true}>
          <TemplateLibrary />
        </Accordion>
      </div>
    </div>
  );
};

export default RightPanel;

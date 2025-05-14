// RightPanel.js
// Right panel with accordions for image library and template library

import React from 'react';
import Accordion from './layout/Accordion';
import ImageLibrary from './ImageLibrary';
import TemplateLibrary from './TemplateLibrary';
import KnowledgeLibrary from './KnowledgeLibrary';
import { Image, Layout, Book } from 'lucide-react';

/**
 * Component that organizes the right panel with accordions
 * @returns {React.ReactElement} The RightPanel component
 */
const RightPanel = () => {
  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-900 transition-colors duration-200">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-medium text-gray-800 dark:text-white">Tools</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        <Accordion 
          title="Image Library" 
          defaultOpen={true}
          icon={<Image size={16} className="mr-2" />}
        >
          <ImageLibrary />
        </Accordion>
        
        <Accordion 
          title="Knowledge" 
          defaultOpen={false}
          icon={<Book size={16} className="mr-2" />}
        >
          <KnowledgeLibrary />
        </Accordion>
        
        <Accordion 
          title="Slide Templates" 
          defaultOpen={true}
          icon={<Layout size={16} className="mr-2" />}
        >
          <TemplateLibrary />
        </Accordion>
      </div>
    </div>
  );
};

export default RightPanel;

// Accordion.js
// Expandable accordion component for organizing content in panels

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

/**
 * Accordion component for organizing content in collapsible sections
 * 
 * @param {Object} props - Component props
 * @param {string} props.title - The title of the accordion section
 * @param {React.ReactNode} props.children - The content inside the accordion
 * @param {boolean} props.defaultOpen - Whether the accordion should be open by default
 * @param {React.ReactNode} props.icon - Optional icon to show before title
 * @returns {React.ReactElement} The Accordion component
 */
const Accordion = ({ title, children, defaultOpen = false, icon = null }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    <div className="border-b border-gray-200 dark:border-gray-700">
      {/* Accordion Header */}
      <button
        className="w-full flex items-center justify-between px-4 py-3 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors duration-150"
        onClick={toggleAccordion}
        aria-expanded={isOpen}
      >
        <div className="flex items-center">
          {icon && <div className="text-gray-600 dark:text-gray-400">{icon}</div>}
          <h3 className="text-gray-900 dark:text-gray-200 font-medium">{title}</h3>
        </div>
        {isOpen ? (
          <ChevronUp size={18} className="text-gray-600 dark:text-gray-400" />
        ) : (
          <ChevronDown size={18} className="text-gray-600 dark:text-gray-400" />
        )}
      </button>
      
      {/* Accordion Content */}
      {isOpen && (
        <div className="bg-white dark:bg-gray-900 transition-colors duration-200">
          {children}
        </div>
      )}
    </div>
  );
};

export default Accordion;

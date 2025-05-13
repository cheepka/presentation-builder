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
 * @returns {React.ReactElement} The Accordion component
 */
const Accordion = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    <div className="border-b border-gray-200">
      {/* Accordion Header */}
      <button
        className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors duration-150"
        onClick={toggleAccordion}
        aria-expanded={isOpen}
      >
        <h3 className="text-gray-800 font-medium">{title}</h3>
        {isOpen ? (
          <ChevronUp size={18} className="text-gray-500" />
        ) : (
          <ChevronDown size={18} className="text-gray-500" />
        )}
      </button>
      
      {/* Accordion Content */}
      {isOpen && (
        <div className="p-4 bg-white">
          {children}
        </div>
      )}
    </div>
  );
};

export default Accordion;

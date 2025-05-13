// MainLayout.js
// Three-panel layout for the presentation builder

import React from 'react';

/**
 * Three-panel layout component for the presentation builder interface
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.leftPanel - Content for the left panel (slide navigator)
 * @param {React.ReactNode} props.centerPanel - Content for the center panel (slide editor)
 * @param {React.ReactNode} props.rightPanel - Content for the right panel (tools & templates)
 * @returns {React.ReactElement} The MainLayout component
 */
const MainLayout = ({ leftPanel, centerPanel, rightPanel }) => {
  return (
    <div className="flex flex-1 overflow-hidden">
      {/* Left Panel - Slide Navigator */}
      <div className="w-64 bg-gray-50 border-r border-gray-200 overflow-y-auto">
        {leftPanel}
      </div>
      
      {/* Center Panel - Active Slide Editor */}
      <div className="flex-1 overflow-y-auto bg-gray-100 flex items-center justify-center">
        <div className="relative">
          {centerPanel}
        </div>
      </div>
      
      {/* Right Panel - Tools & Libraries */}
      <div className="w-72 bg-gray-50 border-l border-gray-200 overflow-y-auto">
        {rightPanel}
      </div>
    </div>
  );
};

export default MainLayout;

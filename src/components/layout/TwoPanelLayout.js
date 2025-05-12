import React from 'react';

/**
 * TwoPanelLayout Component
 * 
 * A layout component for the redesigned Presentation Builder with two main panels:
 * - Left panel: Slide Library
 * - Right panel: Slide Preview with direct editing
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.leftPanel - Content for the left panel (Slide Library)
 * @param {React.ReactNode} props.rightPanel - Content for the right panel (Slide Preview)
 * @param {React.ReactNode} props.header - Content for the header
 */
function TwoPanelLayout({ leftPanel, rightPanel, header }) {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      {header && (
        <header className="bg-gray-900 text-white py-4 px-6">
          {header}
        </header>
      )}

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel - Slide Library */}
        <div className="w-64 bg-gray-800 text-white p-4 overflow-y-auto">
          {leftPanel}
        </div>

        {/* Right Panel - Slide Preview with direct editing */}
        <div className="flex-1 p-6 bg-gray-100 overflow-y-auto">
          {rightPanel}
        </div>
      </div>
    </div>
  );
}

export default TwoPanelLayout;
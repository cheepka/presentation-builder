// Header.js
// Top navigation bar for the application

import React from 'react';
import { Save, FileUp, FileDown, Settings } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left side - Logo and title */}
        <div className="flex items-center">
          <h1 className="text-xl font-semibold text-gray-800 mr-4">Presentation Builder</h1>
          <div className="text-sm text-gray-500 hidden md:block">
            Build stunning presentations with ease
          </div>
        </div>
        
        {/* Right side - Action buttons */}
        <div className="flex items-center space-x-2">
          <button 
            className="flex items-center px-3 py-1.5 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50 text-gray-700"
            title="Save presentation"
          >
            <Save size={18} className="mr-1" />
            <span className="hidden sm:inline">Save</span>
          </button>
          
          <button 
            className="flex items-center px-3 py-1.5 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50 text-gray-700"
            title="Import presentation"
          >
            <FileUp size={18} className="mr-1" />
            <span className="hidden sm:inline">Import</span>
          </button>
          
          <button 
            className="flex items-center px-3 py-1.5 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50 text-gray-700"
            title="Export presentation"
          >
            <FileDown size={18} className="mr-1" />
            <span className="hidden sm:inline">Export</span>
          </button>
          
          <button 
            className="flex items-center p-1.5 text-sm bg-white border border-gray-300 rounded-full hover:bg-gray-50 text-gray-700"
            title="Settings"
          >
            <Settings size={18} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

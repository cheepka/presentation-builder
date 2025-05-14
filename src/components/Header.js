// Header.js
// Top navigation bar for the application

import React from 'react';
import { Save, FileUp, FileDown, Settings, Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Header = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors duration-200">
      <div className="px-4 py-3 flex items-center justify-between">
        {/* Left side - Logo and title */}
        <div className="flex items-center">
          <h1 className="text-xl font-semibold text-gray-800 dark:text-white">Presentation Builder</h1>
        </div>
        
        {/* Right side - Action buttons */}
        <div className="flex items-center space-x-2">
          <button 
            className="flex items-center px-3 py-1.5 text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 transition-colors duration-200"
            title="Save presentation"
          >
            <Save size={18} className="mr-1" />
            <span className="hidden sm:inline">Save</span>
          </button>
          
          <button 
            className="flex items-center px-3 py-1.5 text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 transition-colors duration-200"
            title="Import presentation"
          >
            <FileUp size={18} className="mr-1" />
            <span className="hidden sm:inline">Import</span>
          </button>
          
          <button 
            className="flex items-center px-3 py-1.5 text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 transition-colors duration-200"
            title="Export presentation"
          >
            <FileDown size={18} className="mr-1" />
            <span className="hidden sm:inline">Export</span>
          </button>

          <button
            className="flex items-center p-1.5 text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-full hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 transition-colors duration-200"
            title="Toggle dark mode"
            onClick={toggleDarkMode}
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          
          <button 
            className="flex items-center p-1.5 text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-full hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 transition-colors duration-200"
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

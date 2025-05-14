// App.js
// Main application component

import React from 'react';
import { PresentationProvider } from './context/PresentationContext';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import MainLayout from './components/layout/MainLayout';
import SlideNavigator from './components/SlideNavigator';
import SlideEditor from './components/SlideEditor';
import RightPanel from './components/RightPanel';

function App() {
  return (
    <ThemeProvider>
      <PresentationProvider>
        <div className="flex flex-col h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
          <Header />
          <MainLayout 
            leftPanel={<SlideNavigator />}
            centerPanel={<SlideEditor />}
            rightPanel={<RightPanel />}
          />
        </div>
      </PresentationProvider>
    </ThemeProvider>
  );
}

export default App;

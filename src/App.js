import React from 'react';
import { PresentationProvider } from './context/PresentationContext';
import TwoPanelLayout from './components/layout/TwoPanelLayout';
import Header from './components/Header';

/**
 * Main App component that serves as the entry point for the Presentation Builder
 */
function App() {
  return (
    <PresentationProvider>
      <div className="flex flex-col h-screen bg-gray-100">
        <Header />
        <TwoPanelLayout />
      </div>
    </PresentationProvider>
  );
}

export default App;

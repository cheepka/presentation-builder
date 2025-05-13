// App.js
// Main application component

import React from 'react';
import { PresentationProvider } from './context/PresentationContext';
import Header from './components/Header';
import MainLayout from './components/layout/MainLayout';
import SlideNavigator from './components/SlideNavigator';
import SlideEditor from './components/SlideEditor';
import RightPanel from './components/RightPanel';

function App() {
  return (
    <PresentationProvider>
      <div className="flex flex-col h-screen">
        <Header />
        <MainLayout 
          leftPanel={<SlideNavigator />}
          centerPanel={<SlideEditor />}
          rightPanel={<RightPanel />}
        />
      </div>
    </PresentationProvider>
  );
}

export default App;

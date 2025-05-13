import React from 'react';
import { PresentationProvider, usePresentation } from './context/PresentationContext';
import TwoPanelLayout from './components/layout/TwoPanelLayout';
import Header from './components/Header';
import SlideLibrary from './components/slideLibrary/SlideLibrary';
import EditableSlide from './components/slideEditor/EditableSlide';
import FullImageSlide from './components/slideTypes/FullImageSlide';
import RightImageSlide from './components/slideTypes/RightImageSlide';
import LeftImageSlide from './components/slideTypes/LeftImageSlide';
import RightGridSlide from './components/slideTypes/RightGridSlide';
import SplitVerticalSlide from './components/slideTypes/SplitVerticalSlide';
import ImageGridSlide from './components/slideTypes/ImageGridSlide';
import FourGridSlide from './components/slideTypes/FourGridSlide';
import slideTemplates from './utils/slideTemplates';

/**
 * Main PresentationBuilder application component
 */
function PresentationBuilderApp() {
  // Use the presentation context
  const {
    slides,
    addSlide,
    removeSlide,
    updateSlide,
    moveSlide,
    duplicateSlide,
    editingState,
    setActiveSlide
  } = usePresentation();

  // Save button action
  const handleSave = () => {
    alert('Save functionality will be implemented in a future update.');
  };
  
  // Header actions
  const headerActions = (
    <button
      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      onClick={handleSave}
    >
      Save Presentation
    </button>
  );
  
  // Handle adding a new template
  const handleAddTemplate = (templateId) => {
    const template = slideTemplates.find(t => t.id === templateId);
    if (template) {
      addSlide(template);
    }
  };
  
  // Handle moving a slide up or down
  const handleMoveSlide = (index, direction) => {
    moveSlide(index, direction);
  };
  
  // Handle image changes
  const handleImageChange = (index, imageData) => {
    const slide = slides[index];
    const currentImages = slide.images || {};
    
    if (!imageData) {
      // Handle image removal - if no position is specified, default to 'main'
      const position = 'main';
      const updatedImages = { ...currentImages };
      delete updatedImages[position];
      updateSlide(index, 'images', updatedImages);
      return;
    }
    
    // Handle image update - extract position from imageData or default to 'main'
    const position = imageData.position || 'main';
    
    // Create a new images object with the updated image data
    const updatedImages = {
      ...currentImages,
      [position]: {
        url: imageData.url,
        name: imageData.name,
        type: imageData.type
      }
    };
    
    // Update the slide with the new images object
    updateSlide(index, 'images', updatedImages);
  };
  
  // Render appropriate slide component based on slide type
  const renderSlideContent = (slide, index) => {
    const props = {
      slide,
      onUpdate: (field, value) => updateSlide(index, field, value),
      onImageChange: (imageData) => handleImageChange(index, imageData)
    };
    
    switch (slide.type) {
      case 'fullImage':
        return <FullImageSlide {...props} />;
      case 'rightImage':
        return <RightImageSlide {...props} />;
      case 'leftImage':
        return <LeftImageSlide {...props} />;
      case 'rightGrid':
        return <RightGridSlide {...props} />;
      case 'splitVertical':
        return <SplitVerticalSlide {...props} />;
      case 'imageGrid':
        return <ImageGridSlide {...props} />;
      case 'fourGrid':
        return <FourGridSlide {...props} />;
      default:
        return (
          <div className="w-full h-full flex items-center justify-center bg-gray-800">
            <div className="text-white text-center p-8">
              <h3 className="text-xl font-bold mb-2">Unsupported Slide Type</h3>
              <p>The slide type "{slide.type}" is not supported in this version.</p>
            </div>
          </div>
        );
    }
  };
  
  // Left panel content - Slide Library
  const leftPanel = (
    <SlideLibrary
      templates={slideTemplates}
      onAddTemplate={handleAddTemplate}
      slides={slides}
      activeSlideIndex={editingState.activeSlideIndex}
      onSelectSlide={setActiveSlide}
    />
  );
  
  // Right panel content - Slide Preview
  const rightPanel = (
    <div>
      <h2 className="text-xl font-semibold mb-4">Preview</h2>
      
      {slides.length > 0 ? (
        <div className="space-y-8">
          {slides.map((slide, index) => (
            <EditableSlide
              key={slide.uniqueId}
              slide={slide}
              index={index}
              totalSlides={slides.length}
              onUpdate={updateSlide}
              onMoveUp={(idx) => handleMoveSlide(idx, 'up')}
              onMoveDown={(idx) => handleMoveSlide(idx, 'down')}
              onDelete={removeSlide}
              onDuplicate={duplicateSlide}
            >
              {renderSlideContent(slide, index)}
            </EditableSlide>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow p-10 text-center">
          <div className="flex justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
              <line x1="8" y1="21" x2="16" y2="21"></line>
              <line x1="12" y1="17" x2="12" y2="21"></line>
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">No Slides Yet</h3>
          <p className="text-gray-600">Add templates from the library to begin creating your presentation</p>
        </div>
      )}
    </div>
  );
  
  return (
    <TwoPanelLayout
      header={<Header title="Presentation Builder" actions={headerActions} />}
      leftPanel={leftPanel}
      rightPanel={rightPanel}
    />
  );
}

// Wrap the app with the PresentationProvider
function App() {
  return (
    <PresentationProvider>
      <PresentationBuilderApp />
    </PresentationProvider>
  );
}

export default App;
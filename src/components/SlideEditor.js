// SlideEditor.js
// Component for editing the current slide

import React from 'react';
import { usePresentation } from '../context/PresentationContext';
import { TEMPLATE_TYPES } from '../utils/slideTemplates';
import { getPlaceholderImage } from '../utils/imageUtils';

/**
 * Component for displaying and editing the current slide
 * @returns {React.ReactElement} The SlideEditor component
 */
const SlideEditor = () => {
  const { state, dispatch } = usePresentation();
  const { slides, currentSlideIndex } = state;
  
  // If there are no slides, display empty state
  if (slides.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full w-full p-8 text-center">
        <div className="text-gray-500 mb-4">
          <p className="text-xl mb-2">No slides yet</p>
          <p>Add a slide using the "Add Slide" button or select a template from the right panel</p>
        </div>
      </div>
    );
  }
  
  const currentSlide = slides[currentSlideIndex];
  
  // Placeholder rendering for different slide types
  // This will be expanded in future implementations with actual editing capabilities
  const renderSlideContent = () => {
    switch (currentSlide.type) {
      case TEMPLATE_TYPES.TITLE:
        return (
          <div className="flex flex-col items-center justify-center h-full text-center p-12">
            <h1 className="text-4xl font-bold mb-4">{currentSlide.title}</h1>
            <h2 className="text-xl text-gray-600">{currentSlide.subtitle}</h2>
          </div>
        );
        
      case TEMPLATE_TYPES.FULL_IMAGE:
        return (
          <div className="relative h-full w-full">
            <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
              {currentSlide.image ? (
                <img 
                  src={currentSlide.image.src} 
                  alt={currentSlide.title} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <img 
                  src={getPlaceholderImage(800, 600, "Drop Image Here")} 
                  alt="Placeholder" 
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div className="absolute inset-x-0 bottom-0 bg-black bg-opacity-50 p-4 text-white">
              <h2 className="text-2xl font-semibold">{currentSlide.title}</h2>
            </div>
          </div>
        );
        
      case TEMPLATE_TYPES.TEXT_RIGHT_IMAGE:
        return (
          <div className="flex h-full">
            <div className="w-2/3 p-8">
              <h2 className="text-3xl font-semibold mb-4">{currentSlide.title}</h2>
              <ul className="space-y-2 list-disc pl-6">
                {currentSlide.content.map((item, index) => (
                  <li key={index} className="text-lg">{item}</li>
                ))}
              </ul>
            </div>
            <div className="w-1/3 bg-gray-200 h-full flex items-center justify-center">
              {currentSlide.image ? (
                <img 
                  src={currentSlide.image.src} 
                  alt="Content" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <img 
                  src={getPlaceholderImage(400, 600, "Drop Image Here")} 
                  alt="Placeholder"
                  className="w-full h-full object-cover" 
                />
              )}
            </div>
          </div>
        );
        
      case TEMPLATE_TYPES.TEXT_LEFT_IMAGE:
        return (
          <div className="flex h-full">
            <div className="w-1/3 bg-gray-200 h-full flex items-center justify-center">
              {currentSlide.image ? (
                <img 
                  src={currentSlide.image.src} 
                  alt="Content" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <img 
                  src={getPlaceholderImage(400, 600, "Drop Image Here")} 
                  alt="Placeholder"
                  className="w-full h-full object-cover" 
                />
              )}
            </div>
            <div className="w-2/3 p-8">
              <h2 className="text-3xl font-semibold mb-4">{currentSlide.title}</h2>
              <ul className="space-y-2 list-disc pl-6">
                {currentSlide.content.map((item, index) => (
                  <li key={index} className="text-lg">{item}</li>
                ))}
              </ul>
            </div>
          </div>
        );
        
      case TEMPLATE_TYPES.IMAGE_GRID:
        return (
          <div className="flex flex-col h-full">
            <div className="p-4 text-center">
              <h2 className="text-3xl font-semibold">{currentSlide.title}</h2>
            </div>
            <div className="flex-1 grid grid-cols-3 grid-rows-3 gap-2 p-4">
              {currentSlide.images.map((image, index) => (
                <div key={index} className="bg-gray-200 flex items-center justify-center">
                  {image ? (
                    <img src={image.src} alt={`Grid ${index + 1}`} className="w-full h-full object-cover" />
                  ) : (
                    <img 
                      src={getPlaceholderImage(300, 300, `Image ${index + 1}`)} 
                      alt={`Placeholder ${index + 1}`}
                      className="w-full h-full object-cover" 
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        );
        
      case TEMPLATE_TYPES.FOUR_GRID:
        return (
          <div className="flex flex-col h-full">
            <div className="p-4 text-center">
              <h2 className="text-3xl font-semibold">{currentSlide.title}</h2>
            </div>
            <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-4 p-6">
              {currentSlide.images.map((image, index) => (
                <div key={index} className="bg-gray-200 flex items-center justify-center">
                  {image ? (
                    <img src={image.src} alt={`Grid ${index + 1}`} className="w-full h-full object-cover" />
                  ) : (
                    <img 
                      src={getPlaceholderImage(400, 300, `Image ${index + 1}`)} 
                      alt={`Placeholder ${index + 1}`}
                      className="w-full h-full object-cover" 
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        );
        
      case TEMPLATE_TYPES.SPLIT_VERTICAL:
        return (
          <div className="flex h-full">
            <div className="w-2/3 p-8">
              <h2 className="text-3xl font-semibold mb-4">{currentSlide.title}</h2>
              <ul className="space-y-2 list-disc pl-6">
                {currentSlide.content.map((item, index) => (
                  <li key={index} className="text-lg">{item}</li>
                ))}
              </ul>
            </div>
            <div className="w-1/3 flex flex-col h-full">
              <div className="flex-1 bg-gray-200 flex items-center justify-center p-1">
                {currentSlide.images[0] ? (
                  <img src={currentSlide.images[0].src} alt="Top" className="w-full h-full object-cover" />
                ) : (
                  <img 
                    src={getPlaceholderImage(400, 300, "Image 1")} 
                    alt="Placeholder 1"
                    className="w-full h-full object-cover" 
                  />
                )}
              </div>
              <div className="flex-1 bg-gray-200 flex items-center justify-center mt-4 p-1">
                {currentSlide.images[1] ? (
                  <img src={currentSlide.images[1].src} alt="Bottom" className="w-full h-full object-cover" />
                ) : (
                  <img 
                    src={getPlaceholderImage(400, 300, "Image 2")} 
                    alt="Placeholder 2"
                    className="w-full h-full object-cover" 
                  />
                )}
              </div>
            </div>
          </div>
        );
        
      default:
        return (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">Unknown slide type</p>
          </div>
        );
    }
  };
  
  // Slide container with 16:9 aspect ratio
  return (
    <div className="relative bg-white shadow-lg" style={{ width: '960px', height: '540px' }}>
      {renderSlideContent()}
    </div>
  );
};

export default SlideEditor;

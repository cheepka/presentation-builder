// SlideEditor.js
// Component for editing the current slide

import React from 'react';
import { usePresentation } from '../context/PresentationContext';
import { TEMPLATE_TYPES } from '../utils/slideTemplates';
import { getPlaceholderImage } from '../utils/imageUtils';
import EditableText from './EditableText';

/**
 * Component for displaying and editing the current slide
 * @returns {React.ReactElement} The SlideEditor component
 */
const SlideEditor = () => {
  const { state } = usePresentation();
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
  
  // Render slide content based on template type
  const renderSlideContent = () => {
    switch (currentSlide.type) {
      case TEMPLATE_TYPES.TITLE:
        return (
          <div className="flex flex-col items-center justify-center h-full text-center p-12">
            <EditableText
              text={currentSlide.title}
              slideId={currentSlide.id}
              field="title"
              className="text-4xl font-bold mb-4"
              as="h1"
            />
            <EditableText
              text={currentSlide.subtitle}
              slideId={currentSlide.id}
              field="subtitle"
              className="text-xl text-gray-600"
              as="h2"
            />
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
              <EditableText
                text={currentSlide.title}
                slideId={currentSlide.id}
                field="title"
                className="text-2xl font-semibold text-white"
                as="h2"
              />
            </div>
          </div>
        );
        
      case TEMPLATE_TYPES.TEXT_RIGHT_IMAGE:
        return (
          <div className="flex h-full">
            <div className="w-2/3 p-8">
              <EditableText
                text={currentSlide.title}
                slideId={currentSlide.id}
                field="title"
                className="text-3xl font-semibold mb-4"
                as="h2"
              />
              <ul className="space-y-2 list-disc pl-6">
                {currentSlide.content.map((item, index) => (
                  <li key={index} className="text-lg">
                    <EditableText
                      text={item}
                      slideId={currentSlide.id}
                      field="content"
                      index={index}
                      className="inline"
                    />
                  </li>
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
              <EditableText
                text={currentSlide.title}
                slideId={currentSlide.id}
                field="title"
                className="text-3xl font-semibold mb-4"
                as="h2"
              />
              <ul className="space-y-2 list-disc pl-6">
                {currentSlide.content.map((item, index) => (
                  <li key={index} className="text-lg">
                    <EditableText
                      text={item}
                      slideId={currentSlide.id}
                      field="content"
                      index={index}
                      className="inline"
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
        
      case TEMPLATE_TYPES.IMAGE_GRID:
        return (
          <div className="relative w-full h-full">
            <div className="grid grid-cols-3 grid-rows-3 gap-1 h-full">
              {Array(9).fill(0).map((_, i) => {
                const gridPosition = `grid${i+1}`;
                const image = currentSlide.images?.[gridPosition];
                return (
                  <div key={i} className="bg-gray-200 relative overflow-hidden">
                    {image ? (
                      <img src={image.url} alt={`Grid ${i + 1}`} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100">
                        <span className="text-xs text-gray-400">Image {i + 1}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            
            {currentSlide.showTitle !== false && (
              <div className="absolute bottom-0 inset-x-0 bg-black bg-opacity-50 p-2 text-white">
                <EditableText
                  text={currentSlide.title}
                  slideId={currentSlide.id}
                  field="title"
                  className="text-xl font-semibold text-center"
                  as="h2"
                />
              </div>
            )}
          </div>
        );
        
      case TEMPLATE_TYPES.FOUR_GRID:
        return (
          <div className="relative w-full h-full">
            <div className="grid grid-cols-2 grid-rows-2 gap-2 h-full p-1">
              {Array(4).fill(0).map((_, i) => {
                const gridPosition = `grid${i+1}`;
                const image = currentSlide.images?.[gridPosition];
                return (
                  <div key={i} className="bg-gray-200 relative overflow-hidden">
                    {image ? (
                      <img src={image.url} alt={`Grid ${i + 1}`} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100">
                        <span className="text-xs text-gray-400">Image {i + 1}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            
            {currentSlide.showTitle !== false && (
              <div className="absolute bottom-0 inset-x-0 bg-black bg-opacity-50 p-2 text-white">
                <EditableText
                  text={currentSlide.title}
                  slideId={currentSlide.id}
                  field="title"
                  className="text-xl font-semibold text-center"
                  as="h2"
                />
              </div>
            )}
          </div>
        );
        
      case TEMPLATE_TYPES.SPLIT_VERTICAL:
        return (
          <div className="flex h-full">
            <div className="w-2/3 p-8">
              <EditableText
                text={currentSlide.title}
                slideId={currentSlide.id}
                field="title"
                className="text-3xl font-semibold mb-4"
                as="h2"
              />
              <ul className="space-y-2 list-disc pl-6">
                {currentSlide.content.map((item, index) => (
                  <li key={index} className="text-lg">
                    <EditableText
                      text={item}
                      slideId={currentSlide.id}
                      field="content"
                      index={index}
                      className="inline"
                    />
                  </li>
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
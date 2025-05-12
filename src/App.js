import React, { useState } from 'react';
import { ChevronUp, ChevronDown, Edit2, Trash2, Image, Plus, Monitor, Type, Layout } from 'lucide-react';
import ImageUpload from './components/ImageUpload';

// Main App Component
function PresentationBuilder() {
  const [slides, setSlides] = useState([
    // Optional pre-populated demo slide for initial view
    {
      uniqueId: "1",
      type: 'fullImage',
      title: 'Your Title Here',
      subtitle: 'Subtitle Text Here',
      attribution: 'Your Name / Company',
      // Default with no custom image
      images: {}
    }
  ]);
  
  const [editingSlide, setEditingSlide] = useState(null);
  const [editForm, setEditForm] = useState({
    title: '',
    content: '',
    attribution: '',
    images: {}
  });

  // Library of templates
  const templateLibrary = [
    {
      id: 'title-slide',
      name: 'Full Image with Title',
      type: 'fullImage'
    },
    {
      id: 'text-image-right',
      name: 'Text + Right Image',
      type: 'rightImage'
    },
    {
      id: 'text-image-left',
      name: 'Text + Left Image',
      type: 'leftImage'
    },
    {
      id: 'text-with-triple-image',
      name: 'Text + Triple Image',
      type: 'rightGrid'
    },
    {
      id: 'nine-image-grid',
      name: '9-Image Grid',
      type: 'imageGrid'
    },
    {
      id: 'text-dual-image',
      name: 'Text + Dual Image',
      type: 'splitVertical'
    },
    {
      id: 'four-image-grid',
      name: '4-Image Grid',
      type: 'fourGrid'
    }
  ];

  // Add a template to the presentation
  const addTemplate = (templateId) => {
    const template = templateLibrary.find(t => t.id === templateId);
    if (template) {
      const newSlide = {
        type: template.type,
        uniqueId: Date.now().toString(),
        title: getDefaultTitle(template.type),
        content: getDefaultContent(template.type),
        images: {} // Initialize empty images object for all slide types
      };
      
      // Add specific properties based on slide type
      if (template.type === 'fullImage') {
        newSlide.subtitle = 'Subtitle Text Here';
        newSlide.attribution = 'Your Name / Company';
      }
      
      if (template.type === 'rightGrid' || template.type === 'leftImage') {
        newSlide.bulletPoints = [
          "First key point goes here",
          "Second important feature or benefit",
          "Third compelling reason or example"
        ];
      }
      
      setSlides([...slides, newSlide]);
    }
  };
  
  // Get default title based on template type
  const getDefaultTitle = (type) => {
    switch(type) {
      case 'fullImage': return 'Your Title Here';
      case 'rightImage': return 'Section Title';
      case 'leftImage': return 'Feature Overview';
      case 'rightGrid': return 'Key Services';
      case 'imageGrid': return 'Portfolio';
      case 'splitVertical': return 'Multi-Purpose Content';
      case 'fourGrid': return 'Product Showcase';
      default: return 'New Slide';
    }
  };
  
  // Get default content based on template type
  const getDefaultContent = (type) => {
    switch(type) {
      case 'fullImage': return '';
      case 'rightImage': 
        return 'This is where you can add your main content. Describe your products, services, or key messages here. This text block supports multiple paragraphs.';
      case 'leftImage': 
        return 'Use this space to highlight features, benefits, or any important information you want to convey to your audience.';
      case 'splitVertical': 
        return 'This layout combines text with dual images. Ideal for comparing before/after scenarios or showing related concepts side by side.';
      case 'rightGrid': 
        return 'This area can contain your main content description. The bullet points below can highlight specific features or services.';
      default: return '';
    }
  };

  // Remove a slide
  const removeSlide = (index) => {
    const newSlides = [...slides];
    newSlides.splice(index, 1);
    setSlides(newSlides);
  };

  // Start editing a slide
  const startEditing = (slide) => {
    setEditingSlide(slide);
    setEditForm({
      title: slide.title || '',
      subtitle: slide.subtitle || '',
      content: slide.content || '',
      attribution: slide.attribution || '',
      bulletPoints: slide.bulletPoints || [],
      images: slide.images || {} // Include images in edit form
    });
  };

  // Save edits to a slide
  const saveEdits = () => {
    if (!editingSlide) return;
    
    const newSlides = slides.map(slide => 
      slide.uniqueId === editingSlide.uniqueId 
        ? {...slide, ...editForm} 
        : slide
    );
    
    setSlides(newSlides);
    setEditingSlide(null);
  };

  // Move slide up or down
  const moveSlide = (index, direction) => {
    const newSlides = [...slides];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (newIndex < 0 || newIndex >= newSlides.length) return;
    
    const slideToMove = newSlides[index];
    newSlides.splice(index, 1);
    newSlides.splice(newIndex, 0, slideToMove);
    
    setSlides(newSlides);
  };

  // Handle image change from ImageUpload component
  const handleImageChange = (position, imageData) => {
    setEditForm({
      ...editForm,
      images: {
        ...editForm.images,
        [position]: imageData
      }
    });
  };

  // Get image URL based on slide type and position
  const getImageUrl = (slide, position, defaultSize = '600x400') => {
    // If there's a custom image for this position, use it
    if (slide.images && slide.images[position] && slide.images[position].url) {
      return slide.images[position].url;
    }
    
    // Otherwise use placeholder
    return `https://via.placeholder.com/${defaultSize}`;
  };

  // Check if image is a placeholder (not custom uploaded)
  const isPlaceholderImage = (slide, position) => {
    return !(slide.images && slide.images[position] && slide.images[position].url);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-gray-900 text-white py-4 px-6">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Presentation Builder</h1>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">Save Presentation</button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Template Library Sidebar */}
        <div className="w-64 bg-gray-800 text-white p-4 overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4">Template Library</h2>
          <div className="space-y-3">
            {templateLibrary.map(template => (
              <div 
                key={template.id} 
                className="p-3 border border-gray-700 rounded hover:bg-gray-700 cursor-pointer transition"
                onClick={() => addTemplate(template.id)}
              >
                <div className="flex items-center space-x-2">
                  {template.type.includes('Image') ? <Image size={16} /> : <Layout size={16} />}
                  <span>{template.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Editing Area */}
        <div className="flex-1 flex">
          {/* Slide List and Order */}
          <div className="w-80 border-r border-gray-300 p-4 overflow-y-auto bg-gray-50">
            <h2 className="text-xl font-semibold mb-4">Slides</h2>
            
            <div className="space-y-3">
              {slides.map((slide, index) => (
                <div
                  key={slide.uniqueId}
                  className="p-3 border border-gray-300 rounded group bg-white shadow-sm hover:shadow"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2 flex-1">
                      <span className="text-gray-500">{index + 1}.</span>
                      <span className="font-medium">{slide.title || 'Untitled Slide'}</span>
                    </div>
                    <div className="flex space-x-1">
                      <button 
                        className="p-1 text-gray-600 hover:text-gray-900"
                        onClick={() => moveSlide(index, 'up')}
                        disabled={index === 0}
                      >
                        <ChevronUp size={16} />
                      </button>
                      <button 
                        className="p-1 text-gray-600 hover:text-gray-900"
                        onClick={() => moveSlide(index, 'down')}
                        disabled={index === slides.length - 1}
                      >
                        <ChevronDown size={16} />
                      </button>
                      <button 
                        className="p-1 text-gray-600 hover:text-gray-900"
                        onClick={() => startEditing(slide)}
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        className="p-1 text-gray-600 hover:text-red-700"
                        onClick={() => removeSlide(index)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {slides.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <p>Add templates from the library to get started</p>
              </div>
            )}
          </div>

          {/* Preview Area */}
          <div className="flex-1 p-6 bg-gray-100 overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">Preview</h2>
            
            {slides.length > 0 ? (
              <div className="space-y-8">
                {slides.map((slide) => (
                  <div key={slide.uniqueId} className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="aspect-video bg-gray-900 relative">
                      {/* Full Image Template */}
                      {slide.type === 'fullImage' && (
                        <div className="w-full h-full relative overflow-hidden">
                          {/* Image with optional user uploaded image */}
                          <div className="absolute inset-0">
                            <img 
                              src={getImageUrl(slide, 'main', '1200x675')} 
                              alt="Background image"
                              className="w-full h-full object-cover opacity-60"
                            />
                          </div>
                          
                          {/* Content overlay */}
                          <div className="absolute inset-0 flex items-center justify-end">
                            <div className="w-1/2 p-10 text-white z-10 text-right">
                              <h3 className="text-6xl font-bold mb-2">{slide.title}</h3>
                              {slide.subtitle && (
                                <h4 className="text-xl mb-6">{slide.subtitle}</h4>
                              )}
                              
                              {slide.attribution && (
                                <div className="mt-12">
                                  <p className="text-sm text-gray-300">{slide.attribution}</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* Right Image Template */}
                      {slide.type === 'rightImage' && (
                        <div className="w-full h-full flex">
                          {/* Left content section */}
                          <div className="w-1/2 bg-gray-900 p-8 flex flex-col justify-center">
                            <div className="ml-4">
                              <h3 className="text-4xl font-bold text-white mb-6">{slide.title}</h3>
                              {slide.content && (
                                <div className="text-white">
                                  <p className="text-sm">{slide.content}</p>
                                </div>
                              )}
                            </div>
                          </div>
                          
                          {/* Right image section - with optional uploaded image */}
                          <div className="w-1/2 bg-gray-800 relative">
                            <img 
                              src={getImageUrl(slide, 'main', '600x675')}
                              alt="Right side image"
                              className="w-full h-full object-cover opacity-70"
                            />
                          </div>
                        </div>
                      )}
                      
                      {/* Left Image Template */}
                      {slide.type === 'leftImage' && (
                        <div className="w-full h-full flex">
                          {/* Left image section - with optional uploaded image */}
                          <div className="w-1/2 bg-gray-800 relative">
                            <img 
                              src={getImageUrl(slide, 'main', '600x675')}
                              alt="Left side image"
                              className="w-full h-full object-cover opacity-70"
                            />
                          </div>
                          
                          {/* Right content section */}
                          <div className="w-1/2 bg-gray-900 p-8 flex flex-col justify-center">
                            <div className="ml-4">
                              <h3 className="text-4xl font-bold text-white mb-6">{slide.title}</h3>
                              {slide.content && (
                                <div className="text-white">
                                  <p className="text-sm">{slide.content}</p>
                                </div>
                              )}
                              {slide.bulletPoints && slide.bulletPoints.length > 0 && (
                                <div className="text-white mt-4">
                                  <ul className="list-disc pl-5 space-y-2">
                                    {slide.bulletPoints.map((point, i) => (
                                      <li key={i}>{point}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* Right Grid Template */}
                      {slide.type === 'rightGrid' && (
                        <div className="w-full h-full flex">
                          {/* Left content section */}
                          <div className="w-1/2 bg-gray-900 p-8 flex flex-col justify-center">
                            <div className="ml-4">
                              <h3 className="text-4xl font-bold text-white mb-6">{slide.title}</h3>
                              <div className="text-white">
                                <p className="text-sm">{slide.content || ''}</p>
                                {slide.bulletPoints && (
                                  <ul className="mt-6 ml-6 list-decimal">
                                    {slide.bulletPoints.map((point, i) => (
                                      <li key={i} className="mb-1">{point}</li>
                                    ))}
                                  </ul>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          {/* Right image grid section - with optional uploaded images */}
                          <div className="w-1/2 grid grid-cols-1 grid-rows-3 gap-1">
                            <div className="relative">
                              <img 
                                src={getImageUrl(slide, 'grid1', '600x225')}
                                alt="Top grid image"
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="relative">
                              <img 
                                src={getImageUrl(slide, 'grid2', '600x225')}
                                alt="Middle grid image"
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="relative">
                              <img 
                                src={getImageUrl(slide, 'grid3', '600x225')}
                                alt="Bottom grid image"
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* Split Vertical Template */}
                      {slide.type === 'splitVertical' && (
                        <div className="w-full h-full flex">
                          {/* Left content section */}
                          <div className="w-1/2 bg-gray-900 p-8 flex flex-col justify-center">
                            <div className="ml-4">
                              <h3 className="text-4xl font-bold text-white mb-6">{slide.title}</h3>
                              {slide.content && (
                                <div className="text-white">
                                  <p className="text-sm">{slide.content}</p>
                                </div>
                              )}
                            </div>
                          </div>
                          
                          {/* Right split image section - with optional uploaded images */}
                          <div className="w-1/2 grid grid-rows-2 gap-1">
                            <div className="relative">
                              <img 
                                src={getImageUrl(slide, 'top', '600x337')}
                                alt="Top image"
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="relative">
                              <img 
                                src={getImageUrl(slide, 'bottom', '600x337')}
                                alt="Bottom image"
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* Image Grid Template */}
                      {slide.type === 'imageGrid' && (
                        <div className="w-full h-full">
                          <div className="grid grid-cols-3 grid-rows-3 gap-1 h-full">
                            {Array(9).fill(0).map((_, i) => (
                              <div key={i} className="relative">
                                <img 
                                  src={getImageUrl(slide, `grid${i+1}`, '400x225')}
                                  alt={`Grid image ${i+1}`}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            ))}
                          </div>
                          
                          {/* Overlay title */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <h3 className="text-4xl font-bold text-white bg-gray-900 bg-opacity-70 px-6 py-3">{slide.title}</h3>
                          </div>
                        </div>
                      )}
                      
                      {/* Four Grid Template */}
                      {slide.type === 'fourGrid' && (
                        <div className="w-full h-full">
                          <div className="grid grid-cols-2 grid-rows-2 gap-1 h-full">
                            <div className="relative">
                              <img 
                                src={getImageUrl(slide, 'grid1', '600x337')}
                                alt="Top left image"
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="relative">
                              <img 
                                src={getImageUrl(slide, 'grid2', '600x337')}
                                alt="Top right image"
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="relative">
                              <img 
                                src={getImageUrl(slide, 'grid3', '600x337')}
                                alt="Bottom left image"
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="relative">
                              <img 
                                src={getImageUrl(slide, 'grid4', '600x337')}
                                alt="Bottom right image"
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>
                          
                          {/* Overlay title */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <h3 className="text-4xl font-bold text-white bg-gray-900 bg-opacity-70 px-6 py-3">{slide.title}</h3>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="p-4 flex justify-end items-center">
                      <button 
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                        onClick={() => startEditing(slide)}
                      >
                        Edit Content
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-10 text-center">
                <div className="flex justify-center mb-4">
                  <Monitor size={48} className="text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No Slides Yet</h3>
                <p className="text-gray-600">Add templates from the library to begin creating your presentation</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {editingSlide && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-screen overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-6">Edit Slide Content</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    value={editForm.title}
                    onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                  />
                </div>
                
                {editingSlide.subtitle !== undefined && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
                    <input
                      type="text"
                      value={editForm.subtitle || ''}
                      onChange={(e) => setEditForm({...editForm, subtitle: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                    />
                  </div>
                )}
                
                {editingSlide.content !== undefined && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                    <textarea
                      value={editForm.content}
                      onChange={(e) => setEditForm({...editForm, content: e.target.value})}
                      rows={5}
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                    ></textarea>
                  </div>
                )}
                
                {editingSlide.bulletPoints !== undefined && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bullet Points</label>
                    {(editForm.bulletPoints || []).map((point, index) => (
                      <div key={index} className="flex items-center mb-2">
                        <input
                          type="text"
                          value={point}
                          onChange={(e) => {
                            const newBulletPoints = [...(editForm.bulletPoints || [])];
                            newBulletPoints[index] = e.target.value;
                            setEditForm({...editForm, bulletPoints: newBulletPoints});
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded"
                        />
                        {index > 0 && (
                          <button
                            onClick={() => {
                              const newBulletPoints = [...(editForm.bulletPoints || [])];
                              newBulletPoints.splice(index, 1);
                              setEditForm({...editForm, bulletPoints: newBulletPoints});
                            }}
                            className="ml-2 p-1 text-gray-500 hover:text-red-600"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      onClick={() => {
                        setEditForm({
                          ...editForm, 
                          bulletPoints: [...(editForm.bulletPoints || []), "New point"]
                        });
                      }}
                      className="mt-2 text-blue-600 hover:text-blue-800 text-sm flex items-center"
                    >
                      <Plus size={14} className="mr-1" /> Add bullet point
                    </button>
                  </div>
                )}
                
                {editingSlide.attribution !== undefined && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Attribution</label>
                    <input
                      type="text"
                      value={editForm.attribution}
                      onChange={(e) => setEditForm({...editForm, attribution: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                    />
                  </div>
                )}

                {/* Image Upload Section */}
                <div className="mt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Images</h3>
                  
                  {/* Full Image Template */}
                  {editingSlide.type === 'fullImage' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Background Image</label>
                      <div className="aspect-video max-h-80">
                        <ImageUpload
                          initialImage={editForm.images?.main?.url}
                          placeholderSize="1200x675"
                          onImageChange={(imageData) => handleImageChange('main', imageData)}
                          className="h-full rounded overflow-hidden"
                          label="Upload Image"
                        />
                      </div>
                    </div>
                  )}
                  
                  {/* Right Image Template */}
                  {editingSlide.type === 'rightImage' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Right Side Image</label>
                      <div className="aspect-video max-h-80">
                        <ImageUpload
                          initialImage={editForm.images?.main?.url}
                          placeholderSize="600x675"
                          onImageChange={(imageData) => handleImageChange('main', imageData)}
                          className="h-full rounded overflow-hidden"
                          label="Upload Image"
                        />
                      </div>
                    </div>
                  )}
                  
                  {/* Left Image Template */}
                  {editingSlide.type === 'leftImage' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Left Side Image</label>
                      <div className="aspect-video max-h-80">
                        <ImageUpload
                          initialImage={editForm.images?.main?.url}
                          placeholderSize="600x675"
                          onImageChange={(imageData) => handleImageChange('main', imageData)}
                          className="h-full rounded overflow-hidden"
                          label="Upload Image"
                        />
                      </div>
                    </div>
                  )}
                  
                  {/* Right Grid Template */}
                  {editingSlide.type === 'rightGrid' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Grid Images</label>
                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <div className="text-xs text-gray-500 mb-1">Top Image</div>
                          <ImageUpload
                            initialImage={editForm.images?.grid1?.url}
                            placeholderSize="600x225"
                            onImageChange={(imageData) => handleImageChange('grid1', imageData)}
                            className="h-32 rounded overflow-hidden"
                            label="Upload Image"
                          />
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 mb-1">Middle Image</div>
                          <ImageUpload
                            initialImage={editForm.images?.grid2?.url}
                            placeholderSize="600x225"
                            onImageChange={(imageData) => handleImageChange('grid2', imageData)}
                            className="h-32 rounded overflow-hidden"
                            label="Upload Image"
                          />
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 mb-1">Bottom Image</div>
                          <ImageUpload
                            initialImage={editForm.images?.grid3?.url}
                            placeholderSize="600x225"
                            onImageChange={(imageData) => handleImageChange('grid3', imageData)}
                            className="h-32 rounded overflow-hidden"
                            label="Upload Image"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Split Vertical Template */}
                  {editingSlide.type === 'splitVertical' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Split Images</label>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <div className="text-xs text-gray-500 mb-1">Top Image</div>
                          <ImageUpload
                            initialImage={editForm.images?.top?.url}
                            placeholderSize="600x337"
                            onImageChange={(imageData) => handleImageChange('top', imageData)}
                            className="h-40 rounded overflow-hidden"
                            label="Upload Image"
                          />
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 mb-1">Bottom Image</div>
                          <ImageUpload
                            initialImage={editForm.images?.bottom?.url}
                            placeholderSize="600x337"
                            onImageChange={(imageData) => handleImageChange('bottom', imageData)}
                            className="h-40 rounded overflow-hidden"
                            label="Upload Image"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Image Grid Template */}
                  {editingSlide.type === 'imageGrid' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Grid Images</label>
                      <div className="grid grid-cols-3 gap-2">
                        {Array(9).fill(0).map((_, i) => (
                          <div key={i}>
                            <div className="text-xs text-gray-500 mb-1">Image {i+1}</div>
                            <ImageUpload
                              initialImage={editForm.images?.[`grid${i+1}`]?.url}
                              placeholderSize="400x225"
                              onImageChange={(imageData) => handleImageChange(`grid${i+1}`, imageData)}
                              className="h-24 rounded overflow-hidden"
                              label="Upload Image"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Four Grid Template */}
                  {editingSlide.type === 'fourGrid' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Grid Images</label>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <div className="text-xs text-gray-500 mb-1">Top Left</div>
                          <ImageUpload
                            initialImage={editForm.images?.grid1?.url}
                            placeholderSize="600x337"
                            onImageChange={(imageData) => handleImageChange('grid1', imageData)}
                            className="h-40 rounded overflow-hidden"
                            label="Upload Image"
                          />
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 mb-1">Top Right</div>
                          <ImageUpload
                            initialImage={editForm.images?.grid2?.url}
                            placeholderSize="600x337"
                            onImageChange={(imageData) => handleImageChange('grid2', imageData)}
                            className="h-40 rounded overflow-hidden"
                            label="Upload Image"
                          />
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 mb-1">Bottom Left</div>
                          <ImageUpload
                            initialImage={editForm.images?.grid3?.url}
                            placeholderSize="600x337"
                            onImageChange={(imageData) => handleImageChange('grid3', imageData)}
                            className="h-40 rounded overflow-hidden"
                            label="Upload Image"
                          />
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 mb-1">Bottom Right</div>
                          <ImageUpload
                            initialImage={editForm.images?.grid4?.url}
                            placeholderSize="600x337"
                            onImageChange={(imageData) => handleImageChange('grid4', imageData)}
                            className="h-40 rounded overflow-hidden"
                            label="Upload Image"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3 rounded-b-lg">
              <button 
                className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
                onClick={() => setEditingSlide(null)}
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={saveEdits}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PresentationBuilder;
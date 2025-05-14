// KnowledgeLibrary.js
// Component for displaying and managing knowledge items (text and PDFs)

import React, { useRef } from 'react';
import { usePresentation } from '../context/PresentationContext';
import { Upload, X, FileText, File } from 'lucide-react';
import { ACTIONS } from '../context/PresentationContext';
import { 
  createKnowledgeObject, 
  validateKnowledgeFile, 
  isValidFileSize,
  extractTextFromFile
} from '../utils/knowledgeUtils';

/**
 * Component for displaying and managing the knowledge library
 * @returns {React.ReactElement} The KnowledgeLibrary component
 */
const KnowledgeLibrary = () => {
  const { state, dispatch } = usePresentation();
  const { knowledgeLibrary } = state;
  const fileInputRef = useRef(null);
  
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };
  
  const handleFileChange = async (event) => {
    const files = Array.from(event.target.files);
    
    if (files.length === 0) return;
    
    // Process each file
    for (const file of files) {
      // Validate file type
      const validation = validateKnowledgeFile(file);
      if (!validation.isValid) {
        alert(`${file.name} is not a valid knowledge file. Please upload PDF or text files.`);
        continue;
      }
      
      // Validate file size
      if (!isValidFileSize(file, 10)) { // 10MB limit
        alert(`${file.name} is too large. Maximum file size is 10MB.`);
        continue;
      }
      
      try {
        let source = file;
        
        // If it's a text file, extract its content
        if (validation.type === 'text') {
          const content = await extractTextFromFile(file);
          source = {
            name: file.name,  // Explicitly preserve the filename
            content,
            type: validation.type
          };
        }
        
        // Create knowledge object
        const knowledgeObject = await createKnowledgeObject(source, validation.type);
        
        // Add to library
        dispatch({
          type: ACTIONS.ADD_KNOWLEDGE,
          payload: knowledgeObject
        });
      } catch (error) {
        console.error('Error processing file:', error);
        alert(`Failed to process ${file.name}. Please try again.`);
      }
    }
    
    // Reset file input
    event.target.value = '';
  };
  
  const handleKnowledgeDelete = (id) => {
    dispatch({
      type: ACTIONS.REMOVE_KNOWLEDGE,
      payload: id
    });
  };
  
  // Icon component based on item type
  const ItemIcon = ({ type }) => {
    if (type === 'pdf') return <File size={16} />;
    if (type === 'text') return <FileText size={16} />;
    return <FileText size={16} />;
  };

  return (
    <div className="h-full">
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept=".pdf,.txt,.md,.markdown,.html,.json,.csv"
        multiple
        onChange={handleFileChange}
      />
      
      {/* Knowledge library container */}
      <div className="p-2">
        {knowledgeLibrary.length === 0 ? (
          // Empty state
          <div className="text-center py-6 text-gray-500">
            <p>No knowledge items yet</p>
            <p className="text-sm mb-4">Upload PDF or text files to use as knowledge sources</p>
            <button
              className="inline-flex items-center px-4 py-2 border border-blue-300 dark:border-gray-600 rounded-lg text-blue-500 dark:text-gray-300 bg-blue-50 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-gray-600 transition-colors duration-200"
              onClick={handleUploadClick}
            >
              <Upload size={16} className="mr-2" />
              Upload Files
            </button>
          </div>
        ) : (
          <>
            {/* Knowledge items list */}
            <div className="mb-4">
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {knowledgeLibrary.map((item) => (
                  <div 
                    key={item.id}
                    className="relative group rounded overflow-hidden border border-gray-200 p-2 hover:border-gray-400 transition-colors"
                  >
                    <div className="flex items-center">
                      <div className="mr-2 text-gray-500">
                        <ItemIcon type={item.type} />
                      </div>
                      <div className="flex-1 truncate">
                        <p className="font-medium text-sm">{item.originalFilename}</p>
                      </div>
                      
                      {/* Delete button */}
                      <button
                        className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleKnowledgeDelete(item.id)}
                        title="Remove from library"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Upload more button */}
            <button
              className="w-full flex items-center justify-center px-4 py-2 border border-blue-300 dark:border-gray-600 rounded-lg text-blue-500 dark:text-gray-300 bg-blue-50 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-gray-600 transition-colors duration-200"
              onClick={handleUploadClick}
            >
              <Upload size={16} className="mr-2" />
              Upload More Files
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default KnowledgeLibrary; 
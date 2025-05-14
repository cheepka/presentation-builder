// knowledgeUtils.js
// Utility functions for handling knowledge items in the presentation builder

/**
 * Generates a unique ID for knowledge items
 * @returns {string} - A unique identifier
 */
export function generateKnowledgeId() {
  return 'k-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
}

/**
 * Converts a File object to a base64 string
 * @param {File} file - The file to convert
 * @returns {Promise<string>} - Promise resolving to the base64 string
 */
export function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

/**
 * Gets a clean title from a filename by removing extension
 * @param {string} filename - The filename
 * @returns {string} - Clean title
 */
export function getTitleFromFilename(filename) {
  // Remove file extension
  const title = filename.replace(/\.[^/.]+$/, "");
  // Replace underscores and hyphens with spaces
  return title.replace(/[_-]/g, " ");
}

/**
 * Creates a knowledge object for storage in the knowledge library
 * @param {File|Object} source - The file or text object
 * @param {string} type - The type of knowledge item ('pdf', 'text')
 * @returns {Promise<Object>} - Promise resolving to the knowledge object
 */
export async function createKnowledgeObject(source, type) {
  try {
    // For text input (not file)
    if (type === 'text' && !source.name) {
      return {
        id: generateKnowledgeId(),
        title: source.title || 'Untitled Note',
        content: source.content || '',
        type: 'text',
        dateAdded: new Date().toISOString(),
        originalFilename: source.title || 'Untitled Note'
      };
    }
    
    // For file input
    const base64 = type === 'pdf' ? await fileToBase64(source) : null;
    
    // Get a clean title from the filename
    let title = source.name || 'Unknown File';
    if (source.name) {
      title = getTitleFromFilename(source.name);
    }
    
    return {
      id: generateKnowledgeId(),
      title: title,
      content: type === 'text' ? source.content || '' : null,
      type: type,
      size: source.size,
      dateAdded: new Date().toISOString(),
      // Only store data URL for PDFs
      data: type === 'pdf' ? base64 : null,
      // Store original filename
      originalFilename: source.name || title
    };
  } catch (error) {
    console.error('Error creating knowledge object:', error);
    throw error;
  }
}

/**
 * Validates that a file is an accepted knowledge type
 * @param {File} file - File to validate
 * @returns {Object} - Result with type and validity
 */
export function validateKnowledgeFile(file) {
  // For PDFs
  if (file.type === 'application/pdf') {
    return { isValid: true, type: 'pdf' };
  }
  
  // For text files - check MIME type first
  const textTypes = [
    'text/plain', 
    'text/markdown', 
    'text/html',
    'application/json',
    'text/csv'
  ];
  
  if (textTypes.includes(file.type)) {
    return { isValid: true, type: 'text' };
  }
  
  // If MIME type check fails, check file extension as fallback
  const fileName = file.name.toLowerCase();
  const textExtensions = ['.txt', '.md', '.markdown', '.html', '.json', '.csv'];
  
  for (const ext of textExtensions) {
    if (fileName.endsWith(ext)) {
      return { isValid: true, type: 'text' };
    }
  }
  
  return { isValid: false, type: null };
}

/**
 * Validates file size
 * @param {File} file - File to validate
 * @param {number} maxSizeMB - Maximum size in MB
 * @returns {boolean} - Whether the file size is valid
 */
export function isValidFileSize(file, maxSizeMB = 10) {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  return file.size <= maxSizeBytes;
}

/**
 * Extracts text content from a file
 * @param {File} file - Text file to read
 * @returns {Promise<string>} - Promise resolving to the text content
 */
export function extractTextFromFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
} 
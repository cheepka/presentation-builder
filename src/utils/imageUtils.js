/**
 * Image utility functions for the Presentation Builder
 */

/**
 * Optimize an image file for use in presentations
 * Compresses the image and converts it to an appropriate format
 * 
 * @param {File} file - The image file to process
 * @param {Object} options - Options for optimization
 * @param {number} [options.maxWidth=1920] - Maximum width in pixels
 * @param {number} [options.maxHeight=1080] - Maximum height in pixels
 * @param {number} [options.quality=0.8] - JPEG quality (0.0 to 1.0)
 * @returns {Promise<{ blob: Blob, url: string, width: number, height: number }>} - Optimized image data
 */
export const optimizeImage = async (file, options = {}) => {
  const {
    maxWidth = 1920,
    maxHeight = 1080,
    quality = 0.8
  } = options;
  
  return new Promise((resolve, reject) => {
    // Create image element to load the file
    const img = new Image();
    img.onload = () => {
      // Create canvas for resizing
      const canvas = document.createElement('canvas');
      
      // Calculate new dimensions while maintaining aspect ratio
      let width = img.width;
      let height = img.height;
      
      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }
      
      if (height > maxHeight) {
        width = (width * maxHeight) / height;
        height = maxHeight;
      }
      
      // Set canvas dimensions
      canvas.width = width;
      canvas.height = height;
      
      // Draw image on canvas
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);
      
      // Convert to Blob
      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error('Failed to create image blob'));
          return;
        }
        
        // Create object URL for the blob
        const url = URL.createObjectURL(blob);
        
        resolve({
          blob,
          url,
          width,
          height
        });
      }, 'image/jpeg', quality);
    };
    
    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };
    
    // Load image from file
    img.src = URL.createObjectURL(file);
  });
};

/**
 * Cleanup image URLs to prevent memory leaks
 * 
 * @param {Object} images - Object with image data
 */
export const cleanupImageUrls = (images) => {
  if (!images) return;
  
  Object.values(images).forEach(image => {
    if (image && image.url && image.url.startsWith('blob:')) {
      URL.revokeObjectURL(image.url);
    }
  });
};

/**
 * Generate a placeholder background based on position
 * 
 * @param {string|number} position - Position identifier (e.g., 'grid1', 'top', etc.)
 * @returns {Object} - CSS style object
 */
export const getPlaceholderStyle = (position) => {
  // Extract digits from positions like 'grid1' or use a default
  const positionIndex = typeof position === 'string' ? 
    parseInt(position.replace(/[^0-9]/g, '') || '0', 10) : 
    0;
  
  // Calculate a shade of gray, alternating between lighter and darker
  const baseValue = 50 + (positionIndex * 5) % 20;
  
  return {
    backgroundColor: `rgb(${baseValue}, ${baseValue}, ${baseValue})`
  };
};

export default {
  optimizeImage,
  cleanupImageUrls,
  getPlaceholderStyle
};
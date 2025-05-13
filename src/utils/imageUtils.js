// imageUtils.js
// Utility functions for handling images in the presentation builder

/**
 * Converts a File object to a base64 string
 * @param {File} file - The image file to convert
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
 * Creates an image object for storage in the image library
 * @param {File} file - The image file
 * @returns {Promise<Object>} - Promise resolving to the image object
 */
export async function createImageObject(file) {
  try {
    const base64 = await fileToBase64(file);
    return {
      id: generateImageId(),
      name: file.name,
      type: file.type,
      size: file.size,
      dateAdded: new Date().toISOString(),
      src: base64,
    };
  } catch (error) {
    console.error('Error creating image object:', error);
    throw error;
  }
}

/**
 * Generates a placeholder image URL with specified dimensions
 * @param {number} width - Width of the placeholder image
 * @param {number} height - Height of the placeholder image
 * @param {string} text - Optional text to display on the placeholder
 * @returns {string} - Placeholder image URL
 */
export function getPlaceholderImage(width = 400, height = 300, text = '') {
  // Return null to avoid using external placeholders that don't fit properly
  // The UploadableImage component will use styled divs instead
  return null;
}

/**
 * Validates that a file is an accepted image type
 * @param {File} file - File to validate
 * @returns {boolean} - Whether the file is a valid image
 */
export function isValidImageFile(file) {
  const acceptedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  return acceptedTypes.includes(file.type);
}

/**
 * Validates image file size
 * @param {File} file - File to validate
 * @param {number} maxSizeMB - Maximum size in MB
 * @returns {boolean} - Whether the file size is valid
 */
export function isValidImageSize(file, maxSizeMB = 5) {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  return file.size <= maxSizeBytes;
}

/**
 * Generates a unique ID for an image
 * @returns {string} - Unique ID
 */
function generateImageId() {
  return 'img_' + Date.now().toString(36) + Math.random().toString(36).substring(2);
}

/**
 * @param {string} camelCaseString - A string to format.
 * @returns {string} The string formatted with spaces and capitalization.
 */
export function formatCamelCase(camelCaseString) {
  return camelCaseString
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase());
};

/**
 * @param {string} camelCaseString - A string to format.
 * @returns {string} The string formatted with spaces, capitalization and a dash between words.
 */
export function formatCamelCaseWithDash(camelCaseString) {
  return camelCaseString
    .replace(/([A-Z])/g, '-$1')
    .replace(/^-/, '')
    .replace(/^./, str => str.toUpperCase());
};

/**
 * Adds an ellipsis to a string if it exceeds the limit.
 * @param {string} message - The string to shorten.
 * @param {number} length - The maximum characters allowed.
 * @returns {string}
 */
export const truncate = (message, length) => {
  if (!message) {
    return '';
  }
  return message.length > length 
    ? message.slice(0, length).trim() + '...' 
    : message;
};

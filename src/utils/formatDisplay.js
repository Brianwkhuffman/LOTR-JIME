/**
 *
 * @param {string} camelCaseString - A string to format.
 * @returns {string} The string formatted with spaces and capitalization.
 */
export function formatCamelCase(camelCaseString) {
  return camelCaseString
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase());
};

/**
 *
 * @param {string} camelCaseString - A string to format.
 * @returns {string} The string formatted with spaces, capitalization and a dash between words.
 */
export function formatCamelCaseWithDash(camelCaseString) {
  return camelCaseString
    .replace(/([A-Z])/g, '-$1')
    .replace(/^-/, '')
    .replace(/^./, str => str.toUpperCase());
};

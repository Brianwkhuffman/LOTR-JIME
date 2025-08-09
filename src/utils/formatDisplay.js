/**
 *
 * @param {string} camelCaseString - A string to format.
 * @returns {string} The string formatted with spaces and capitalization.
 */
function formatCamelCase(camelCaseString) {
  return camelCaseString
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase());
};

export { formatCamelCase };

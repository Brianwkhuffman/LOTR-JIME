
/**
 * Gets the asset image for a given trait.
 * @param {string} img - The trait name (e.g., 'strength', 'agility').
 * @returns {string} The path to the image asset.
 */
export function getIconImageSrc(img) {
  // TODO: Add any new icons to list here
  // Can remove list once all uploaded
  const assets = [
    '1hand',
    '2hand',
    'agility',
    'armor',
    'dmg',
    'equipPh',
    'fate',
    'fate2',
    'fear',
    'heroPh',
    'lore',
    'might',
    'mount',
    'ranged',
    'rolePh',
    'spirit',
    'success',
    'trinket',
    'weaknessPh',
    'wild',
    'wisdom',
    'wit'
  ];
  if (!img) {
    return '';
  }
  const name = img.toLowerCase();
  if (assets.includes(name)) {
    return `/assets/${name}.png`;
  }
  return '';
}


/**
 * Gets the asset image for a given trait.
 * @param {string} trait - The trait name (e.g., 'strength', 'agility').
 * @returns {string} The path to the image asset.
 */
export function getTraitImageSrc(trait) {
  // TODO: can remove list once all icons uploaded
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
  if (!trait) {
    return '';
  }
  const name = trait.toLowerCase();
  if (assets.includes(name)) {
    return `/assets/${name}.png`;
  }
  return '';
}

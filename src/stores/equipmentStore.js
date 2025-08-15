import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import equipData from '/src/data/equipCards.json';

/**
 * @typedef {Object} EquipmentItem
 * @property {number} id
 * @property {string} type
 * @property {string} item
 * @property {string} name
 * @property {string} tier
 * @property {string|null} trait
 * @property {number} upgrade
 * @property {boolean} ranged
 * @property {string} description
 * @property {string} collection
 */

/**
 * @typedef {Object.<string, EquipmentItem[]>} EquipmentMap
 */

export const useEquipmentStore = defineStore('equipmentStore', () => {
  /** @type {import('vue').Ref<EquipmentMap>} */
  const equipList = ref(equipData);

  const getEquipmentTypes = computed(() => {
    return Object.keys(equipList.value);
  });

  const getEquipmentListByType = (type) => {
    return equipList.value[type];
  };

  const getTier1EquipmentByType = (type, tier) => {
    return equipList.value[type].filter(item => item.tier === tier);
  };

  return {
    equipList,
    getEquipmentTypes,
    getEquipmentListByType,
    getTier1EquipmentByType
  };
});

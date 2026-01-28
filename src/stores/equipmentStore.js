import axios from 'axios';
import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useEquipmentStore = defineStore('equipmentStore', () => {
  const url = '/data/equipCards.json';
  const loading = ref(false);
  const error = ref(null);
  const equipmentMap = ref({});
  const equipTypes = ref([]);

  const fetchEquipCards = async () => {
    const hasData = Object.keys(equipmentMap.value).length && equipTypes.value.length;
    if (hasData) {
      return;
    }

    loading.value = true;
    try {
      const response = await axios.get(url);
      const data = response.data;
      equipmentMap.value = data;
      equipTypes.value = Object.keys(data);
    }
    catch (e) {
      error.value = e.message;
    }
    finally {
      loading.value = false;
    }
  };

  const getEquipmentListByType = (type) => {
    return equipmentMap.value[type];
  };

  /**
   * Retrieves and formats a list of equipment options based on the specified type.
   * It filters equipment to include only Tier I items.
   *
   * Note: Mounts have no tiers so it simply returns the list.
   *
   * @param {string} type - The category of equipment to retrieve: 'armors', 'weapons', 'supports', 'trinkets' & 'mounts'
   * @returns {Array<{label: string, value: string}>}
   * An array of objects where `label` is the tier 1 equipment name and `value` is the equipment's family type.
   */
  const getEquipmentOptionsByType = (type) => {
    const optionsMap = new Map();
    const equipTypeList = getEquipmentListByType(type);
    let filteredList;

    // Mounts have no tiers
    if (type === 'mounts') {
      filteredList = equipTypeList;
    }
    else {
      filteredList = equipTypeList.filter(equip => equip.tier === 'I');
    }

    for (const equip of filteredList) {
      optionsMap.set(equip.family, {
        label: equip.name,
        value: equip.family
      });
    }
    return Array.from(optionsMap.values());
  };

  const getAllHandOptions = () => {
    const weapons = getEquipmentListByType('weapons');
    const supports = getEquipmentListByType('supports');
    const allHands = [...weapons, ...supports];
    const filteredHands = allHands.filter(hand => hand.tier === 'I');
    const optionsMap = new Map();

    for (const hand of filteredHands) {
      let labelStr = '';
      if (hand.type === 'Support') {
        labelStr = `${hand.name}s - ${hand.type}`;
      }
      else {
        labelStr = `${hand.name}`;
      }

      optionsMap.set(hand.family, {
        label: labelStr,
        value: hand.family
      });
    }
    const optionsList = Array.from(optionsMap.values());
    const sortedOptions = optionsList.sort((a, b) => a.label.localeCompare(b.label));
    return sortedOptions;
  };

  const getEquipCardsByTypeAndFamily = (type, family) => {
    if (type === 'weapons') {
      const supportTypes = ['Banner', 'Harp', 'Horn', 'Shield'];
      if (supportTypes.indexOf(family) > -1) {
        type = 'supports';
      }
    }
    const equipTypeList = getEquipmentListByType(type);
    const familyCards = equipTypeList.filter(equip => equip.family === family);
    return familyCards;
  };

  return {
    error,
    loading,
    equipmentMap,
    equipTypes,
    fetchEquipCards,
    getEquipmentListByType,
    getEquipmentOptionsByType,
    getAllHandOptions,
    getEquipCardsByTypeAndFamily
  };
});

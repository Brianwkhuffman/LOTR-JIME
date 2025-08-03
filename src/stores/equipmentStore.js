import { defineStore } from 'pinia';
import { ref } from 'vue';
import equips from '/src/data/equipCards.json'

export const useEquipStore = defineStore('equip', () => {
  const equipList = ref(equips);

  const getEquipTypesList = () => {
   return Object.key(equipList);
  };

  const getEquipmentListByType = (type) => {
    return equipList.value[type]
  };

  return {equipList, getEquipTypesList, getEquipmentListByType};
});

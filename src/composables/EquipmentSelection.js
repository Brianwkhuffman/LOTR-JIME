import { ref, computed } from 'vue';
import { useEquipmentStore } from 'stores/equipmentStore.js';

export const useEquipmentSelection = (equipType, maxSlots) => {
  const equipStore = useEquipmentStore();
  
  const selectedType = ref({ label: '', value: '' });
  const confirmedItems = ref([]);

  const familyOptions = computed(() => {
    return equipStore.getEquipmentOptionsByType(equipType);
  });

  const filteredCards = computed(() => {
    if (selectedType.value?.value) {
      return equipStore.getEquipCardsByTypeAndFamily(
        equipType, 
        selectedType.value.value
      );
    }

    return [];
  });

  const clearSelection = () => {
    selectedType.value = [];
  };

  const toggleCardSelection = (card) => {
    const index = confirmedItems.value.findIndex((i) => i.id === card.id);
    
    // Remove already selected item
    if (index > -1) {
      return confirmedItems.value.splice(index, 1);
    }

    // Two handed replaces everything
    const isTwoHanded = card.hands === 2;
    if (isTwoHanded) {
      return confirmedItems.value = [card];
    }
    
    // One handed and non-weapon checks
    const hasTwoHanded = confirmedItems.value.some((i) => i.hands === 2);
    if (hasTwoHanded) {
      // If two handed already selected, replace it
      return confirmedItems.value = [card];
    } 
    
    const currentSlotsUsed = confirmedItems.value.reduce((sum, i) => sum + (i.hands || 1), 0);
    if (currentSlotsUsed < maxSlots) {  
      return confirmedItems.value.push(card);
    } else {
      confirmedItems.value.splice(0, 1);
      return confirmedItems.value.push(card);
    }
  };

  return {
    selectedType,
    confirmedItems,
    familyOptions,
    filteredCards,
    clearSelection,
    toggleCardSelection
  };
};

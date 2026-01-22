import { ref, computed } from 'vue';
import { useEquipmentStore } from 'stores/equipmentStore.js';

export function useEquipmentSelection(equipType) {
  const equipStore = useEquipmentStore();
  
  // 1. The reactive state for the dropdown selection
  const selectedType = ref({ label: '', value: '' });

  // 2. The options for the QSelect (e.g., all Armor families)
  const familyOptions = computed(() => {
    return equipStore.getEquipmentOptionsByType(equipType);
  });

  // 3. The filtered cards based on that selection
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
    selectedType.value = null;
  };

  return {
    selectedType,
    familyOptions,
    filteredCards,
    clearSelection
  };
}

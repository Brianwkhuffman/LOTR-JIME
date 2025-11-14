<script setup>
import { useEquipmentStore } from 'stores/equipmentStore.js';
import { useDeckStore } from 'stores/deckStore';
import { storeToRefs } from 'pinia';

const equipStore = useEquipmentStore();
const deckStore = useDeckStore();

const emit = defineEmits(['nextStep']);
const { loading: equipLoading } = storeToRefs(equipStore);
const { loading: deckLoading } = storeToRefs(deckStore);

const addEquipCards = () => {
  emit('nextStep');
};

// Armor/weapons/support all have 4 tiers
// Trinkets all 3 tiers except Crown of Shadows (1 tier)
// Mounts no tiers
</script>

<template>
  <div v-if="equipLoading && deckLoading" class="row justify-center">
    <q-spinner-oval color="primary" size="10rem" />
  </div>

  <div v-else style="display: grid; place-items: center;">

    <div><p>Armor</p></div>
    <div><p>Weapons</p></div>
    <div><p>Trinket</p></div>
    <div><p>Mount</p></div>

    <div class="q-pa-md row justify-between">
      <q-btn color="primary" @click="addEquipCards">
        Select Equipment
      </q-btn>
    </div>

  </div>
</template>

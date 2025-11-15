<script setup>
import { useEquipmentStore } from 'stores/equipmentStore.js';
import { useDeckStore } from 'stores/deckStore';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';

const equipStore = useEquipmentStore();
const deckStore = useDeckStore();

const emit = defineEmits(['nextStep']);
const { loading: equipLoading } = storeToRefs(equipStore);
const { loading: deckLoading, selectedArmor } = storeToRefs(deckStore);

const addEquipCards = () => {
  // TODO: Save to deck store on each equip choice or at the end?
  emit('nextStep');
};

const armorSlide = ref('');
// Might need 2 refs for weapons, since one hero can have 2??

// Armor/weapons/support all have 4 tiers
// Trinkets all 3 tiers except Crown of Shadows (1 tier)
// Mounts no tiers

const getEquipTypeFromStore = (type) => {
  return equipStore.getEquipmentOptionsByType(type);
};

const getEquipFamily = computed(() => {
  const hasData = selectedArmor.value;
  if (hasData) {
    const family = equipStore.getEquipCardsByTypeAndFamily('armors', selectedArmor.value.label);
    return family;
  }
  return null;
});
</script>

<template>
  <div v-if="equipLoading && deckLoading" class="row justify-center">
    <q-spinner-oval color="primary" size="10rem" />
  </div>

  <div v-else style="display: grid; place-items: center;">

    <q-list padding bordered class="rounded-borders">
      <q-expansion-item
        dense
        dense-toggle
        expand-separator
        icon="perm_identity"
        label="Armors"
      >
        <q-select
          :options="getEquipTypeFromStore('armors')"
          v-model="selectedArmor"
          outlined
          stack-label
          dense
          color="primary"
          class="q-pa-md"
        />

        <q-carousel
          v-if="selectedArmor.value"
          v-model="armorSlide"
          arrows
          navigation
          control-color="primary"
        >
          <q-carousel-slide
            v-for="equip in getEquipFamily"
            :key="equip.id"
            :name="equip.name"
          >
            <p>{{ equip.name }}</p>
          </q-carousel-slide>

        </q-carousel>

      </q-expansion-item>

      <q-expansion-item
        dense
        dense-toggle
        expand-separator
        icon="perm_identity"
        label="Weapons"
      />
      <q-expansion-item
        dense
        dense-toggle
        expand-separator
        icon="perm_identity"
        label="Trinkets"
      />
      <q-expansion-item
        dense
        dense-toggle
        expand-separator
        icon="perm_identity"
        label="Mounts"
      />
    </q-list>

    <div class="q-pa-md row justify-between">
      <q-btn color="primary" @click="addEquipCards">
        Select Equipment
      </q-btn>
    </div>
  </div>
</template>

<style>
.q-list {
  width: 100%;
}
</style>

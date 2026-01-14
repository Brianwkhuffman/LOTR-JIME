<script setup>
import { useEquipmentStore } from 'stores/equipmentStore.js';
import { useDeckStore } from 'stores/deckStore';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';

const equipStore = useEquipmentStore();
const deckStore = useDeckStore();

const emit = defineEmits(['nextStep']);
const { loading: equipLoading } = storeToRefs(equipStore);
const { loading: deckLoading } = storeToRefs(deckStore);

const hasArmorSelection = ref(false);

const selectedArmor = ref({ label: '', value: '' });
const selectedWeapon = ref({ label: '', value: '' });
// const selectedWeapon2 = ref({ label: '', value: '' });

const armorSlide = ref('');
const weaponSlide = ref('');
const selectedEquipments = ref({});
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

const getEquipFamily2 = (type) => {
  if (type === 'weapons') {
    return equipStore.getEquipCardsByTypeAndFamily(type, selectedWeapon.value.label);
  }
  return null;
};

const resetCarousel = (newVal) => {
  if (newVal && getEquipFamily.value.length > 0) {
    armorSlide.value = getEquipFamily.value[0].name;
  }
};

const addEquipCards = () => {
  // TODO: Validate selection
  deckStore.addCards('equipment', selectedEquipments.value);
  emit('nextStep');
};

const selectEquipmentSlot = (slot, equip) => {
  selectedEquipments.value[slot] = equip;
  console.log(selectedEquipments.value);
  hasArmorSelection.value = true;
};
const getIcon = computed(() => {
  if (hasArmorSelection.value) {
    return 'check_circle';
  }
  return 'perm_identity';
});

const getLabel = computed(() => {
  if (hasArmorSelection.value) {
    return 'Armor Slot - Selected: ' + selectedEquipments.value['armor'].name;
  }
  return 'Armor Slot';
});

const test = (newVal, type) => {
  if (type === 'weapons') {
    if (selectedWeapon.value) {
      const family = equipStore.getEquipCardsByTypeAndFamily(type, selectedWeapon.value.label);
      console.log(family[0].name);
      return weaponSlide.value = family[0].name;
    }
    return null;
  }};
</script>

<template>
  <div v-if="equipLoading && deckLoading" class="row justify-center">
    <q-spinner-oval color="primary" size="10rem" />
  </div>

  <div v-else style="display: grid; place-items: center;">

    <q-list padding bordered class="rounded-borders">

      <q-expansion-item
        :icon=getIcon
        :label=getLabel
        dense
        dense-toggle
        expand-separator
      >
        <q-select
          :options="getEquipTypeFromStore('armors')"
          v-model="selectedArmor"
          @update:model-value="resetCarousel"
          outlined
          stack-label
          dense
          color="primary"
          class="q-pa-md"
        />

        <q-carousel
          v-if="selectedArmor && selectedArmor.value"
          v-model="armorSlide"
          control-color="primary"
          arrows
          navigation
        >
          <q-carousel-slide
            v-for="equip in getEquipFamily2('weapons')"
            :key="equip.id"
            :name="equip.name"
          >
            <div class="q-pa-md text-center">
              <div>
                <p>{{ equip.name }}</p>
                <p>Tier: {{ equip.tier }}</p>
                <p>{{ equip.description }}</p>
              </div>
              <div class="q-pa-md">
                <q-btn color="primary" @click="selectEquipmentSlot('armor', equip)">Select Armor</q-btn>
              </div>
            </div>
          </q-carousel-slide>
        </q-carousel>
      </q-expansion-item>



      <q-expansion-item
        dense
        dense-toggle
        expand-separator
        icon="perm_identity"
        label="Weapons"
      >
        <q-select
          :options="getEquipTypeFromStore('weapons')"
          v-model="selectedWeapon"
          @update:model-value="(val) => test(val, 'weapons')"
          outlined
          stack-label
          dense
          color="primary"
          class="q-pa-md"
        />

        <q-carousel
          v-if="selectedWeapon && selectedWeapon.value"
          v-model="weaponSlide"
          control-color="primary"
          arrows
          navigation
        >
          <q-carousel-slide
            v-for="equip in getEquipFamily2"
            :key="equip.id"
            :name="equip.name"
          >
            <div class="q-pa-md text-center">
              <div>
                <p>{{ equip.name }}</p>
                <p>Tier: {{ equip.tier }}</p>
                <p>{{ equip.description }}</p>
              </div>
              <div class="q-pa-md">
                <q-btn color="primary" @click="selectEquipmentSlot('armor', equip)">Select Armor</q-btn>
              </div>
            </div>
          </q-carousel-slide>
        </q-carousel>
      </q-expansion-item>


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
        Confirm Equipment
      </q-btn>
    </div>
  </div>
</template>

<style>
.q-list {
  width: 100%;
}
</style>

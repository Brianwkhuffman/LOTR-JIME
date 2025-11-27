<script setup>
import { useEquipmentStore } from 'stores/equipmentStore.js';
import { useDeckStore } from 'stores/deckStore';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';

const equipStore = useEquipmentStore();
const deckStore = useDeckStore();

const emit = defineEmits(['nextStep']);
const { loading: equipLoading } = storeToRefs(equipStore);
const { loading: deckLoading, selectedArmor, selectedWeapon, selectedTrinket, selectedMount } = storeToRefs(deckStore);

const addEquipCards = () => {
  // TODO: Save to deck store on each equip choice or at the end?
  emit('nextStep');
};

const armorSlide = ref(null);
const weaponSlide = ref(null);
const trinketSlide = ref(null);
const mountSlide = ref(null);

const options = {
  "armors": selectedArmor,
  "weapons": selectedWeapon,
  "trinkets": selectedTrinket,
  "mounts": selectedMount,
}

// Might need 2 refs for weapons, since one hero can have 2??

// Armor/weapons/support all have 4 tiers
// Trinkets all 3 tiers except Crown of Shadows (1 tier)
// Mounts no tiers

const getEquipTypeFromStore = (type) => {
  return equipStore.getEquipmentOptionsByType(type);
};

// const armorSlide = computed(()=>{
//   return selectedArmor.value.label;
// })

const getEquipFamily = (type) => {
  console.log("getEquipFamily");
  const hasData = options[type].value;
  if (hasData) {
    const family = equipStore.getEquipCardsByTypeAndFamily(type, options[type].value.label);

    armorSlide.value = family[0].name;
    return family;
  }
  return null;
};
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
            v-for="equip in getEquipFamily('armors')"
            :key="equip.id"
            :name="equip.name"
          >
            <!-- <small-card :card="equip"/> -->
            <q-card v-if="equip">
              <q-card-section class="col">
                <h5>
                  {{ equip.name }}
                </h5>
                <i v-if="equip.trait">trait: {{ equip.trait }}</i>
              </q-card-section>
              <q-card-section>
                <h6>Description</h6>
                <p>{{ equip.description }}</p>
              </q-card-section>
            </q-card>

            <!-- <p v-for="(value, key) in equip" :key="key">{{ key }}: {{ value }}</p> -->


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
          outlined
          stack-label
          dense
          color="primary"
          class="q-pa-md"
        />

        <q-carousel
          v-if="selectedWeapon.value"
          v-model="weaponSlide"
          arrows
          navigation
          control-color="primary"
        >
          <q-carousel-slide
            v-for="equip in getEquipFamily('weapons')"
            :key="equip.id"
            :name="equip.name"
          >
            <p v-for="(value, key) in equip" :key="key">{{ key }}: {{ value }}</p>
          </q-carousel-slide>

        </q-carousel>

      </q-expansion-item>
      <q-expansion-item
        dense
        dense-toggle
        expand-separator
        icon="perm_identity"
        label="Trinkets"
      >
        <q-select
          :options="getEquipTypeFromStore('trinkets')"
          v-model="selectedTrinket"
          outlined
          stack-label
          dense
          color="primary"
          class="q-pa-md"
        />

        <q-carousel
          v-if="selectedTrinket.value"
          v-model="trinketSlide"
          arrows
          navigation
          control-color="primary"
        >
          <q-carousel-slide
            v-for="equip in getEquipFamily('trinkets')"
            :key="equip.id"
            :name="equip.name"
          >
            <p v-for="(value, key) in equip" :key="key">{{ key }}: {{ value }}</p>

          </q-carousel-slide>

        </q-carousel>
      </q-expansion-item>
      <q-expansion-item
        dense
        dense-toggle
        expand-separator
        icon="perm_identity"
        label="Mounts"
      >
        <q-select
          :options="getEquipTypeFromStore('mounts')"
          v-model="selectedMount"
          outlined
          stack-label
          dense
          color="primary"
          class="q-pa-md"
        />

        <q-carousel
          v-if="selectedMount.value"
          v-model="mountSlide"
          arrows
          navigation
          control-color="primary"
        >
          <q-carousel-slide
            v-for="equip in getEquipFamily('mounts')"
            :key="equip.id"
            :name="equip.name"
          >
            <p v-for="(value, key) in equip" :key="key">{{ key }}: {{ value }}</p>
          </q-carousel-slide>

        </q-carousel>
      </q-expansion-item>
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

<script setup>
import { useEquipmentStore } from 'stores/equipmentStore.js';
import { useDeckStore } from 'stores/deckStore';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useEquipmentSelection } from 'src/composables/EquipmentSelection.js';
import EquipCard from '../cards/EquipCard.vue';

const equipStore = useEquipmentStore();
const deckStore = useDeckStore();

const emit = defineEmits(['nextStep']);
const { loading: equipLoading } = storeToRefs(equipStore);
const { loading: deckLoading } = storeToRefs(deckStore);

// TODO: Need to load cards back when switching tabs...

const { 
  selectedType: armorType, 
  familyOptions: armorOptions, 
  filteredCards: armorCards,
  confirmedItems: confirmedArmor,
  toggleCardSelection: toggleArmor
} = useEquipmentSelection('armors', 1);

const { 
  selectedType: handType, 
  familyOptions: handOptions, 
  filteredCards: handCards,
  confirmedItems: confirmedHands,
  toggleCardSelection: toggleHands
} = useEquipmentSelection('weapons', 2);

const { 
  selectedType: trinketType, 
  familyOptions: trinketOptions, 
  filteredCards: trinketCards,
  confirmedItems: confirmedTrinket,
  toggleCardSelection: toggleTrinket
} = useEquipmentSelection('trinkets', 1);

const addEquipCards = () => {
  // TODO: Validate selection again?
  // deckStore.addEquipmentCards('armor', confirmedArmor.value);
  emit('nextStep');
};

const hasSelectedCards = computed(() => {
  return confirmedArmor.value.length > 0 ||
    confirmedTrinket.value.length > 0 ||
    confirmedHands.value.length > 0;
});

const disableButton = computed(() => {
  if (confirmedArmor.value.length === 0) {
    return true;
  }
  if (confirmedTrinket.value.length === 0) {
    return true;
  }
  if (confirmedHands.value.length === 0) {
    return true;
  } 
  else if (confirmedHands.value.length === 2) {
    const currentSlotsUsed = confirmedHands.value.reduce((sum, i) => sum + (i.hands || 1), 0);
    return currentSlotsUsed > 2;
  }

  return false;
});

</script>

<template>
  <div v-if="equipLoading && deckLoading" class="row justify-center">
    <q-spinner-oval color="primary" size="10rem" />
  </div>

  <div v-else style="display: grid; place-items: center;">

    <q-list padding bordered class="rounded-borders">

      <!-- Armors -->
      <q-expansion-item
        icon="img:assets/armor.png"
        label="Armor"
        header-class="text-primary text-h6"
        dense
        dense-toggle
        expand-separator
      >
        <q-select
          :options="armorOptions"
          v-model="armorType"
          outlined
          stack-label
          dense
          clearable
          color="primary"
          class="q-pa-md"
        />
        <ul class="card-grid" role="list">
          <li v-for="card in armorCards"
              :key="card.id"
              class="card-list"
              :class="{ 'selected-card-border': confirmedArmor.some(i => i.id === card.id) }"
              tabindex="0"
          >
            <equip-card 
              :card="card"
              @click="toggleArmor(card)"
            />
          </li>
        </ul>
      </q-expansion-item>

      <!-- Trinkets -->
      <q-expansion-item
        icon="img:assets/trinket.png"
        label="Trinket"
        header-class="text-primary text-h6"
        dense
        dense-toggle
        expand-separator
      >
        <q-select
          :options="trinketOptions"
          v-model="trinketType"
          outlined
          stack-label
          dense
          clearable
          color="primary"
          class="q-pa-md"
        />
        <ul class="card-grid" role="list">
          <li v-for="card in trinketCards"
              :key="card.id"
              class="card-list"
              :class="{ 'selected-card-border': confirmedTrinket.some(i => i.id === card.id) }"
              tabindex="0"
          >
            <equip-card 
              :card="card"
              @click="toggleTrinket(card)"
            />
          </li>
        </ul>

      </q-expansion-item>
      
      <!-- Weapons -->
      <q-expansion-item
        icon="img:assets/1hand.png"
        label="Hands"
        header-class="text-primary text-h6"
        dense
        dense-toggle
        expand-separator
      >

        <q-select
          :options="handOptions"
          v-model="handType"
          outlined
          stack-label
          dense
          clearable
          color="primary"
          class="q-pa-md"
        />
        <ul class="card-grid" role="list">
          <li v-for="card in handCards"
              :key="card.id"
              class="card-list"
              :class="{ 'selected-card-border': confirmedHands.some(i => i.id === card.id) }"
              tabindex="0"
          >
            <equip-card 
              :card="card"
              @click="toggleHands(card)"
            />
          </li>
        </ul>
      </q-expansion-item>
    </q-list>

    <div class="q-pt-md">
      <ul class="card-grid" role="list" v-if="hasSelectedCards">
        <li class="card-list" v-if="confirmedArmor?.length > 0">
          <equip-card :card="confirmedArmor[0]" @click="toggleArmor(confirmedArmor[0])" />
        </li>
        <li class="card-list" v-if="confirmedTrinket?.length > 0">
          <equip-card :card="confirmedTrinket[0]" @click="toggleTrinket(confirmedTrinket[0])" />
        </li>
        <li class="card-list" v-for="card in confirmedHands" :key="card.id">
          <equip-card :card="card" @click="toggleHands(card)" />
        </li>
      </ul>
    </div>
      
    <div class="q-pa-md row justify-between">
      <q-btn color="primary" @click="addEquipCards" :disable="disableButton">
        Confirm Equipment
      </q-btn>
    </div>
  </div>
</template>

<style scoped lang="scss">
.q-list {
  width: 100%;
}
</style>

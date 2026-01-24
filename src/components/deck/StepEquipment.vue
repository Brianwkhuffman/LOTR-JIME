<script setup>
import { useEquipmentStore } from 'stores/equipmentStore.js';
import { useDeckStore } from 'stores/deckStore';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useEquipmentSelection } from 'src/composables/EquipmentSelection.js';
import EquipCard from '../cards/EquipCard.vue';
import ErrorBanner from 'components/ErrorBanner.vue';

const equipStore = useEquipmentStore();
const deckStore = useDeckStore();

const emit = defineEmits(['nextStep']);
const { loading: equipLoading } = storeToRefs(equipStore);
const { loading: deckLoading, errors } = storeToRefs(deckStore);

const {
  selectedType: armorType,
  familyOptions: armorOptions,
  filteredCards: armorCards,
  confirmedItems: confirmedArmor,
  toggleCardSelection: toggleArmor
} = useEquipmentSelection('armors', 1);


// TODO: add support options for hands
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

const {
  filteredCards: mountCards,
  confirmedItems: confirmedMount,
  toggleCardSelection: toggleMount
} = useEquipmentSelection('mounts', 1);

const addEquipCards = () => {
  const payload = {
    armor: confirmedArmor.value[0],
    hands: confirmedHands.value,
    trinket: confirmedTrinket.value[0] || {},
    mount: confirmedMount.value[0] || {}
  };

  let hasErrors = false;
  Object.entries(payload).forEach(([type, selection]) => {
    if (!deckStore.addEquipmentCards(type, selection)) {
      hasErrors = true;
    }
  });
  if (hasErrors) {
    return;
  }
  emit('nextStep');
};

const hasSelectedCards = computed(() => {
  return confirmedArmor.value.length > 0 ||
    confirmedTrinket.value.length > 0 ||
    confirmedHands.value.length > 0 ||
    confirmedMount.value.length > 0;
});

const disableButton = computed(() => {
  if (confirmedArmor.value.length === 0) {
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
    <template v-if="errors.length">
      <error-banner :errors="errors" />
    </template>


    <q-list padding bordered class="rounded-borders">

      <!-- Armors -->
      <q-expansion-item
        icon="img:assets/armor.png"
        label="Armor"
        header-class="text-primary text-h6"
        dense
        expand-separator
      >
        <q-select
          :options="armorOptions"
          v-model="armorType"
          :popup-content-style="{ height: '40vh' }"
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

      <!-- Weapons -->
      <q-expansion-item
        icon="img:assets/1hand.png"
        label="Hands"
        header-class="text-primary text-h6"
        dense
        expand-separator
      >

        <q-select
          :options="handOptions"
          v-model="handType"
          :popup-content-style="{ height: '40vh' }"
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

      <!-- Trinkets -->
      <q-expansion-item
        icon="img:assets/trinket.png"
        label="Trinket"
        header-class="text-primary text-h6"
        dense
        expand-separator
      >
        <q-select
          :options="trinketOptions"
          v-model="trinketType"
          :popup-content-style="{ height: '40vh' }"
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

      <!-- Mounts -->
      <q-expansion-item
        icon="img:assets/mount.png"
        label="Mounts"
        header-class="text-primary text-h6"
        dense
        expand-separator
      >
        <ul class="card-grid" style="margin-top: 1rem;" role="list">
          <li v-for="card in mountCards"
              :key="card.id"
              class="card-list"
              :class="{ 'selected-card-border': confirmedMount.some(i => i.id === card.id) }"
              tabindex="0"
          >
            <equip-card
              :card="card"
              @click="toggleMount(card)"
            />
          </li>
        </ul>
      </q-expansion-item>
    </q-list>

    <div v-if="hasSelectedCards">
      <p class="q-mt-md text-h6 text-primary">Card Selection</p>
      <i class="text-subtitle">Double tap to remove a card</i>
    </div>

    <div class="q-pt-md">
      <ul class="card-grid" role="list" v-if="hasSelectedCards">
        <li class="card-list" v-if="confirmedArmor?.length > 0">
          <equip-card :card="confirmedArmor[0]" @dblclick="toggleArmor(confirmedArmor[0])" />
        </li>
        <li class="card-list" v-for="card in confirmedHands" :key="card.id">
          <equip-card :card="card" @dblclick="toggleHands(card)" />
        </li>
        <li class="card-list" v-if="confirmedTrinket?.length > 0">
          <equip-card :card="confirmedTrinket[0]" @dblclick="toggleTrinket(confirmedTrinket[0])" />
        </li>
        <li class="card-list" v-if="confirmedMount?.length > 0">
          <equip-card :card="confirmedMount[0]" @dblclick="toggleMount(confirmedMount[0])" />
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
  border-color: $primary;
}
</style>

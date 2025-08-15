<script setup>
import { ref } from 'vue';

const props = defineProps({
  tiers: Array,
  traits: Array,
  ranged: Boolean,
  collections: Array,
  equipmentList: {
    type: Array,
    required: true
  }
});

const emits = defineEmits(['filterChanged']);
const dialog = ref(false);
const hasFilter = ref(false);
const selectedTier = ref('');
const selectedTrait = ref('');

const availableTiers = props.tiers;
const availableTraits = props.traits;

const applyFilter = () => {
  emits('filterChanged', {
    tier: selectedTier.value,
    trait: selectedTrait.value
  });
  hasFilter.value = true;
  dialog.value = false;
};

const resetFilter = () => {
  selectedTier.value = null;
  selectedTrait.value = null;
  dialog.value = false;
  return applyFilter();
};
</script>

<template>
  <q-btn label="Filter" @click="dialog = true"/>

  <q-dialog v-model="dialog">
    <q-card>
      <q-card-section>
        <p>Tiers:</p>
        <q-btn
          v-for="tier in availableTiers"
          :key="tier"
          :label="tier"
          flat
          :color="selectedTier === tier ? 'primary' : 'grey'"
          @click="selectedTier = tier"
        />

        <div>
          <p>Traits:</p>
          <q-select
            v-model="selectedTrait"
            :options="availableTraits"
            outlined
            dense
            clearable
            label="Select Trait"
          />
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat
               v-if="hasFilter"
               label="Reset"
               @click="resetFilter" />
        <q-btn flat
               label="Apply"
               @click="applyFilter" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

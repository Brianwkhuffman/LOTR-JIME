<script setup>
import { useEquipmentStore } from '/src/stores/equipmentStore.js';
import { useRoute } from 'vue-router';
import { computed, ref } from 'vue';
import FilterButton from '/src/components/button/FilterButton.vue';
import BackButton from 'src/components/button/BackButton.vue';

const route = useRoute();
const typeParam = route.params.type;
const equipmentStore = useEquipmentStore();
const equipmentList = ref(equipmentStore.getEquipmentListByType(typeParam));

const filter = ref({ tier: '', trait: '' });
const filteredEquipment = computed(() => {
  return equipmentList.value.filter(item => {
    const tierMatch = filter.value.tier ? item.tier === filter.value.tier : true;
    const traitMatch = filter.value.trait ? item.trait === filter.value.trait : true;
    return tierMatch && traitMatch;
  });
});

const onFilterChanged = (selected) => {
  filter.value = selected;
};
</script>

<template>
  <filter-button
    :tiers="['I','II','III', 'IV']"
    :traits="['Agility', 'Might', 'Spirit', 'Wisdom', 'Wit']"
    :equipment-list="equipmentList"
    @filterChanged="onFilterChanged"
  />
  <back-button />
  <section class="q-pa-lg">
    <q-card
      v-for="equip in filteredEquipment"
      :key="equip.id"
      bordered
      class="q-mb-md"
    >
      <q-card-section class="row justify-between">
        <div>
          <h5>{{ equip.name }}</h5>
          <h6 v-if="equip.tier">{{ equip.item }} - Tier {{ equip.tier }}</h6>
          <h6 v-if="equip.trait">{{ equip.trait }}</h6>
        </div>
        <q-img
          src="/assets/equipPh.png"
          alt="Equip image"
          style="width: 80px; height: auto"
          class="rounded-borders"
        />
      </q-card-section>
      <q-card-section>
        <p>{{ equip.description }}</p>
      </q-card-section>
    </q-card>
  </section>
</template>

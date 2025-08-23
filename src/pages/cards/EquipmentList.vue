<script setup>
import { computed, onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useEquipmentStore } from '/src/stores/equipmentStore.js';
import BackButton from 'src/components/button/BackButton.vue';

const route = useRoute();
const typeParam = route.params.type;
const equipStore = useEquipmentStore();
const { loading } = storeToRefs(equipStore);

onBeforeMount(() => {
  equipStore.fetchEquipCards();
});

const equipList = computed(() => {
  return equipStore.getEquipmentListByType(typeParam);
});
</script>

<template>
  <back-button />
  <section class="q-pa-lg">
    <div v-if="loading" class="row justify-center">
      <q-spinner-oval color="primary" size="10rem" />
    </div>
    
    <q-card
      v-else
      v-for="equip in equipList"
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

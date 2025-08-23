<script setup>
import { computed, onBeforeMount } from 'vue';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { useEquipmentStore } from '/src/stores/equipmentStore.js';
import BackButton from 'components/button/BackButton.vue';

const router = useRouter();
const equipStore = useEquipmentStore();
const { loading } = storeToRefs(equipStore);

onBeforeMount(() => {
  equipStore.fetchEquipCards();
});

const equipTypes = computed(() => {
  return equipStore.getEquipmentTypes;
});

const goToType = (type) => {
  router.push('/cards/equipment/' + type);
};
</script>

<template>
  <back-button />
  <div class="q-pa-md">
    <div v-if="loading" class="row justify-center">
      <q-spinner-oval color="primary" size="10rem" />
    </div>
    
    <div v-else class="q-gutter-sm">
      <q-card
        v-for="type in equipTypes"
        :key="type"
        @click="goToType(type)"
        class="cursor-pointer hoverable"
        flat
        bordered
      >
        <q-card-section class="text-center">
          <div class="text-h6 text-capitalize">{{ type }}</div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

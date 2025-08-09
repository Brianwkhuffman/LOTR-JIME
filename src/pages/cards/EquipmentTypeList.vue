<script setup>
import { useRouter } from 'vue-router';
import { useEquipmentStore } from '/src/stores/equipmentStore.js';
import BackButton from 'components/button/BackButton.vue';

const router = useRouter();
const equipStore = useEquipmentStore();
const equipTypes = equipStore.getEquipmentTypes;

const goToType = (type) => {
  router.push('/cards/equipment/' + type);
};
</script>

<template>
  <BackButton/>
  <div class="q-pa-md">
    <div class="q-gutter-sm">
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

<script setup>
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { useEquipStore } from '/src/stores/equipmentStore.js';
import SimpleNavButton from '/src/components/SimpleNavButton.vue';

const router = useRouter();
const equipStore = useEquipStore();
const { equipList } = storeToRefs(equipStore);

const navigateToEquipmentList = (type) => {
  router.push('/equipment/' + type);
};
</script>

<template>
  <div>
    <h3>Equipment</h3>

    <div class="flex flex-wrap gap-4 mb-8">
      <q-btn
        v-for="(equipment, type) in equipList"
        :key="equipment.id"
        @click="navigateToEquipmentList(type)">
        {{ type }}
      </q-btn>
    </div>
    <SimpleNavButton target-page="home" />
  </div>
</template>

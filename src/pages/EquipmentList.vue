<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useEquipStore } from '/src/stores/equipmentStore.js';
import SimpleNavButton from 'components/SimpleNavButton.vue';

const route = useRoute();
const equipStore = useEquipStore();
const equipmentList = computed(() => equipStore.getEquipmentListByType(route.params.type));
</script>

<template>
  <div>
    <h3>Equipment List</h3>
    <SimpleNavButton target-page="home"/>

    <div v-for="equip in equipmentList" :key="equip.id">
      <p>{{ equip.name }}</p>
    </div>
  </div>
</template>

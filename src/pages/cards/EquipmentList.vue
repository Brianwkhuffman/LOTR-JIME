<script setup>
import {useEquipmentStore} from '/src/stores/equipmentStore.js';
import {useRoute} from 'vue-router';
import FilterButton from '/src/components/button/FilterButton.vue';
import BackButton from 'src/components/button/BackButton.vue';

const route = useRoute();
const type = route.params.type;
const equipmentStore = useEquipmentStore();
const equipmentList = equipmentStore.getEquipmentListByType(type);

</script>

<template>
  <FilterButton/>
  <BackButton/>
  <section class="q-pa-lg">
    <q-card
      v-for="equip in equipmentList"
      :key="equip.id"
      bordered
      class="q-mb-md"
    >
      <q-card-section class="row justify-between">
        <div>
          <h5>{{ equip.name }}</h5>
          <p>{{equip.item}} - Tier {{equip.tier}}</p>
        </div>
          <q-img
            src="https://placehold.co/80x80?text=Equip"
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


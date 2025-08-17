<script setup>
import { ref } from 'vue';
import StepHero from 'components/deck/StepHero.vue';
import StepRole from 'components/deck/StepRole.vue';
import StepEquipment from 'components/deck/StepEquipment.vue';
import StepFinal from 'components/deck/StepFinal.vue';

const selectedTab = ref('hero');
</script>

<template>
  <q-tabs
    v-model="selectedTab"
    dense
    no-caps
  >
    <q-tab name="hero" icon="military_tech" label="Hero" />
    <q-tab name="role" icon="assignment_ind" label="Role" />
    <q-tab name="equip" icon="shopping_cart" label="Equip" />
    <q-tab name="final" icon="check" label="Finish" />
  </q-tabs>

  <q-tab-panels v-model="selectedTab">
    <q-tab-panel name="hero">
      <step-hero/>
    </q-tab-panel>
    <q-tab-panel name="role">
      <step-role/>
    </q-tab-panel>
    <q-tab-panel name="equipment">
      <step-equipment/>
    </q-tab-panel>
    <q-tab-panel name="final">
      <step-final/>
    </q-tab-panel>
  </q-tab-panels>
</template>

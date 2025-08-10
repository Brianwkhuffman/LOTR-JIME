<script setup>
import { useRoleCardStore } from '/src/stores/roleCardStore.js';
import { useRoute } from 'vue-router';
import BackButton from 'src/components/button/BackButton.vue';

const route = useRoute();
const roleParam = route.params.role;
const roleCardStore = useRoleCardStore();
const roleCards = roleCardStore.getRoleCardListByRole(roleParam);

</script>

<template>
  <back-button/>
  <section class="q-pa-lg">
    <q-card
      v-for="card in roleCards"
      :key="card.id"
      bordered
      class="q-mb-md"
    >
      <q-card-section class="row justify-between">
        <div>
          <h5>
            {{ card.name }}

            <q-icon
              v-if="card.icon === '1 Success'"
              color="green"
              name="star"/>
            <q-icon v-else-if="card.icon === '1 Fate'"
              color="red"
              name="emergency"/>
            <q-icon v-else
              color="blue"
              name="emergency"/>
          </h5>
          <i>{{ card.trait }}</i>
        </div>
        <q-img
          src="/assets/rolePh.png"
          alt="Role image"
          style="width: 80px; height: auto"
          class="rounded-borders"
        />
      </q-card-section>
      <q-card-section>
        <p>{{ card.description }}</p>
      </q-card-section>
    </q-card>
  </section>
</template>

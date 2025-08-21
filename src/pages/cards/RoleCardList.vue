<script setup>
import { computed, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import { useRoleCardStore } from '/src/stores/roleCardStore.js';
import BackButton from 'src/components/button/BackButton.vue';

const route = useRoute();
const roleType = route.params.role;
const roleCardStore = useRoleCardStore();
const { loading } = storeToRefs(roleCardStore);

onMounted(() => {
  roleCardStore.fetchRoleCards();
});

const roleCards = computed(() => {
  return roleCardStore.getRoleCardsByType(roleType);
});

</script>

<template>
  <back-button/>
  <section class="q-pa-lg">
    <div v-if="loading" class="row justify-center">
      <q-spinner-oval color="primary" size="10rem" />
    </div>

    <q-card
      v-else
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
              name="star"
            />
            <q-icon
              v-else-if="card.icon === '1 Fate'"
              color="red"
              name="emergency"
            />
            <q-icon
              v-else
              color="blue"
              name="emergency"
            />
          </h5>
          <i>{{ card.trait }}</i>
        </div>
        <q-img
          src="/assets/rolePh.png"
          alt="Role image"
          style="width: 60px; height: auto"
          class="rounded-borders"
        />
      </q-card-section>
      <q-card-section>
        <p>{{ card.description }}</p>
      </q-card-section>
    </q-card>
  </section>
</template>

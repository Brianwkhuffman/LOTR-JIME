<script setup>
import { computed, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import { useInfoCardStore } from 'stores/infoCardStore.js';
import BackButton from 'src/components/button/BackButton.vue';

const route = useRoute();
const typeParam = route.params.type;
const infoCardStore = useInfoCardStore();
const { loading } = storeToRefs(infoCardStore);

onMounted(() => {
  infoCardStore.fetchInfoCards();
});

const infoCardList = computed(() => {
  return infoCardStore.getInfoCardsByType(typeParam);
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
      v-for="card in infoCardList"
      :key="card.id"
      bordered
      class="q-mb-md"
    >
      <q-card-section class="row justify-between">
        <div>
          <h5>
            {{ card.name }}
          </h5>
          <i v-if="card.collection">Collection: {{ card.collection }}</i>
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

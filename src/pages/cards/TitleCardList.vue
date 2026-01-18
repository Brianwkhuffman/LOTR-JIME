<script setup>
import { storeToRefs } from 'pinia';
import { useTitleCardStore } from '/src/stores/titleCardStore.js';
import BackButton from 'src/components/button/BackButton.vue';
import FilterButton from 'components/button/FilterButton.vue';

const titleCardStore = useTitleCardStore();
const { loading, titleCards } = storeToRefs(titleCardStore);

</script>

<template>
  <filter-button />
  <back-button />
  <section class="q-pa-md">
    <div v-if="loading" class="row justify-center">
      <q-spinner-oval color="primary" size="10rem" />
    </div>

    <ul v-else class="card-grid" role="list">
      <li v-for="card in titleCards"
          :key="card.id"
          class="card-list"
          tabindex="0">
        <header class="card-name">
          {{ card.name }}
          <q-img
            v-if="card.icon === '1 Success'"
            src="/assets/success.png"
            alt="success"
            style="width: 15px;"
          />
          <q-img
            v-else-if="card.icon === '1 Fate'"
            src="/assets/fate.png"
            alt="fate"
            style="width: 15px;"
          />
          <q-img
            v-else
            src="/assets/fate2.png"
            alt="fate2"
            style="width: 30px;"
          />
        </header>
        <i>{{ card.trait }}</i>
        <p class="card-description">{{ card.description }}</p>
        <p>Collection: {{ card.collection }}</p>
      </li>
    </ul>
  </section>
</template>

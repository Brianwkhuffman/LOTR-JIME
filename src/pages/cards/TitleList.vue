<script setup>
import { useTitleCardStore } from '/src/stores/titleCardStore.js';
import BackButton from 'src/components/button/BackButton.vue';
import FilterButton from 'components/button/FilterButton.vue';

const titleCardStore = useTitleCardStore();
const titleCards = titleCardStore.getTitleList;

</script>

<template>
  <filter-button />
  <back-button />
    <section class="q-pa-md">
      <div class="card-grid" role="list">
        <li v-for="card in titleCards"
            :key="card.id"
            class="card"
            tabindex="0">
          <header class="card-name">
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
          </header>
          <i>{{ card.trait }}</i>
          <p class="card-description">{{ card.description }}</p>
          <p>{{ card.id }}</p>
        </li>
      </div>
    </section>
</template>

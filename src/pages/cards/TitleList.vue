<script setup>
import { useTitleCardStore } from '/src/stores/titleCardStore.js';
import BackButton from 'src/components/button/BackButton.vue';
import FilterButton from 'components/button/FilterButton.vue';

const titleCardStore = useTitleCardStore();
console.log('heh');
const titleCards = titleCardStore.getTitleList;
// this is a test

</script>

<template>
  <!--  another test -->
  <filter-button />
  <back-button />
  <section class="q-pa-md">
    <ul class="title-grid" role="list">
      <li v-for="card in titleCards"
          :key="card.id"
          class="title-card"
          role="listitem"
          tabindex="0">
        <header class="name">
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
        <p class="description">{{ card.description }}</p>
      </li>
    </ul>
  </section>
</template>

<style>
.title-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 12px;
  padding: 0;
  list-style: none;
  margin: 0;
}

.title-card {
  padding: 0.5rem;
  background: #f9f9f9;
  border-radius: 0.375rem;
  height: 10rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.title-card:focus {
  outline: 2px solid #007aff;
}

.name {
  font-weight: 600;
  margin-bottom: 0.25rem;
  color: #666;
  flex-shrink: 0;
}

.description {
  margin: 0;
  color: #333;
  line-height: 1.2;
  flex-grow: 1;
}
</style>

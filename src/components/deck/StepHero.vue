<script setup>
import {useDeckStore} from 'stores/deckStore.js';
import {useHeroDetailStore} from 'stores/heroDetailStore.js';
import {ref} from 'vue';

defineEmits(['back', 'next']);
const deckStore = useDeckStore();
const heroDetailStore = useHeroDetailStore();

const heroList = heroDetailStore.getHeroList;

const selectedHero = ref({});

const selectHero = (hero) => {
  selectedHero.value = hero;
  deckStore.addHeroCards(hero.name);
  alert('added hero to deck');
};

</script>

<template>
  <div>
    <h3>Chose a Hero</h3>

    <ul class="card-grid">
      <li v-for="hero in heroList"
        :key="hero.id"
        class="card"
        tabindex="0"
      >
        <header class="card-name">
          {{ hero.name }}
        </header>
        <q-btn @click="selectHero(hero)" class="q-pa-sm">Select</q-btn>
      </li>
    </ul>
    <q-btn @click="$emit('back')">
      Back
    </q-btn>
    <q-btn @click="$emit('next')">
      Next
    </q-btn>
  </div>
</template>

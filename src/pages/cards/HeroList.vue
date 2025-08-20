<script setup>
import { ref } from 'vue';
import { useHeroDetailStore } from '/src/stores/heroDetailStore.js';
import HeroDetailCard from 'components/cards/HeroDetailCard.vue';
import HeroDetails from 'components/dialog/HeroDetails.vue';
import BackButton from 'src/components/button/BackButton.vue';

const heroDetailStore = useHeroDetailStore();
const heroList = heroDetailStore.getHeroList;

const selectedHero = ref(null);
const showHeroDetails = ref(false);
const openHeroDetails = (hero) => {
  selectedHero.value = hero;
  showHeroDetails.value = true;
};

</script>

<template>
  <back-button />
  <section class="q-pa-lg">
    <hero-detail-card
      v-for="hero in heroList"
      :key="hero.id"
      :hero="hero"
      @open-hero-details="openHeroDetails"
    />
  </section>
  <hero-details
    v-if="selectedHero"
    v-model="showHeroDetails"
    :hero="selectedHero"
    :show-hero-details="showHeroDetails"
  />
</template>

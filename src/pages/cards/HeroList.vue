<script setup>
import { computed, onBeforeMount, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useHeroDetailStore } from '/src/stores/heroDetailStore.js';
import BackButton from 'src/components/button/BackButton.vue';
import HeroDetailCard from 'components/cards/HeroDetailCard.vue';
import HeroDetails from 'components/dialog/HeroDetails.vue';

const heroDetailStore = useHeroDetailStore();
const { loading } = storeToRefs(heroDetailStore);
const selectedHero = ref({});
const showHeroDetails = ref(false);

onBeforeMount(() => {
  heroDetailStore.fetchHeroDetails();
});

const heroList = computed(() => {
  return heroDetailStore.getAllHeroDetails;
});

const openHeroDetails = (hero) => {
  showHeroDetails.value = true;
  selectedHero.value = heroDetailStore.getHeroByName(hero.name);;
};

</script>

<template>
  <back-button />
  <section class="q-pa-lg">
    <div v-if="loading" class="row justify-center">
      <q-spinner-oval color="primary" size="10rem" />
    </div>

    <hero-detail-card
      v-else
      v-for="hero in heroList"
      :key="hero.id"
      :hero="hero"
      @open-hero-details="openHeroDetails"
    />
  </section>
  <hero-details
    v-if="!loading && selectedHero"
    v-model="showHeroDetails"
    :hero="selectedHero"
    :show-hero-details="showHeroDetails"
  />
</template>

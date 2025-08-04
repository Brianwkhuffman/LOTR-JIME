<script setup>
import {storeToRefs} from 'pinia';
import {useHeroDetailsStore} from '/src/stores/heroDetailsStore.js';
import SimpleNavButton from '/src/components/SimpleNavButton.vue';
import HeroTile from '/src/components/HeroTile.vue';

const heroStore = useHeroDetailsStore();
const { heroes } = storeToRefs(heroStore);

</script>

<template>
  <div>
    <div class="text-h4">Heroes of Middle-earth
    <simple-nav-button target-page="home"/>
    </div>

    <hero-tile
      v-for="hero in heroes"
      :hero="hero"
      :key="hero.id"
    />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const { hero } = defineProps({
  hero: {
    type: Object,
    required: true
  }
});

const goToHeroDetails = (name) => {
  router.push('/heroes/' + name);
};

const selectHero = (name) => {
  // TODO: handle selected hero
  alert(name + ' selected!');
};

</script>

<template>
  <q-card class="hero-tile q-mb-md">
    <q-card-section>
      <div class="text-h6">{{ hero.name }}</div>
      <div class="text-subtitle2">Race: {{ hero.race }}</div>
      <div
        class="row"
        v-for="(stat, key) in hero.stats"
        :key="key"
      >
        <div class="col text-capitalize">{{ key }}: {{ stat }}</div>
      </div>
    </q-card-section>
    <q-separator />

    <q-card-section>{{ hero.ability }}</q-card-section>

    <q-card-actions>
      <q-btn @click="goToHeroDetails(hero.name.toLowerCase())">
        Details
      </q-btn>
      <q-btn @click="selectHero(hero.name)">
        Select Hero
      </q-btn>
    </q-card-actions>
  </q-card>
</template>

<style lang="scss" scoped>
.hero-tile {
  color: saddlebrown;
  width: 75%
}
</style>

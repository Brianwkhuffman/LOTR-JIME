<script setup>
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { useHeroDetailsStore } from '/src/stores/heroDetailsStore.js';
import SimpleNavButton from '/src/components/SimpleNavButton.vue';

const router = useRouter();
const heroStore = useHeroDetailsStore();
const { heroes } = storeToRefs(heroStore);

const goToHeroDetails = (name) => {
  router.push('/heroes/' + name);
};
</script>

<template>
  <div>
    <div style="border:1px solid black">
      <h1>Heroes of Middle-earth</h1>
      <SimpleNavButton target-page="home"/>
    </div>

    <div style="border: 1px solid black; margin-top: 8px;">
      <div v-for="(hero, key) in heroes" :key="hero.id">
        <div>
          <span>🧙</span>
        </div>

        <div>
          <div>
            <h2>{{ hero.name }}</h2>
            <span>
              {{ hero.race }}
            </span>
          </div>

          <div>
            <q-btn @click="goToHeroDetails(key)">
              Details
            </q-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

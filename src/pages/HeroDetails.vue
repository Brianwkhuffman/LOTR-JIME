<script setup>
import SimpleNavButton from '/src/components/SimpleNavButton.vue';
import { useRoute } from 'vue-router';
import { useHeroDetailsStore } from '/src/stores/heroDetailsStore.js';

const route = useRoute();
const heroDetailStore = useHeroDetailsStore();
const hero = heroDetailStore.getHeroDetailsByName(route.params.name);

const calculateBarWidth = (value) => {
  const maxStat = 5;
  return `${Math.min((value / maxStat) * 100, 100)}%`;
};
</script>

<template>
  <div v-if="hero">
    <div>
      <h1>{{ hero.name }}</h1>
      <p>{{ hero.race }}</p>
      <p>Suggested Role: {{ hero.suggestedRole }}</p>
      <p>Suggested Gear: {{ hero.suggestedEquip }}</p>
    </div>

    <div>
      <div
        v-for="(value, stat) in hero.stats"
        :key="stat"
      >
        <div>
          <span>{{ stat }}: </span>
          <span> {{ value }}</span>
        </div>

        <div>
          <div :style="{ width: calculateBarWidth(value) }"/>
        </div>
      </div>
    </div>

    <div>
      <div>
        <p>Max Inspiration: {{hero.maxInspiration}}</p>
      </div>
      <div>
          <p>Damage: {{hero.maxDamage}}</p>
      </div>
      <div>
        <p>Fear: {{hero.maxFear}}</p>
      </div>
    </div>

    <div>
      <h3>Special Ability</h3>
      <p>{{ hero.ability }}</p>
    </div>

  </div>
  <SimpleNavButton target-page="heroes" />
</template>

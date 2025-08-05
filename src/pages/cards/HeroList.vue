<script setup>
import {useHeroDetailStore} from '/src/stores/heroDetailStore.js';

const heroDetailStore = useHeroDetailStore();
const heroList = heroDetailStore.getHeroList;

const getStatColor = (value) => {
  if (value > 3) {
    return 'stat-good';
  }
  if (value === 3) {
    return 'stat-meh';
  }
  if (value < 3) {
    return 'stat-low';
  }
};
</script>

<template>
  <section class="q-pa-lg">
    <q-card
      v-for="hero in heroList"
      :key="hero.id"
      bordered
      class="q-mb-md"
    >

      <q-card-section>
        <div class="row items-center no-wrap">
          <div class="col">
            <div class="text-h6 text-center">{{ hero.name }}</div>
            <div class="text-subtitle2 text-center">{{ hero.race }}</div>
            <div class="text-subtitle2 text-center">Suggested Role: {{ hero.suggestedRole }}</div>
          </div>
          <div class="col-auto">
            <q-img
              src="https://placehold.co/80x80?text=Hero"
              alt="Hero image"
              style="width: 80px; height: auto"
              class="rounded-borders"
            />
          </div>
        </div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <div class="row items-center justify-around">
          <div
            v-for="(value, stat) in hero.stats"
            :key="stat"
            class="stat-circle"
            :class="getStatColor(value)"
          >
            <span class="stat-label">{{ stat }}</span>
            <strong>{{ value }}</strong>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </section>
</template>

<style scoped>
.stat-circle {
  width: 3rem;
  height: 3rem;
  border-radius: 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 0.875rem;
  font-weight: bold;
}
.stat-label {
  font-size: .7rem;
  text-transform: capitalize;
  color: black
}
.stat-good {
  background-color: #1c9822;
}
.stat-meh {
  background-color: #add8ae;
}
.stat-low {
  background-color: #c8b78c;
}
</style>

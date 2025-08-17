<script setup>
import { useHeroDetailStore } from 'stores/heroDetailStore.js';
import { computed, ref } from 'vue';

const heroDetailStore = useHeroDetailStore();

const selectedHero = ref(null);

const heroOptions = computed(() =>
  heroDetailStore.getHeroNames.map(name => {
    const label = name
      // insert space before capital letters
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      // capitalize first letter of each word
      .replace(/\b\w/g, char => char.toUpperCase());
    return {
      label,
      value: name
    };
  })
);

</script>

<template>
  <div>
    <q-select
      :options="heroOptions"
      v-model="selectedHero"
      label="Select a Hero"
      clearable
    />

    <div>
      <p v-if="selectedHero">{{selectedHero.value}}</p>
    </div>
  </div>
</template>

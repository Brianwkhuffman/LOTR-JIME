<script setup>
import { computed, onBeforeMount, ref } from 'vue';
import { useHeroDetailStore } from 'stores/heroDetailStore.js';
import { useDeckStore } from 'stores/deckStore';
import { storeToRefs } from 'pinia'; 
import HeroDetailCard from 'components/cards/HeroDetailCard.vue';

const heroDetailStore = useHeroDetailStore();
const deckStore = useDeckStore();

const emit = defineEmits(['nextStep']);
const { loading: detailsLoading, getHeroOptions } = storeToRefs(heroDetailStore);
const { loading: deckLoading, currentDeck } = storeToRefs(deckStore);

const selectedHero = ref({ label: '', value: '' });

onBeforeMount(() => {
  const hasHeroCards = currentDeck.value.hero.length;
  if (hasHeroCards) {
    const heroId = currentDeck.value.hero[0].heroId;
    selectedHero.value = getHeroOptions.value[heroId - 1];
  }
});

const selectedHeroDetails = computed(() => {
  if (selectedHero.value) {
    const heroDetails = heroDetailStore.getHeroByName(selectedHero.value.label);
    return heroDetails;
  }
  return null;
});

const addHeroCards = () => {
  const validHero = hasSelectedHero.value;
  if (!validHero) {
    return;
  }
  deckStore.addCards('hero', selectedHeroDetails.value.cards);
  emit('nextStep');
};

const hasSelectedHero = computed(() => {
  return selectedHero.value?.label;
});

const getSuccessFateIcon = (icon) => {
  if (icon === '1 Success') {
    return '/assets/success.png';
  }
  else if (icon === '1 Fate') {
    return '/assets/fate.png';
  }
  else if (icon === '2 Fate') {
    return '/assets/fate2.png';
  }
  return '';
};
const getIconStyle = (icon) => {
  return icon === '2 Fate' ? 'width: 22px;' : 'width: 15px;';
};

</script>

<template>
  <div v-if="detailsLoading && deckLoading" class="row justify-center">
    <q-spinner-oval color="primary" size="10rem" />
  </div>

  <div v-else style="display: grid; place-items: center;">
    <q-select
      :options="getHeroOptions"
      v-model="selectedHero"
      label="Hero:"
      clearable
      outlined
      stack-label
      color="primary"
      style="width: 18rem;"
    />

    <div class="q-pa-md row justify-between">
      <q-btn color="primary" @click="addHeroCards" :disable="!hasSelectedHero">
        Select Hero
      </q-btn>
    </div>

    <div v-if="selectedHeroDetails">
      <hero-detail-card
        :key="selectedHeroDetails.id"
        :hero="selectedHeroDetails"
      />
      <ul class="card-grid" role="list">
        <li v-for="card in selectedHeroDetails?.cards"
            :key="card.number"
            class="card"
            tabindex="0">
          <header class="card-name">
            {{ card.name }}
            <q-img
              :src="getSuccessFateIcon(card.icon)"
              :style="getIconStyle(card.icon)"
              alt="success"
            />
          </header>
          <section>
            <i>{{ card.trait }}</i>
          </section>
          <main>
            <p class="card-description">{{ card.description }}</p>
          </main>
          <footer>
            <i> {{ selectedHeroDetails.name + ' ' + card.number }}</i>          
          </footer>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card {
  border: 1px solid $primary;
}
section {
  flex-grow: .5;
}
main {
  flex-grow: 1;
}
</style>

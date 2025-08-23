<script setup>
import { computed, ref } from 'vue';

const selectedTab = ref('details');
const props = defineProps({
  hero: {
    type: Object,
    required: true
  }
});

const hasCards = computed(() =>
  !!(props.hero && Array.isArray(props.hero.cards) && props.hero.cards.length)
);

const resetTabs = () => {
  selectedTab.value = 'details';
};
</script>

<template>
  <q-dialog @before-show="resetTabs">
    <q-card style="height: 60vh;">

      <q-tabs v-model="selectedTab" no-caps>
        <q-tab name="details" icon="military_tech" label="Details" />
        <q-tab v-if="hasCards" name="cards" icon="assignment_ind" label="Hero Cards" />
      </q-tabs>

      <q-tab-panels
        v-model="selectedTab"
        animated
        dense
        no-caps
      >
        <q-tab-panel name="details">
          <q-card-section class="col text-center">
            <h5>{{ hero.name }}</h5>
            <p>Race: {{ hero.race }}</p>
            <p>Suggested role: {{ hero.suggestedRole }}</p>
            <p>Suggested equip: {{ hero.suggestedEquip.length > 0 ? hero.suggestedEquip : "None" }}</p>
          </q-card-section>
          <q-separator />
          <q-card-section>
            <div class="row justify-evenly">
              <p>Inspiration: {{ hero.maxInspiration }}</p>
              <p>Damage: {{ hero.maxDamage }}</p>
              <p>Fear: {{ hero.maxFear }}</p>
            </div>
            <div class="row justify-between">
              <p v-for="(stat, key) in hero.stats"
                 :key="key"
                 class="text-capitalize"
              >
                {{ key }}: {{ stat }}
              </p>
            </div>
          </q-card-section>
          <q-separator />
          <q-card-section>
            <p class="text-center">
              Hero Ability
            </p>
            <p>
              {{ hero.ability }}
            </p>
          </q-card-section>
        </q-tab-panel>

        <q-tab-panel v-if="hasCards" name="cards">
          <q-card-section class="flex row">
            <div
              v-for="card in hero.cards"
              :key="card.name"
              class="hero-card-preview q-pa-sm"
            >
              <i>{{ card.name }}</i>
              <p>{{ card.description }}</p>
            </div>
          </q-card-section>
        </q-tab-panel>
      </q-tab-panels>

    </q-card>
  </q-dialog>
</template>

<style>
.hero-card-preview {
  font-size: .8rem;
  height: 8rem;
  width: 8rem;
  border: 1px solid black;
  overflow: auto;
  text-align: center;
}
</style>

<script setup>
import { getIconImageSrc } from 'src/utils/assetUtil';

defineProps({
  card: {
    type: Object,
    required: true
  },
  isSelected : {
    type: Boolean,
    default: false
  }
});

const getStats = (stats) => {
  if (!stats) {
    return [];
  }
  return stats.split('/');
};
</script>

<template>
  <div :class="[
    'col q-pa-sm column no-wrap', 
    { 'selected-card-border': isSelected }
  ]">
    <header class="card-name row">
      {{ card.name }}
      
      <div>
        <span v-for="t in getStats(card.stat)" :key="t">
          <q-img
            :src="getIconImageSrc(t)"
            style="width: 20px;"
            class="cursor-pointer"
          >
            <q-tooltip class="bg-primary text-body2">
              {{ t }}
            </q-tooltip>
          </q-img>
          <q-img
            v-if="card.ranged"
            :src="getIconImageSrc('ranged')"
            style="width: 20px;"
          >
            <q-tooltip touch class="bg-primary text-body2">
              Ranged
            </q-tooltip>
          </q-img>
        </span>
      </div>
    </header>

    <section class="row q-mt-xs">
      <div class="tier">
        <p class="tier-text">
          {{ card.tier }}
        </p>
      </div>
      <q-img
        :src="getIconImageSrc(card.hands ? `${card.hands}hand` : '')"
        class="q-ml-sm"
        style="width: 25px;"
      >
        <q-tooltip touch class="bg-primary text-body2">
          Ranged
        </q-tooltip>
      </q-img>
    </section>

    <section v-if="card.trait" class="card-trait">
      <i>{{ card.trait }}</i>
    </section>

    <main class="col card-description">
      <p>{{ card.description }}</p>
    </main>

    <footer class="col-auto">
      <span>
        <b>{{ card.upgrade }}</b>
        <q-img
          v-if="card.upgrade"
          :src="getIconImageSrc('lore')"
          style="width: 20px;"
        />
      </span>
    </footer>

  </div>
</template>

<style scope lang="scss">
.tier {
 width: 20px;
 height: 20px;
 border: 1px solid black;
 transform: rotate(45deg);
 margin: 1px;
}
.tier-text {
  transform: rotate(-45deg);
  text-align: center;
  color: $primary;
}
</style>

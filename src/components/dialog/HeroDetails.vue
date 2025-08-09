<script setup>
const { hero } = defineProps({
  hero: Object
});
</script>

<template>
  <q-dialog>
    <q-card>
      <q-card-actions align="right">
        <q-btn flat
               icon="close"
               label="close"
               color="primary"
               v-close-popup />
      </q-card-actions>
      <q-card-section>
        <p class="text-h6">{{ hero.name }}</p>
        <div class="text-subtitle2">Race: {{ hero.race }}</div>
        <div class="text-subtitle2">Suggested role: {{ hero.suggestedRole }}</div>
        <div class="text-subtitle2">Suggested equip: {{ hero.suggestedEquip }}</div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <div class="flex row justify-evenly">
          <p>Inspiration: {{ hero.maxInspiration }}</p>
          <p>Damage: {{ hero.maxDamage }}</p>
          <p>Fear: {{ hero.maxFear }}</p>
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <div class="flex row justify-between">
          <p v-for="(stat, key) in hero.stats" :key="key" class="text-capitalize">
            {{ key }}: {{ stat }}
          </p>
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <span>
          {{ hero.ability }}
        </span>
      </q-card-section>
      <q-card-section>
        <div>
          TODO: hero cards list here
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

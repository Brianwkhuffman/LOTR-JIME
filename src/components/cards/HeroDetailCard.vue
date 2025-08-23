<script setup>

const props = defineProps({
  hero: {
    type: Object,
  }
});

const emit = defineEmits(['open-hero-details']);

const getStatColor = (value) => {
  if (value > 3) {
    return 'stat-good';
  }
  if (value === 3) {
    return 'stat-ok';
  }
  if (value < 3) {
    return 'stat-low';
  }
};
</script>

<template>
  <q-card bordered class="q-mb-md" @click="emit('open-hero-details', props.hero)">
    <q-card-section>
      <div class="row items-center no-wrap">
        <div class="col">
          <h6>{{ props.hero.name }}</h6>
          <p>Race: <b>{{ props.hero.race }}</b></p>
          <p>Suggested Role: <b>{{ props.hero.suggestedRole }}</b></p>
        </div>
        <q-img
          src="/assets/heroPh.png"
          alt="Hero image"
          style="width: 80px; height: auto"
          class="rounded-borders"
        />
      </div>
    </q-card-section>

    <q-separator />

    <q-card-section>
      <div class="row items-center justify-around">
        <div
          v-for="(value, stat) in props.hero.stats"
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

</template>

<style scoped lang="scss">
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
  background-color: $positive;
}
.stat-ok {
  background-color: $warning;
}
.stat-low {
  background-color: $negative;
}
</style>

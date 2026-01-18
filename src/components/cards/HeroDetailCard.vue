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
      <div class="row items-center">
        <div class="col q-pa-sm">
          <h6>{{ props.hero.name }}</h6>
          <i>{{ props.hero.race }}</i>
          <p>{{ props.hero.ability }}</p>
        </div>
        <div class="column items-center">
          <q-img
            src="/assets/heroPh.png"
            style="width: 80px; height: auto"
            class="rounded-borders"
          />
          <span>
            <q-img src="/assets/fate.png" style="width: 30px;" />
            <b>{{ props.hero.maxInspiration }}</b>
          </span>
        </div>
      </div>

      <div class="q-gutter-x-md">
        <span>  
          <q-img
            src="/assets/dmg.png"
            style="width: 30px;"
          />
          <b>{{ props.hero.maxDamage }}</b>
        </span>
        <span>
          <q-img
            src="/assets/fear.png"
            style="width: 30px;"
          />
          <b>{{ props.hero.maxFear }}</b>
        </span>
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
  background-color: #41c241;
}
.stat-ok {
  background-color: #c4bebe;
}
.stat-low {
  background-color: #f3ae25;
}
</style>

<script setup>
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
  <div :class="[
    'col q-pa-sm column no-wrap', 
    { 'selected-card-border': isSelected }
  ]">
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
    <main class="col">
      <p class="card-description">{{ card.description }}</p>
    </main>
    <footer class="col-auto">
      <i v-if="card.type === 'Character'"> {{ card.heroName + ' ' + card.number }}</i>
      <i v-else-if="card.type === 'Role'"> {{ card.role + ' ' + card.number }}</i>
    </footer>
  </div>
</template>

<style scoped>
section {
    height: 1rem;
    margin-bottom: .20rem;
}
.selected-card-border {
  border: 1px solid var(--q-primary);
  box-shadow: 0 0 10px var(--q-primary);
}
</style>

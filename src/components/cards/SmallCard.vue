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

</script>

<template>
  <q-card :class="{ 'selected-card-border': isSelected }">
    <q-card-section class="col">
      <h5>
        {{ card.name }}
        <q-img
          v-if="card.icon === '1 Success'"
          src="/assets/success.png"
          alt="success"
          style="width: 25px;"
        />
        <q-img
          v-else-if="card.icon === '1 Fate'"
          src="/assets/fate.png"
          alt="fate"
          style="width: 25px;"
        />
        <q-img
          v-else
          src="/assets/fate2.png"
          alt="fate2"
          style="width: 50px;"
        />
      </h5>
      <div class="row justify-between">
        <i v-if="card.trait">{{ card.trait }}</i>
        <b v-if="card.type === 'Role'">{{ card.exp ? ' Exp:' + card.exp : '' }}</b>
      </div>
    </q-card-section>
    <q-card-section>
      <p>{{ card.description }}</p>
    </q-card-section>
    <q-card-section v-if="card.type === 'Role'">
      <i>{{ card.role + ' ' + card.number }}</i>
    </q-card-section>
    <q-card-section v-else-if="card.type">
      <i>{{ card.type + ' ' + card.number }}</i>
    </q-card-section>
    <q-card-section v-else>
      <i>{{ 'Title ' + card.number }}</i>
    </q-card-section>
  </q-card>
</template>

<style>
.selected-card-border {
  border: 1px solid var(--q-primary);
  box-shadow: 0 0 10px var(--q-primary);
}
</style>

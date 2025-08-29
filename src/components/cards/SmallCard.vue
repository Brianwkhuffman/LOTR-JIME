<script setup>
defineProps({
  card: {
    type: Object,
    required: true,
    validator: (card) => {
      if (!card.name) {
        console.warn('Card object requires a name.');
      }
      if (!card.description) {
        console.warn('Card object requires a description.');
      }
    }
  }
});

</script>

<template>
  <q-card>
    <q-card-section class="col">
      <h5>
        {{ card.name }}
        <q-img
          v-if="card.icon === '1 Success'"
          src="/assets/success.png"
          alt="fate"
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
          alt="fate"
          style="width: 50px;"
        />
      </h5>
      <i v-if="card.trait">{{ card.trait }}</i>
    </q-card-section>
    <q-card-section>
      <p>{{ card.description }}</p>
    </q-card-section>
  </q-card>
</template>

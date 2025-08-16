<script setup>
import {ref} from 'vue';
import StepHero from 'components/deck/StepHero.vue';
import StepRole from 'components/deck/StepRole.vue';
import StepEquipment from 'components/deck/StepEquipment.vue';
import StepReview from 'components/deck/StepReview.vue';

const currentStep = ref(0);
const steps = [
  StepHero,
  StepRole,
  StepEquipment,
  StepReview
];

const nextStep = () => {
  if (currentStep.value < steps.length - 1) currentStep.value++;
};

const prevStep = () => {
  if (currentStep.value > 0) currentStep.value--;
};
</script>

<template>
  <component
    :is="steps[currentStep]"
    @next="nextStep"
    @back="prevStep"
  />
</template>

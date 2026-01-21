<script setup>
import { useEquipmentStore } from 'stores/equipmentStore.js';
import { useDeckStore } from 'stores/deckStore';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
import { getIconImageSrc } from 'src/utils/assetUtil';

const equipStore = useEquipmentStore();
const deckStore = useDeckStore();

const emit = defineEmits(['nextStep']);
const { loading: equipLoading } = storeToRefs(equipStore);
const { loading: deckLoading } = storeToRefs(deckStore);

const selectedArmor = ref({ label: '', value: '' });
const selectedWeapon = ref({ label: '', value: '' });
// const selectedWeapon2 = ref({ label: '', value: '' });
const selectedTrinket = ref({ label: '', value: '' });

const armorSlide = ref(0);
const weaponSlide = ref(0);
const trinketSlide = ref(0);

const confirmedChoice = ref({
  armor: {},
  hands: [],
  trinket: {}
});

const itemTypes = ['armors', 'weapons', 'trinkets'];
const equipmentOptions = computed(() => {
  const data = {};
  itemTypes.forEach(type => {
    data[type] =  equipStore.getEquipmentOptionsByType(type);
  });
  return data;
});

// Helper function to create a targeted computed property
const createEquipFamilyComputed = (type, targetRef) => {
  return computed(() => {
    const selection = targetRef.value;
    if (selection && selection.value) {
      return equipStore.getEquipCardsByTypeAndFamily(type, selection.value);
    }
    return [];
  });
};
const activeArmors = createEquipFamilyComputed('armors', selectedArmor);
const activeWeapons = createEquipFamilyComputed('weapons', selectedWeapon);
const activeTrinkets = createEquipFamilyComputed('trinkets', selectedTrinket);

const resetCarousel = (newVal, type) => {
  if (newVal && type === 'armors') {
    return armorSlide.value = activeArmors.value[0].id;
  }
  if (newVal && type === 'weapons') {
    return weaponSlide.value = activeWeapons.value[0].id;
  }
  if (newVal && type === 'trinkets') {
    return trinketSlide.value = activeTrinkets.value[0].id;
  }
};

const addEquipCards = () => {
  // TODO: Validate selection
  deckStore.addEquipmentCards('armor', confirmedChoice.value);
  emit('nextStep');
};

const getStats = (stats) => {
  if (!stats) {
    return [];
  }
  return stats.split('/');
};
</script>

<template>
  <div v-if="equipLoading && deckLoading" class="row justify-center">
    <q-spinner-oval color="primary" size="10rem" />
  </div>

  <div v-else style="display: grid; place-items: center;">

    <q-list padding bordered class="rounded-borders">

      <!-- Armors -->
      <q-expansion-item
        icon="img:assets/armor.png"
        label="Armor"
        header-class="text-primary text-h6"
        dense
        dense-toggle
        expand-separator
      >
        <q-select
          :options="equipmentOptions.armors"
          v-model="selectedArmor"
          @update:model-value="(val) => resetCarousel(val, 'armors')"
          outlined
          stack-label
          dense
          clearable
          color="primary"
          class="q-pa-md"
        />
        <q-carousel
          v-if="selectedArmor && selectedArmor.value"
          v-model="armorSlide"
          control-color="primary"
          arrows
          navigation
          swipeable
        >
          <q-carousel-slide
            v-for="armor in activeArmors"
            :key="armor.id"
            :name="armor.id"
          >
            <div class="q-pa-sm text-center">
              <div class="row items-center justify-center q-gutter-x-sm">
                
                <span class="text-h6">{{ armor.name }}</span>
                
                <q-img
                  v-if="armor.stat"
                  :src="getIconImageSrc(armor.stat)"
                  style="width: 20px;"
                  class="cursor-pointer"
                >
                  <q-tooltip class="bg-primary text-body2">
                    {{ armor.stat }}
                  </q-tooltip>
                </q-img>

                <q-img
                  v-if="armor.ranged"
                  :src="getIconImageSrc('ranged')"
                  style="width: 20px;"
                >
                  <q-tooltip class="bg-primary text-body2">
                    Ranged
                  </q-tooltip>
                </q-img>
              </div>

              <div class="q-mt-sm">
                <b>Tier: {{ armor.tier }}</b>
                <p>{{ armor.description }}</p>
                <q-img
                  v-if="armor.upgrade"
                  :src="getIconImageSrc('lore')"
                  style="width: 20px;"
                />
                <b>{{ armor.upgrade }}</b>
              </div>

              <div class="q-pa-md">
                <q-btn color="primary" @click="selectEquipmentSlot('armor', armor)">
                  Select
                </q-btn>
              </div>
            </div>
          </q-carousel-slide>
        </q-carousel>
      </q-expansion-item>

      <!-- Weapons -->
      <q-expansion-item
        icon="img:assets/1hand.png"
        label="Hands"
        header-class="text-primary text-h6"
        dense
        dense-toggle
        expand-separator
      >
        <q-select
          :options="equipmentOptions.weapons"
          v-model="selectedWeapon"
          @update:model-value="(val) => resetCarousel(val, 'weapons')"
          outlined
          stack-label
          dense
          clearable
          color="primary"
          class="q-pa-md"
        />
        <q-carousel
          v-if="selectedWeapon && selectedWeapon.value"
          v-model="weaponSlide"
          control-color="primary"
          arrows
          navigation
          swipeable
        >
          <q-carousel-slide
            v-for="weapon in activeWeapons"
            :key="weapon.id"
            :name="weapon.id"
          >
            <div class="q-pa-sm text-center">
              <div class="row items-center justify-center q-gutter-x-sm">
                
                <span class="text-h6">{{ weapon.name }}</span>

                <template v-for="t in getStats(weapon.stat)" :key="t">
                  <q-img
                    :src="getIconImageSrc(t)"
                    style="width: 20px;"
                    class="cursor-pointer"
                  >
                    <q-tooltip class="bg-primary text-body2">
                      {{ t }}
                    </q-tooltip>
                  </q-img>
                </template>

                <q-img
                  v-if="weapon.ranged"
                  :src="getIconImageSrc('ranged')"
                  style="width: 20px;"
                >
                  <q-tooltip class="bg-primary text-body2">
                    Ranged
                  </q-tooltip>
                </q-img>
              </div>

              <div class="q-mt-sm">
                <b>Tier: {{ weapon.tier }}</b>
                <p>{{ weapon.description }}</p>
                <q-img
                  v-if="weapon.upgrade"
                  :src="getIconImageSrc('lore')"
                  style="width: 20px;"
                />
                <b>{{ weapon.upgrade }}</b>
              </div>

              <div class="q-pa-md">
                <q-btn color="primary" @click="selectEquipmentSlot('weapon', weapon)">
                  Select
                </q-btn>
              </div>
            </div>
          </q-carousel-slide>
        </q-carousel>
      </q-expansion-item>

      <!-- Trinkets -->
      <q-expansion-item
        icon="img:assets/trinket.png"
        label="Trinket"
        header-class="text-primary text-h6"
        dense
        dense-toggle
        expand-separator
      >
        <q-select
          :options="equipmentOptions.trinkets"
          v-model="selectedTrinket"
          @update:model-value="(val) => resetCarousel(val, 'trinkets')"
          outlined
          stack-label
          dense
          clearable
          color="primary"
          class="q-pa-md"
        />
        <q-carousel
          v-if="selectedTrinket && selectedTrinket.value"
          v-model="trinketSlide"
          control-color="primary"
          arrows
          navigation
          swipeable
        >
          <q-carousel-slide
            v-for="trinket in activeTrinkets"
            :key="trinket.id"
            :name="trinket.id"
          >
            <div class="q-pa-sm text-center">
              <div class="row items-center justify-center q-gutter-x-sm">

                <span class="text-h6">{{ trinket.name }}</span>

                <template v-for="t in getStats(trinket.stat)" :key="t">
                  <q-img
                    :src="getIconImageSrc(t)"
                    style="width: 20px;"
                    class="cursor-pointer"
                  >
                    <q-tooltip class="bg-primary text-body2">
                      {{ t }}
                    </q-tooltip>
                  </q-img>
                </template>
              </div>

              <div class="q-mt-sm">
                <b>Tier: {{ trinket.tier }}</b>
                <p>{{ trinket.description }}</p>
                <q-img
                  v-if="trinket.upgrade"
                  :src="getIconImageSrc('lore')"
                  style="width: 20px;"
                />
                <b>{{ trinket.upgrade }}</b>
              </div>

              <div class="q-pa-md">
                <q-btn color="primary" @click="selectEquipmentSlot('trinket', trinket)">
                  Select
                </q-btn>
              </div>
            </div>
          </q-carousel-slide>
        </q-carousel>
      </q-expansion-item>
      
    </q-list>

    <div class="q-pa-md row justify-between">
      <q-btn color="primary" @click="addEquipCards">
        Confirm Equipment
      </q-btn>
    </div>
  </div>
</template>

<style scoped lang="scss">
.q-list {
  width: 100%;
  border-color: $primary;
}
</style>

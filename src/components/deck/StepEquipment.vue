<script setup>
import { useEquipmentStore } from 'stores/equipmentStore.js';
import { useDeckStore } from 'stores/deckStore';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { getIconImageSrc } from 'src/utils/assetUtil';

const equipStore = useEquipmentStore();
const deckStore = useDeckStore();

const emit = defineEmits(['nextStep']);
const { loading: equipLoading } = storeToRefs(equipStore);
const { loading: deckLoading } = storeToRefs(deckStore);

const hasArmorSelection = ref(false);

const selectedArmor = ref({ label: '', value: '' });
const selectedWeapon = ref({ label: '', value: '' });
// const selectedWeapon2 = ref({ label: '', value: '' });

const armorSlide = ref('');
const weaponSlide = ref('');
const selectedEquipments = ref({});

const getEquipTypeFromStore = (type) => {
  return equipStore.getEquipmentOptionsByType(type);
};

const addEquipCards = () => {
  // TODO: Validate selection
  deckStore.addCards('equipment', selectedEquipments.value);
  emit('nextStep');
};

const selectEquipmentSlot = (slot, equip) => {
  selectedEquipments.value[slot] = equip;
  hasArmorSelection.value = true;
};

const getEquipFamily = (type) => {
  if (type === 'armors') {
    return equipStore.getEquipCardsByTypeAndFamily(type, selectedArmor.value.label);
  }
  if (type === 'weapons') {
    // TODO: need to get and combine support cards into this list
    return equipStore.getEquipCardsByTypeAndFamily(type, selectedWeapon.value.label);
  }
  if (type === 'trinkets') {
    return null;
  }
  if (type === 'mounts') {
    return null;
  }
};

const resetCarousel = (newVal, type) => {
  let family;
  if (newVal && type === 'armors') {
    family = equipStore.getEquipCardsByTypeAndFamily(type, newVal.label);
    return armorSlide.value = family[0].name;
  }
  if (newVal && type === 'weapons') {
    family = equipStore.getEquipCardsByTypeAndFamily(type, newVal.label);
    return weaponSlide.value = family[0].name;
  }
};

</script>

<template>
  <div v-if="equipLoading && deckLoading" class="row justify-center">
    <q-spinner-oval color="primary" size="10rem" />
  </div>

  <div v-else style="display: grid; place-items: center;">

    <q-list padding bordered class="rounded-borders">

      <q-expansion-item
        icon="img:assets/armor.png"
        label="Armor"
        header-class="text-primary text-h6"
        dense
        dense-toggle
        expand-separator
      >
        <q-select
          :options="getEquipTypeFromStore('armors')"
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
        >
          <q-carousel-slide
            v-for="equip in getEquipFamily('armors')"
            :key="equip.id"
            :name="equip.name"
          >
            <div class="q-pa-sm text-center">
              <div class="row items-center justify-center q-gutter-x-sm">
                <span class="text-h6">{{ equip.name }}</span>
                <q-img
                  v-if="equip.trait"
                  :src="getIconImageSrc(equip.trait)"
                  style="width: 20px;"
                  class="cursor-pointer"
                >
                  <q-tooltip class="bg-primary text-body2">
                    {{ equip.trait }}
                  </q-tooltip>
                </q-img>

                <q-img
                  v-if="equip.ranged"
                  :src="getIconImageSrc('ranged')"
                  style="width: 20px;"
                >
                  <q-tooltip class="bg-primary text-body2">
                    Ranged
                  </q-tooltip>
                </q-img>
              </div>

              <div class="q-mt-sm">
                <b>Tier: {{ equip.tier }}</b>
                <p>{{ equip.description }}</p>
                <q-img
                  v-if="equip.upgrade"
                  :src="getIconImageSrc('lore')"
                  style="width: 20px;"
                />
                <b>{{ equip.upgrade }}</b>
              </div>

              <div class="q-pa-md">
                <q-btn color="primary" @click="selectEquipmentSlot('armor', equip)">
                  Select
                </q-btn>
              </div>
            </div>
          </q-carousel-slide>
        </q-carousel>
      </q-expansion-item>

      <q-expansion-item
        icon="img:assets/1hand.png"
        label="Hands"
        header-class="text-primary text-h6"
        dense
        dense-toggle
        expand-separator
      >
        <q-select
          :options="getEquipTypeFromStore('weapons')"
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
        >
          <q-carousel-slide
            v-for="equip in getEquipFamily('weapons')"
            :key="equip.id"
            :name="equip.name"
          >
            <div class="q-pa-sm text-center">
              <div class="row items-center justify-center q-gutter-x-sm">
                <span class="text-h6">{{ equip.name }}</span>

                <template v-for="t in equip.trait.split('/')" :key="t">
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
                  v-if="equip.ranged"
                  :src="getIconImageSrc('ranged')"
                  style="width: 20px;"
                >
                  <q-tooltip class="bg-primary text-body2">
                    Ranged
                  </q-tooltip>
                </q-img>
              </div>

              <div class="q-mt-sm">
                <b>Tier: {{ equip.tier }}</b>
                <p>{{ equip.description }}</p>
                <q-img
                  v-if="equip.upgrade"
                  :src="getIconImageSrc('lore')"
                  style="width: 20px;"
                />
                <b>{{ equip.upgrade }}</b>
              </div>

              <div class="q-pa-md">
                <q-btn color="primary" @click="selectEquipmentSlot('armor', equip)">
                  Select
                </q-btn>
              </div>
            </div>
          </q-carousel-slide>
        </q-carousel>
      </q-expansion-item>


      <q-expansion-item
        icon="img:assets/trinket.png"
        label="Trinket"
        header-class="text-primary text-h6"
        dense
        dense-toggle
        expand-separator
      />
      <q-expansion-item
        icon="img:assets/mount.png"
        label="Mounts"
        header-class="text-primary text-h6"
        dense
        dense-toggle
        expand-separator
      />
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

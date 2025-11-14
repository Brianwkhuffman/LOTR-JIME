import { useDamageFearCardStore } from 'stores/damageFearCardStore.js';
import { useDeckStore } from 'stores/deckStore.js';
import { useEquipmentStore } from 'stores/equipmentStore.js';
import { useHeroDetailStore } from 'stores/heroDetailStore.js';
import { useInfoCardStore } from 'stores/infoCardStore.js';
import { useRoleCardStore } from 'stores/roleCardStore.js';
import { useTitleCardStore } from 'stores/titleCardStore.js';
import { useWeaknessCardStore } from 'stores/weaknessCardStore.js';

export default async ({ store }) => {
  const damageFearCardStore = useDamageFearCardStore(store);
  const deckStore = useDeckStore(store);
  const equipmentStore = useEquipmentStore(store);
  const heroDetailStore = useHeroDetailStore(store);
  const infoCardStore = useInfoCardStore(store);
  const roleCardStore = useRoleCardStore(store);
  const titleCardStore = useTitleCardStore(store);
  const weaknessCardStore = useWeaknessCardStore(store);

  await Promise.all([
    damageFearCardStore.fetchDamageFearCards(),
    deckStore.initializeDeck(),
    equipmentStore.fetchEquipCards(),
    heroDetailStore.fetchHeroDetails(),
    infoCardStore.fetchInfoCards(),
    roleCardStore.fetchRoleCards(),
    titleCardStore.fetchTitleCards(),
    weaknessCardStore.fetchWeaknessCards(),
  ]);
};

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/MainPage.vue')
      },
      {
        path: 'cards',
        component: () => import('pages/cards/CardDirectory.vue')
      },
      {
        path: 'cards/heroes',
        component: () => import('pages/cards/HeroList.vue')
      },
      {
        path: 'cards/equipment',
        component: () => import('pages/cards/EquipmentTypeList.vue')
      },
      {
        path: 'cards/equipment/:type',
        component: () => import('pages/cards/EquipmentList.vue')
      },
      {
        path: 'cards/roles',
        component: () => import('pages/cards/RoleList.vue')
      },
      {
        path: 'cards/roles/:role',
        component: () => import('pages/cards/RoleCardList.vue')
      },
      {
        path: 'cards/titles',
        component: () => import('pages/cards/TitleList.vue')
      },
      {
        path: 'load',
        component: () => import('pages/LoadGame.vue')
      },
      {
        path: ':catchAll(.*)*',
        component: () => import('pages/ErrorNotFound.vue')
      }
    ]
  }
];

export default routes;

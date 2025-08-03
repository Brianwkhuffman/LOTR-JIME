const routes = [
  // Example
  {
    path: '/default',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') }
    ]
  },
  // Routes
  {
    path: '/',
    component: () => import('pages/HomePage.vue')
  },
  {
    path: '/start',
    component: () => import('pages/StartGame.vue')
  },
  {
    path: '/load',
    component: () => import('pages/LoadGame.vue')
  },
  {
    path: '/heroes',
    component: () => import('pages/HeroList.vue')
  },
  {
    path: '/heroes/:name',
    component: () => import('pages/HeroDetails.vue')
  },
  {
    path: '/equipment',
    component: () => import('pages/EquipmentTypeList.vue')
  },
  {
    path: '/equipment/:type',
    component: () => import('pages/EquipmentList.vue')
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes

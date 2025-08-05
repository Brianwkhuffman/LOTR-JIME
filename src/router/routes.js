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
        path: 'load',
        component: () => import('pages/LoadGame.vue')
      },
      {
        path: ':catchAll(.*)*',
        component: () => import('pages/ErrorNotFound.vue')
      },
    ]
  }
]

export default routes

const routes = [
  {
    path: '/',
    component: '@/layouts/BaseLayout',
    routes: [
      {
        path: '/home',
        component: '@/pages/home',
      },
      {
        path: '/database',
        component: '@/pages/database',
      },
    ],
  },
];

export default routes;

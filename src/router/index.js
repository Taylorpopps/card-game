import { createRouter, createWebHistory } from 'vue-router'

const BLANK_LAYOUT = "BlankLayout";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
      {
        path: "/",
        redirect: { path: "/dashboard" },
      },
      {
        path: '/dashboard',
        name: 'dashboard',
        meta: {
          layout: BLANK_LAYOUT
        },
        component: () => import('../pages/dashboard.vue'),
      },
      {
        path: '/:pathMatch(.*)*',
        meta: {
          layout: BLANK_LAYOUT
        },
        component: () => import('../pages/404.vue'),
      },
  ],
})

export default router

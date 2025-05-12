import { createRouter, createWebHistory } from 'vue-router'
import CatListView from '../views/CatListView.vue'
import CatCreateView from '@/views/CatCreateView.vue'
import CatDeleteView from '@/views/CatDeleteView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'cats',
      component: CatListView,
    },
    {
      path: '/create',
      name: 'cat-create',
      component: CatCreateView,
    },
    {
      path: '/:id/delete',
      name: 'cat-delete',
      component: CatDeleteView,
    },
  ],
})

export default router

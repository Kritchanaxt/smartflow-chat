import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Dashboard',
        transition: 'vue'
      }
    },
    {
      path: '/chat',
      name: 'chat',
      component: () => import('../views/ChatView.vue'),
      meta: {
        title: 'Chat',
        transition: 'slide-left'
      }
    },
    {
      path: '/analytics',
      name: 'analytics',
      component: () => import('../views/AnalyticsView.vue'),
      meta: {
        title: 'Analytics',
        transition: 'slide-right'
      }
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('../views/AboutView.vue'),
      meta: {
        title: 'Settings',
        transition: 'vue'
      }
    },
  ],
})

export default router

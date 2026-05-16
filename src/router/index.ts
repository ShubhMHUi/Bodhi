import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: () => import('../views/LandingView.vue'),
      meta: { hideSidebar: true, layout: 'blank' }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      meta: { hideSidebar: true, layout: 'blank' }
    },
    {
      path: '/dashboard',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/games',
      name: 'games',
      component: () => import('../views/GameView.vue'),
    },
    {
      path: '/games/drag-drop',
      name: 'drag-drop-game',
      component: () => import('../views/DragDropGameView.vue'),
    },
    {
      path: '/games/math',
      name: 'math-game',
      component: () => import('../views/FunnyMathView.vue'),
    },
    {
      path: '/games/match',
      name: 'match-game',
      component: () => import('../views/MatchPairGameView.vue'),
    },
    {
      path: '/games/audio',
      name: 'audio-game',
      component: () => import('../views/AudioGuessGameView.vue'),
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/ProfileView.vue'),
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

export default router

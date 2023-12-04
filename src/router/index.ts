import { createRouter, createWebHistory } from 'vue-router'
import CharacterSheet from '../views/CharacterSheet.vue'
import DmScreen from '../views/DmScreen.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'sheet',
      component: CharacterSheet
    },
    {
      path: '/dm',
      name: 'dm-screen',
      component: DmScreen
    },
    {
      path: '/items',
      name: 'items',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Items.vue')
    }
  ]
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import CharacterSheet from '../views/CharacterSheet.vue'
import CrewSheet from '../views/CrewSheet.vue'
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
      path: '/crew',
      name: 'crew',
      component: CrewSheet
    },
    {
      path: '/dm',
      name: 'dm-screen',
      component: DmScreen
    },
    {
      path: '/dicelog',
      name: 'dicelog',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/DiceLog.vue')
    },
  ]
})

export default router

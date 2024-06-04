import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/auth/Login.vue'
import Dashboard from '../views/dashboard/Dashboard.vue';
import Status from '../views/dashboard/Status.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Login
    },

    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/status',
      name: 'status',
      component: Status
    },


   /* {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
    */
  ]
})

export default router

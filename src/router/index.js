import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/auth/Login.vue'
import Dashboard from '../views/dashboard/Dashboard.vue';
import Status from '../views/dashboard/Status.vue';
import Report from '../views/dashboard/Report.vue';
import Activations from '../views/dashboard/Activations.vue';
import Budget from '../views/dashboard/Budget.vue';
import Warehouse from '../views/dashboard/Warehouse.vue';
import Profile from '../views/dashboard/Profile.vue';

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
      path: '/activations',
      name: 'activations',
      component: Activations
    },
    {
      path: '/status',
      name: 'status',
      component: Status
    },

    {
      path: '/budget',
      name: 'budget',
      component: Budget
    },

    {
      path: '/warehouse',
      name: 'warehouse',
      component: Warehouse
    },

    {
      path: '/report',
      name: 'report',
      component: Report
    },

    {
      path: '/profile',
      name: 'profile',
      component: Profile
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

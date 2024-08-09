import TalentTask from '@/views/talent/TalentTask.vue';
import Promoter from '../views/promoters/Promoter.vue';
import Profile from '@/views/dashboard/Profile.vue';
export default [
    {
        path: '/promoters',
        name: 'promoters',
        component: Promoter
      },
      {
        path: '/talent',
        name: 'talent',
        component: TalentTask
      },
      {
        path: '/talent/images',
        name: 'talent/images',
        component: TalentTask
      },
      {
        path: '/profile/:id',
        name: 'profile',
        component: Profile
      },
      {
        path: '/talent/check',
        name: 'talent/check',
        component: TalentTask
      },
  ]
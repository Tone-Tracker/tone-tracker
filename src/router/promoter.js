import TalentTask from '@/views/talent/TalentTask.vue';
import Promoter from '../views/promoters/Promoter.vue';
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
        path: '/talent/profile',
        name: 'talent/profile',
        component: TalentTask
      },
      {
        path: '/talent/check',
        name: 'talent/check',
        component: TalentTask
      },
  ]
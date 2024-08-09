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
  ]
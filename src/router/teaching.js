import Teaching from '../views/teaching/Teaching.vue';
import ReadActivationComponent from '../views/teaching/Teaching.vue';
export default [
    {
        path: '/teaching',
        name: 'teaching',
        component: Teaching
    },
    {
        path: '/activation/:id',
        name: 'ReadActivation',
        component: ReadActivationComponent
      }
]
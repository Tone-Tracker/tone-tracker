
import ViewActivation from '@/views/activations/ViewActivation.vue';
import AdminActivations from '../views/activations/AdminActivations.vue';
import CreateActivation from '../views/activations/CreateActivation.vue';
import ActivationImages from '@/views/activations/ActivationImages.vue';
export default [
        {
                path: '/admin-activations',
                name: 'admin-activations',
                component: AdminActivations,
        },
        {
                path: '/create-activation',
                name: 'create-activation',
                component: CreateActivation,
        },
        {
                path: '/view-activation',
                name: 'create-activation',
                component: ViewActivation,
        },
        {
                path: '/activation-images',
                name: 'activation-images',
                component: ActivationImages,
        }
];

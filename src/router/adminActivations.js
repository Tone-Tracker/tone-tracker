import AdminActivations from '../views/activations/AdminActivations.vue';
import CreateActivation from '../views/activations/CreateActivation.vue';
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
                path: '/edit-activation/:id',
                name: 'edit-activation',
                component: CreateActivation,
        }
]
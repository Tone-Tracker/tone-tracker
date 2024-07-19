import Client from '../views/clients/Client.vue';
export default [
  {
    path: '/clients',
    name: 'clients',
    component: Client
  },
  {
    path: '/client-campaigns/:id',
    name: 'client-campaigns',
    component: Client
  }
]
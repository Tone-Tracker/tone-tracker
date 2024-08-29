import AdminViewWarehouse from '@/views/warehouses/AdminViewWarehouse.vue';
import AdminWarehouse from '@/views/warehouses/AdminWarehouse.vue';
export default [
    {
        path: '/admin-warehouse',
        name: 'Adminwarehouse',
        component: AdminWarehouse
      },
      {
        path: '/admin-view-warehouse/:id',
        name: 'AdminViewWarehouse',
        component: AdminViewWarehouse
      }
      
  ]
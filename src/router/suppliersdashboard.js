import SupplierBrief from "@/views/suppliers/SupplierBrief.vue";
import SuppliersDashboard from "../views/suppliers/SuppliersDashboard.vue";
import ViewSupplierTask from "@/views/suppliers/ViewSupplierTask.vue";
import SupplierAwarded from "@/views/suppliers/SupplierAwarded.vue";
import ViewSupplierAwardedTask from "@/views/suppliers/ViewSupplierAwardedTask.vue";

export default [
    {
        path: '/supplier-dashboard',
        name: 'supplier-dashboard',
        component: SuppliersDashboard
    },
    {
        path: '/supplier-briefs',
        name: 'supplier-briefs',
        component: SupplierBrief
    },
    {
        path: '/view-supplier-task/:id',
        name: 'view-supplier-task',
        component: ViewSupplierTask
    },
    {
        path: '/supplier-awarded-tasks',
        name: 'supplier-awarded-tasks',
        component: SupplierAwarded
    },
    {
        path: '/view-awarded-tasks/:id',
        name: 'view-awarded-tasks',
        component: ViewSupplierAwardedTask
    },
]
import SupplierBrief from "@/views/suppliers/SupplierBrief.vue";
import SuppliersDashboard from "../views/suppliers/SuppliersDashboard.vue";

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
    }
]
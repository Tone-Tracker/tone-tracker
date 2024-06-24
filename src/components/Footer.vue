<script setup>
import { useAuth } from '@/stores/auth';

const auth = useAuth();
const logout = () => {
    auth.logout();
}
</script>
<template>
    <footer class="page-footer ">
        <p class="mb-0">Copyright © {{ new Date().getFullYear() }}. All right reserved.
            <span @click="logout" class="text-danger ml-4 float-end cursor-pointer">Logout</span></p>
        
    </footer>
</template>
<script setup>
import CLIENT from './navigations/CLIENT.vue';
import TTG_SUPER_ADMIN from './navigations/TTG_SUPER_ADMIN.vue';
import TTG_REGIONAL_MANAGER from './navigations/TTG_REGIONAL_MANAGER.vue';
import TTG_HEAD_ADMIN from './navigations/TTG_HEAD_ADMIN.vue';
import TTG_ACTIVATION_MANAGER from './navigations/TTG_ACTIVATION_MANAGER.vue';
import TTG_CLIENT from './navigations/TTG_CLIENT.vue';
import TTG_PROMOTERS from './navigations/TTG_PROMOTERS.vue';

import { useAuth } from '@/stores/auth';

const auth = useAuth();
const user = JSON.parse(auth.user);

const getUserRole = (role) => {
    return user.role == role
};

</script>
<template>
   
    <div class="sidebar-wrapper" data-simplebar="true" >
        <!-- <div class="sidebar-header">

            <div>
                <img style="width: 180px;" src="/src/assets/images/logo/white-logo.png" alt="">
            </div>
           <div class="toggle-icon ms-auto"><i class='bx bx-arrow-back'></i> 
            </div>
          </div>v-if="user.role == 'TTG_SUPER_ADMIN'"
           -->
         
        <div class="metismenu p-0" id="menu">
            <!-- <div class="col-img">
                <div class="gallery">
                    <div class="image-container position-relative">
                        <router-link to="/">
                            <img src="/src/assets/images/company-logo.png" alt="Cinque Terre"
                                class="img-fluid mx-auto d-block">
                        </router-link>
                        <div class="text-center text-sm">Dashboard</div>
                    </div>
                </div>
            </div> -->
            <div class="content">
                <nav class="sidebar d-flex">
                     <!-- <AdminNav/> -->
                     <CLIENT v-if="getUserRole('TTG_SUPER_ADMIN')" :user="user" style="z-index: 9999"/>
                    <TTG_SUPER_ADMIN v-if="getUserRole('TTG_SUPER_ADMIN')" :user="user"/>
                     <TTG_REGIONAL_MANAGER v-if="getUserRole('TTG_REGIONAL_MANAGER')" :user="user"/> 
                     <TTG_HEAD_ADMIN v-if="getUserRole('TTG_HEAD_ADMIN')" :user="user"/> 
                    
                     <TTG_ACTIVATION_MANAGER v-if="getUserRole('TTG_ACTIVATION_MANAGER')" :user="user"/> 
                     <TTG_PROMOTERS v-if="getUserRole('TTG_TALENT')" :user="user"/> 
                    
                </nav>

            </div>

        </div>
    </div>



    <!--navigation-->


    <!--end navigation-->
</template>
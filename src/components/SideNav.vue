<script setup>
import CLIENT from './navigations/CLIENT.vue';
import TTG_SUPER_ADMIN from './navigations/TTG_SUPER_ADMIN.vue';
import TTG_REGIONAL_MANAGER from './navigations/TTG_REGIONAL_MANAGER.vue';
import TTG_HEAD_ADMIN from './navigations/TTG_HEAD_ADMIN.vue';
import TTG_ACTIVATION_MANAGER from './navigations/TTG_ACTIVATION_MANAGER.vue';
import TTG_CLIENT from './navigations/TTG_CLIENT.vue';
import TTG_PROMOTERS from './navigations/TTG_PROMOTERS.vue';
import TTG_SUPPLIERS from './navigations/TTG_SUPPLIERS.vue';
import DarkThemeNavbarToggle from './DarkThemeNavbarToggle.vue';

import { useAuth } from '@/stores/auth';
import { ref, watch } from 'vue';

const auth = useAuth();
const user = JSON.parse(auth.user);

const getUserRole = (role) => {
    return user.role == role
};

const isSideNavVisible = ref(true);

const toggleSideNav = () => {
  isSideNavVisible.value = !isSideNavVisible.value;
};
</script>

<template>
  <DarkThemeNavbarToggle @click="toggleSideNav" />
  
  <div v-show="isSideNavVisible" class="sidebar-wrapper toggled d-flex" data-simplebar="init">
    <!-- Rest of your sidebar content -->
    <div class="simplebar-wrapper" style="margin: 0px; width: 75%;background: #1C1C1C;">
      <!-- ... (rest of the content remains the same) ... -->
      <div class="simplebar-height-auto-observer-wrapper">
            <div class="simplebar-height-auto-observer"></div>
          </div>
          <div class="simplebar-mask">
            <div class="simplebar-offset" style="right: 0px; bottom: 0px;">
              <div class="simplebar-content-wrapper" style="height: 100%; ;">
                <div class="simplebar-content mm-active" style="padding: 0px;">
                  <!--navigation-->
                  <!-- <ul class="metismenu mm-show" id="menu">
                    <li v-tooltip="'Activation'">
                      <a href="javascript:;" class="has-arrow">
                        <div class="parent-icon"><i class="bx bx-home-alt"></i>
                        </div>
                        <div class="menu-title">Dashboard</div>
                      </a>                     
                    </li>
                    <li>
                      <a href="javascript:;" class="has-arrow">
                        <div class="parent-icon"><i class="bx bx-category"></i>
                        </div>
                        <div class="menu-title">Application</div>
                      </a>                    
                    </li>
                  
                
                   
                    <li>
                      <a href="https://themeforest.net/user/codervent" target="_blank">
                        <div class="parent-icon"><i class="bx bx-support"></i>
                        </div>
                        <div class="menu-title">Support</div>
                      </a>
                    </li>
                  </ul> -->
                  <CLIENT/>
                  <!--end navigation-->
                </div>
              </div>
            </div>
          </div>
          <div class="simplebar-placeholder" style="width: auto; height: 1905px;"></div>

    </div>

    <div class="mazisi simplebar-wrapper" style="background-color: black; width: 300px;">
      <TTG_SUPER_ADMIN v-if="getUserRole('TTG_SUPER_ADMIN')" :user="user"/>
      <TTG_REGIONAL_MANAGER v-if="getUserRole('TTG_REGIONAL_MANAGER')" :user="user"/> 
      <TTG_HEAD_ADMIN v-if="getUserRole('TTG_HEAD_ADMIN')" :user="user"/> 
      <TTG_ACTIVATION_MANAGER v-if="getUserRole('TTG_ACTIVATION_MANAGER')" :user="user"/> 
      <TTG_PROMOTERS v-if="getUserRole('TTG_TALENT')" :user="user"/> 
      <TTG_SUPPLIERS v-if="getUserRole('SUPPLIER')" :user="user"/> 
    </div>
  </div>
</template>

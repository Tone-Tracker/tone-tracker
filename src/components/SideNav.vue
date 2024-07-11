<script setup>
import CLIENT from './navigations/CLIENT.vue';
import TTG_SUPER_ADMIN from './navigations/TTG_SUPER_ADMIN.vue';
import TTG_REGIONAL_MANAGER from './navigations/TTG_REGIONAL_MANAGER.vue';
import TTG_HEAD_ADMIN from './navigations/TTG_HEAD_ADMIN.vue';
import TTG_ACTIVATION_MANAGER from './navigations/TTG_ACTIVATION_MANAGER.vue';

import { useAuth } from '@/stores/auth';

const auth = useAuth();
const user = JSON.parse(auth.user);

const getUserRole = (role) => {
  return user.role == role;
};
</script>

<template>
  <div class="layout-wrapper">
    <div class="sidebar-wrapper" data-simplebar="true">
      <div class="metismenu" id="menu">
        <div class="sub-nav">
          <ul class="metismenu mm-show" id="menu">
           <li>
            <a href="javascript:;" class="has-arrow">
              <div class="parent-icon"><i class="bx bx-home-alt"></i></div>
              <div class="menu-title">Dashboard</div>
            </a>
            <ul class="mm-collapse">
              <li> <a href="index.html"><i class="bx bx-radio-circle"></i>Default</a></li>
              <li> <a href="index2.html"><i class="bx bx-radio-circle"></i>Alternate</a></li>
              <li> <a href="index3.html"><i class="bx bx-radio-circle"></i>Graphical</a></li>
            </ul>
          </li>
         </ul>
      </div>
      <div class="big-nav">
        <nav class="sidebar">
          <TTG_SUPER_ADMIN v-if="getUserRole('TTG_SUPER_ADMIN')" :user="user" />
          <TTG_REGIONAL_MANAGER v-if="getUserRole('TTG_REGIONAL_MANAGER')" :user="user" />
          <TTG_HEAD_ADMIN v-if="getUserRole('TTG_HEAD_ADMIN')" :user="user" />
          <CLIENT v-if="getUserRole('CLIENT')" :user="user" />
          <TTG_ACTIVATION_MANAGER v-if="getUserRole('TTG_ACTIVATION_MANAGER')" :user="user" />
        </nav>
      </div>
        
      </div>
    </div>
    <div class="main-content">
      <!-- Your main content goes here -->
    </div>
  </div>
</template>

<style scoped>
.side-nav{
    position: relative;
}
.big-nav {
    position: absolute;
    left: 70px;
    top: -5px
}
.layout-wrapper {
  display: flex;
}

.sidebar-wrapper {
    width: 250px;
    height: 100%;
    position: fixed;
    top: 90px;
    bottom: 0;
    left: 0;
    background: #fff;
    /* border-right: 0 solid #e4e4e4; */
    z-index: 11;
    box-shadow: 0 2px 6px 0 rgb(218 218 253 / 65%), 0 2px 6px 0 rgb(206 206 238 / 54%) !important;
    transition: all .2s ease-out;
}
.sidebar-wrapper {
  width: 250px; /* Adjust the width as needed */
}

.main-content {
  /* flex-grow: 1; */
  padding: 0px; /* Adjust the padding as needed */
}
</style>

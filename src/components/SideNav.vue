<script setup>
import CLIENT from "./navigations/CLIENT.vue";
import TTG_SUPER_ADMIN from "./navigations/TTG_SUPER_ADMIN.vue";
import TTG_REGIONAL_MANAGER from "./navigations/TTG_REGIONAL_MANAGER.vue";
import TTG_HEAD_ADMIN from "./navigations/TTG_HEAD_ADMIN.vue";
import TTG_ACTIVATION_MANAGER from "./navigations/TTG_ACTIVATION_MANAGER.vue";
import TTG_CLIENT from "./navigations/TTG_CLIENT.vue";
import TTG_PROMOTERS from "./navigations/TTG_PROMOTERS.vue";

import { useAuth } from "@/stores/auth";
import TTG_SUPPLIERS from "./navigations/TTG_SUPPLIERS.vue";
import Drawer from "primevue/drawer";

import { ref } from "vue";

const auth = useAuth();
const user = JSON.parse(auth.user);

const getUserRole = (role) => {
  return user.role == role;
};

const visible = ref(false);
</script>

<template>
  <div class="sidebar-wrapper toggled d-flex" data-simplebar="init">
    <div
      class="simplebar-wrapper"
      style="margin: 0px; width: auto; background: #1c1c1c"
    >
      <div class="simplebar-height-auto-observer-wrapper">
        <div class="simplebar-height-auto-observer"></div>
      </div>
      <div class="simplebar-mask">
        <div class="simplebar-offset" style="right: 0px; bottom: 0px">
          <div class="simplebar-content-wrapper" style="height: 100%">
            <div class="simplebar-content mm-active" style="padding: 0px">
              <!--navigation-->
              <CLIENT />
              <!--end navigation-->
            </div>
          </div>
        </div>
      </div>
      <div
        class="simplebar-placeholder"
        style="width: auto; height: 1905px"
      ></div>
    </div>

    <div
      class="mazisi simplebar-wrapper"
      style="background-color: black; width: 300px"
    >
      <Drawer
        v-model:visible="visible"
        style="background-color: black; width: 285px; border: none; margin-top: 153px"
      >
        <template #container="{ closeCallback }">
          <div class="flex flex-col h-full">
            <div class="flex items-center justify-between shrink-0">
              <!-- <span>
                <Button
                type="button"
                @click="closeCallback"
                icon="pi pi-times" 
                class="close-button"
                rounded
                outlined
              ></Button>
              </span> -->
            </div>

            <div class="d-flex justify-content-start">
              <!-- Include the Client Component -->
              <CLIENT />
              <div>
                <TTG_SUPER_ADMIN
                v-if="getUserRole('TTG_SUPER_ADMIN')"
                :user="user"
              />
              <TTG_REGIONAL_MANAGER
                v-if="getUserRole('TTG_REGIONAL_MANAGER')"
                :user="user"
              />
              <TTG_HEAD_ADMIN
                v-if="getUserRole('TTG_HEAD_ADMIN')"
                :user="user"
              />
              <TTG_ACTIVATION_MANAGER
                v-if="getUserRole('TTG_ACTIVATION_MANAGER')"
                :user="user"
              />
              <TTG_PROMOTERS
                v-if="getUserRole('TTG_TALENT')"
                :user="user"
              />
              <TTG_SUPPLIERS
                v-if="getUserRole('SUPPLIER')"
                :user="user"
              />
              </div>
              
            </div>
          </div>
        </template>
      </Drawer>

      <!-- <i class="bx bx-menu" @click="visible = true"></i> -->

      <TTG_SUPER_ADMIN
        v-if="getUserRole('TTG_SUPER_ADMIN')"
        :user="user"
        class="d-none d-xl-block"
      />
      <TTG_REGIONAL_MANAGER
        v-if="getUserRole('TTG_REGIONAL_MANAGER')"
        :user="user"
        class="d-none d-xl-block"
      />
      <TTG_HEAD_ADMIN
        v-if="getUserRole('TTG_HEAD_ADMIN')"
        :user="user"
        class="d-none d-xl-block"
      />
      <TTG_ACTIVATION_MANAGER
        v-if="getUserRole('TTG_ACTIVATION_MANAGER')"
        :user="user"
        class="d-none d-xl-block"
      />
      <TTG_PROMOTERS
        v-if="getUserRole('TTG_TALENT')"
        :user="user"
        class="d-none d-xl-block"
      />
      <TTG_SUPPLIERS
        v-if="getUserRole('SUPPLIER')"
        :user="user"
        class="d-none d-xl-block"
      />
    </div>
  </div>
</template>

<style scoped>
  @media (min-width: 768px) and (max-width:1199px) {
    .simplebar-wrapper {
      width: 0px !important;
    }
    .sidebar-wrapper {
      width: 0px !important;
    }
  }

 
  .bx-menu {
    font-size: 2rem; /* Make the icon large */
    color: #fff; /* White color for better visibility */
    /* padding: 10px; */
    cursor: pointer; /* Change cursor to pointer on hover */
    transition: transform 0.3s ease; /* Add a smooth transition effect */
  }

  .bx-menu:hover {
    transform: scale(1.1); /* Slightly enlarge the icon on hover */
    color: #ffff; /* Change color on hover for visual feedback */
  }

  .x-button {
    position: relative; /* For positioning */
    width: 40px; /* Button width */
    height: 40px; /* Button height */
    background-color: transparent; /* Transparent background */
    border: 2px solid #ffff; /* Border color */
    border-radius: 50%; /* Rounded button */
    display: flex; /* Flexbox for centering */
    align-items: center; /* Center align */
    justify-content: center; /* Center align */
    cursor: pointer; /* Pointer cursor on hover */
    transition: background-color 0.3s ease, transform 0.3s ease; /* Smooth transitions */
  }

  
</style>




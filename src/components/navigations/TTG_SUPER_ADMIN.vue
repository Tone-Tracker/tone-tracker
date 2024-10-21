<script setup>
import { useOnline } from '@vueuse/core'
import { ref } from 'vue';
import { useRoute } from 'vue-router';

//////////active///////////
const isExpanded = ref(false);
const activeItem = ref('');

const currentRoute = useRoute();
console.log(currentRoute.path);

const setActiveItem = (item) => {
  activeItem.value = item;
};
///////////active//////////

const online = useOnline()

const isOnline = online;
const props = defineProps({
    user: Object
});

const getRoleName = () => {
    return props.user.role == 'TTG_SUPER_ADMIN' ? 'Super User' : 'Admin'
}
</script>
<template>
    <div class="side-nav-wrapper">
      <div class="side-nav">
        <div class="nav-section">
          <!-- <h3 class="nav-header">Main</h3> -->
          <ul class="nav-list">
            <li class="nav-item" :class="{ 'active': currentRoute.path === '/budget' }">
              <a href="/budget">
                <i class="icon bx bx-wallet"></i>
                <span>BUDGET</span>
              </a>
            </li>
            <li class="nav-item" :class="{ 'active': currentRoute.path === '/crm' }">
              <a href="/crm">
                <i class="icon bx bx-grid-alt"></i>
                <span>CRM</span>
              </a>
            </li>
            <li class="nav-item" :class="{ 'active': currentRoute.path === '/campaign-status' }">
              <a href="/campaign-status">
                <i class="icon bx bx-line-chart"></i>
                <span>Campaign Status</span>
              </a>
            </li>
            <li class="nav-item" :class="{ 'active': currentRoute.path === '/brands' }">
              <a href="/brands">
                <i class="icon bx bx-purchase-tag"></i>
                <span>Brands</span>
              </a>
            </li>
          </ul>
        </div>
        <div class="nav-section">
          <!-- <h3 class="nav-header">Reports</h3> -->
          <ul class="nav-list">
            <li class="nav-item" :class="{ 'active': currentRoute.path === '/activations-report' }">
              <a href="/activations-report">
                <i class="icon bx bx-bar-chart-alt-2"></i>
                <span>Activations Report</span>
              </a>
            </li>
            <li class="nav-item" :class="{ 'active': currentRoute.path === '/live-activations' }">
              <a href="/live-activations">
                <i class="icon bx bx-calendar-event"></i>
                <span>Live Activations</span>
              </a>
            </li>
            <li class="nav-item" :class="{ 'active': currentRoute.path === '/briefs' }">
              <a href="/briefs">
                <i class="icon bx bx-file"></i>
                <span>Briefs</span>
              </a>
            </li>
          </ul>
        </div>
        <div class="nav-section">
          <!-- <h3 class="nav-header">Resources</h3> -->
          <ul class="nav-list">
            <li class="nav-item" :class="{ 'active': currentRoute.path === '/warehouse' }">
              <a href="/warehouse">
                <i class="icon bx bx-package"></i>
                <span>Warehouse</span>
              </a>
            </li>
            <li class="nav-item" :class="{ 'active': currentRoute.path === '/staff' }">
              <a href="/staff">
                <i class="icon bx bx-user"></i>
                <span>Staff</span>
              </a>
            </li>
            <li class="nav-item" :class="{ 'active': currentRoute.path === '/promoters' }">
              <a href="/promoters">
                <i class="icon bx bx-group"></i>
                <span>Promoters</span>
              </a>
            </li>
            <li class="nav-item" :class="{ 'active': currentRoute.path === '/suppliers' }">
              <a href="/suppliers">
                <i class="icon bx bxs-user-detail"></i>
                <span>Suppliers</span>
              </a>
            </li>
            <li class="nav-item" :class="{ 'active': currentRoute.path === '/downloads' }">
              <a href="/downloads">
                <i class="icon bx bx-download"></i>
                <span>Downloads</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { useRoute } from 'vue-router';
  
  export default {
    name: 'SideNav',
    setup() {
      const currentRoute = useRoute();
      return { currentRoute };
    },
  };
  </script>
  
  <style scoped>
  .side-nav-wrapper {
    height: 100vh;
    overflow-y: auto;
    background-color: #1e1e1e;
    color: #fff;
    width: 308px;
    text-transform: uppercase;
    border-right: solid 2px #9c27b0;
  }
  
  .side-nav {
    padding: 20px;
    padding-left: 0px;
  }
  
  .nav-header {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 10px;
    color: #a0a0a0;
  }
  
  .nav-list {
    list-style: none;
    padding: 0;
  }
  
  .nav-item {
    margin-bottom: 10px;
  }
  
  .nav-item a {
    display: flex;
    align-items: center;
    color: #fff;
    text-decoration: none;
    padding: 0px 12px;
    border-radius: 4px;
    padding-left: 40px;
  }
  
  .nav-item .icon {
    margin-right: 10px;
    font-size: 20px;
  }
  
  .nav-item.active,
  .nav-item:hover {
    background-color: #9c27b0;
  }
  </style>
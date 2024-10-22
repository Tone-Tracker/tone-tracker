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
              <router-link to="/budget">
                <i class="icon bx bx-wallet" :class="{ 'text-muted': currentRoute.path !== '/budget' }"></i>
                <span>BUDGET</span>
              </router-link>
            </li>
            <li class="nav-item" :class="{ 'active': currentRoute.path === '/crm' }">
              <router-link to="/crm">
                <i class="icon bx bx-grid-alt" :class="{ 'text-muted': currentRoute.path !== '/crm' }"></i>
                <span>CRM</span>
              </router-link>
            </li>
            <li class="nav-item" :class="{ 'active': currentRoute.path === '/status' }">
              <router-link to="/status">
                <i class="icon bx bx-line-chart" :class="{ 'text-muted': currentRoute.path !== '/status' }" ></i>
                <span>Campaign Status</span>
              </router-link>
            </li>
            <li class="nav-item" :class="{ 'active': currentRoute.path === '/clients' }">
              <router-link to="/clients">
                <i class="icon bx bx-purchase-tag" :class="{ 'text-muted': currentRoute.path !== '/clients' }"></i>
                <span>Brands</span>
              </router-link>
            </li>
          </ul>
        </div>
        <div class="nav-section">
          <!-- <h3 class="nav-header">Reports</h3> -->
          <ul class="nav-list">
            <li class="nav-item" :class="{ 'active': currentRoute.path === '/report' }">
              <router-link to="/report">
                <i class="icon bx bx-bar-chart-alt-2" :class="{ 'text-muted': currentRoute.path !== '/report' }"></i>
                <span>Activations Report</span>
              </router-link>
            </li>
            <li class="nav-item" :class="{ 'active': currentRoute.path === '/activations' }">
              <router-link to="/activations">
                <i class="icon bx bx-calendar-event" :class="{ 'text-muted': currentRoute.path !== '/activations' }"></i>
                <span>Live Activations</span>
              </router-link>
            </li>
            <li class="nav-item" :class="{ 'active': currentRoute.path === '/briefs' }">
              <router-link to="/briefs">
                <i class="icon bx bx-file" :class="{ 'text-muted': currentRoute.path !== '/briefs' }" ></i>
                <span>Briefs</span>
              </router-link>
            </li>
          </ul>
        </div>
        <div class="nav-section">
          <!-- <h3 class="nav-header">Resources</h3> -->
          <ul class="nav-list">
            <li class="nav-item" :class="{ 'active': currentRoute.path === '/warehouse' }">
              <router-link to="/warehouse">
                <i class="icon bx bx-package" :class="{ 'text-muted': currentRoute.path !== '/warehouse' }"></i>
                <span>Warehouse</span>
              </router-link>
            </li>
            <li class="nav-item" :class="{ 'active': currentRoute.path === '/staff' }">
              <router-link to="/staff">
                <i class="icon bx bx-user" :class="{ 'text-muted': currentRoute.path !== '/staff' }"></i>
                <span>Staff</span>
              </router-link>
            </li>
            <li class="nav-item" :class="{ 'active': currentRoute.path === '/promoters' }">
              <router-link to="/promoters">
                <i class="icon bx bx-group" :class="{ 'text-muted': currentRoute.path !== '/promoters' }"></i>
                <span>Promoters</span>
              </router-link>
            </li>
            <li class="nav-item" :class="{ 'active': currentRoute.path === '/suppliers' }">
              <router-link to="/suppliers">
                <i class="icon bx bxs-user-detail" :class="{ 'text-muted': currentRoute.path !== '/suppliers' }"></i>
                <span>Suppliers</span>
              </router-link>
            </li>
            <li class="nav-item" :class="{ 'active': currentRoute.path === '/downloads' }">
              <router-link to="/downloads">
                <i class="icon bx bx-download" :class="{ 'text-muted': currentRoute.path !== '/downloads' }"></i>
                <span>Downloads</span>
              </router-link>
            </li>
          </ul>
        </div>

        
                <!-- Horizontal Line -->
                <div class="horizontal-line"></div>

                <!-- Actions Section -->
                <div class="nav-section">
                  <!-- <h3 class="nav-header">ACTIONS</h3> -->
                  <ul class="nav-list">
                    <li class="nav-item" :class="{ 'active': currentRoute.path === '/actions' }">
                              <router-link to="/actions">
                                <i class="icon bx bx-list-check" :class="{ 'text-muted': currentRoute.path !== '/actions' }"></i>
                                <span>Actions</span>
                              </router-link>
                            </li>
                    <li class="nav-item" :class="{ 'active': currentRoute.path === '/campaign-budget' }">
                      <router-link to="/campaign-budget" style="padding-left: 70px;">
                        <!-- <i class="icon bx bx-spreadsheet" :class="{ 'text-muted': currentRoute.path !== '/campaign-budget' }"></i> -->
                        <span class="text-lowercase">Campaign Budget</span>
                      </router-link>
                    </li>
                    <li class="nav-item" :class="{ 'active': currentRoute.path === '/export-budget' }">
                      <router-link to="/export-budget" style="padding-left: 70px;">
                        <!-- <i class="icon bx bx-export" :class="{ 'text-muted': currentRoute.path !== '/export-budget' }"></i> -->
                        <span class="text-lowercase">Export Budget Report</span>
                      </router-link>
                    </li>
                  </ul>
                </div>

                <!-- Filter Section -->
                <div class="nav-section">
                  <!-- <h3 class="nav-header">FILTER BY</h3> -->
                  <ul class="nav-list">
                    <li class="nav-item" :class="{ 'active': currentRoute.path === '/filters' }">
                              <router-link to="/filters">
                                <i class="icon bx bx-filter-alt" :class="{ 'text-muted': currentRoute.path !== '/filters' }"></i>
                                <span>Filter By</span>
                              </router-link>
                            </li>
                    <li class="nav-item">
                      <a href="#" @click.prevent style="padding-left: 70px;">
                        <!-- <i class="icon bx bx-calendar"></i> -->
                        <span class="text-lowercase">Month</span>
                      </a>
                    </li>
                    <li class="nav-item">
                      <a href="#" @click.prevent style="padding-left: 70px;">
                        <!-- <i class="icon bx bx-time"></i> -->
                        <span class="text-lowercase">Daily</span>
                      </a>
                    </li>
                    <li class="nav-item">
                      <a href="#" @click.prevent style="padding-left: 70px;">
                        <!-- <i class="icon bx bx-calendar-week"></i> -->
                        <span class="text-lowercase">Weekly</span>
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
    background-color: #0B1729;
    color: #fff;
    width: 298px;
    text-transform: uppercase;
    position: relative;
    /* border-right: solid 2px #9c27b0; */
  }



  /* //////to make the border gradient////// */
  .side-nav-wrapper {
    height: 100vh;
    overflow-y: auto;
    background-color: #0B1729;
    color: #fff;
    width: 298px;
    text-transform: uppercase;
    position: relative; /* Ensure the pseudo-element is positioned relative to this element */
}

.side-nav-wrapper::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    width: 2px; /* Thickness of the border */
    height: 100%; /* Full height */
    background: linear-gradient(to bottom,#9A3AB1, #117AD1 ); /* Gradient going from top to bottom */
}
  /* //////to make the border gradient////// */


  .side-nav-wrapper span{
    font-size: 16px;
  }
  
  .side-nav {
    padding: 20px;
    padding-left: 0px;
    /* border-bottom: solid 2px #9c27b0; */

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
    position: relative;
  overflow: hidden;
  }

  .nav-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, #9A3AB1, #117AD1);
  transition: left 0.3s ease;
  z-index: 0;
}

.nav-item:hover::before,
.nav-item.active::before {
  left: 0;
}
  
  .nav-item a {
    display: flex;
    align-items: center;
    color: #fff;
    text-decoration: none;
    padding: 0px 12px;
    border-radius: 4px;
    padding-left: 40px;
    position: relative;
    z-index: 1;
  }
  
  .nav-item .icon {
    margin-right: 10px;
    font-size: 20px;
    transition: color 0.3s ease; /* Smooth transition for color change */

  }
  
  .nav-item.active,
  .nav-item:hover {
    background-color: #9d4dcb;
  }

  /* Make text-muted icons slightly dimmed by default */
.nav-item .icon.text-muted {
  color: rgba(255, 255, 255, 0.5);
}
/* Turn icon white on hover */
.nav-item:hover .icon,
.nav-item.active .icon {
  color: #fff !important; /* Use !important to override text-muted */
}

.nav-item.active,
.nav-item:hover {
  background-color: #9d4dcb;
}

  /* New styles for horizontal line */
.horizontal-line {
    height: 2px;
    margin: 20px 0px 20px 20px;
    background: linear-gradient(to right, #9A3AB1, #117AD1);
}
  </style>
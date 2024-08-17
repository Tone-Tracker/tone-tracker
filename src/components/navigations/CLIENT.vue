<script setup>
import { ref } from 'vue';
import Activation from '../svgs/Activation.vue';
import Budget from '../svgs/Budget.vue';
import CRM from '../svgs/CRM.vue';
import Report from '../svgs/Report.vue';
import Status from '../svgs/Status.vue';
import Warehouse from '../svgs/Warehouse.vue';

const activeItem = ref('');

const setActiveItem = (item) => {
  activeItem.value = item;
};
</script>

<template>
  <div class="accordion" id="accordionPanelsStayOpenExample">
    <ul class="side-nav">
      <li v-tooltip="'Activation'" class="side-nav__item activation" :class="{ 'active': activeItem === 'activation' }" @click="setActiveItem('activation')">
        <a href="javascript:;" data-bs-toggle="collapse" data-bs-target="#activationMenu" aria-expanded="false" aria-controls="activationMenu">
          <div class="side-nav__link">
            <Activation />
          </div>
        </a>
        <div id="activationMenu" class="accordion-collapse collapse bg-black p-3" data-bs-parent="#accordionPanelsStayOpenExample">
          <!-- Activation submenu content -->
          <!-- ... (submenu content remains unchanged) ... -->
        </div>
      </li>

      <li v-tooltip="'Status'" class="side-nav__item" :class="{ 'active': activeItem === 'status' }" @click="setActiveItem('status')">
        <router-link to="/status">
          <div class="side-nav__link">
            <Status />
          </div>
        </router-link>
      </li>

      <li v-tooltip="'Report'" class="side-nav__item" :class="{ 'active': activeItem === 'report' }" @click="setActiveItem('report')">
        <router-link to="/report">
          <div class="side-nav__link">
            <Report />
          </div>
        </router-link>
      </li>

      <li v-tooltip="'Budget'" class="side-nav__item" :class="{ 'active': activeItem === 'budget' }" @click="setActiveItem('budget')">
        <router-link to="/budget">
          <div class="side-nav__link">
            <Budget />
          </div>
        </router-link>
      </li>

      <li v-tooltip="'CRM'" class="side-nav__item" :class="{ 'active': activeItem === 'crm' }" @click="setActiveItem('crm')">
        <a href="javascript:;">
          <div class="side-nav__link">
            <CRM />
          </div>
        </a>
      </li>

      <li v-tooltip="'Warehouse'" class="side-nav__item" :class="{ 'active': activeItem === 'warehouse' }" @click="setActiveItem('warehouse')">
        <router-link to="/warehouse">
          <div class="side-nav__link">
            <Warehouse />
          </div>
        </router-link>
      </li>

      <li v-tooltip="'Chat'" class="side-nav__item" :class="{ 'active': activeItem === 'chat' }" @click="setActiveItem('chat')">
        <router-link to="/chat">
          <div class="side-nav__link">
            <i class='bx bxs-chat fs-3'></i>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.side-nav {
  width: 45px;
  background-color: #1C1C1C;
}

.side-nav__item {
  background-color: #1C1C1C !important;
}

.side-nav__link {
  border: none !important;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
}

.side-nav__item a {
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: #fff;
}

svg {
  max-width: 1.8rem;
}

.accordion-button::after {
  margin: 0 !important;
}

.accordion-button {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0px;
}

.accordion-button:not(.collapsed) {
  margin-bottom: 0px;
}

.side-nav__item.active,
.side-nav__item:hover {
  background-color: #333333 !important;
}

/* Additional styles for the submenu */
#activationMenu {
  position: absolute;
  left: 60px;
  top: 0;
  width: 200px;
}

.accordion-item {
  background-color: #1C1C1C;
  color: #fff;
}

.accordion-button {
  background-color: #1C1C1C;
  color: #fff;
}

.accordion-button:not(.collapsed) {
  background-color: #333333;
  color: #fff;
}

.nav-list {
  list-style-type: none;
  padding: 0;
}

.nav-link-inside {
  color: #fff;
  text-decoration: none;
}
</style>
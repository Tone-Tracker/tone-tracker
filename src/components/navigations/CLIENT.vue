<script setup>
import { ref } from 'vue';
import Activation from '../svgs/Activation.vue';
import Budget from '../svgs/Budget.vue';
import CRM from '../svgs/CRM.vue';
import Report from '../svgs/Report.vue';
import Status from '../svgs/Status.vue';
import Warehouse from '../svgs/Warehouse.vue';

const isExpanded = ref(false);

const expandMenu = () => {
  isExpanded.value = true;
};

const collapseMenu = () => {
  isExpanded.value = false;
};
</script>

<template>
  <div class="accordion" id="accordionPanelsStayOpenExample">
    <ul class="side-nav side-nav--hover" @mouseenter="expandMenu" @mouseleave="collapseMenu" :class="{ 'expanded': isExpanded }">
      <li class="side-nav__item activation">
        <a href="javascript:;" data-bs-toggle="collapse" data-bs-target="#activationMenu" aria-expanded="false" aria-controls="activationMenu">
          <div class="side-nav__link">
            <Activation />
          </div>
          <div class="menu-title">Activation</div>
        </a>
        <div id="activationMenu" class="accordion-collapse collapse bg-black p-3" data-bs-parent="#accordionPanelsStayOpenExample">
          <!-- Activation submenu content -->
            <div class="accordion-item">
                                <h2 class="accordion-header">
                                    <button class="accordion-button collapsed mb-2 rounded-0 p-1" type="button" data-bs-toggle="collapse" data-bs-target="#regionCollapse" aria-expanded="false" aria-controls="regionCollapse">
                                        Region
                                    </button>
                                </h2>
                                <div id="regionCollapse" class="accordion-collapse collapse" data-bs-parent="#activationSubMenu">
                                    <div class="accordion-body">
                                        <!-- Add Region sub-items here -->
                                        <ul class="nav-list background-navlist">
                                            <li class="in-list m-auto mb-3"><a class="nav-link-inside" href="#">Sub-Region 1</a></li>
                                            <li class="in-list m-auto mb-3"><a class="nav-link-inside" href="#">Sub-Region 2</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="accordion-item">
                                <h2 class="accordion-header">
                                    <button class="accordion-button collapsed mb-2 rounded-0 p-1" type="button" data-bs-toggle="collapse" data-bs-target="#brandCollapse" aria-expanded="false" aria-controls="brandCollapse">
                                        Brand
                                    </button>
                                </h2>
                                <div id="brandCollapse" class="accordion-collapse collapse" data-bs-parent="#activationSubMenu">
                                    <div class="accordion-body">
                                        <!-- Add Brand sub-items here -->
                                        <ul class="nav-list background-navlist">
                                            <li class="in-list m-auto mb-3"><a class="nav-link-inside" href="#">Brand 1</a></li>
                                            <li class="in-list m-auto mb-3"><a class="nav-link-inside" href="#">Brand 2</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="accordion-item">
                                <h2 class="accordion-header">
                                    <button class="accordion-button collapsed mb-2 rounded-0 p-1" type="button" data-bs-toggle="collapse" data-bs-target="#activationSubCollapse" aria-expanded="false" aria-controls="activationSubCollapse">
                                        Activation
                                    </button>
                                </h2>
                                <div id="activationSubCollapse" class="accordion-collapse collapse" data-bs-parent="#activationSubMenu">
                                    <div class="accordion-body">
                                        <!-- Add Activation sub-items here -->
                                        <ul class="nav-list background-navlist">
                                            <li class="in-list m-auto mb-3"><a class="nav-link-inside" href="#">Activation 1</a></li>
                                            <li class="in-list m-auto mb-3"><a class="nav-link-inside" href="#">Activation 2</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

        </div>
      </li>

      <li class="side-nav__item">
        <router-link to="/status">
          <div class="side-nav__link">
            <Status />
          </div>
          <div class="menu-title">Status</div>
        </router-link>
      </li>

      <li class="side-nav__item">
        <router-link to="/report">
          <div class="side-nav__link">
            <Report />
          </div>
          <div class="menu-title">Report</div>
        </router-link>
      </li>

      <li class="side-nav__item">
        <router-link to="/budget">
          <div class="side-nav__link">
            <Budget />
          </div>
          <div class="menu-title">Budget</div>
        </router-link>
      </li>

      <li class="side-nav__item">
        <a href="javascript:;">
          <div class="side-nav__link">
            <CRM />
          </div>
          <div class="menu-title">CRM</div>
        </a>
      </li>

      <li class="side-nav__item">
        <router-link to="/warehouse">
          <div class="side-nav__link">
            <Warehouse />
          </div>
          <div class="menu-title">Warehousing</div>
        </router-link>
      </li>

      <li class="side-nav__item">
        <router-link to="/chat">
          <div class="side-nav__link">
            <i class='bx bxs-chat fs-3 mx-2'></i>
          </div>
          <div class="menu-title">Chat</div>
        </router-link>
      </li>
    </ul>

    <!-- The rest of your template remains unchanged -->
  </div>
</template>

<style scoped>
.side-nav {
  width: 60px;
  transition: width 0.3s ease;
  overflow: hidden;
  background-color: #1C1C1C;
}

.side-nav.expanded {
  width: 240px;
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

.menu-title {
  display: none;
  text-transform: capitalize;
  margin-left: 10px;
}

.side-nav.expanded .menu-title {
  display: block;
}

.side-nav__item a {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #fff;
}

svg {
  max-width: 1.8rem;
}

/* Existing styles */
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

.metismenu {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 0 0 0 0 !important;
  background-color: #000000 !important;
}

.metismenu a {
  color: #fff !important;
}

.sidebar-wrapper .metismenu li+li {
  margin: 0px;
}

.metismenu div {
  flex: 1;
  width: 100%;
}

.sidebar-wrapper {
  background-color: #000000 !important;
  border-right: none !important;
}

.col-img {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 14px;
  margin-bottom: 14px;
}

.gallery {
  border: none !important;
}

.gallery:hover {
  background-color: transparent !important;
}

.gallery img {
  width: 47% !important;
}

.side-nav__link:link,
.side-nav__item:visited {
  background-color: #1C1C1C !important;
  color: #fff;
  text-decoration: none;
  display: block;
  display: flex !important;
  align-items: center !important;
  gap: 20px !important;
}

.sidebar-wrapper .metismenu ul {
  background-color: #1C1C1C !important;
  border: none !important;
}

.sidebar-wrapper .metismenu ul a {
  padding: 10px 12px 10px 32px !important;
  border-radius: 0 !important;
  color: #fff !important;
  border-bottom: solid 2px #000000;
}

.activation-icon {
  max-width: 2rem;
}

.nav-list i {
  font-size: 1.5rem;
}

.in-list {
  width: 90%;
}

.sidebar-wrapper .metismenu ul a {
  padding-left: 0 !important;
}

.background-navlist {
  background-color: black !important;
}

html.dark-theme .sidebar-wrapper {
  background: #060D0E !important;
}
</style>

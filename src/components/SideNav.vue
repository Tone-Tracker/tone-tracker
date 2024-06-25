
<script setup>
import AdminNav from './AdminNav.vue';
import SubNavigation from './SubNavigation.vue';
import Activation from './svgs/Activation.vue';
import Budget from './svgs/Budget.vue';
import CRM from './svgs/CRM.vue';
import Report from './svgs/Report.vue';
import Status from './svgs/Status.vue';
import Warehouse from './svgs/Warehouse.vue';
</script>
<template>
    <div class="sidebar-wrapper" data-simplebar="true">
        <!-- <div class="sidebar-header">

            <div>
                <img style="width: 180px;" src="/src/assets/images/logo/white-logo.png" alt="">
            </div>
           <div class="toggle-icon ms-auto"><i class='bx bx-arrow-back'></i> 
            </div>
          </div>
           -->
        <div class="metismenu" id="menu">
            <div class="col-img">
                <div class="gallery">
                    <div class="image-container position-relative">
                        <router-link to="/">
                            <img src="/src/assets/images/company-logo.png" alt="Cinque Terre"
                                class="img-fluid mx-auto d-block">
                        </router-link>
                        <div class="text-center text-sm">Dashboard</div>
                    </div>
                </div>
            </div>
            <div class="content">
                <nav class="sidebar">
                   <!-- <AdminNav/>  -->
                   <SubNavigation/> 
                    <ul class="side-nav d-none">
                        <li class="side-nav__item activation">
                            <router-link to="/activations">
                                <div class="side-nav__link">
                                   <Activation/>
                                </div>
                                <div class="menu-title">Activation</div>
                            </router-link>
                        </li>

                        <li class="side-nav__item" >
                            <router-link to="/status">
                                <div class="side-nav__link">
                                    <Status/>
                                </div>
                                <div class="menu-title">Status</div>
                            </router-link>
                        </li>

                        <li class="side-nav__item">
                            <router-link to="/report">
                                <div class="side-nav__link">
                                    <Report/>
                                </div>
                                <div class="menu-title">Report</div>
                            </router-link>
                        </li>

                        <li class="side-nav__item">
                            <router-link to="/budget">
                                <div class="side-nav__link">
                                    <Budget/>
                                </div>
                                <div class="menu-title">Budget</div>
                            </router-link>
                        </li>


                        <li class="side-nav__item">
                            <a href="javascript:;">
                                <div class="side-nav__link">
                                    <CRM/>
                                </div>
                                <div class="menu-title">CRM</div>
                            </a>
                        </li>
                       

                        <li class="side-nav__item">
                            <router-link to="/warehouse">
                                <div class="side-nav__link">
                                    <Warehouse/>
                                </div>
                                <div class="menu-title">Warehousing</div>
                            </router-link>
                        </li>

                        <li class="side-nav__item">
                            <router-link to="/chat">
                                <div class="side-nav__link">
                                    <i class='bx bxs-chat h2 mx-4'></i>
                                </div>
                                <div class="menu-title">Chat</div>
                            </router-link>
                        </li>

                    </ul>
                </nav>

            </div>

        </div>
    </div>


    <!--navigation-->


    <!--end navigation-->
</template>
<style scoped>
/* ///////iner navigation//////// */
.accordion-button::after {
    margin: 0 !important;
    /* display: none !important; */
}

.accordion-button {
    position: relative;
    display: flex;
    justify-content: center;
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
}

.metismenu a {
    color: #fff !important;
}

.sidebar-wrapper .metismenu li+li {
    margin: 0px;
}

.metismenu div {
    flex: 1;
    /* Each item takes equal space */
    width: 100%;
    /* Ensure each item takes 100% width */
}

.sidebar-wrapper {
    background-color: #000000 !important;
    border-right: none !important;
    /* width: 281px; */

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

.menu-title {
    text-transform: capitalize;
}

svg {
    max-width: 1.8rem;
}

.col-img {
    display: flex;
    justify-content: center;
    align-items: center;
}

.metismenu {
    background-color: #000000 !important;
}

/* /////////////////////////////// */


.side-nav .side-nav__item {
    background-color: #1C1C1C !important;
}

.side-nav__link:link§,
.side-nav__item:visited {
    color: #fff;
    text-decoration: none;
    display: block;
    display: flex !important;
    align-items: center !important;
    gap: 20px !important;
}

.side-nav__link {
    border: none !important;

    display: flex;
    align-items: center;
    justify-content: center;
}

.sidebar-wrapper .metismenu ul {
    background-color: #1C1C1C !important;
    /* background-color: #fff !zz; */
    border: none !important;

}

.sidebar-wrapper .metismenu ul a {
    padding: 10px 32px 10px 32px !important;
    border-radius: 0 !important;
    color: #fff !important;
    border-bottom: solid 2px #000000;

}

.activation-icon {
    max-width: 2rem;
}
</style>
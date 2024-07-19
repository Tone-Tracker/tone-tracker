<script setup>
import { computed } from 'vue';
import Activation from '../svgs/Activation.vue';
import Budget from '../svgs/Budget.vue';
import CRM from '../svgs/CRM.vue';
import Report from '../svgs/Report.vue';
import Status from '../svgs/Status.vue';
import Warehouse from '../svgs/Warehouse.vue';
</script>
<template>
    <div class="accordion" id="accordionPanelsStayOpenExample">

        <ul class="side-nav">
             <li class="side-nav__item activation">
                <a href="javascript:;" data-bs-toggle="collapse" data-bs-target="#activationMenu" aria-expanded="false" aria-controls="activationMenu">
                    <div class="side-nav__link">
                        <Activation />
                    </div>
                    <div class="menu-title">Activation</div>
                </a>
                <div id="activationMenu" class="accordion-collapse collapse" data-bs-parent="#accordionPanelsStayOpenExample">
                    <div class="accordion-body">
                        <div>
                            <div class="side-nav__link">
                        <Activation />
                    </div> 
                    <div class="menu-title  text-center">Activation</div>
                        </div>
                        <ul class="nav-list">
                            <li><a href="#">Region</a></li>
                            <li><a href="#">Brand</a></li>
                            <li><a href="#">Activation</a></li>
                        </ul>
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
                        <i class='bx bxs-chat h2 mx-4'></i>
                    </div>
                    <div class="menu-title">Chat</div>
                </router-link>
            </li>

        </ul>

        <div class="side-nav d-none">
            <div class="accordion-item">
                <div class="accordion-header profile">
                    <button class="d-flex align-items-start justify-content-between accordion-button" type="button"
                        data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true"
                        aria-controls="panelsStayOpen-collapseOne">
                        <div class="profile-info">
                            <span class="name">Luc Belaire</span>
                            <span class="status"><span class="round-guest"></span>Guest</span>
                            <!-- <span class="edit-profile"> <button class="edit-profile-btn">
                                    ✏️
                                </button>
                            </span> -->

                        </div>


                    </button>
                </div>

                <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show"
                    data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                        <ul class="nav-list">
                            <li><a href="#"><i class='bx bx-chat'></i> All</a></li>
                            <li><a href="#"><i class='bx bx-envelope'></i> Message center</a></li>
                            <li><router-link to="/briefs"><i class='bx bx-file'></i> Briefs</router-link></li>
                            <li><router-link to="/campaigns"><i class='bx bx-bullseye'></i> Campaigns</router-link></li>
                            <li><router-link to="/users"><i class='bx bx-user'></i> Users</router-link></li>
                            <li><router-link to="/crm"><i class='bx bx-briefcase'></i> CRM</router-link></li>
                            <li><router-link to="/jobs"><i class='bx bx-briefcase-alt-2'></i> Jobs</router-link></li>
                            <li><router-link to="/upload"><i class='bx bx-upload'></i> Upload contract</router-link></li>
                            <li><router-link to="/tasks"><i class='bx bx-task'></i> Tasks</router-link></li>
                            <li><a href="#"><i class='bx bx-send'></i> Sent</a></li>
                            <li><a href="#"><i class='bx bx-envelope-open'></i> Unread</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="d-flex gap-2 justify-content-end flex-row-reverse accordion-button w-0 collapsed "
                        type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo"
                        aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                        Show more
                    </button>
                </h2>
                <div id="panelsStayOpen-collapseTwo" class="accordion-collapse collapse">
                    <div class="accordion-body">
                        <div class="sidebar">
                            <div class="menu-section">
                                <h3>Projects</h3>
                                <ul>
                                    <li># Joburg Activations</li>
                                    <li># Durban Activations</li>
                                    <li># Cape Town Activations</li>
                                </ul>
                            </div>
                            <div class="menu-section">
                                <h3>Channels</h3>
                                <ul>
                                    <li># Marketing-team</li>
                                    <li># Competitive</li>
                                    <li># Announcements</li>
                                    <li># Quarterly planning</li>
                                </ul>
                            </div>
                            <div class="menu-section">
                                <h3>Direct Messages</h3>
                                <ul>
                                    <li class="active">• Guest (You)</li>
                                    <li>• Brandley Thomas</li>
                                    <li>• Michael John</li>
                                </ul>
                            </div>
                            <div class="menu-section">
                                <h3>Communities</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
export default {
    name: 'SideNav',
};
</script>

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

/* //icon// */
.nav-list i {
    font-size: 1.5rem; /* Adjust this value as needed */
}
</style>
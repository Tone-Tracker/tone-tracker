<script setup>

import { useOnline } from '@vueuse/core'

const online = useOnline()

const isOnline = online;
const props = defineProps({
    user: Object
});

const getRoleName = () => {
    return props.user.role == 'TTG_ACTIVATION_MANAGER' ? 'Activations Manager' : ''
}
</script>
<template>
    <div class="side-nav-wrapper">
        <div class="accordion" id="accordionPanelsStayOpenExample">
            <div class="side-nav">
                <div class="accordion-item">
                    <div class="accordion-header profile">
                        <button class="d-flex align-items-center justify-content-between accordion-button" type="button"
                            data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true"
                            aria-controls="panelsStayOpen-collapseOne">
                            <div class="profile-info">
                                <span class="name">{{user.firstName}} {{user.lastName}}</span>
                                <span class="status">
                                    <span class="round-guest" :class="{'online': isOnline, 'offline': !isOnline}"></span>
                                    {{ getRoleName() }}
                                </span>
                            </div>
                            <span class="edit-profile">
                                <button class="edit-profile-btn">
                                    <i class='bx bx-edit-alt'></i>
                                </button>
                            </span>
                        </button>
                    </div>

                    <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show"
                        data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            <ul class="nav-list">
                                <li><router-link to="/activations"><i class='bx bx-chat'></i> All</router-link></li>
                                <li><router-link to="/admin-activations"><i class='bx bx-calendar-event'></i> Activations</router-link></li>
                                <li><router-link to="/promoters"><i class='bx bx-group'></i> Promoters</router-link></li>
                                <li><router-link to="/briefs"><i class='bx bx-file'></i> Briefs</router-link></li>
                                <li><router-link to="/admin-warehouse"><i class='bx bx-store'></i> Warehouse & Units</router-link></li>
                                <li><router-link to="/teaching"><i class='bx bx-book-open'></i> Learning & Teaching</router-link></li>
                                <li><router-link to="/jobs"><i class='bx bx-briefcase'></i> Jobs</router-link></li>
                                <li><router-link to="/upload"><i class='bx bx-upload'></i> Upload contract</router-link></li>
                                <li><a href="#"><i class='bx bx-envelope'></i> Message center</a></li>
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
    </div>
</template>

<script>
export default {
    name: 'SideNav',
};
</script>

<style scoped>
.profile .accordion-button::after {
    margin-bottom: 10px;
}

.accordion-button::after {
    margin: 0 !important;
}

.side-nav {
    width: 240px;
    background-color: #000;
    color: #fff;
   
}

.profile {
   
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 4px;
}

.profile-info {
    display: flex;
    flex-direction: column;
}

.name {
    font-size: 18px;
    font-weight: bold;
}



.edit-profile-btn {
    background: none;
    border: none;
    color: #fff;
    cursor: pointer;
    font-size: 20px;
}

.nav-list {
    list-style: none;
    padding: 0;
}



.nav-list a {
    color: #fff;
    text-decoration: none;
    display: flex;
    align-items: center;
}

.nav-list .icon {
    margin-right: 10px;
}

.nav-list a:hover {
    text-decoration: underline;
}

/* //////////////////// */
.menu-section {
    margin-bottom: 20px;
}

.menu-section h3 {
    padding-left: 20px;
    font-size: 1.2em;
    margin-bottom: 10px;
    color: #ccc;
}

.menu-section ul {
    list-style: none;
    padding: 0 25px;
}

.menu-section ul li {
    padding: 0, 10px;
    font-size: 1em;
    color: #bbb;
}


/* color: #b06fcd; */


.menu-section ul li:hover {
    color: #fff;
}

/* //icon// */
.nav-list i {
    font-size: 1.5rem; /* Adjust this value as needed */
}

/* ////////headrer///////// */
/* header section */
.accordion-header.profile {
    background-color: #1e1e1e;
}

.accordion-button {
    background-color: transparent;
    box-shadow: none;
    padding: 10px 15px;
    width: 91% !important;
    
}

.accordion-button::after {
    display: none;
}

.profile-info {
    display: flex;
    flex-direction: column;
}

.name {
    font-size: 16px;
    font-weight: bold;
    color: #ffffff;
}

.status {
    font-size: 12px;
    color: #a0a0a0;
    display: flex;
    align-items: center;
}

.round-guest {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin-right: 5px;
}

.online {
    background-color: #ff3b30;
}

.offline {
    background-color: #a0a0a0;
}

.edit-profile-btn {
    background: none;
    border: none;
    color: #a0a0a0;
    cursor: pointer;
    font-size: 18px;
    padding: 0;
}

.edit-profile-btn:hover {
    color: #ffffff;
}
.accordion-button:not(.collapsed) {
    margin-bottom: 0px;
}



/* ///////scrollable///////////////// */
.side-nav-wrapper {
  height: 100vh; /* Full viewport height */
  overflow-y: auto; /* Enable vertical scrolling */
}

.side-nav {
  width: 240px;
  background-color: #000;
  color: #fff;
  /* Remove any fixed height if present */
}

/* Add some padding to the bottom to ensure last items are visible when scrolled */
.accordion-item:last-child {
  padding-bottom: 20px;
}

/* Optional: Customize the scrollbar */
.side-nav-wrapper::-webkit-scrollbar {
  width: 6px;
}

.side-nav-wrapper::-webkit-scrollbar-thumb {
  background-color: #4a4a4a;
  border-radius: 3px;
}

.side-nav-wrapper::-webkit-scrollbar-track {
  background-color: #1e1e1e;
}
</style>
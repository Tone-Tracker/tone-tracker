<script setup>
import router from '@/router';
import { useOnline } from '@vueuse/core'
import LocationButton from '../LocationButton.vue';
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
    return props.user.role == 'TTG_TALENT' ? 'Super User' : 'Admin'
}

function goToProfile(id) {
  
  router.push({ path: `/profile` })
}

</script>
<template>
    <div class="accordion" id="accordionPanelsStayOpenExample">

        <div class="side-nav side-nav--remove">
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
<<<<<<< HEAD
                            <li><router-link to="/talent"><span class="icon"><i class='bx bx-chat'></i></span> All</router-link></li>
                            <li><router-link to="/talent/images"><span class="icon"><i class='bx bx-file'></i></span> Upload Images</router-link></li>
                            <li  @click="goToProfile"><a><span class="icon"><i class='bx bx-file'></i></span> Profile </a></li>
                            <li><router-link to="/talent/check-list"><span class="icon"><i class='bx bx-map'></i></span> Check List</router-link></li>
                            <li><router-link to="/crm"><span class="icon"><i class='bx bx-briefcase'></i></span> CRM</router-link></li>
=======
                            <li :class="{ 'active': currentRoute.path === '/clients' }"><router-link to="/clients"><span class="icon"><i class='bx bx-chat'></i></span> All</router-link></li>
                            <li :class="{ 'active': currentRoute.path === '/talent/images' }"><router-link to="/talent/images"><span class="icon"><i class='bx bx-file'></i></span> Upload Images</router-link></li>
                            <li :class="{ 'active': currentRoute.path === '/profile' }"><router-link to="/profile"><span class="icon"><i class='bx bx-file'></i></span> Profile</router-link></li>
                            <li :class="{ 'active': currentRoute.path === '/talent/check-list' }"><router-link to="/talent/check-list"><span class="icon"><i class='bx bx-map'></i></span> Check List</router-link></li>
                            <li :class="{ 'active': currentRoute.path === '/crm'}"><router-link to="/crm"><span class="icon"><i class='bx bx-briefcase'></i></span> CRM</router-link></li>
>>>>>>> adb0b865d123dbc07ecc5e8427296294cf1826e9
                         
                        </ul>
                        <LocationButton />
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
.profile .accordion-button::after {
    /* margin-bottom: 10px; */
}

.accordion-button::after {
    margin: 0 !important;
}

.side-nav {
    width: 240px;
    background-color: #000;
    color: #fff;
    /* padding: 20px; */
    /* font-family: Arial, sans-serif; */
}

.profile {
    /* padding: 20px; */
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.profile-info {
    display: flex;
    flex-direction: column;
}

.name {
    font-size: 18px;
    font-weight: bold;
}

.round-guest {
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin-right: 7px;
}
.online{
    background-color: #15ca20 !important
}
.offline{
    background-color: #fd3550!important
}

.status {
    font-size: 14px;
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

.nav-list li {
    /* margin: 15px 0; */
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

.nav-list i {
    font-size: 1.5rem; /* Adjust this value as needed */
}

/* //////////////////// */

/* header section */
.accordion-header.profile {
    background-color: #1e1e1e;
}

.accordion-button {
    background-color: transparent;
    box-shadow: none;
    padding: 10px 15px;
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

/* ////////Active////////// */
.side-nav__item.active,
.side-nav__item:hover {
  background-color: #333333 !important; /* Adjust this color to match your hover color */
}

.active{
    background-color: #333333 !important; /* Adjust this color to match your hover color */
}

</style>
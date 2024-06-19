/**
Author: Mazisi Msebele
Date: 04/06/2024
**/
<template>
    <Layout>
        <!--start page wrapper -->
        <div class="page-wrapper">
            <div class="page-content">

                <!-- <BreadCrumb title="Profile" icon="bx bx-user-circle" /> -->
                <div class="main-dashboard-head">
                    <span class="font-welcome">Profile</span>
                </div>
                <p class="text-white">Promoter</p>


                <div class="row justify-content-space-between">
                    <div class="col-lg-5">
                        <div class="card-c">
                            <div class="card-header-c">
                                <div class="d-flex flex-column align-items-center text-center image-container">
                                    <img src="/src/assets/images/gallery/10.png" alt="Admin" class="w-100 zoom-image">
                                </div>

                                <div class="mt-3">
                                    <h4 class="text-center">John Doe</h4>
                                </div>

                                <div class="profile-imgs">
                                    <div class="">
                                        <div class="col-img">
                                            <div class="gallery">
                                                <router-link to="/profile">
                                                    <img src="../../assets/images/avatars/avatar-1.png"
                                                        alt="Cinque Terre" width="600" height="400">
                                                </router-link>

                                            </div>
                                        </div>
                                        <div class="col-img">
                                            <div class="gallery">
                                                <router-link to="/profile">
                                                    <img src="../../assets/images/avatars/avatar-2.png" alt="Forest"
                                                        width="600" height="400">
                                                </router-link>

                                            </div>
                                        </div>
                                        <div class="col-img">
                                            <div class="gallery">
                                                <router-link to="/profile">
                                                    <img src="../../assets/images/avatars/avatar-3.png"
                                                        alt="Northern Lights" width="600" height="400">
                                                </router-link>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <!-- <ul class="list-group list-group-flush">
                                    <li
                                        class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                        <h6 class="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                                stroke-linecap="round" stroke-linejoin="round"
                                                class="feather feather-globe me-2 icon-inline">
                                                <circle cx="12" cy="12" r="10"></circle>
                                                <line x1="2" y1="12" x2="22" y2="12"></line>
                                                <path
                                                    d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z">
                                                </path>
                                            </svg>Website</h6>
                                        <span class="text-secondary">https://codervent.com</span>
                                    </li>
                                    <li
                                        class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                        <h6 class="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                                stroke-linecap="round" stroke-linejoin="round"
                                                class="feather feather-github me-2 icon-inline">
                                                <path
                                                    d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22">
                                                </path>
                                            </svg>Github</h6>
                                        <span class="text-secondary">codervent</span>
                                    </li>
                                    <li
                                        class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                        <h6 class="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                                stroke-linecap="round" stroke-linejoin="round"
                                                class="feather feather-twitter me-2 icon-inline text-info">
                                                <path
                                                    d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z">
                                                </path>
                                            </svg>Twitter</h6>
                                        <span class="text-secondary">@codervent</span>
                                    </li>
                                    <li
                                        class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                        <h6 class="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                                stroke-linecap="round" stroke-linejoin="round"
                                                class="feather feather-instagram me-2 icon-inline text-danger">
                                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                                            </svg>Instagram</h6>
                                        <span class="text-secondary">codervent</span>
                                    </li>
                                    <li
                                        class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                        <h6 class="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                                stroke-linecap="round" stroke-linejoin="round"
                                                class="feather feather-facebook me-2 icon-inline text-primary">
                                                <path
                                                    d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z">
                                                </path>
                                            </svg>Facebook</h6>
                                        <span class="text-secondary">codervent</span>
                                    </li>
                                </ul> -->
                    </div>


                    <div class="col-lg-5">
                        <div class="card">
                            <div class="card-body">
                                <div class="row mb-3">
                                    <div>
                                        <h6 class="mb-0">Age: 22</h6>
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <div>
                                        <h6 class="mb-0">Height: 172</h6>
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <div>
                                        <h6 class="mb-0">Location: Capetown</h6>
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <div>
                                        <h6 class="mb-0">Top size: Medium</h6>
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <div>
                                        <h6 class="mb-0">Pants Size: 30</h6>
                                    </div>
                                </div>

                                <div class="row mb-3">
                                    <div>
                                        <h6 class="mb-0">Dress Size: Medium</h6>
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <div>
                                        <h6 class="mb-0">Experience</h6>
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <div>
                                        <h6 class="mb-0">Savanna</h6>
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <div>
                                        <h6 class="mb-0">Hennessy</h6>
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <div>
                                        <h6 class="mb-0">Sky Vodka</h6>
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <div>
                                        <h6 class="mb-0">Castle Lite</h6>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-12">
                                <div class="card">
                                    <div class="card-body">
                                        <h5 class="d-flex align-items-center mb-3">Bio</h5>
                                        <p>Web Design</p>
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                            tempor incididunt ut labore et dolore
                                            magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                                            laboris nisi ut aliquip ex ea commodo
                                            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                                            cillum dolore eu fugiat nulla pariatur.
                                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                                            deserunt mollit anim id est laborum.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
        <!--start switcher-->
    </Layout>
</template>
<script setup>
import Layout from '../shared/Layout.vue';
import BreadCrumb from '../../components/BreadCrumb.vue';

</script>
<style>
div.gallery {
    margin: 5px;
    border: 1px solid #12181A;
    float: left;
    width: 160px;
}

div.gallery:hover {
    border: 1px solid #777;
}

div.gallery img {
    width: 95%;
    height: auto;
}

div.desc {
    padding: 13px;
    text-align: center;
}

.col-img {
    flex: 0 0 0%;
}

.zoom-image {
    width: 100%;
    /* Full width */
    height: 100%;
    /* Full height */
    transition: transform 0.3s ease-in-out;
    /* Smooth transition */
}

.image-container:hover .zoom-image {
    transform: scale(1.1);
    /* Zoom in (1.2 = 120%) */
}

.dark-theme .card {
    background-color: transparent !important;
}
</style>
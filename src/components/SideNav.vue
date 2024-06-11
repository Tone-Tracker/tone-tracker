<script setup>
const toggleClassActive = (myClass) => {
    document.querySelector(myClass).classList.addClass("mm-active");
}
</script>
<template>
    <div class="sidebar-wrapper" data-simplebar="true">
        <div class="sidebar-header">

            <div>
                <img style="width: 180px;" src="/src/assets/images/logo/white-logo.png" alt="">
            </div>
            <!-- <div class="toggle-icon ms-auto"><i class='bx bx-arrow-back'></i> 
            </div>
            -->
        </div>
        <!--navigation-->
        <ul class="metismenu" id="menu">
            <li>

                <div class="col-img">
                    <div class="gallery">
                        <div class="image-container position-relative">
                            <router-link to="/">
                                <img src="/src/assets/images/fake.png" alt="Cinque Terre"
                                    class="img-fluid mx-auto d-block">
                            </router-link>
                            <div class="text-center text-sm">Dashboard</div>
                        </div>
                    </div>
                </div>


            </li>


            <li>
                <router-link to="/activations">
                    <div class="parent-icon"><svg width="32" height="30" viewBox="0 0 32 30" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M31.4316 12.614C31.4316 10.7674 30.0253 9.2433 28.2278 9.05675V1.52199C28.2278 1.26579 28.1014 1.02627 27.89 0.881642C27.6788 0.737086 27.4095 0.706064 27.1708 0.798639L12.3807 6.54346H4.29333C4.08756 6.54346 3.89011 6.62532 3.74446 6.77079C3.68518 6.83018 2.28373 8.24847 1.57249 10.3832C0.899763 12.4021 0.730503 15.4417 3.74454 18.4567C3.89004 18.6023 4.08744 18.684 4.29333 18.684H4.47295L10.5969 28.3827C10.739 28.6079 10.9868 28.7444 11.253 28.7444H17.604H17.606C18.0347 28.7444 18.3821 28.3971 18.3821 27.9684C18.3821 27.7972 18.3266 27.6388 18.2325 27.5104L12.7505 18.8278L27.1705 24.4384C27.2615 24.4739 27.357 24.4912 27.4518 24.4912C27.6061 24.4912 27.7591 24.4453 27.89 24.3557C28.1015 24.2112 28.2279 23.9714 28.2279 23.7153V16.1705C30.0254 15.9842 31.4316 14.4604 31.4316 12.614ZM4.63385 8.09544H11.7502V17.1321H4.62193C0.809648 13.0649 3.77499 9.08478 4.63385 8.09544ZM11.681 27.1925L6.30977 18.6861H10.8253L16.1963 27.1925H11.681ZM13.3023 7.85055L26.6759 2.65585V22.5808L13.3023 17.3773V7.85055ZM28.2279 14.6023V10.6251C29.1665 10.8003 29.8797 11.6248 29.8797 12.614C29.8797 13.603 29.1665 14.427 28.2279 14.6023Z"
                                fill="white" stroke="white" />
                        </svg>
                    </div>
                    <div class="menu-title">Activations</div>
                </router-link>
            </li>

            <li style="margin-top: 2rem">
                <router-link to="/dashboard">
                    <div class="parent-icon"><i class='bx bx-desktop'></i>
                    </div>
                    <div class="menu-title">Dashboard</div>
                </router-link>
            </li>

            <li @click="toggleClassActive('status')">
                <router-link to="/status">
                    <div class="parent-icon"><i class='bx bx-notepad'></i>
                    </div>
                    <div class="menu-title">Status</div>
                </router-link>
            </li>
            <li>
                <router-link to="/report">
                    <div class="parent-icon"><i class='bx bx-line-chart'></i>
                    </div>
                    <div class="menu-title">Report</div>
                </router-link>
            </li>
            <li>
                <router-link to="/budget">
                    <div class="parent-icon"><i class='bx bx-calculator'></i>
                    </div>
                    <div class="menu-title">Budget</div>
                </router-link>
            </li>
            <li>
                <a href="javascript:;">
                    <div class="parent-icon"><i class="bx bx-category"></i>
                    </div>
                    <div class="menu-title">CRM</div>
                </a>
            </li>

            <li class="maz">
                <router-link to="/warehouse">
                    <div class="parent-icon"><i class='bx bxs-school'></i>
                    </div>
                    <div class="menu-title">Warehousing</div>
                </router-link>
            </li>

        </ul>
        <!--end navigation-->
    </div>
</template>
<style>
.menu-title {
    text-transform: uppercase;

}
</style>
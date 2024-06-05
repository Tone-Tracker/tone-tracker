
<script setup>
const toggleClassActive = (myClass) => {
    document.querySelector(myClass).classList.addClass("mm-active");
}
</script>
<template>
    <div class="sidebar-wrapper" data-simplebar="true">
        <div class="sidebar-header">
          
            <div>
                <h4 class="logo-text fs-2">tonetracker</h4>
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
                                <img src="/src/assets/images/fake.png" alt="Cinque Terre" class="img-fluid mx-auto d-block">
                            </router-link>
                            <div class="text-center text-sm">Dashboard</div>
                        </div>
                    </div>
                </div>
                
                
            </li>
            
            <li style="margin-top: 2rem">
                <router-link to="/dashboard">
                    <div class="parent-icon"><i class='bx bx-desktop'></i>
                    </div>
                    <div class="menu-title">Dashboard</div>
                </router-link>
            </li>


            <li>
                <router-link to="/activations" >
                    <div class="parent-icon"><i class="bx bx-category"></i>
                    </div>
                    <div class="menu-title">Activations</div>
                </router-link>
            </li>

            <li @click="toggleClassActive('status')">
                <router-link to="/status" >
                    <div class="parent-icon"><i class='bx bx-notepad'></i>
                    </div>
                    <div class="menu-title">Status</div>
                </router-link>
            </li>
            <li>
                <router-link to="/report" >
                    <div class="parent-icon"><i class='bx bx-line-chart'></i>
                    </div>
                    <div class="menu-title">Report</div>
                </router-link>
            </li>
            <li>
                <router-link to="/budget" >
                    <div class="parent-icon"><i class='bx bx-calculator' ></i>
                    </div>
                    <div class="menu-title">Budget</div>
                </router-link>
            </li>
            <li>
                <a href="javascript:;" >
                    <div class="parent-icon"><i class="bx bx-category"></i>
                    </div>
                    <div class="menu-title">CRM</div>
                </a>
            </li>

            <li class="maz">
                <router-link to="/warehouse" >
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
.menu-title{
    text-transform: uppercase;
    
}

</style>
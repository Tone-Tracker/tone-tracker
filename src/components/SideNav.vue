<template>
    <div class="sidebar-wrapper" data-simplebar="true">
        <div class="sidebar-header">
            <div>
                <img src="/src/assets/images/logo-icon.png" class="logo-icon" alt="logo icon">
            </div>
            <div>
                <h4 class="logo-text">tonetracker</h4>
            </div>
            <div class="toggle-icon ms-auto"><i class='bx bx-arrow-back'></i>
            </div>
         </div>
        <!--navigation-->
        <ul class="metismenu" id="menu">
            
            <li>
                <router-link to="/dashboard">
                    <div class="parent-icon"><i class='bx bx-desktop'></i>
                    </div>
                    <div class="menu-title">Dashboard</div>
                </router-link>
            </li>
            <li>
                <a href="javascript:;" >
                    <div class="parent-icon"><i class="bx bx-category"></i>
                    </div>
                    <div class="menu-title">Activations</div>
                </a>
            </li>

            <li>
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
                <a href="javascript:;" >
                    <div class="parent-icon"><i class='bx bx-calculator' ></i>
                    </div>
                    <div class="menu-title">Budget</div>
                </a>
            </li>
            <li>
                <a href="javascript:;" >
                    <div class="parent-icon"><i class="bx bx-category"></i>
                    </div>
                    <div class="menu-title">CRM</div>
                </a>
            </li>

            <li class="maz">
                <a href="javascript:;" >
                    <div class="parent-icon"><i class='bx bxs-school'></i>
                    </div>
                    <div class="menu-title">Warehousing</div>
                </a>
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
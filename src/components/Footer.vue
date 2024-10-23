<template>
    <footer class="page-footer ">
        <div></div>
        <p class="mb-0 text-white">ToneTracker a TwoTone Global product. Copyright © {{ new Date().getFullYear() }}. All right reserved.
        </p>
        <!-- <div>
            <div>FAQ's</div>
            <div>Contact Us</div>
            <div>Support</div> -->

            <ul class="nav-list d-flex gap-2">
                <a class="" href="#">FAQ's</a>
                <a href="#">Contact Us</a>
                <a href="#">Support</a>
            </ul>
        
    <!-- <span @click="logout" class=" btn text-white  maz-gradient-btn ml-4 float-end cursor-pointer">Logout</span> -->
    </footer>
</template>

<style scoped>
    .page-footer {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr; 
        align-items: center;
    }
    .nav-list {
        margin: 0;
        padding-left: 300px;
    }

    .nav-list a {
        border-right: 2px solid #fff;
        padding-right: 5px; 
    }
    .nav-list a:last-child {
        border: 0;
    }

</style>
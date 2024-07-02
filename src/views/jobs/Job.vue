<script setup>
import Layout from '@/views/shared/Layout.vue';
import BreadCrumb from '@/components/BreadCrumb.vue';

</script>
<template>
    <Layout>
        <div class="page-wrapper">
            <div class="page-content">
                <BreadCrumb title="Jobs" icon="" />
                <div class="card">
                    <div class="card-body">
                        <!-- Code here -->
                        <div class="container my-5">
                            <div class="row g-4">
                                <div v-for="i in 4" class="col-md-4 col-lg-3">
                                    <div class="job-item">
                                        <img src="../../assets/images/company-logo.png" alt="Luc Belair">
                                        <span>Luc Belair</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
</template>
<style scoped>
body {
    background-color: #111;
    color: white;
    margin: 0;
    padding: 0;
}

.job-item {
    position: relative;
    overflow: hidden;
    border: 2px solid #fff;
}

.job-item img {
    width: 100%;
    height: auto;
    display: block;
}

.job-item span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(0, 0, 0, 0.7);
    padding: 10px;
    text-align: center;
    font-size: 1.2em;
    border-radius: 8px;
    /* Optional: adds rounded corners to the background */
}

.job-item.new::after {
    content: 'New';
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: orange;
    color: white;
    padding: 5px 10px;
    font-size: 0.9em;
    border-radius: 3px;
    z-index: 1;
}

.job-item::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 2px solid #fff;
    z-index: 0;
}
</style>

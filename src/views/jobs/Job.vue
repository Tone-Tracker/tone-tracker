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
                        <div class="">
                            <div class="row g-4">
                                <div v-for="i in 4" class="col-md-4 col-lg-3">
                                    <div class="job-item">
                                        <div class="image-container">
                                            <img src="../../assets/images/Component 102 – 1.png" alt="Luc Belair">
                                            <span>Luc Belair</span>
                                        </div>
                                        <div class="details">
                                            <div class="d-flex align-items-center justify-content-between">
                                                <div>Activation progress:</div>
                                                <div>38%</div>
                                            </div>
                                            <div class="d-flex align-items-center justify-content-between">
                                                <div>Leads:</div>
                                                <div>102,000</div>
                                            </div>
                                            <div class="d-flex align-items-center justify-content-between">
                                                <div>Activations completed:</div>
                                                <div>10</div>
                                            </div>
                                            <div class="d-flex align-items-center justify-content-between">
                                                <div>Ongoing activations:</div>
                                                <div>15</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            <div class="pin-container position-relative d-inline-block text-center">
                <div class="card bg-dark text-white p-3 rounded-3" style="width: 300px; border: none;">
                    <div class="card-body">
                        <p class="mb-2 fw-bold">Team: 01</p>
                        <p class="mb-1">CPC: R 2.00</p>
                        <p class="mb-1">Start / finish date: 22 Jan - 28 Jan</p>
                        <p class="mb-1">Current cost: R 25 000,00</p>
                        <p class="mb-4">Leads generated: 100 000</p>
                        <p class="mb-2 fw-bold">Joburg Activation</p>
                        <p class="mb-0">939 New Brunswick Rd Apt. 282</p>
                    </div>
                </div>
                <div class="pin-arrow position-absolute"></div>
            </div>
            

            

        </div>
    </Layout>
</template>
<style scoped>


.pin-container {
    position: relative;
}

.card {
    background: linear-gradient(90deg, #522a84, #df3f7f);
    color: white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.card-body {
    background-color: #343a40;
    border-radius: 12px;
    padding: 20px;
}

.card .fw-bold {
    font-weight: 700;
}

.card p {
    margin-bottom: 8px;
}

.pin-arrow {
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 10px solid #df3f7f;
    left: 50%;
    transform: translateX(-50%);
    bottom: 14px;
}











.job-item {
    margin-bottom: 20px;
    cursor: pointer;
}



.image-container {
    position: relative;
    border: 2px solid #fff;
    height: 14rem;
}

.job-item img {
    width: 100%;
    height: 14rem;
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
    font-size: 1.5em;
    border-radius: 8px;
    transition: opacity 0.3s ease-in-out;
    font-weight: 700;
}

.job-item .details {
    background-color: #333;
    padding: 10px;
    text-align: left;
    font-size: 1em;
    /* border-radius: 8px; */
    display: none;
    white-space: pre-line;
    color: white;
}

.job-item:hover .details {
    display: block;
}

.job-item.new .image-container::after {
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

.image-container::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 2px solid #fff;
    z-index: 0;
}

.details p {
    margin: 0;
    display: flex;
    justify-content: space-between;
}
</style>
<script setup>
import Layout from '@/views/shared/Layout.vue';
import BreadCrumb from '@/components/BreadCrumb.vue';

</script>
<template>
    <Layout>
        <div class="page-wrapper">
            <div class="page-content">
                <BreadCrumb title="Teaching and Learning" icon="" />
                <p>Procedures when running an activation</p>
                <div>
                    <p>Duties for promoters</p>
                </div>


                <div class="card">
                    <div class="card-body">
                            <div>
                            </div>
                            <div class="row">
                                <div v-for="i in 5" class="col-md-3 col-lg-2">
                                    <div class="brief-card mb-4">
                                        <h5 class="py-1 px-4 mb-0 text-center bg-black">Joburg Activation 28 Februar</h5>
                                        <img src="https://www.iconpacks.net/icons/1/free-document-icon-901-thumb.png" class="bg-white">
                                        <div class="d-flex justify-content-between align-items-center">
                                            <button
                                                class="btn bg-black text-white w-100 rounded-0 btn-outline-light">Read <span class="round-guest online"></span></button>
                                            <button
                                                class="btn text-white w-100 rounded-0 border border-primary bg-primary btn-outline-light">Share<i class='bx bxs-share-alt'></i> </button>
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
bg-white {
    background-color: #dedede;
}

.bg-black {
    background-color: black !important;
}

.brief-card {
    margin-bottom: 1rem;
}

.brief-card img {
    width: 100%;
    height: auto;
}

.new-badge {
    background-color: orange;
    color: white;
    padding: 0.2rem 0.5rem;
    border-radius: 0.3rem;
    font-size: 0.8rem;
}

.btn-save {
    background-color: #007bff;
    border: none;
}

.btn-save:hover {
    background-color: #0056b3;
}

.custom-checkbox input[type="checkbox"] {
    margin-right: 0.5rem;
}
</style>

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
                        <!-- Code here -->
                        <div class="container">
                            <div>
                            </div>
                            <div class="row">
                                <div v-for="i in 5" class="col-md-4 col-lg-3">
                                    <div class="brief-card mb-4">
                                        <h5 class="py-1 px-4 mb-0 text-center bg-black">Joburg Activation 28 Februarv
                                        </h5>
                                        <div class="d-flex justify-content-between align-items-center">
                                            <button
                                                class="btn bg-black text-white w-100 rounded-0 btn-outline-light">Read</button>
                                            <button
                                                class="btn text-white w-100 rounded-0 border border-primary bg-primary btn-outline-light">Share</button>
                                        </div>

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

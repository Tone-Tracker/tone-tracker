<script setup>
import { onClickOutside } from '@vueuse/core'
import { ref } from 'vue';
import Layout from '@/views/shared/Layout.vue';
import BreadCrumb from '@/components/BreadCrumb.vue';

let showDropdown = ref(null);
onClickOutside(showDropdown, event => showDropdown.value.classList.remove('show'));

const toggleDropdown = () => {
    showDropdown.value.classList.toggle('show');
};

</script>

<template>
    <Layout>
        <div class="page-wrapper">
            <div class="page-content">
                <BreadCrumb title="CRM" icon="bx bxs-calculator" />

                <!-- Code here -->
                <div class="container">
                    <div class="table-container-colour p-5">
                        <div class="d-flex justify-content-between">
                            <h5>Database</h5>
                            <div class="filter-dropdown">
                                <h5 style="display: inline;">Filter</h5>
                                <img src="https://img.icons8.com/ios-filled/20/ffffff/filter.png" alt="Filter Icon"
                                    class="filter-icon" @click="toggleDropdown" />
                                <div ref="showDropdown" class="filter-dropdown-content">
                                    <a href="#">Gauteng Central</a>
                                    <a href="#">Eastern Region</a>
                                    <a href="#">Western Region</a>
                                    <a href="#">Clear Filter</a>
                                </div>
                            </div>

                        </div>
                        <table class="table table-dark table-bordered">
                            <thead>
                                <tr class="table-dark-color">
                                    <th>Contact Name</th>
                                    <th>Contact Surname</th>
                                    <th>Email</th>
                                    <th>Cell Number</th>
                                    <th>Opt-in</th>
                                    <th>Activation Area</th>
                                    <th>Region</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="table-dark-black">
                                    <td>Brandley</td>
                                    <td>Thomas</td>
                                    <td>brandleythomas17@gmail.com</td>
                                    <td>062 248 9892</td>
                                    <td>Yes</td>
                                    <td>Johannesburg</td>
                                    <td>Gauteng Central</td>
                                </tr>
                                <tr class="table-dark-light">
                                    <td>Michael</td>
                                    <td>Harper</td>
                                    <td>michaelharper12@gmail.com</td>
                                    <td>071 293 2789</td>
                                    <td>No</td>
                                    <td>Durban</td>
                                    <td>Eastern Region</td>
                                </tr>
                                <tr class="table-dark-black">
                                    <td>John</td>
                                    <td>Ndlovu</td>
                                    <td>johnndlovu@gmail.com</td>
                                    <td>082 492 2345</td>
                                    <td>No</td>
                                    <td>Cape Town</td>
                                    <td>Western Region</td>
                                </tr>
                                <tr class="table-dark-light">
                                    <td>Thomas</td>
                                    <td>Ngwenya</td>
                                    <td>thomasngwenya@gmail.com</td>
                                    <td>063 374 4987</td>
                                    <td>Yes</td>
                                    <td>Durban</td>
                                    <td>Eastern Region</td>
                                </tr>
                                <tr class="table-dark-black">
                                    <td>Mark</td>
                                    <td>Matsila</td>
                                    <td>markmatsila@gmail.com</td>
                                    <td>062 298 1298</td>
                                    <td>Yes</td>
                                    <td>Cape Town</td>
                                    <td>Western Region</td>
                                </tr>
                                <tr class="table-dark-light">
                                    <td>Sid</td>
                                    <td>Abrahams</td>
                                    <td>sidabrahams@gmail.com</td>
                                    <td>063 341 3482</td>
                                    <td>Yes</td>
                                    <td>Johannesburg</td>
                                    <td>Gauteng Central</td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="text-end">
                            <button class="btn btn-secondary btn-export rounded-0 mb-0 mx-2">Export</button>
                            <button class="btn btn-primary btn-download rounded-0 mb-0">Download</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
</template>

<style scoped>
body {
    background-color: #1e1e1e;
    color: white;
    font-family: Arial, sans-serif;
}

.crm-header {
    display: flex;
    align-items: center;
    padding: 20px;
    padding-left: 0;
}

.crm-header img {
    width: 50px;
    margin-right: 15px;
}

.crm-header h1 {
    margin: 0;
}

.table-dark {
    background-color: #2c2c2c;
}

.btn-export,
.btn-download {
    margin: 10px 0;
}

.table-container-colour {
    background-color: #212020 !important;
}

.table-dark-color {
    background-color: #252525;
}

.table-dark-black {
    background-color: #1e1e1e;
}

.table-dark-light {
    background-color: #504f4f;
}

.table-dark td,
.table-dark th,
.table-dark thead th {
    padding: 10px !important;
    border: none !important;
}

/* Filter dropdown styling */
.filter-dropdown {
    position: relative;
    display: inline-block;
}

.filter-dropdown-content {
    display: none;
    position: absolute;
    background-color: #1e90ff;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
}

.filter-dropdown-content a {
    color: white;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
}

.filter-dropdown-content a:hover {
    background-color: #0056b3;
}

.filter-icon {
    width: 20px;
    margin-left: 10px;
    cursor: pointer;
}

.show {
    display: block;
}
</style>

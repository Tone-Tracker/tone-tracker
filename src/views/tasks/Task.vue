<script setup>
import Layout from '@/views/shared/Layout.vue';
import BreadCrumb from '@/components/BreadCrumb.vue';
import TaskModal from './TaskModal.vue';
import { onMounted, ref, reactive } from 'vue';

let showModal = ref(true);

const hideModal = () => {
	showModal.value = false
}

</script>
<template>
    <Layout>
        <div class="page-wrapper">
            <div class="page-content">
                <BreadCrumb title="Tasks" icon="bx bx-task" />
                <div class="card">
                    <div class="card-body">
                            <div class="table-container-colour p-5">
                                <div class="d-flex justify-content-between align-items-center mb-4">
                                    <h5>Main tasks to set up</h5>
                                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addTaskModal">Add New Task</button>
                                </div>
                                <table class="table table-dark table-bordered">
                                    <thead>
                                        <tr class="table-dark-color">
                                            <th>Project</th>
                                            <th>Task</th>
                                            <th>Risk</th>
                                            <th>Planned End date</th>
                                            <th>Time Record</th>
                                            <th>Project Responsible</th>
                                            <th>Completion</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr class="table-dark-black">
                                            <td>Project 1</td>
                                            <td>0021</td>
                                            <td class="risk-at-risk">At risk</td>
                                            <td>08-09-2023</td>
                                            <td>04:00:00</td>
                                            <td>Brandley</td>
                                            <td>17%</td>
                                        </tr>
                                        <tr class="table-dark-light">
                                            <td>Project 2</td>
                                            <td>0034</td>
                                            <td class="risk-on-track">On track</td>
                                            <td>08-09-2023</td>
                                            <td>05:10:00</td>
                                            <td>Michael</td>
                                            <td>28%</td>
                                        </tr>
                                        <tr class="table-dark-black">
                                            <td>Project 3</td>
                                            <td>0042</td>
                                            <td class="risk-on-track">On track</td>
                                            <td>08-09-2023</td>
                                            <td>08:13:00</td>
                                            <td>John</td>
                                            <td>34%</td>
                                        </tr>
                                        <tr class="table-dark-light">
                                            <td>Project 4</td>
                                            <td>0051</td>
                                            <td class="risk-planned">Planned</td>
                                            <td>08-09-2023</td>
                                            <td>00:18:00</td>
                                            <td>Thomas</td>
                                            <td>10%</td>
                                        </tr>
                                        <tr class="table-dark-black">
                                            <td>Project 5</td>
                                            <td>0058</td>
                                            <td class="risk-on-track">On track</td>
                                            <td>08-09-2023</td>
                                            <td>13:05:00</td>
                                            <td>Mark</td>
                                            <td>94%</td>
                                        </tr>
                                        <tr class="table-dark-light">
                                            <td>Project 6</td>
                                            <td>0060</td>
                                            <td class="risk-delayed">Delayed</td>
                                            <td>08-09-2023</td>
                                            <td>06:32:00</td>
                                            <td>Sid</td>
                                            <td>25%</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <TaskModal v-if="showModal"
            :showModal="showModal"
            :modalData="modalData"
            @closeModal="hideModal()"
            />
    </Layout>
</template>
<style scoped>
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

.modal-content {
    background-color: #1e1e1e;
    color: white;
}

.modal-header,
.modal-footer {
    border: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.risk-at-risk {
    background-color: #ff0055;
    color: white;
}

.risk-on-track {
    background-color: #00d2ff;
    color: white;
}

.risk-planned {
    background-color: #ffa500;
    color: white;
}

.risk-delayed {
    background-color: #b200ff;
    color: white;
}

.submit-button {
    background: linear-gradient(90deg, #9b00ff, #00d2ff);
    border: none;
}

.form-control {
    background-color: transparent;
    border: 1px solid #5e5e5e;
    color: white;
}

.form-control:focus {
    background-color: #1e1e1e;
    border-color: #5e5e5e;
}

.btn-primary {
    background: linear-gradient(90deg, #9b00ff, #00d2ff);
    border: none;
}

.btn-primary:hover {
    background: linear-gradient(90deg, #9b00ff, #00d2ff);
    opacity: 0.8;
}

.custom-close {
    background-color: transparent;
    border: none;
    color: white;
    font-size: 20px;
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 5px;
}

.custom-close:hover {
    background-color: #555;
}


.form-custom {
    border-radius: 5px;
    border: 2px solid #5e5e5e;
    margin: 0px;
    padding: 20px;
}

.modal-header {
    border-bottom: 1px solid #5e5e5e;
}

.modal-dialog {
    max-width: 800px;
}

.space {
    display: flex;
    gap: 15px;
}

input:focus,
button:focus {
    outline: none !important;
    box-shadow: none !important;
}
</style>

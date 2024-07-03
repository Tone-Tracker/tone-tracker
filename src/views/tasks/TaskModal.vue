<script setup>
import { onMounted, ref, reactive } from 'vue';

let showModal = ref(true);
</script>
<template>
    <div class="modal fade" id="addTaskModal" tabindex="-1" role="dialog" aria-labelledby="addTaskModalLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header mb-4">
                    <h5 class="modal-title" id="addTaskModalLabel">Add New Task</h5>
                    <button type="button" class="custom-close" data-dismiss="modal" aria-label="Close">
                        <span>&#10005;</span> <!-- Unicode for '×' -->
                    </button>
                </div>
                <div class="modal-body">
                    <div class="form-custom">
                        <form>
                            <div class="d-flex justify-content-between space">
                                <div class="form-group w-100 m">
                                    <label for="project">Project</label>
                                    <input type="text" class="form-control" id="project">
                                </div>
                                <div class="form-group w-100">
                                    <label for="task">Task</label>
                                    <input type="text" class="form-control" id="task">
                                </div>
                            </div>
                            <div class="d-flex justify-content-between space">
                                <div class="form-group w-100">
                                    <label for="risk">Risk</label>
                                    <select class="form-control" id="risk">
                                        <option>At risk</option>
                                        <option>On track</option>
                                        <option>Planned</option>
                                        <option>Delayed</option>
                                    </select>
                                </div>
                                <div class="form-group w-100">
                                    <label for="plannedEndDate">Planned End Date</label>
                                    <input type="date" class="form-control" id="plannedEndDate">
                                </div>
                            </div>
                            <div class="d-flex justify-content-between space">
                                <div class="form-group w-100">
                                    <label for="timeRecord">Time Record</label>
                                    <input type="time" class="form-control" id="timeRecord">
                                </div>
                                <div class="form-group w-100">
                                    <label for="projectResponsible">Project Responsible</label>
                                    <input type="text" class="form-control" id="projectResponsible">
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="completion">Completion</label>
                                <input type="number" class="form-control" id="completion">
                            </div>
                        </form>
                    </div>

                </div>
                <div class="modal-footer">
                    <!-- <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button> -->
                    <button type="button" class="btn submit-button w-100">Submit</button>
                </div>
            </div>
        </div>
    </div>
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

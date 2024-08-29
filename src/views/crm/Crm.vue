<script setup>
import { onMounted, ref, reactive } from 'vue';
import Layout from '@/views/shared/Layout.vue';
import BreadCrumb from '@/components/BreadCrumb.vue';
import { useLeadStore } from '@/stores/leadStore';
import useToaster from '@/composables/useToaster';
import { useAuth } from '@/stores/auth';

let showDropdown = ref(null);
let showModal = ref(false);
const leadStore = useLeadStore();

onMounted(() => {
    
    getAllLeads();

});

let newUser = ref({
    name: '',
    surname: '',
    email: '',
    cell: '',
    optin: false,
    area: '',
    region: ''
});

const getAllLeads = async () => {
	showLoading.value = true;
	leadStore.getLeds().then(function (response) { console.log("tst", response);
		showLoading.value = false;
		users.value = response.data.content
	}).catch(function (error) {
		toaster.error("Error fetching users");
		console.log(error);
	}).finally(function () {
		showLoading.value = false;
	})
  }



const openModal = () => {
    showModal.value = true;
};

const closeModal = () => {
    showModal.value = false;
    newUser.value = {
        name: '',
        surname: '',
        email: '',
        cell: '',
        optin: false,
        area: '',
        region: ''
    };
};

const submitUserDetails = () => {
    console.log("User Details Submitted:", newUser.value);
    // Here you can handle form submission, e.g., send the data to a server
    closeModal();
};

</script>

<template>
    <Layout>
        <div class="page-wrapper">
            <div class="page-content">
                <BreadCrumb title="CRM" icon="bx bxs-calculator" />

                <div>
                    <div class="table-container-colour p-5">
                        <div class="d-flex justify-content-between">
                            <h5>Database</h5>
                            <button class="btn btn-primary" @click="openModal">Add New User</button>
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
                                <!-- Existing user rows here -->
                            </tbody>
                        </table>
                        <div class="text-end">
                            <button class="btn btn-secondary btn-export rounded-0 mb-0 mx-2">Export</button>
                            <button class="btn btn-primary btn-download rounded-0 mb-0">Download</button>
                        </div>
                    </div>
                </div>

                <!-- Modal -->
                <div v-if="showModal" class="modal-overlay">
                    <div class="modal-content">
                        <h5>Add New User</h5>
                        <div class="form-group">
                            <label>Name:</label>
                            <input v-model="newUser.name" type="text" class="form-control" placeholder="Enter name" />
                        </div>
                        <div class="form-group">
                            <label>Surname:</label>
                            <input v-model="newUser.surname" type="text" class="form-control" placeholder="Enter surname" />
                        </div>
                        <div class="form-group">
                            <label>Email:</label>
                            <input v-model="newUser.email" type="email" class="form-control" placeholder="Enter email" />
                        </div>
                        <div class="form-group">
                            <label>Cell Number:</label>
                            <input v-model="newUser.cell" type="text" class="form-control" placeholder="Enter cell number" />
                        </div>
                        <div class="form-group">
                            <label>Opt-in:</label>
                            <input v-model="newUser.optin" type="checkbox" />
                        </div>
                        <div class="form-group">
                            <label>Activation Area:</label>
                            <input v-model="newUser.area" type="text" class="form-control" placeholder="Enter activation area" />
                        </div>
                        <div class="form-group">
                            <label>Region:</label>
                            <input v-model="newUser.region" type="text" class="form-control" placeholder="Enter region" />
                        </div>
                        <div class="form-group text-end">
                            <button class="btn btn-secondary" @click="closeModal">Cancel</button>
                            <button class="btn btn-primary" @click="submitUserDetails">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
</template>

<style>

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    width: 400px;
    max-width: 90%;
}
</style>


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

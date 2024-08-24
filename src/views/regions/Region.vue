<script setup>
import { onMounted, ref, reactive } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import Layout from '@/views/shared/Layout.vue';
import { useConfirm } from 'primevue/useconfirm';
import BreadCrumb from '@/components/BreadCrumb.vue';
import Dialog from 'primevue/dialog';
import Select from 'primevue/select';
import useToaster from '@/composables/useToaster';
import { useRegion } from '@/stores/useRegion';
import { useUserStore } from '@/stores/userStore';
import { useStaff } from '@/stores/staff';

const toaster = useToaster();
const regionStore = useRegion();
const confirm = useConfirm();
const userStore = useUserStore();
const staff = useStaff();

let clients = ref([]);
let regions = ref([]);
let staffMembers = ref([]);
const visible = ref(false);
const position = ref('top');
const regionalManager = ref(null);
const regionalManagers = ref([]);
const loading = ref(false);

const form = reactive({ name: '' });
const nameInput = ref(null); // Reference for the input field

onMounted(() => {
  getRegions();
  getRegionalManagers();
  getStaff();
});

const rules = { 
    name: { required }
};
const v$ = useVuelidate(rules, form);

const createRegion = async () => {
    const isFormValid = await v$.value.$validate();
    if (!isFormValid) {
        return;
    }
    loading.value = true;
    try {
        await regionStore.submit(form);
        toaster.success("Region created successfully");
        form.name = ''; // Reset the form input
        v$.value.$reset(); // Reset the validation
        if (nameInput.value) {
            nameInput.value.blur(); // Unfocus the input field
        }
        await getRegions();
    } catch (error) {
        toaster.error("Error creating region");
        console.log(error);
    } finally {
        loading.value = false;
    }
};

const getStaff = async () => {
    try {
        const response = await staff.getStaff();
        staffMembers.value = response.data.content;
    } catch (error) {
        toaster.error("Error fetching staff members");
        console.log(error);
    }
};

const getRegionalManagers = async () => {
    try {
        const response = await userStore.getUserByRole('TTG_REGIONAL_MANAGER');
        let users = response.data.content.filter(user => user.role === 'TTG_REGIONAL_MANAGER');
        regionalManagers.value = users.map(user => ({
            name: user.firstName + ' ' + user.lastName,
            id: user.id
        }));
    } catch (error) {
        toaster.error("Error fetching regional managers");
        console.log(error);
    }
};

const regionalManagerForm = reactive({ region: '', staff: '' });

const onRegManagerChange = (event) => {
    let reg = staffMembers.value.find(regMan => regMan.user === event.value.id);
    regionalManagerForm.staff = reg ? reg.id : ''; // Ensure reg is found
};

const submitRegionalManager = async () => {
    console.log('API Error:gggg', regionalManagerForm);
    if (!regionalManagerForm.region || !regionalManagerForm.staff) {
        toaster.error("Please select both region and staff member");
        return;
    }
    try {
        // Sending the `regionalManagerForm` object to the backend
        await regionStore.addRegionalManager(regionalManagerForm);
        toaster.success("Regional Manager added successfully");
        regionalManagerForm.staff = ''; // Reset staff field
        visible.value = false; // Hide modal
        await getRegions(); // Refresh regions list
    } catch (error) {
        toaster.error("Error adding regional manager");
        console.error('API Error:', error);
    }
};


const getRegions = async () => {
    try {
        const response = await regionStore.getRegions();
        regions.value = response.data.content;
    } catch (error) {
        toaster.error("Error fetching regions");
        console.log(error);
    }
};

const deleteRegion = async (region) => {
    try {
        await regionStore.deleteRegion(region.id);
        toaster.success("Region deleted successfully");
        await getRegions();
    } catch (error) {
        toaster.error("Error deleting region");
        console.log(error);
    }
};

const editClient = (client) => {
    clients.value.forEach(c => c.isEditing = false);
    client.isEditing = true;
};

const update = async (client) => {
    client.isEditing = false;
    try {
        await regionStore.update(client);
        toaster.success("Region updated successfully");
        await getRegions();
    } catch (error) {
        toaster.error("Error updating client");
        console.log(error);
    }
};

const deleteRecord = (event, region) => {
    confirm.require({
        target: event.currentTarget,
        message: 'Do you want to delete this region?',
        icon: '',
        rejectProps: {
            label: 'Cancel',
            severity: '',
            outlined: true
        },
        acceptProps: {
            label: 'Delete',
            severity: 'danger'
        },
        accept: () => {
            deleteRegion(region);
        },
        reject: () => {
            // do nothing
        }
    });
};

const vFocus = {
    mounted: (el) => el.focus()
};

let regionName = ref('');
const openModal = (pos, region) => {
    if (region) {
        regionName.value = region.name;
        regionalManagerForm.region = region.id;
    }
    position.value = pos;
    visible.value = true;
};
</script>

<template>
    <Layout>
        <div class="page-wrapper">
            <div class="page-content">
                <BreadCrumb title="Regions" icon="bx bx-map" />
                <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-8 col-lg-8 col-xl-8 d-flex">
                                <div class="card radius-10 w-100">
                                    <div class="card-body">
                                        <div class="table-responsive">
                                            <table class="table mb-0">
                                                <thead class="table-light">
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Region Name</th>
                                                        <th>Regional Manager</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-if="regions.length > 0" v-for="(region, index) in regions" :key="region.id">
                                                        <td>{{ index + 1 }}</td>
                                                        <td v-if="!region.isEditing">{{ region.name }}</td>
                                                        <td v-else>
                                                            <input v-focus type="text" v-model="region.name" @blur="update(region)" @keyup.enter="update(region)" class="no-border-input"/>
                                                        </td>
                                                        <td>
                                                            {{ region.firstName ? region.firstName + ' ' + region.lastName : '' }}
                                                        </td>
                                                        <td>
                                                            <div class="d-flex order-actions">
                                                                <a v-if="!region.isEditing" @click="editClient(region)" href="javascript:;">
                                                                    <i class='bx bxs-edit'></i>
                                                                </a>
                                                                <a v-else @click="update(region)" href="javascript:;" class="ms-3">
                                                                    <i class='bx bx-check text-success'></i>
                                                                </a>
                                                                <a @click="openModal('top', region)" href="javascript:;" class="ms-3">
                                                                    <i class='bx bx-user text-success'></i>
                                                                </a>
                                                                <a @click="deleteRecord($event, region)" href="javascript:;" class="ms-3">
                                                                    <i class='bx bxs-trash text-danger'></i>
                                                                </a>
                                                                <ConfirmPopup></ConfirmPopup>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr v-else>
                                                        <td colspan="7" class="text-center text-danger">No regions found.</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-4 col-lg-4 col-xl-4 d-flex">
                                <div class="card w-100 radius-10">
                                    <div class="card-body">
                                        <div class="table-responsive">
                                            <form class="">
                                                <div class="col-md-12">
                                                    <label for="input1" class="form-label">Region Name</label>
                                                    <input ref="nameInput" v-model="form.name" type="text" class="form-control" id="input1" />
                                                    <div class="input-errors" v-for="error of v$.name.$errors" :key="error.$uid">
                                                        <div class="text-danger">Region name is required</div>
                                                    </div>
                                                </div>
                                            </form>
                                            <div class="ms-auto mt-4">
                                                <a @click="createRegion" href="javascript:;" class="w-100 btn maz-gradient-btn radius-30 mt-2 mt-lg-0">
                                                    <div v-if="loading" class="spinner-border text-white " role="status">
                                                         <span class="visually-hidden">Loading...</span>
                                                    </div>
                                                    <i class="bx bxs-plus-square"></i>  {{ loading ?  '' : 'Create' }}
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Dialog v-model:visible="visible" position="top" modal :header="`Add ${regionName} Regional Manager`" :style="{ width: '25rem' }">
            <form @submit.prevent="submitRegionalManager" class="row g-3">
                <div class="col-md-12">
                    <div class="card my-card flex justify-center">
                        <label for="input1" class="form-label">Regional Manager</label>
                        <Select v-model="regionalManager" @change="onRegManagerChange($event)" :options="regionalManagers" showClear  optionLabel="name" placeholder="Select Regional Manager" class="w-full md:w-56" />
                          
                </div>                        
                </div>
                <div class="col-12 mt-4 d-flex justify-content-end">
                    <button @click="submitRegionalManager" class="w-100 btn maz-gradient-btn radius-30 mt-2 mt-lg-0">
                        <i class="bx bxs-plus-square"></i>  Add Regional Manager
                    </button>
                </div>
          
            </form>
        </Dialog>
    </Layout>
</template>

<style scoped>
.table td {
    vertical-align: middle;
}
</style>

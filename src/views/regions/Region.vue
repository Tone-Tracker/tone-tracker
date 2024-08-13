<script setup>
import { onMounted, ref, reactive } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import Layout from '@/views/shared/Layout.vue';
import { useConfirm } from "primevue/useconfirm";
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

const form = reactive({name: ''});

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
    regionStore.submit(form).then(function (response) {
        toaster.success("Region created successfully");        
        // form.name = '';v$.value.$reset;
        getRegions();
        }).catch(function (error) {
        toaster.error("Error creating region");
        console.log(error);
    });
};

const getStaff = async () => {
    staff.getStaff().then(function (response) {
        staffMembers.value = response.data.content;
    }).catch(function (error) {
        toaster.error("Error fetching staff members");
        console.log(error);
    });
}

const getRegionalManagers = async () => {
    userStore.getUserByRole('TTG_REGIONAL_MANAGER').then(function (response) {
        let users = response.data.content.filter(user => user.role === 'TTG_REGIONAL_MANAGER');
         regionalManagers.value = users.map(user => {
            return {
                name: user.firstName + ' ' + user.lastName,
                id: user.id
            }
        }
        );
        
    }).catch(function (error) {
        toaster.error("Error fetching regions");
        console.log(error);
    }).finally(function () {
    });
};

const regionalManagerForm = reactive({region: '', staff: ''});

const onRegManagerChange = (event) => {
    let reg = staffMembers.value.find(regMan => regMan.user === event.value.id);
    regionalManagerForm.staff = reg.id;
}

const submitRegionalManager = async () => {
    regionStore.addRegionalManager(regionalManagerForm).then(function (response) {
        toaster.success("Regional Manager added successfully");
        regionalManagerForm.staff = '';
        visible.value = false;
        getRegions();
        }).catch(function (error) {
        toaster.error("Error adding regional manager");
        console.log(error);
    });
}
const getRegions = async () => {
    regionStore.getRegions().then(function (response) {
        regions.value = response.data.content;
    }).catch(function (error) {
        toaster.error("Error fetching regions");
        console.log(error);
    }).finally(function () {
    });
};


const deleteRegion = (region) => {
            regionStore.deleteRegion(region.id).then(function (response) {
            toaster.success("Region deleted successfully");
            getRegions();
        }).catch(function (error) {
            toaster.error("Error deleting region");
            console.log(error);
        });
    
};

const editClient = (client) => {
    clients.value.forEach(c => c.isEditing = false);
    client.isEditing = true;
};

const update = (client) => {
    client.isEditing = false;
    regionStore.update(client).then(response => {
        toaster.success("Region updated successfully");
        getRegions();
    }).catch(error => {
        toaster.error("Error updating client");
        console.log(error);
    });
};

const deleteRecord = (event, region) => {
    confirm.require({
        target: event.currentTarget,
        message: 'Do you want to delete this region?',
        // icon: 'bx bx-trash text-danger',
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
            //do nothing
        }
    });
};


const vFocus = {
    mounted: (el) => el.focus()
};
let regionName = ref('');
const openModal = (pos,region) => {
    if(region) {
        regionName.value = region.name;
    }
    position.value = pos;
    visible.value = true;
    regionalManagerForm.region = region.id;
}


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
                                                                <a  @click="openModal('top',region)" href="javascript:;" class="ms-3">
                                                                    <i class='bx bx-user text-success'></i>
                                                                </a>
                                                                <a @click="deleteRecord($event,region)" href="javascript:;" class="ms-3">
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
                                                    <input v-model="form.name" type="text" class="form-control" id="input1" />
                                                    <div class="input-errors" v-for="error of v$.name.$errors" :key="error.$uid">
                                                        <div class="text-danger">Region name is required</div>
                                                    </div>
                                                </div>
                                                
                                                
                                            </form>
                                            <div class="ms-auto mt-4">
                                                <a @click="createRegion" href="javascript:;" class="w-100 btn maz-gradient-btn radius-30 mt-2 mt-lg-0">
                                                    <i class="bx bxs-plus-square"></i>Create
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
        <Dialog v-model:visible="visible" modal :header="`Add ${regionName} Regional Manager`" :style="{ width: '25rem' }">
            <form @submit.prevent="submitRegionalManager" class="row g-3">
                <div class="col-md-12">
                    <div class="card my-card flex justify-center">
                        <label for="input1" class="form-label">Regional Manager</label>
                        <Select v-model="regionalManager" @change="onRegManagerChange($event)" :options="regionalManagers" showClear  optionLabel="name" placeholder="Select Regional Manager" class="w-full md:w-56" />
                          
                </div>                        
                </div>
                <div class="mt-4">
                    <button type="submit" class="btn maz-gradient-btn w-100">{{ isEdit ? 'Update' : 'Submit' }}</button>
                </div>
                
            </form>
        </Dialog>
    </Layout>
</template>

<style scoped>
.mt-4 {
    margin-top: 1rem;
}
.no-border-input {
    border: none;
	color: #000;
    outline: none;
	background: #fff
}

.card {
    padding-top: 10px !important;
    padding: 0px
}
.p-button {
    width: 25rem !important;
}

.text-danger {
    color: red;
}
</style>

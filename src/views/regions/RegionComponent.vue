
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
import { useWarehouse } from '@/stores/warehouse';
import { useStaff } from '@/stores/staff';
import SplitButton from 'primevue/splitbutton';
import InputText from 'primevue/inputtext';
import Avatar from 'primevue/avatar';
import Column from '@/components/general/Column.vue';
import CardBody from '@/components/general/CardBody.vue';
import Row from '@/components/general/Row.vue';
import Card from '@/components/general/Card.vue';
import Button from '@/components/buttons/Button.vue';
import SearchInput from '@/components/form-components/SearchInput.vue';
import InputLabel from '@/components/form-components/InputLabel.vue';
import Input from '@/components/form-components/Input.vue';
import InputError from '@/components/form-components/InputError.vue';
import Spinner from '@/components/buttons/Spinner.vue';

const toaster = useToaster();
const regionStore = useRegion();
const warehouseStore = useWarehouse();
const addRegion = ref(false);
const userStore = useUserStore();
const staff = useStaff();

let clients = ref([]);
const regions = ref([...regionStore.allRegions]);
let staffMembers = ref([]);
const visible = ref(false);
const position = ref('top');
const regionalManager = ref(null);
const regionalManagers = ref([]);
const loading = ref(false);
let searchInput = ref('');
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
        regionStore.setAllRegions(response.data.content);
        regions.value = [...regionStore.allRegions]; 
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

const deleteRecord = (region) => {
        if(!window.confirm("Are you sure you want to delete this region?")){ return}
        deleteRegion(region);
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

const warehouseVisible = ref(false);
const warehouseForm = reactive({
    name: '',
    zipCode: null,
    region: null

});

const warehouseRules = { 
    name: { required },
    streetAddress: { required },
    zipCode: { required },
    // region: { required },
};
const warehouseV$ = useVuelidate(warehouseRules, warehouseForm);

const openWarehouseModal = (region) => {
    if (region) {
        regionName.value = region.name;
        warehouseForm.region = region.id;
    }
    warehouseVisible.value = true;
};


const onInput = () => {
  if (searchInput.value) {
    const searchTerm = searchInput.value.toLowerCase();
    regions.value = regions.value.filter((region) => {
     
      const name = region.name?.toLowerCase() || '';
      const firstName = region.firstName?.toLowerCase() || '';
      const lastName = region.lastName?.toLowerCase() || '';

     
      return (
        name.includes(searchTerm) ||
        firstName.includes(searchTerm) ||
        lastName.includes(searchTerm)
      );
    });
  } else {
    regions.value = [...regionStore.allRegions];
  }
};



const onWarehouseSubmit = async () => {
    try {
        const isFormValid = await warehouseV$.value.$validate();
    if (!isFormValid) {
        loading.value = false; 
        return;
    }
 
        await warehouseStore.submit(warehouseForm);
        toaster.success("Warehouse added successfully");
        warehouseForm.name = '';
        warehouseForm.streetAddress = null;
        warehouseForm.zipCode = null;
        warehouseV$.value.$errors = [];
        warehouseV$.value.$reset();
        warehouseVisible.value = false;
        await getRegions();
    } catch (error) {
        toaster.error("Error adding warehouse");
        console.log(error);
    }
};

const items = (region) => [
    {
        label: 'Edit',
        icon: 'bx bx-show fs-4 text-white',
        command: () => {
            openModal('top', region)
        }
    },
	{
        label: 'Assign Regional Manager',
        icon: 'bx bx-user fs-4 text-white',
        command: () => {
            openModal('top', region)
        }
    },
    {
        label: 'Add Warehouse',
        icon: 'bx bx-building-house fs-4 text-white',
        command: () => {
            openWarehouseModal(region)
        }
    },
    {
        label: 'Delete',
        icon: 'bx bx-trash text-danger fs-4 ',
        command: () => {
            deleteRecord(region)
        }
    }
];
</script>

<template>
                <Card>
                    <CardBody>
                        <Row>
                            <Column class="col-8">
                                <Card>
                                    <CardBody>
                                        <Row classes=" align-items-center">
                                            <Column class="col-lg-3 col-xl-2">
                                                <Button @click="addRegion=true" classes="btn mb-3 maz-gradient-btn mb-lg-0" type="button">
                                                    <template #content>
                                                    Add Region
                                                    </template>									  
                                                  </Button>
                                            </Column>
                                            <Column class="col-lg-9 col-xl-10">
                                                <div class="float-lg-end">
                                                    <Row classes="row-cols-lg-2 row-cols-xl-auto g-2">
                                                        <Column classes="col">
                                                            <div class="position-relative">
                                                                <SearchInput 
                                                                placeholder="Search" 
                                                                id="searchInput"
                                                                v-model="searchInput" classes="form-control ps-5" type="search">
                                                                <template #search>
                                                                <span class="position-absolute top-50 product-show translate-middle-y">
                                                                    <i class="bx bx-search"></i>
                                                                </span>
                                                                 </template>
                                                              </SearchInput>
                                                            </div>
                                                        </Column>
                                                        <Column classes="col">
                                                            <div class="btn-group" role="group" aria-label="Button group with nested dropdown">
                                                                <button type="button" class="btn btn-white">Sort By</button>
                                                                <div class="btn-group" role="group">
                                                                  <button id="btnGroupDrop1" type="button" class="btn btn-white dropdown-toggle dropdown-toggle-nocaret px-1" data-bs-toggle="dropdown" aria-expanded="false">
                                                                    <i class="bx bx-chevron-down"></i>
                                                                  </button>
                                                                  <ul class="dropdown-menu" aria-labelledby="btnGroupDrop1">
                                                                    <li><a class="dropdown-item" href="#">Date</a></li>
                                                                    <li><a class="dropdown-item" href="#">A-Z</a></li>
                                                                  </ul>
                                                                </div>
                                                              </div>
                                                        </Column>
                                                    </Row>
                                                </div>
                                            </Column>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Column>
                            <Column class="col-8 col-lg-8 col-xl-8 d-flex">
                                <div class=" radius-10 w-100">
                                    <div>
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
                                                        <td>
                                                            <Avatar 
                                                            :label="region?.numberOfWarehouses ? region?.numberOfWarehouses : '0'" 
                                                            class="mr-2" 
                                                            :style="{ background: clientColorStyles?.background }" 
                                                            size="" shape="circle" />
                                                        </td>
                                                        <td v-if="!region.isEditing">{{ region.name }}</td>
                                                        <td v-else>
                                                            <input v-focus type="text" v-model="region.name" @blur="update(region)" @keyup.enter="update(region)" class="form-control no-border-input"/>
                                                        </td>
                                                        <td>
                                                            {{ region.firstName ? region.firstName + ' ' + region.lastName : '' }}
                                                        </td>
                                                        <td>

                                                            <SplitButton v-if="!region.isEditing" @click="editClient(region)" class="text-white" label="Edit" 
													icon="bx bx-cog fs-4" 
													dropdownIcon="text-white fs-4 bx bx-chevron-down" 
													:model="items(region)"/>
                                                    <button v-else @click="update(region)" class="btn btn-sm maz-gradient-btn" type="button">
                                                        <i class='bx bx-check text-success'></i>
                                                    </button>                                                            
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
                            </Column>
                            <Column class="col-4 col-lg-4 col-xl-4 d-flex">
                                <div class=" w-100 radius-10">
                                   yesssss
                                </div>
                            </Column>
                        </Row>
                    </CardBody>
                </Card>

                <Dialog v-model:visible="addRegion" position="top" modal :header="`Add Region`" :style="{ width: '30rem' }">
                    <CardBody>
                        <Column classes="col-md-12">
                            <InputLabel labelText="Region Name" classes="form-label" htmlFor="name"/>
                            <Input v-model="form.name" type="text" classes="form-control" id="name" placeholder="" />
                            <InputError classes="input-errors" :errors="v$.name.$errors" message="Region Name is required" />
                          </Column>

                            <div class="ms-auto mt-4">

                                <Button @click="createRegion" classes="w-100 btn maz-gradient-btn radius-30 mt-2 mt-lg-0" type="button" :disabled="loading">
                                    <template #content>
                                        {{ loading ?  '' : 'Create' }}
                                    </template>									  
                                    <Spinner v-if="loading" class="spinner-border spinner-border-sm" />
                                  </Button>
                            </div>
                    </CardBody>
                </Dialog>
            
        <Dialog v-model:visible="visible" position="top" modal :header="`Add ${regionName} Regional Manager`" :style="{ width: '30rem' }">
            <!-- <form @submit.prevent="submitRegionalManager" class="row g-3"> -->
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
          
            <!-- </form> -->
        </Dialog>
        <Dialog v-model:visible="warehouseVisible" position="top" modal header="Add Warehouse" style="width: 26rem">
               
            <form @submit.prevent="onWarehouseSubmit" class="row">
                
                <div class="col-md-12">
                    <div class="card my-card flex justify-center">
                        <label for="input1" class="form-label">Name</label>
                           <InputText type="text" v-model="warehouseForm.name" />
                           <div class="input-errors" v-for="error of warehouseV$.name.$errors" :key="error.$uid">
                           <div class="text-danger">Warehouse name is required</div>
                    </div>
                </div>                        
                </div>
                <div class="col-md-12">
                    <div class="card my-card flex justify-center">
                        <label for="input1" class="form-label">Street address</label>
                           <InputText type="text" v-model="warehouseForm.streetAddress" />
                           <div class="input-errors" v-for="error of warehouseV$.streetAddress.$errors" :key="error.$uid">
                           <div class="text-danger">Street address is required</div>
                        </div>
                </div>                        
                </div>
                


                <div class="col-md-12">
                    <div class="card my-card flex justify-center">
                        <label for="input1" class="form-label">Zip Code</label>
                           <InputText type="text" v-model="warehouseForm.zipCode" />
                           <div class="input-errors" v-for="error of warehouseV$.zipCode.$errors" :key="error.$uid">
                           <div class="text-danger">Zip Code is required</div>
                        </div>
                </div>                        
                </div>
                <div class="modal-footer">
                    <button type="submit" class="btn maz-gradient-btn w-100" :disabled="loading">
        <div v-if="loading" class="spinner-border text-white" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
        Submit
    </button>
                </div>
                
            </form>
        </Dialog>
</template>

<style scoped>
.table td {
    vertical-align: middle;
}
</style>


<script setup>
import { onMounted, ref, reactive } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { email, maxValue, numeric, required } from '@vuelidate/validators';
import Layout from '@/views/shared/Layout.vue';
import BreadCrumb from '@/components/BreadCrumb.vue';
import useToaster from '@/composables/useToaster';
import { useClientStore } from '@/stores/useClient';
import { useConfirm } from "primevue/useconfirm";
import ColorPicker from 'primevue/colorpicker';
import router from "@/router";
import SplitButton from 'primevue/splitbutton';
import Dialog from 'primevue/dialog';
import Badge from 'primevue/badge';
import Paginator from 'primevue/paginator';

const toaster = useToaster();
const clientStore = useClientStore();
const confirm = useConfirm();

let clients = ref([]);
const paginatedClients = ref([]);

const rowsPerPage = ref(10); // Rows per page
const totalRecords = ref(0); // Total number of records
const currentPage = ref(1); // Current page


let showLoading = ref(false);
let loading = ref(false);  
let searchInput = ref('');

const form = reactive({ 
  name: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  role: 'CLIENT',
  color: ''
});
onMounted(() => {
  getAllClients();
});

const rules = { 
  name: { required },
  firstName: { required },
  lastName: { required },
  email: { required, email },
  phone: { required, numeric, maxValue: 10 },
  color: { required }
};
const v$ = useVuelidate(rules, form);

const createClient = async () => {
  const isFormValid = await v$.value.$validate();
  if (!isFormValid) {
    return;
  }
  loading.value = true;  
  clientStore.submitClient(form).then(function (response) {
    loading.value = false;
    toaster.success("Client created successfully");
    getAllClients();
    form.name = ''; 
    form.firstName = '';
    form.lastName = '';
    form.email = '';
    form.phone = '';
    form.color = '';
	v$.value.$errors = [];
	v$.value.$reset();
  }).catch(function (error) {
    toaster.error("Error creating client");
    console.log(error);
    loading.value = false;
  }).finally(() => {
    loading.value = false; 
  });
};

const getAllClients = () => {
  showLoading.value = true;
  clientStore.getClients().then(function (response) {
    showLoading.value = false;
    clients.value = response.data.content.map(client => ({ ...client, isEditing: false }));
    totalRecords.value = clients.value.length;
    updatePaginatedClients();
  }).catch(function (error) {
    toaster.error("Error fetching users");
    console.log(error);
  }).finally(function () {
    showLoading.value = false;
  });
};

const onPageChange = (event) => {
  currentPage.value = event.page + 1; // PrimeVue Paginator is zero-based, so we add 1
  rowsPerPage.value = event.rows;
  updatePaginatedClients();
};

const updatePaginatedClients = () => {
  const start = (currentPage.value - 1) * rowsPerPage.value;
  const end = start + rowsPerPage.value;
  paginatedClients.value = clients.value.slice(start, end);
};

const deleteClient = (client) => {
  if(!window.confirm("Are you sure you want to delete this client?")){ return; }
  clientStore.deleteClient(client.id).then(function (response) {
    toaster.success("Client deleted successfully");
    getAllClients();
  }).catch(function (error) {
    toaster.error("Error deleting client");
    console.log(error);
  });
};


const onInput = () => {
  if (searchInput.value) {
    const searchTerm = searchInput.value.toLowerCase();
    paginatedClients.value = clients.value.filter((client) => {
      const name = client.name?.toLowerCase() || '';
      return (
        name.includes(searchTerm) 
      );
    });
  } else {
    getAllClients(); 
  }
};


const redirectToCampaign = (client) => {
  router.push({ 
    path: '/campaigns', 
    query: { client: client.id } // Add query parameter properly
  });
};

const viewContacts = (client) => {
  router.push({ 
    path: '/manage-contacts', 
    query: { client: client.id } // Add query parameter properly
  });
};
const viewedClient = ref(null);
const visible = ref(false);

const editForm = reactive({ 
  name: '',
  color: '#007bff'
});
onMounted(() => {
  getAllClients();
});

const editRules = { 
  name: { required },
  color: { required }
};
const vEdit$ = useVuelidate(editRules, editForm);

const openModal = (client) => {
    visible.value = true;
    viewedClient.value = client;
    editForm.id = client.id;
    editForm.name= client.name;
    editForm.firstName = client?.users[0]?.firstName;
    editForm.lastName = client?.users[0]?.lastName;
    editForm.email = client?.users[0]?.email;
    editForm.phone = client?.users[0]?.phone;
    editForm.role = client?.users[0]?.role;
    editForm.color = client.color;
};

const updateClient = () => {
  loading.value = true;
  clientStore.updateClient(editForm.id,editForm).then(response => {
    loading.value = false;
    toaster.success("Client updated successfully");
    getAllClients(); // Refetch clients after updating
    visible.value = false;
  }).catch(error => {
    toaster.error("Error updating client");
    loading.value = false;
    console.log(error);
  });
};

const items = (client) => [
    {
        label: 'Edit',
        icon: 'bx bxs-edit fs-4 maz-gradient-txt',
        command: () => {
          openModal(client)
        }
    },
	{
        label: 'View Contacts',
        icon: 'bx bx-user fs-4 maz-gradient-txt',
        command: () => {
            viewContacts(client)
        }
    },
    {
        label: 'View Campaign',
        icon: 'bx bx-building-house fs-4 maz-gradient-txt',
        command: () => {
          localStorage.removeItem('clientColor');
          localStorage.setItem('clientColor', JSON.stringify(client));
          redirectToCampaign(client)
        }
    },
    {
        label: 'Delete',
        icon: 'bx bx-trash text-danger fs-4 ',
        command: () => {
          deleteClient(client)
        }
    }
];

</script>

<template>
  <Layout>
    <div class="page-wrapper">
      <div class="page-content">
        <BreadCrumb title="Clients" icon="bx bx-user-circle"/>
        <div class="card">

         
          <div class="card-body">
            
            <div class="row">
             <div class="row p">
              <div class="col-8 col-lg-8 col-xl-8 pl-5 d-flex ">
                <!-- <button class="btn rounded-0 btn-primary">+ New</button> -->

                <div class="position-relative mb-3">
                  <input
                    v-model="searchInput"
                    @input="onInput"
                    type="text"
                    class="form-control ps-5 ml-4"
                    placeholder="Search"
                  />
                  <span
                    class="position-absolute top-50 product-show translate-middle-y"
                  >
                    <i class="bx bx-search"></i>
                  </span>
                </div>
              </div>
             </div>
              <div class="col-8 col-lg-8 col-xl-8 d-flex">
                <div class="radius-10 w-100">
                  <div class="card-body">
                    <div class="table-responsive">
                      <table class="table mb-0">
                        <thead class="table-light">
                          <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Person Responsible</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-if="paginatedClients.length > 0" v-for="(client, index) in paginatedClients" :key="client.id">
                            <td> <Badge :value="index + 1 " size="large" :style="{'background-color': '#'+ client.color}" ></Badge></td>
                            <td>{{ client.name }}</td>
                            <td>{{ 
                              client?.users?.length > 0 ? client?.users[0]?.firstName + ' ' + client?.users[0]?.lastName : ''
                             }}</td>
                            <td>
                              <div class="d-flex order-actions">
                                <SplitButton class="text-white" label="" 
                                icon="bx bx-cog fs-4" 
                                dropdownIcon="text-white fs-4 bx bx-chevron-down" 
                                :model="items(client)"/>
                              </div>
                            </td>
                          </tr>
                          <tr v-else>
                            <td colspan="7" class="text-center text-danger">No clients found</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div class="card mt-4">
                      <Paginator v-if="totalRecords> 0"
                        :first="(currentPage - 1) * rowsPerPage"
                        :rows="rowsPerPage"
                        :totalRecords="totalRecords"
                        :rowsPerPageOptions="[10, 20, 30]"
                        @page="onPageChange"
                      ></Paginator>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-4 col-lg-4 col-xl-4 d-flex">
                <div class=" w-100 radius-10">
                  <div class="card-body">
                    <div class="table-responsive">
                      <div class="position-relative">
                        <label for="input1" class="form-label">Client Name</label>
                        <input v-model="form.name" type="text" class="form-control ps-3 ">
                        <div class="input-errors" v-for="error of v$.name.$errors" :key="error.$uid">
                          <div class="text-danger">Client Name is required</div>
                        </div>
                      </div>
                      <div class="row mt-3">
                        <div class="col-12 mt-2">
                          <div class="position-relative">
                            <label for="input1" class="form-label">First Name</label>
                            <input v-model="form.firstName" type="text" class="form-control ps-3 ">
                            <div class="input-errors" v-for="error of v$.firstName.$errors" :key="error.$uid">
                              <div class="text-danger">First name is required</div>
                            </div>
                          </div>
                        </div>
                        <div class="col-12 mt-2">
                          <div class="position-relative">
                            <label for="input1" class="form-label">Last Name</label>
                            <input v-model="form.lastName" type="text" class="form-control ps-3 ">
                            <div class="input-errors" v-for="error of v$.lastName.$errors" :key="error.$uid">
                              <div class="text-danger">Last name is required</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="row mt-3">
                        <div class="col-12 mt-2">
                          <div class="position-relative">
                            <label for="input1" class="form-label">Phone Number</label>
                            <input v-model="form.phone" type="text" class="form-control ps-3 ">
                            <div class="input-errors" v-for="error of v$.phone.$errors" :key="error.$uid">
                              <div class="text-danger">Phone is required</div>
                            </div>
                          </div>
                        </div>
                        <div class="col-12 mt-2">
                          <div class="position-relative">
                            <label for="input1" class="form-label">Email</label>
                            <input v-model="form.email" type="email" class="form-control ps-3 ">
                            <div class="input-errors" v-for="error of v$.email.$errors" :key="error.$uid">
                              <div class="text-danger">Email is required</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="row mt-3">
                        <div class="col-12">
                          <div class="color-picker-container">
                            <ColorPicker v-model="form.color" inline class="w-100" />
                            <div class="input-errors" v-for="error of v$.color.$errors" :key="error.$uid">
                              <div class="text-danger">Client color is required</div>
                            </div>
                        </div>
                        </div>
                        <span class="badge" :style="`color: #fff; background-color: #${form.color}`">Sample Background</span>
                      </div>

                    
                      <div class="ms-auto mt-6">
                        <button @click="createClient" type="button" class="w-100 btn maz-gradient-btn mt-2 mt-lg-0" :disabled="loading">
                          <span v-if="loading">Creating...</span>
                          <span v-else>Create Client</span>
                        </button>
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
    <Dialog v-model:visible="visible" position="top" modal header="Edit Client" :style="{ width: '40rem' }">
             
      <div class="row g-3">
        <div class="card-body">
          <div class="table-responsive">
            <div class="position-relative">
              <label for="input1" class="form-label">Client Name</label>
              <input v-model="editForm.name" type="text" class="form-control ps-3 ">
              <div class="input-errors" v-for="error of v$.name.$errors" :key="error.$uid">
                <div class="text-danger">Client Name is required</div>
              </div>
            </div>
            <div class="row mt-3">
              <div class="col-12">
                <div class="flex justify-center">
                  <ColorPicker v-model="editForm.color" inline />
                  <div class="input-errors" v-for="error of v$.color.$errors" :key="error.$uid">
                    <div class="text-danger">Client color is required</div>
                  </div>
              </div>
              </div>
              <span class="badge" :style="`color: #fff; background-color: #${editForm.color}`">Sample Background</span>
            </div>

          
            <div class="ms-auto mt-6">
              <button @click="updateClient" type="button" class="w-100 btn maz-gradient-btn mt-2 mt-lg-0" :disabled="loading">
                <span v-if="loading">Updating...</span>
                <span v-else>Update Client</span>
              </button>
            </div>
          </div>
        </div>
      </div>

</Dialog>
  </Layout>
</template>

<style scoped>
.mt-6 {
  margin-top: 2rem;
}
.no-border-input {
  border: none;
  outline: none;
}




</style>

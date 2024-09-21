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

const toaster = useToaster();
const clientStore = useClientStore();
const confirm = useConfirm();

let clients = ref([]);
let showLoading = ref(false);
let loading = ref(false);  
let searchInput = ref('');

const form = reactive({ 
  name: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  color: '#007bff'
});
onMounted(() => {
  getAllClients();
});

const rules = { 
  name: { required },
  firstName: { required },
  lastName: { required },
  email: { required, email },
  phone: { required, numeric, maxValue: 10 }
};
const v$ = useVuelidate(rules, form);

const createClient = async () => {
  const isFormValid = await v$.value.$validate();
  if (!isFormValid) {
    return;
  }
  loading.value = true;  
  clientStore.submitClient(form).then(function (response) {
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
  }).finally(() => {
    loading.value = false; 
  });
};

const getAllClients = () => {
  showLoading.value = true;
  clientStore.getClients().then(function (response) {
    showLoading.value = false;
    clients.value = response.data.content.map(client => ({ ...client, isEditing: false }));
  }).catch(function (error) {
    toaster.error("Error fetching users");
    console.log(error);
  }).finally(function () {
    showLoading.value = false;
  });
};

const deleteClient = (client) => {
  clientStore.deleteClient(client.id).then(function (response) {
    toaster.success("Client deleted successfully");
    getAllClients();
  }).catch(function (error) {
    toaster.error("Error deleting client");
    console.log(error);
  });
};

const editClient = (client) => {
  clients.value.forEach(c => c.isEditing = false); // Ensure only one edit at a time
  client.isEditing = true;
};

const updateClient = (client) => {
  client.isEditing = false;
  clientStore.updateClient(client).then(response => {
    toaster.success("Client updated successfully");
    getAllClients(); // Refetch clients after updating
  }).catch(error => {
    toaster.error("Error updating client");
    console.log(error);
  });
};

const deleteRecord = (event, client) => {
  confirm.require({
    target: event.currentTarget,
    message: 'Do you want to delete this client?',
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
      deleteClient(client);
    },
    reject: () => {
      // do nothing
    }
  });
};

const vFocus = {
  mounted: (el) => el.focus()
};






const onInput = () => {
  if (searchInput.value) {
    const searchTerm = searchInput.value.toLowerCase();
    clients.value = clients.value.filter((client) => {
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
              <div class="col-9 col-lg-9 col-xl-9 d-flex">
                <div class="radius-10 w-100">
                  <div class="card-body">
                    <div class="table-responsive">
                      <table class="table mb-0">
                        <thead class="table-light">
                          <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Person Responsible</th>
                            <th>View Campaign</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-if="clients.length > 0" v-for="(client, index) in clients" :key="client.id">
                            <td>{{ index + 1 }}</td>
                            <td v-if="!client.isEditing">{{ client.name }}</td>
                            <td v-else>
                              <input v-focus type="text" v-model="client.name" @blur="updateClient(client)" @keyup.enter="updateClient(client)" class="no-border-input"/>
                            </td>
                            <td>Mazisi</td>
                            <td>
                              <button @click="redirectToCampaign(client)" v-tooltip.bottom="'View Campaign'" type="button" class="btn maz-gradient-btn">
                                View Campaign
                              </button>
                            </td>
                            <td>
                              <div class="d-flex order-actions">
                                <a v-if="!client.isEditing" @click="editClient(client)" href="javascript:;">
                                  <i class='bx bxs-edit' v-tooltip.bottom="'Edit'"></i>
                                </a>
                                <a v-else @click="updateClient(client)" href="javascript:;" class="ms-3">
                                  <i class='bx bx-check text-success'></i>
                                </a>
                                <a @click="deleteRecord($event,client)" href="javascript:;" class="ms-3">
                                  <i class='bx bxs-trash text-danger' v-tooltip.bottom="'Delete'"></i>
                                </a>
                                <ConfirmPopup></ConfirmPopup>
                              </div>
                            </td>
                          </tr>
                          <tr v-else>
                            <td colspan="7" class="text-center text-danger">No clients found</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-3 col-lg-3 col-xl-3 d-flex">
                <div class=" w-100 radius-10">
                  <div class="card-body">
                    <div class="table-responsive">
                      <div class="position-relative">
                        <label for="input1" class="form-label">Client Name</label>
                        <input v-model="form.name" @input="onInput" type="text" class="form-control ps-3 ">
                        <div class="input-errors" v-for="error of v$.name.$errors" :key="error.$uid">
                          <div class="text-danger">Client Name is required</div>
                        </div>
                      </div>
                      <div class="row mt-3">
                        <div class="col-12 mt-2">
                          <div class="position-relative">
                            <label for="input1" class="form-label">First Name</label>
                            <input v-model="form.firstName" @input="onInput" type="text" class="form-control ps-3 ">
                            <div class="input-errors" v-for="error of v$.firstName.$errors" :key="error.$uid">
                              <div class="text-danger">First name is required</div>
                            </div>
                          </div>
                        </div>
                        <div class="col-12 mt-2">
                          <div class="position-relative">
                            <label for="input1" class="form-label">Last Name</label>
                            <input v-model="form.lastName" @input="onInput" type="text" class="form-control ps-3 ">
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
                            <input v-model="form.phone" @input="onInput" type="text" class="form-control ps-3 ">
                            <div class="input-errors" v-for="error of v$.phone.$errors" :key="error.$uid">
                              <div class="text-danger">Phone is required</div>
                            </div>
                          </div>
                        </div>
                        <div class="col-12 mt-2">
                          <div class="position-relative">
                            <label for="input1" class="form-label">Email</label>
                            <input v-model="form.email" @input="onInput" type="email" class="form-control ps-3 ">
                            <div class="input-errors" v-for="error of v$.email.$errors" :key="error.$uid">
                              <div class="text-danger">Email is required</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="row mt-3">
                        <div class="col-12">
                          <div class="flex justify-center">
                            <ColorPicker v-model="form.color" inline />
                        </div>
                        </div>
                        <span class="badge" :style="`color: #fff; background-color: #${form.color}`">Sample Background</span>
                      </div>

                    
                      <div class="ms-auto mt-6">
                        <a @click="createClient" href="javascript:;" class="w-100 btn maz-gradient-btn mt-2 mt-lg-0" :disabled="loading">
                          <i class="bx bxs-plus-square"></i>
                          <span v-if="loading">Creating...</span>
                          <span v-else>Create Client</span>
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

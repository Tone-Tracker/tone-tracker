<script setup>
import { onMounted, ref, reactive } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import Layout from '@/views/shared/Layout.vue';
import BreadCrumb from '@/components/BreadCrumb.vue';
import useToaster from '@/composables/useToaster';
import { useClientStore } from '@/stores/useClient';
import { useConfirm } from "primevue/useconfirm";



const toaster = useToaster();
const clientStore = useClientStore();
const confirm = useConfirm();

let clients = ref([]);
let showLoading = ref(false);

const form = reactive({ name: '' });
onMounted(() => {
  getAllClients();
})

const rules = { name: { required } }
const v$ = useVuelidate(rules, form)

const createClient = async () => {
	const isFormValid = await v$.value.$validate();
	if (!isFormValid) {
		return
	}
  clientStore.submitClient(form).then(function (response) {
    toaster.success("Client created successfully");
	getAllClients();
  }).catch(function (error) {
    toaster.error("Error creating client");
    console.log(error);
  })
}

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
  })
}

const deleteClient = (client) => {
  if (confirm(`Are you sure you want to delete ${client.name}?`)) {
      clientStore.deleteClient(client.id).then(function (response) {
      toaster.success("Client deleted successfully");
      getAllClients(); 
    }).catch(function (error) {
      toaster.error("Error deleting client");
      console.log(error);
    })
  }
}

const editClient = (client) => {
  clients.value.forEach(c => c.isEditing = false); // Ensure only one edit at a time
  client.isEditing = true;
}

const updateClient = (client) => {
  client.isEditing = false;
   clientStore.updateClient(client).then(response => {
    toaster.success("Client updated successfully");
    getAllClients(); // Refetch clients after updating
  }).catch(error => {
    toaster.error("Error updating client");
    console.log(error);
  })
}


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
}

</script>
<template>
	<Layout>
	  <div class="page-wrapper">
		<div class="page-content">
		  <BreadCrumb title="Clients" icon="" />
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
							  <th>Name</th>
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
							  <td>

								<button type="button" class="btn btn-primary">
									<RouterLink :to="`/campaigns?client=${client.id}`">View Campaign</RouterLink>
									 <!-- <span class="badge bg-dark">4</span> -->
								</button>
								
								</td>
							  <td>
								<div class="d-flex order-actions">
								  <a v-if="!client.isEditing" @click="editClient(client)" href="javascript:;">
									<i class='bx bxs-edit'></i>
								  </a>
								  <a v-else @click="updateClient(client)" href="javascript:;" class="ms-3">
									<i class='bx bx-check text-success'></i>
								  </a>
								  <a @click="deleteRecord($event,client)" href="javascript:;" class="ms-3">
									<i class='bx bxs-trash'></i>
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
				<div class="col-4 col-lg-4 col-xl-4 d-flex">
				  <div class="card w-100 radius-10">
					<div class="card-body">
					  <div class="table-responsive">
						<div class="position-relative">
						  <input v-model="form.name" @input="onInput" type="text" class="form-control ps-5 " placeholder="Client Name">
						  <div class="input-errors" v-for="error of v$.name.$errors" :key="error.$uid">
							<div class="text-danger">Client Name is required</div>
						  </div>
						</div>
						<div class="ms-auto mt-6">
						  <a @click="createClient" href="javascript:;" class="w-100 btn maz-gradient-btn  mt-2 mt-lg-0">
							<i class="bx bxs-plus-square"></i>Create Client
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
.mt-6{
	margin-top: 2rem;
}
.no-border-input {
    border: none;
    outline: none;
}

</style>
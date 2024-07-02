<script setup>
import { onMounted, ref, reactive } from 'vue';
import MultiSelect from 'primevue/multiselect';
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import Layout from '@/views/shared/Layout.vue';
import BreadCrumb from '@/components/BreadCrumb.vue';
import useToaster from '@/composables/useToaster';
import { useCampaignStore } from '@/stores/useCampaign';


const cities = ref([
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
]);
const selectedCities = ref();


const toaster = useToaster();
const campaignStore = useCampaignStore();
let clients = ref([]);
let showLoading = ref(false);

const form = reactive(
	{ name: '' },
	{client_id: ''}
);
onMounted(() => {
  getAllClients();
})

const rules = { 
	name: { required },
	client_id: { required }
}
const v$ = useVuelidate(rules, form)

const createClient = async () => {
	const isFormValid = await v$.value.$validate();
	if (!isFormValid) {
		return
	}
  campaignStore.submitClient(form).then(function (response) {
    toaster.success("Campaign created successfully");
	getAllClients();
  }).catch(function (error) {
    toaster.error("Error creating campaign");
    console.log(error);
  })
}

const getAllClients = () => {
  showLoading.value = true;
  campaignStore.getClients().then(function (response) {
    showLoading.value = false;
    clients.value = response.data.content.map(client => ({ ...client, isEditing: false }));
  }).catch(function (error) {
    toaster.error("Error fetching campaigns");
    console.log(error);
  }).finally(function () {
    showLoading.value = false;
  })
}

const deleteClient = (client) => {
  if (confirm(`Are you sure you want to delete ${client.name}?`)) {
      campaignStore.deleteClient(client.id).then(function (response) {
      toaster.success("Campaign deleted successfully");
      getAllClients(); 
    }).catch(function (error) {
      toaster.error("Error deleting campaign");
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
   campaignStore.updateClient(client).then(response => {
    toaster.success("Campaign updated successfully");
    getAllClients();
  }).catch(error => {
    toaster.error("Error updating client");
    console.log(error);
  })
}

const vFocus = {
  mounted: (el) => el.focus()
}

</script>
<template>
	<Layout>
	  <div class="page-wrapper">
		<div class="page-content">
		  <BreadCrumb title="Campaigns" icon="" />
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
							  <th>Campaign Name</th>
							  <th>Client Name</th>
							  <th>Action</th>
							</tr>
						  </thead>
						  <tbody>
							<tr v-if="clients" v-for="(client, index) in clients" :key="client.id">
							  <td>{{ index + 1 }}</td>
							  <td v-if="!client.isEditing">{{ client.name }}</td>
							  <td v-else>
								<input v-focus type="text" v-model="client.name" @blur="updateClient(client)" @keyup.enter="updateClient(client)" class="no-border-input"/>
							  </td>
							  <td></td>
							  <td>
								<div class="d-flex order-actions">
								  <a v-if="!client.isEditing" @click="editClient(client)" href="javascript:;">
									<i class='bx bxs-edit'></i>
								  </a>
								  <a v-else @click="updateClient(client)" href="javascript:;" class="ms-3">
									<i class='bx bx-check text-success'></i>
								  </a>
								  <a @click="deleteClient(client)" href="javascript:;" class="ms-3">
									<i class='bx bxs-trash'></i>
								  </a>
								</div>
							  </td>
							</tr>
							<tr v-else>
							  <td></td>
							  <td></td>
							  <td></td>
							  <td colspan="7" class="text-center"></td>
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
								<label for="input1" class="form-label">Campaign Name</label>
								<input v-model="form.name" type="text" class="form-control" id="input1" />
								<div class="input-errors" v-for="error of v$.client_id.$errors" :key="error.$uid">
									<div class="text-danger">Campaign name is required</div>
								  </div>
							</div>
							<div class="col-md-12">
								<label for="input3" class="form-label">Choose Client</label>
								<input v-model="form.client_id" type="text" class="form-control" id="input3" />
								<div class="input-errors" v-for="error of v$.client_id.$errors" :key="error.$uid">
									<div class="text-danger">Client is required</div>
								  </div>
							</div>
							
							<div class="card flex justify-center">
								<MultiSelect v-model="selectedCities" :options="cities" optionLabel="name" filter placeholder="Select Cities"
									:maxSelectedLabels="3" class="w-full md:w-80" />
							</div>
						</form>
						
						<div class="ms-auto mt-4">
						  <a @click="createClient" href="javascript:;" class="w-100 btn maz-gradient-btn radius-30 mt-2 mt-lg-0">
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
.mt-4{
	margin-top: 1rem;
}
.no-border-input {
    border: none;
    outline: none;
}

</style>
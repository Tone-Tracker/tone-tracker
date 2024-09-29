<script setup>
import Layout from '@/views/shared/Layout.vue';
import Checkbox from 'primevue/checkbox';
import BreadCrumb from '@/components/BreadCrumb.vue';
import InputMask from 'primevue/inputmask';
import InputText from 'primevue/inputtext';
import { ref, reactive, onMounted, computed } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { useRoute } from 'vue-router';
import { required, email } from '@vuelidate/validators';
import Dialog from 'primevue/dialog';
import { useUserStore } from '@/stores/userStore';
import { useClientStore } from '@/stores/useClient';
import { useAuth } from '@/stores/auth';

const authoritativeForm = ref(null);
const visible = ref(false);
const type = ref(null);
const loading = ref(null);

const userStore = useUserStore();
const clientStore = useClientStore();

const auth = useAuth();
const route = useRoute();

const currentUser = JSON.parse(auth.user);
const contacts = ref([]);
const authoritativeContacts = ref([]);
const billingContacts = ref([]);
const owners = ref([]);
const clientObj = ref();

const form = reactive({
	lastName: '',
	firstName: '',
	phone: '',
	email: '',
	role: 'CLIENT',
	type: '',
	password: 'TT_G',
});

// Track selected checkboxes
const selectedAuthoritativeContacts = ref([]);
const selectedBillingContacts = ref([]);

onMounted(() => {
	if (currentUser.role === 'CLIENT') {
		getContacts(currentUser.activeUserId);
	} else {
		getContacts(route.query.client);
	}
});

const getContacts = (clientId) => {
	clientStore
		.getClientByClientId(clientId)
		.then((response) => {
			clientObj.value = response.data;
			contacts.value = response.data?.users;
			owners.value = contacts.value?.filter((contact) => contact.duty === 'OWNER');
			authoritativeContacts.value = contacts.value?.filter((contact) => contact.duty === 'AUTHORITATIVE');
			billingContacts.value = contacts.value?.filter((contact) => contact.duty === 'BILLING');
		})
		.catch((error) => {});
};

// Computed property to check if any checkbox is selected
const canDeleteAuthoritativeContacts = computed(() => selectedAuthoritativeContacts.value.length > 0);
const canDeleteBillingContacts = computed(() => selectedBillingContacts.value.length > 0);

const showModal = (typeParam) => {
	type.value = typeParam === 'BILLING' ? 'Billing' : 'Authoritative';
	form.type = typeParam;
	visible.value = true;
};

// Function to handle form submission
const handleSubmit = async () => {
	const isFormCorrect = await v$.value.$validate();
	if (!isFormCorrect) return;

	userStore
		.submitContact(form)
		.then(() => {
			toaster.success('Contact added successfully');
			visible.value = false;
		})
		.catch((error) => {
			toaster.error('Error adding contact');
			console.error(error);
		})
		.finally(() => {
			loading.value = false;
		});
};

const deleteSelectedContacts = (type) => {
	if (type === 'AUTHORITATIVE') {
		console.log('Deleting selected authoritative contacts:', selectedAuthoritativeContacts.value);
	} else if (type === 'BILLING') {
		console.log('Deleting selected billing contacts:', selectedBillingContacts.value);
	}
};
</script>

<template>
	<Layout>
		<div class="page-wrapper">
			<div class="page-content">
				<BreadCrumb title="Admin" icon="" />
				<p class="text-white">Manage Contacts</p>
				<div class="card card-color rounded-0 p-5">
					<div class="description">
						<p class="text-white">Below is contact information relating to the account owner, also known as
							the key
							account owner</p>
					</div>

					<div class="card border-card rounded-0">
						<div class="card-header">
							<h5 class="text-white">Account Owner</h5>
						</div>
						<div class="card-body">
							<table class="table table-dark table-borderless">
								<thead>
									<tr>
										<th scope="col"></th>
										<th scope="col border-start-0">Name</th>
										<th scope="col">Phone number</th>
										<th scope="col">Email Address</th>
									</tr>
								</thead>
								<tbody>
									<tr v-if="owners?.length > 0" v-for="owner in owners" :key="owner.id">
										<td><Checkbox  :binary="true" /></td>
										<td>{{ owner?.firstName }} {{ owner?.lastName }}</td>
										<td>{{ owner?.phone }}</td>
										<td class="email"><a :href="`mailto:${owner?.email}`">{{ owner?.email }}</a></td>
									</tr>
									<tr v-else>
										<td colspan="4" class="text-center text-danger">No acount owner found.</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>

					<div class="description">
						<p class="text-white">Below is a listing of additional contacts. You can edit these contacts by
							clicking
							on a contact's
							name</p>
					</div>

					<div class="card border-card rounded-0">
						<div class="card-header d-flex justify-content-between align-items-center">
							<h5 class="text-white">Authoritative Contacts</h5>
							<div class="btn-group gap-2 bulk-actions">
								<button v-if="!canDeleteAuthoritativeContacts" @click="showModal('AUTHORITATIVE')" class="btn btn-secondary rounded-0 btn-sm maz-gradient-btn" type="button">Add</button>
								<button v-if="canDeleteAuthoritativeContacts" @click="deleteSelectedContacts('AUTHORITATIVE')" type="button" class="btn btn-secondary rounded-0 btn- maz-gradient-btn">Delete</button>
							</div>
						</div>
						<div class="card-body">
							<table class="table table-dark table-borderless">
								<thead>
									<tr>
										<th scope="col"></th>
										<th scope="col">Name</th>
										<th scope="col">Phone number</th>
										<th scope="col">Email Address</th>
									</tr>
								</thead>
								<tbody>
									<tr v-if="authoritativeContacts?.length > 0" v-for="contact in authoritativeContacts" :key="contact.id" >
										<td><Checkbox v-model="selectedAuthoritativeContacts" :value="contact.id" /></td>
										<td>{{ contact?.firstName }} {{ contact?.lastName }}</td>
										<td>{{ contact?.phone }}</td>
										<td class="email"><a :href="`mailto:${contact?.email}`">{{ contact?.email }}</a></td>
									</tr>
									<tr v-else>
										<td colspan="12" class="text-center text-danger">No authoritative contacts found</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>

					<div class="card border-card rounded-0">
						<div class="card-header d-flex justify-content-between align-items-center">
							<h5 class="text-white">Billing Contacts</h5>
							<div class="btn-group gap-2">
								<button v-if="!canDeleteBillingContacts" @click="showModal('BILLING')" type="button" class="btn btn-secondary rounded-0 btn-sm maz-gradient-btn">Add</button>
								<button v-if="canDeleteBillingContacts" @click="deleteSelectedContacts('BILLING')" type="button" class="btn btn-secondary rounded-0 btn-sm maz-gradient-btn">Delete</button>
							</div>
						</div>
						<div class="card-body">
							<table class="table table-dark table-borderless">
								<thead>
									<tr>
										<th scope="col"></th>
										<th scope="col">Name</th>
										<th scope="col">Phone number</th>
										<th scope="col">Email Address</th>
									</tr>
								</thead>
								<tbody>
									<tr v-if="billingContacts?.length > 0" v-for="contact in billingContacts" :key="contact.id">
										<td><Checkbox v-model="selectedAuthoritativeContacts" :value="contact.id" /></td>
										<td>{{ contact?.firstName }} {{ contact?.lastName }}</td>
										<td>{{ contact?.phone }}</td>
										<td class="email"><a :href="`mailto:${contact?.email}`">{{ contact?.email }}</a></td>
									</tr>
									<tr v-else>
										<td colspan="4" class="text-center text-danger">No billing contacts found</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
		<Dialog v-model:visible="visible" position="top" modal :header="`Add ${type} Contact`" :style="{ width: '30rem' }">
			<div class="row g-3">
				<div class="col-md-12">
					<label for="name" class="form-label">First Name</label>
					<InputText type="text" v-model="form.firstName" fluid />
					<div class="input-errors" v-for="error of v$.firstName.$errors" :key="error.$uid">
						<div class="text-danger">First Name is required</div>
					  </div>
				  </div>
				  <div class="col-md-12">
					<label for="name" class="form-label">Last Name</label>
					<InputText type="text" v-model="form.lastName" fluid />
					<div class="input-errors" v-for="error of v$.lastName.$errors" :key="error.$uid">
						<div class="text-danger">Last Name is required</div>
					  </div>
				  </div>
				 
				  <div class="col-md-12">
					<div class="">
						<label for="phone" class="form-label" >Phone</label>
						<InputMask id="phone" v-model="form.phone" mask="(999) 999-9999" fluid />
					</div>
					<div class="input-errors" v-for="error of v$.phone.$errors" :key="error.$uid">
						<div class="text-danger">Phone Number is required</div>
					  </div>
				  </div>
				

				  <div class="col-md-12">
					<label for="activation-area" class="form-label">Email</label>
					<InputText type="text" v-model="form.email" fluid />
					<div class="input-errors" v-for="error of v$.email.$errors" :key="error.$uid">
						<div class="text-danger">Email is required</div>
					  </div>
				  </div>
				 
				  <div class="col-12">
					<div class="ms-auto">
						<button @click="handleSubmit" type="button" class="w-100 btn d-flex justify-content-center align-items-center maz-gradient-btn radius-30 mt-lg-0">
							<div v-if="loading" class="spinner-border text-white " role="status"> <span class="visually-hidden">Loading...</span>
							</div>
							{{ loading ?  '' : 'Add Contact' }}
						</button>
					</div>
				  </div>
			  </div>
		</Dialog>
	</Layout>
</template>

<style scoped>
.container {
	margin-top: 50px;
}

.card {
	background-color: #1e1e1e;
	border: none;
	display: block;
	margin-bottom: 20px;
}

.card-header {
	border-bottom: 2px solid #555;
}

.card-body {
	padding: 0;
}

.btn-group {
	float: right;
}

.btn {
	color: #ffffff;
	background-color: #333;
	border: none;
}

.btn:hover {
	background-color: #555;
}

table {
	width: 100%;
}

.table-borderless>:not(caption)>*>* {
	border-bottom: 2px solid #555;
}

th {
	background-color: #141313 !important;
}

td {
	background-color: #555 !important;
}

th,
td {
	padding: 10px;
}



.section-title {
	font-weight: bold;
}

.add-delete-btn {
	text-align: right;
}

.description {
	margin-bottom: 20px;
}

.card-color {
	background-color: #161515;
}

.border-card {
	border-top: #555 2px solid;
	border-left: #555 2px solid;
	border-right: #555 2px solid;
}

.p-inputtext {
	width: 100%;
}
</style>
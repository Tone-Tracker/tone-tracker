<script setup>
import Layout from '@/views/shared/Layout.vue';
import Checkbox from 'primevue/checkbox';
import BreadCrumb from '@/components/BreadCrumb.vue';
import { ref } from 'vue';

const authoritativeForm = ref(null);

// vueCopy < script setup >




// New refs for form inputs and validation
const newName = ref('');
const newPhone = ref('');
const newEmail = ref('');
const formErrors = ref({});

// Function to validate form
const validateForm = () => {
	formErrors.value = {};

	if (!newName.value.trim()) {
		formErrors.value.name = 'Name is required';
	}

	if (!newPhone.value.trim()) {
		formErrors.value.phone = 'Phone number is required';
	} else if (!/^\+?[1-9]\d{1,14}$/.test(newPhone.value)) {
		formErrors.value.phone = 'Invalid phone number';
	}

	if (!newEmail.value.trim()) {
		formErrors.value.email = 'Email is required';
	} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail.value)) {
		formErrors.value.email = 'Invalid email address';
	}

	return Object.keys(formErrors.value).length === 0;
};

// Function to handle form submission
const handleSubmit = () => {
	if (validateForm()) {
		// Add new contact logic here
		console.log('New contact:', { name: newName.value, phone: newPhone.value, email: newEmail.value });
		// Clear form
		newName.value = '';
		newPhone.value = '';
		newEmail.value = '';
		// Close modal
		// You might need to use refs or other methods to interact with Bootstrap modal
	}
};

</script>
<template>
	<Layout>
		<div class="page-wrapper">
			<div class="page-content">
				<BreadCrumb title="Admin" icon="" />
				<p>Manage Contacts</p>
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
									<tr>
										<td><input type="checkbox" /></td>
										<td>Natalie Murison</td>
										<td>+27786258990</td>
										<td class="email">Natalie@twotone.co.za</td>
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
							<div class="btn-group">
								<button class="btn btn-secondary rounded-0 btn-sm" data-bs-toggle="modal"
									data-bs-target="#addContactModal">Add</button>
								<button class="btn btn-secondary rounded-0 btn-sm">Delete</button>
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
									<tr>
										<td>
											<Checkbox v-model="authoritativeForm" :binary="true" />
										</td>
										<td>Nkosana Silenje</td>
										<td>+27749258768</td>
										<td class="email">Nkosana@twotone.co.za</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>

					<div class="card border-card rounded-0">
						<div class="card-header d-flex justify-content-between align-items-center">
							<h5 class="text-white">Billing Contacts</h5>
							<div class="btn-group">
								<button class="btn btn-secondary rounded-0 btn-sm" data-bs-toggle="modal"
									data-bs-target="#addContactModal">Add</button>
								<button class="btn btn-secondary rounded-0 btn-sm">Delete</button>
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
									<tr>
										<td><input type="checkbox" /></td>
										<td>Natalie Sawyer</td>
										<td>+27749258768</td>
										<td class="email">Natalie@twotone.co.za</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>

			<!-- Add Contact Modal -->
			<div class="modal fade" id="addContactModal" tabindex="-1" aria-labelledby="addContactModalLabel"
				aria-hidden="true">
				<div class="modal-dialog">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title" id="addContactModalLabel">Add New Contact</h5>
							<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div class="modal-body">
							<form @submit.prevent="handleSubmit">
								<div class="mb-3">
									<label for="name" class="form-label">Name</label>
									<input type="text" class="form-control" id="name" v-model="newName"
										:class="{ 'is-invalid': formErrors.name }">
									<div class="invalid-feedback" v-if="formErrors.name">{{ formErrors.name }}</div>
								</div>
								<div class="mb-3">
									<label for="phone" class="form-label">Phone Number</label>
									<input type="tel" class="form-control" id="phone" v-model="newPhone"
										:class="{ 'is-invalid': formErrors.phone }">
									<div class="invalid-feedback" v-if="formErrors.phone">{{ formErrors.phone }}</div>
								</div>
								<div class="mb-3">
									<label for="email" class="form-label">Email Address</label>
									<input type="email" class="form-control" id="email" v-model="newEmail"
										:class="{ 'is-invalid': formErrors.email }">
									<div class="invalid-feedback" v-if="formErrors.email">{{ formErrors.email }}</div>
								</div>
								<button type="submit" class="btn btn-primary">Add Contact</button>
							</form>
						</div>
					</div>
				</div>

			</div>
		</div>
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

.email {
	color: #7a7a7a;
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
</style>
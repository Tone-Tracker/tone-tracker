<script setup>
import Layout from '@/views/shared/Layout.vue';
import Checkbox from 'primevue/checkbox';
import BreadCrumb from '@/components/BreadCrumb.vue';
import { ref } from 'vue';

const authoritativeForm = ref(null);

</script>
<template>
	<Layout>
		<div class="page-wrapper">
			<div class="page-content">
				<BreadCrumb title="Admin" icon="" />
				<p>Manage Contacts</p>
					<div class="card card-color rounded-0 p-5">
						<div class="description">
							<p class="text-white">Below is contact information relating to the account owner, also known as the key
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
							<p class="text-white">Below is a listing of additional contacts. You can edit these contacts by clicking
								on a contact's
								name</p>
						</div>
			
						<div class="card border-card rounded-0">
							<div class="card-header d-flex justify-content-between align-items-center">
								<h5 class="text-white">Authoritative Contacts</h5>
								<div class="btn-group">
									<button class="btn btn-secondary rounded-0 btn-sm">Add</button>
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
									<button class="btn btn-secondary rounded-0 btn-sm">Add</button>
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
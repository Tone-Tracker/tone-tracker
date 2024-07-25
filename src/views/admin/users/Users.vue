<script setup>
import { onMounted, ref, reactive } from 'vue';
import Layout from '@/views/shared/Layout.vue';
import BreadCrumb from '@/components/BreadCrumb.vue';
import UsersModal from './UsersModal.vue';
import { useUserStore } from '@/stores/userStore';
import useToaster from '@/composables/useToaster';
import { useAuth } from '@/stores/auth';
import { useConfirm } from "primevue/useconfirm";

const userStore = useUserStore();
const toaster = useToaster();
const auth = useAuth();
const confirm = useConfirm();
const currentUser = JSON.parse(auth.user);

let users = ref([]);
let showLoading = ref(false);
let modalData = reactive({});

onMounted(() => {
	getAllUsers();
})

let showModal = ref(true);
const toggleModal = () => {
	showModal.value = true,
	modalData.value = {}
}

const hideModal = () => {
	showModal.value = false,
	getAllUsers();
}

    const searchInput = ref('');

const onInput = () => {
	  console.log('searchInput',searchInput.value, users.value.content)
	 if(searchInput.value) {
		// return users.value = users.value.content.filter(user => user.firstName.toLowerCase().includes(searchInput.value.toLowerCase()) 
		// || user.lastName.toLowerCase().includes(searchInput.value.toLowerCase()))
	 }else{
		getAllUsers();
	 }
  };

  const getAllUsers = async () => {
	showLoading.value = true;
	userStore.getUsers().then(function (response) {
		showLoading.value = false;
		users.value = response.data
	}).catch(function (error) {
		toaster.error("Error fetching users");
		console.log(error);
	}).finally(function () {
		showLoading.value = false;
	})
  }

  const showDetails = (user) => {
	modalData.value = user;
  }

  const deleteUser = (user) => {
	if(isMyProfile(user)) return
		userStore.deleteUser(user.id).then(function (response) {
		toaster.success("User deleted successfully");
		//refetch data
		getAllUsers();
	   }).catch(function (error) {
		toaster.error("Error deleting user");
		console.log(error);
	   })	
}

const isMyProfile = (user) => {
	return user.id === currentUser.id
}

const deleteRecord = (event, user) => {
    confirm.require({
        target: event.currentTarget,
        message: 'Do you want to delete this user?',
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
			deleteUser(user);
        },
        reject: () => {
            //do nothing
        }
    });
};
</script>
<template>
    <Layout>
        <div class="page-wrapper">
			<div class="page-content">
                <BreadCrumb title="All Users" icon="bx bxs-user-badge"/>
				<div class="card">
					<div class="card-body">
						<div class="d-lg-flex align-items-center mb-4 gap-3">
							<div class="position-relative">
								<input v-model="searchInput" @input="onInput"
								type="text" class="form-control ps-5" placeholder="Search"> <span class="position-absolute top-50 product-show translate-middle-y"><i class="bx bx-search"></i></span>
							</div>
						  <div class="ms-auto">
							<a @click="toggleModal" href="javascript:;" data-bs-toggle="modal" data-bs-target="#create-user"  class="btn maz-gradient-btn mt-2 mt-lg-0">
							<i class="bx bxs-plus-square"></i>Add User</a></div>
						</div>
						<div class="table-responsive">
							<table class="table mb-0">
								<thead class="table-light">
									<tr>
										<th>Contact Name</th>
										<th>Contact Surname</th>
										<th>Email</th>
										<th>Cell Number</th>
										<th>Opt In</th>
										<th>Activation Area</th>
										<th>Actions</th>
									</tr>
								</thead>
								<tbody>
									<tr v-if="users?.content" v-for="user in users?.content" :key="user.id">
										<td>{{user.firstName}}</td>
										<td>{{user.lastName}}</td>
										<td>{{user.email}}</td>
										<td>{{user.phone}}</td>
										<td>
											<div class="badge rounded-pill text-success bg-light-success p-2 text-uppercase px-3"><i class='bx bxs-circle align-middle me-1'></i>
											Yes</div></td>
											<td>
												Johannesburg
											</td>
										<td>
											<div class="d-flex order-actions">
												<a @click="showDetails(user)" href="javascript:;" data-bs-toggle="modal" data-bs-target="#create-user" class="">
													<i class='bx bxs-edit'></i></a>
												<a @click="deleteRecord($event,user)" href="javascript:;" class="ms-3">
													<i v-if="!isMyProfile(user)" class='bx bxs-trash text-danger'></i>
													<i v-if="isMyProfile(user)" class='bx bx-stop-circle text-danger cursor-no-drop'></i>
												</a>
												<ConfirmPopup></ConfirmPopup>
											</div>
										</td>
									</tr>
									<tr v-else>
										<td></td>
										<td></td>
										<td></td>
										<td colspan="7" class="text-center">
											<!-- <CustomSpinner v-if="showLoading"/> -->
										</td>
									</tr>
									
								
								</tbody>
							</table>
						</div>
					</div>
				</div>

				<UsersModal v-if="showModal"
				:showModal="showModal"
				:modalData="modalData"
				@closeModal="hideModal()"
				/>
			</div>
		</div>
    </Layout>
</template>
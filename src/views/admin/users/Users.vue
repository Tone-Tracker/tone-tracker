<script setup>
import { onMounted, ref, reactive } from 'vue';
import Layout from '@/views/shared/Layout.vue';
import BreadCrumb from '@/components/BreadCrumb.vue';
import UsersModal from './UsersModal.vue';
import { useUserStore } from '@/stores/userStore';
import useToaster from '@/composables/useToaster';
import { useAuth } from '@/stores/auth';
import { useConfirm } from "primevue/useconfirm";
import router from '@/router';
import Paginator from 'primevue/paginator';

const userStore = useUserStore();
const toaster = useToaster();
const auth = useAuth();
const confirm = useConfirm();
const currentUser = JSON.parse(auth.user);


let paginatedUsers = ref([]); // This will store the users to be displayed on the current page
let showLoading = ref(false);

const rowsPerPage = ref(10); // Rows per page
const totalRecords = ref(0); // Total number of records
const currentPage = ref(1); // Current page

let users = ref([]);
let modalData = reactive({});

onMounted(() => {
	getAllUsers();
})

let showModal = ref(true);
const toggleModal = () => {
	isEdit.value = false;
	showModal.value = true,
	modalData.value = {}
}

const hideModal = () => {
	showModal.value = false;
	getAllUsers();
	
}

    const searchInput = ref('');

const onInput = () => {
	 if(searchInput.value){ {
		paginatedUsers.value = paginatedUsers.value.filter((user) => {
			return user.firstName.toLowerCase().includes(searchInput.value.toLowerCase()) 
			|| user.lastName.toLowerCase().includes(searchInput.value.toLowerCase())
			|| user.email.toLowerCase().includes(searchInput.value.toLowerCase())
			|| user.phone.toLowerCase().includes(searchInput.value.toLowerCase())
		})
	 }

		
	 }else{
		getAllUsers();
	 }
  };

//   const getAllUsers = async () => {
// 	showLoading.value = true;
// 	userStore.getUsers().then(function (response) {
// 		showLoading.value = false;
// 		users.value = response.data.content
// 	}).catch(function (error) {
// 		toaster.error("Error fetching users");
// 		console.log(error);
// 	}).finally(function () {
// 		showLoading.value = false;
// 	})
//   }

  const isEdit = ref(false);
  const showDetails = (user) => {
	modalData.value = user;
	isEdit.value = true;
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

const showProfile = (user) => {console.log(user)
	if(!user.activeUserId){return alert('kkk')}
	if(user.role == 'TTG_ADMIN' || user.role == 'TTG_SUPER_ADMIN' || user.role == 'TTG_ACTIVATION_MANAGER' || user.role == 'TTG_REGIONAL_MANAGER') {
		return router.push({ name: 'staff-profile', params: { id: user.id } })
	}else if(user.role == 'TTG_TALENT') {
		router.push({ 
      name: 'staff-profile', 
      params: { 
        user: user.id, 
        userId: user.activeUserId
		// ${user.activeUserId}/${user.id}  path: '/staff-profile/:id/:userId',
      } 
	})
	}else if(user.role == 'SUPPLIER') {
		return router.push({ name: 'supplier-profile', params: { id: user.id } })
	}else {
		return;
	}
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

const onPageChange = (event) => {
  currentPage.value = event.page + 1; // PrimeVue Paginator is zero-based, so we add 1
  rowsPerPage.value = event.rows;
  updatePaginatedUsers();
};

const updatePaginatedUsers = () => {
  const start = (currentPage.value - 1) * rowsPerPage.value;
  const end = start + rowsPerPage.value;
  paginatedUsers.value = users.value.slice(start, end);
};
const getAllUsers = async () => {
  showLoading.value = true;
  try {
    const response = await userStore.getUsers();
    users.value = response.data.content;
    totalRecords.value = users.value.length;
    updatePaginatedUsers();
  } catch (error) {
    toaster.error("Error fetching users");
    console.log(error);
  } finally {
    showLoading.value = false;
  }
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
								type="text" class="form-control ps-5" placeholder="Search"> 
								<span class="position-absolute top-50 product-show translate-middle-y"><i class="bx bx-search"></i></span>
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
										<th>Role</th>
										<th>Actions</th>
									</tr>
								</thead>
								<tbody>
									<tr v-if="paginatedUsers.length > 0" v-for="user in paginatedUsers" :key="user.id">
										<td>{{user.firstName}}</td>
										<td>{{user.lastName}}</td>
										<td>{{user.email}}</td>
										<td>{{user.phone}}</td>
										<td>
											{{ user.role }}
										</td>
										<td>
											<div class="d-flex order-actions">
												<a v-tooltip.bottom="'Edit'" @click="showDetails(user)" href="javascript:;" data-bs-toggle="modal" data-bs-target="#create-user" class="">
													<i class='bx bxs-edit'></i></a>
													<!-- <a v-tooltip.bottom="'View Profile'" @click="showProfile(user)" href="javascript:;" class="ms-3">
														<i class='bx bx-bullseye'></i></a> -->
												<a v-tooltip.bottom="'Delete'" @click="deleteRecord($event,user)" href="javascript:;" class="ms-3">
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
						<div class="card">
							<Paginator 
                :first="(currentPage - 1) * rowsPerPage"
                :rows="rowsPerPage"
                :totalRecords="totalRecords"
                :rowsPerPageOptions="[10, 20, 30]"
                @page="onPageChange"
              ></Paginator>
						</div>
					</div>
				</div>

				<UsersModal v-if="showModal"
				:showModal="showModal"
				:isEdit="isEdit"
				:modalData="modalData"
				@closeModal="hideModal()"
				/>
			</div>
		</div>
    </Layout>
</template>
<script setup>
import { onMounted, ref, reactive } from 'vue';
import Layout from '@/views/shared/Layout.vue';
import BreadCrumb from '@/components/BreadCrumb.vue';
import { useVuelidate } from '@vuelidate/core';
import { required, email, requiredIf } from '@vuelidate/validators';
import { useUserStore } from '@/stores/userStore';
import useToaster from '@/composables/useToaster';
import { useAuth } from '@/stores/auth';
import { useConfirm } from "primevue/useconfirm";
import router from '@/router';
import Paginator from 'primevue/paginator';
import Dialog from 'primevue/dialog';
import SizeAndHeightForm from '@/components/SizeAndHeightForm.vue';
import Textarea from 'primevue/textarea';

const userStore = useUserStore();
const toaster = useToaster();
const auth = useAuth();
const confirm = useConfirm();
const currentUser = JSON.parse(auth.user);

const envPath = import.meta.env.VITE_AWS_S3_BUCKET;
const visible = ref(false);

let paginatedUsers = ref([]); // This will store the users to be displayed on the current page
let showLoading = ref(false);

const rowsPerPage = ref(10); // Rows per page
const totalRecords = ref(0); // Total number of records
const currentPage = ref(1); // Current page

let users = ref([]);
let modalData = reactive({});

const ROLES = ref([]);
const sizes = ref(["X_SMALL", "SMALL", "MEDIUM", "LARGE", "X_LARGE", "XX_LARGE"]);

onMounted(() => {
getAllUsers();
  getRoles();
});

const getRoles = async () => {
  try {
    const response = await auth.getRoles();
    ROLES.value = response.data.filter(role => role !== 'CLIENT' && role !== 'SUPPLIER');;
  } catch (error) {
    console.error("Failed to fetch roles", error);
  }
};

let showModal = ref(true);
const toggleModal = () => {
	isEdit.value = false;
	visible.value = true,
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


  const isEdit = ref(false);
  const showDetails = (user) => {
	modalData.value = user;
	isEdit.value = true;
	visible.value = true
	Object.assign(form,user)
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
	//get users which have role = TTG_ADMIN, TTG_SUPER_ADMIN, TTG_ACTIVATION_MANAGER, TTG_REGIONAL_MANAGER only
	users.value = response.data.content.filter(user => user.role == 'TTG_ADMIN' || user.role == 'TTG_SUPER_ADMIN' || user.role == 'TTG_ACTIVATION_MANAGER' || user.role == 'TTG_REGIONAL_MANAGER');
   
    totalRecords.value = users.value.length;
    updatePaginatedUsers();
  } catch (error) {
    toaster.error("Error fetching users");
    console.log(error);
  } finally {
    showLoading.value = false;
  }
};

const redirectToProfile = (user) => {
	if(!user?.staff) return
  router.push({ name: "staff-profile", params: { id: user?.staff, userId: user?.id } });
  // :to="{ path: `/staff-profile/${user?.staff}/${user?.id}` }"
};




const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  activationArea: '',
  location: [],
  role: "",
  topSize: null,
  pantsSize: "",
  dressSize: null,
  height: "",
  bio: "",
  description: "",
  name: "",
});


const rules = {
  firstName: { required },
  email: { required, email },
  lastName: { required },
  phone: { required },
  role: { required },
//   name: { requiredIf: (form) => form.role === "SUPPLIER" },
  // pantsSize: { required },
  // topSize: { required },
  // height: { required },
};

const v$ = useVuelidate(rules, form);

const onSubmit = async () => {
  const isFormValid = await v$.value.$validate();
  if (!isFormValid) {
    return;
  }
  showLoading.value = true;
  if (modalData.value.id) {
    return userStore.updateUser(modalData.value.id, form)
      .then(function (response) {
        console.log(response);
        showLoading.value = false;
		Object.assign(form, {});
		v$.value.$reset();
		v$.value.$errors = [];
		
        visible.value = false;
        toaster.success("User updated successfully");
      })
      .catch(function (error) {
        showLoading.value = false;
        toaster.error("Error updating user");
        console.log(error);
      });
  } else {
    userStore.submitUser(form)
      .then(function (response) {
        showLoading.value = false;
        visible.value = false;
        toaster.success("User created successfully");
      })
      .catch(function (error) {
        showLoading.value = false;
        toaster.error("Error creating user");
        console.log(error);
      });
  }
};
</script>
<template>
    <Layout>
        <div class="page-wrapper">
			<div class="page-content ">
                <BreadCrumb title="TTG Staff Members" icon="bx bxs-user-badge"/>
				<div class="card ">
					<div class="card-body">
						<div class="d-lg-flex align-items-center mb-4 gap-3">
							<div class="position-relative">
								<input v-model="searchInput" @input="onInput"
								type="text" class="form-control ps-5" placeholder="Search"> 
								<span class="position-absolute top-50 product-show translate-middle-y"><i class="bx bx-search"></i></span>
							</div>
						  <div class="ms-auto">
							<a @click="toggleModal" href="javascript:;"  class="btn maz-gradient-btn mt-2 mt-lg-0">
							<i class="bx bxs-plus-square"></i>Add User</a>
						  </div>
						</div>
					

						<div class="row row-cols-1 row-cols-md-3 row-cols-lg-2 row-cols-xl-3 row-cols-xxl-4"> 
							<div class="col"  v-if="paginatedUsers.length > 0" v-for="user in paginatedUsers" :key="user.id">
							  <div class="card radius-15">
								<div class="card-body text-center">
								  <div class="p-4 border radius-15">
									<img v-if="user.path" :src="`${envPath}${user.path}`" width="110" height="110" class="rounded-circle shadow" alt="">
									<img v-else src="../../../assets/images/placeholder.jpg" width="110" height="110" class="rounded-circle shadow" alt="">
									<h5 class="mb-0 mt-5">{{ user.firstName }} {{ user.lastName }} {{ isMyProfile(user) ? '(You)' : '' }}</h5>
									<p class="mb-3">{{ user.email }}</p>
									<div class="list-inline contacts-social mt-3 mb-3"> 
									  <a v-tooltip.right="'Edit'" @click="showDetails(user)" href="javascript:;" class="list-inline-item maz-gradient-btn text-white border-0">
									  <i class="bx bxs-edit"></i>
									</a>
									</div>
									<div class="d-grid"> 
									  <button @click="redirectToProfile(user)"  class="btn btn-outline-primary radius-15">View Profile</button>
									</div>
								  </div>
								</div>
							  </div>
							</div>
						  </div>
						<div class="card">
							<Paginator v-if="totalRecords > 0"
								:first="(currentPage - 1) * rowsPerPage"
								:rows="rowsPerPage"
								:totalRecords="totalRecords"
								:rowsPerPageOptions="[10, 20, 30]"
								@page="onPageChange"
							></Paginator>
						</div>
					</div>
				</div>

				<!-- <UsersModal v-if="showModal"
				:showModal="showModal"
				:isEdit="isEdit"
				:modalData="modalData"
				@closeModal="hideModal()"
				/> -->
				<Dialog v-model:visible="visible" position="top" modal :header="isEdit ? 'Edit User' : 'Add User'" :style="{ width: '45rem' }">
					<div class="row">
						<div class="col-lg-12">
						  <div class="border border-3 p-4 rounded">
							<div class="row g-3">
							  <div class="col-md-6">
								<label for="firstName" class="form-label">First Name</label>
								<input v-model="form.firstName" type="text" class="form-control" id="firstName" >
								<div class="input-errors" v-for="error of v$.firstName.$errors" :key="error.$uid">
								  <div class="text-danger">First Name is required</div>
								</div>
							  </div>
							  <div class="col-md-6">
								<label for="lastName" class="form-label">Last Name</label>
								<input v-model="form.lastName" type="text" class="form-control" id="lastName" >
								<div class="input-errors" v-for="error of v$.lastName.$errors" :key="error.$uid">
								  <div class="text-danger">Last Name is required</div>
								</div>
							  </div>
							  <div class="col-md-6">
								<label for="email" class="form-label">Email</label>
								<input v-model="form.email" type="email" class="form-control" id="email" >
								<div class="input-errors" v-for="error of v$.email.$errors" :key="error.$uid">
								  <div class="text-danger">Email is required</div>
								</div>
							  </div>
							  <div class="col-md-6">
								<label for="cell" class="form-label">Cell Number</label>
								<input v-model="form.phone" type="text" class="form-control" id="cell" >
								<div class="input-errors" v-for="error of v$.phone.$errors" :key="error.$uid">
								  <div class="text-danger">Cell Number is required</div>
								</div>
							  </div>
							  
							  <div class="row g-3 mb-3">
								<div class="col-md-6">
								  <label for="role" class="form-label">Role</label>
								  <select v-model="form.role" class="form-control" id="role">
									<option :value="''" :selected="true">Select Role</option>
									<option v-for="role in ROLES" :key="role" :value="role">{{ role }}</option>
								  </select>
								  <div class="input-errors" v-for="error of v$.role.$errors" :key="error.$uid">
									<div class="text-danger">Role is required</div>
								  </div>
								</div>
								<div class="col-md-6" v-if="form.role === 'SUPPLIER'">
									<label for="name" class="form-label">Name</label>
									<input v-model="form.name" type="text" class="form-control" id="name" >
									<!-- <div class="input-errors" v-for="error of v$.name.$errors" :key="error.$uid">
									  <div class="text-danger">Name is required</div>
									</div> -->
								  </div>
							  </div>


							  <template v-if="form.role === 'SUPPLIER'">
								<div class="col-md-12">
									<label for="description" class="form-label">Description</label>
									<Textarea v-model="form.description" type="text" class="form-control" id="description" />
								  </div>
							  </template>
							 
							</div>
		  
										<!-- Conditionally display SizeAndHeightForm component -->
									 <SizeAndHeightForm v-if="form.role === 'TTG_TALENT' && !isEdit" :form="form" :sizes="sizes" />
		  
							<div class="col-12 mt-3">
							  <div class="d-grid">
								<button @click="onSubmit" class="btn maz-gradient-btn" type="button">
								  <span v-if="showLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
								  {{ modalData.value?.id ? 'Update' : 'Submit' }}
								</button>
							  </div>
							</div>
						  </div> 
						</div>
					  </div>
				</Dialog>
			</div>
		</div>
    </Layout>
</template>
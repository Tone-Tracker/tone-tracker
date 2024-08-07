<script setup>
import { onMounted, reactive,ref, watch } from 'vue';
import Layout from '@/views/shared/Layout.vue';
import BreadCrumb from '@/components/BreadCrumb.vue';
import useToaster from '@/composables/useToaster';
import { useActivation } from '@/stores/activation';
import AutoComplete from 'primevue/autocomplete';
import InputText from 'primevue/inputtext';
import { useRegion } from '@/stores/useRegion';
import SplitButton from 'primevue/splitbutton';
import Dialog from 'primevue/dialog';
import { useCampaignStore } from '@/stores/useCampaign';
import { useConfirm } from "primevue/useconfirm";
import { useRoute } from 'vue-router';
import URLrouter from '@/router';
import { useStaff } from '@/stores/staff';
import { useUserStore } from '@/stores/userStore';
import { useAuth } from '@/stores/auth';
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';



const route = useRoute();
const userStore = useUserStore();
const authStore = useAuth();
const staff = useStaff();
const campaignId = ref(route.query.campaign);


watch(
  () => route.query.campaign,
  (newCampaignId) => {
    campaignId.value = newCampaignId;
  }
);

const activation = useActivation();
const toaster = useToaster();
const region = useRegion();
const campaignStore = useCampaignStore();

const searchInput = ref('');
let activations = ref([]);
let users = ref([]);
let mappedUsers = ref([]);
let staffMembers = ref([]);
let showLoading = ref(false);
const regions = ref([]);
const campaignName = ref([]);

const user = JSON.parse(authStore.user);



onMounted(() => {
	if(userStore.getUserRole('TTG_ACTIVATION_MANAGER') && !campaignId.value){
		getActivationsByActivationManager();
	} else{
		 getActivationsByCampaignId();
	}
	
	getRegions();
	getCampaignName();
	getAllUsers();

});

const canCreateActivation = () => {
	return user.role == 'TTG_SUPER_ADMIN' 
	|| user.role == 'TTG_REGIONAL_MANAGER' 
	|| user.role == 'TTG_HEAD_ADMIN';
}

const getAllUsers = async () => {
	showLoading.value = true;
	userStore.getUserByRole('TTG_ACTIVATION_MANAGER').then(function (response) {
		users.value = response.data;
		getStaffMembers();
		mappedUsers.value = response.data.content.map(user => {
			return {
				name: `${user.firstName} ${user.lastName}`,
				id: user.id
			}
		})
	}).catch(function (error) {
		// toaster.error("Error fetching users");
		console.log(error); 
	}).finally(function () {
		showLoading.value = false;
	})
  }

const getStaffMembers = async () => {
	staff.getStaff().then(function (response) {
		console.log('Staffs',response)
		staffMembers.value = response.data.content;
	}).catch(function (error) {
		// toaster.error("Error fetching staff members");
		console.log(error);
	})
}

const getCampaignName = async () => {
	campaignStore.getCampaignName(campaignId.value).then(function (response) {
		campaignName.value = response.data.name;
	})
}

const getregionsByStaffId = () => {console.log('UserInside',user.activeUserId)
    region.getRegionsByStaffId(user.activeUserId).then(function (response) {
    console.log('regions',response)
    regions.value = response.data.content;
  }).catch(function (error) {
    console.log(error);
  }).finally(function () {
    ///
  })
}

const getRegions = async () => {
	region.getRegions().then(function (response) {
		regions.value = response.data.content;
	})
}
const onInput = () => {
	 if(searchInput.value) {
		// return activations.value = activations.value.content.filter(user => user.firstName.toLowerCase().includes(searchInput.value.toLowerCase()) 
		// || user.lastName.toLowerCase().includes(searchInput.value.toLowerCase()))
	 }else{
		if(userStore.getUserRole('TTG_ACTIVATION_MANAGER')){
			getActivationsByActivationManager();
		} else{
			getActivationsByCampaignId();
		}
		getActivationsByActivationManager();
	 }
  };

  const getActivationsByStaffId = async () => {
	showLoading.value = true;
	activation.getActivationByStaffId(user.activeUserId).then(function (response) {
		activations.value = response.data.content;
		console.log('activations',activations.value)
	}).catch(function (error) {
		// toaster.error("Error fetching activations");
		console.log(error);
	}).finally(function () {
	})
  }
  const getActivationsByCampaignId = async () => {
	showLoading.value = true;
	activation.getActivationsByCampaignId(campaignId.value).then(function (response) {
		activations.value = response.data.content;
		
	}).catch(function (error) {
		// toaster.error("Error fetching activations");
		console.log(error);
	}).finally(function () {
	})
  }

 
  const deleteActivation = (activ) => {
	if(!window.confirm("Are you sure you want to delete this activation?")){return}
		activation.deleteActivation(activ.id).then(function (response) {
		toaster.success("Activation deleted successfully");
		//refetch data
		if(userStore.getUserRole('TTG_ACTIVATION_MANAGER')){
			getActivationsByActivationManager();
		} else{
			getActivationsByCampaignId();
		}
		
	   }).catch(function (error) {
		toaster.error("Error deleting user");
		console.log(error);
	   })	
 
}
const confirm = useConfirm();
// const deleteRecord = (event, activation) => {
//     confirm.require({
//         target: event.currentTarget,
//         message: 'Do you want to delete this record?',
//         // icon: 'bx bx-trash text-danger',
// 		icon: '',
//         rejectProps: {
//             label: 'Cancel',
//             severity: '',
//             outlined: true
//         },
//         acceptProps: {
//             label: 'Delete',
//             severity: 'danger'
//         },
//         accept: () => {
// 			deleteActivation(activation);
//         },
//         reject: () => {
//             //do nothing
//         }
//     });
// };

const getRegionName = (region) => {
    return regions.value.find(r => r.id === region).name
}

const items = (activation) => [
    {
        label: 'View Activation',
        icon: 'bx bx-bullseye fs-4 text-success',
        command: () => {
            URLrouter.push(`/view-activation?activation=${activation.id}&campaign=${campaignName.value}&name=${activation.name}`);
        }
    },
	{
        label: 'Tasks',
        icon: 'bx bx-task fs-4 text-success',
        command: () => {
            URLrouter.push(`/tasks?activation=${activation.id}&name=${activation.name}`);
        }
    },
	{
        label: 'Edit',
        icon: 'bx bx-edit-alt fs-4 text-success',
        command: () => {
            URLrouter.push(`/create-activation?activation=${activation.id}&campaign=${campaignId.value}&manager=${getUserName(activation)}&name=${campaignName.value}`);
        }
    },
    
    {
        label: 'Add Activation Images',
        icon: 'bx bx-images text-success fs-3',
        command: () => {
            // unitForm.warehouse = warehouse.id
			URLrouter.push(`/activation-images?activation=${activation.id}`);
        }
    },
	{
        label: 'Add Activation Manager',
        icon: 'bx bx-user-plus text-success fs-3',
        command: () => {
            // unitForm.warehouse = warehouse.id
            openModal('top',activation);
        }
    },
	{
        label: 'Delete',
        icon: 'bx bxs-trash fs-4 text-danger text-success',
        command: () => {
            deleteActivation(activation);
        }
    },
];

const visible = ref(false);
const position = ref('top');
const editForm = reactive({
	staff: null,
	activation: null
});

const rules = { 
    staff: { required },
	activation: { required }
};
const v$ = useVuelidate(rules, editForm);
const activationName = ref(null);
const activationEdit = reactive({});
const openModal = (pos,activation) => {   
	Object.assign(activationEdit, activation)
	activationName.value = activation.name
    position.value = pos;
    visible.value = true;
	editForm.activation = activation.id;
	activationId.value = activation.id;
}

let staffValue = ref(null);
const activationId = ref(null);
const onUserChange = (event) => {
	
	// staffValue.value = event.value
    let selectedUser = users.value.content.find(user => user.firstName + ' ' + user.lastName === event.value)?.id;
	let staff = staffMembers.value.find(staff => staff.user === selectedUser)?.id;
	editForm.staff = staff;
	console.log('editForm',editForm.staff)
	if(!staff){
		toaster.error("Make sure this user is added as staff member.");
		return 
	}
	editForm.staff = staff;
	
}
const addActivationManager = () => {
	const form = reactive({
	  name:  activationEdit.name,
	  budget: activationEdit.budget,
      campaign: activationEdit.campaign,
	  region: activationEdit.region,
      startDate: activationEdit.startDate,
	  endDate: activationEdit.endDate,
      brief: activationEdit.brief,
	  targetGroup: activationEdit.targetGroup,
	  painPoints: activationEdit.painPoints,
	  staff: editForm.staff
});

	if(activationId.value){
		return activation.update(activationId.value, form).then(function (response) {
			toaster.success("Activation updated successfully");
			visible.value = false;
			if(userStore.getUserRole('TTG_ACTIVATION_MANAGER')){
				getActivationsByActivationManager();
			}else{
				getActivationsByCampaignId();
			}
			
		}).catch(function (error) {
			toaster.error("Error updating activation");
			console.log(error);
		})
	}
}

const getUserName = (activation) => {
	if(!activation.staff) return '';
	
	let myUser = users.value.content.find(user => user.id === activation.staff)?.firstName + ' ' + users.value.content.find(user => user.id === activation.staff)?.lastName;
      if(myUser == 'undefined undefined') return '';
	return myUser
}
const search = (event) => {
    const query = event.query.toLowerCase();
	
	let myObj = users.value.content.filter(user => user.firstName.toLowerCase().includes(query))
    mappedUsers.value = myObj.map(u => u.firstName + ' ' + u.lastName);
};

</script>
<template>
    <Layout>
        <div class="page-wrapper">
			<div class="page-content">
                <BreadCrumb title="Activations" icon="bx bxs-user-badge"/>
				<div class="card">
					<div class="card-body">
						<div class="d-lg-flex align-items-center mb-4 gap-3">
							<div class="position-relative">
								<input v-model="searchInput" @input="onInput"
								type="text" class="form-control ps-5" placeholder="Search"> <span class="position-absolute top-50 product-show translate-middle-y"><i class="bx bx-search"></i></span>
							</div>
						  <div v-if="canCreateActivation()" class="ms-auto">
							<router-link :to="`/create-activation?campaign=${campaignId}&name=${campaignName}`"  class="btn maz-gradient-btn mt-2 mt-lg-0">
							<i class="bx bxs-plus-square"></i>Create Activation</router-link>
						</div>
						</div>
						<div class="table-responsive">
							<table class="table mb-0">
								<thead class="table-dark">
									<tr>
										<th>Name</th>
										<th>Campaign</th>
										<th>Region</th>
										<th>Budget</th>
										<th>Start Date</th>
										<th>End Date</th>
										<th>Activation Manager</th>
										<th>Actions</th>
									</tr>
								</thead>
								<tbody >
									<tr v-if="activations?.length > 0" v-for="activation in activations" :key="activation.id">
										<td>{{activation.name}}</td>
										<td>{{ activation.campaign.name }}</td>
										<td>{{ activation.region.name }}</td> 
										<td>R {{activation.budget}}</td>
										<td>{{activation.startDate}}</td>
										<td>{{activation.endDate}}</td>
										<td>
											{{ getUserName(activation) }}
										</td>
										<td>
											<div class="d-flex order-actions">
												<!-- <router-link :to="`/create-activation?activation=${activation.id}&campaign=${campaignId}&name=${campaignName}`" class="">
													<i class='bx bxs-edit'></i></router-link> -->
													<!-- <router-link :to="`/tasks?activation=${activation.id}&name=${activation.name}`" class="ms-3">
														<i class='bx bxs-bullseye text-success'></i>
													</router-link> -->
													<SplitButton 
                                                            class="text-white" label="Actions" icon="bx bx-cog fs-4" dropdownIcon="text-white fs-4 bx bx-chevron-down" 
                                                            :model="items(activation)"
                                                             />
												<!-- <a @click="deleteRecord($event,activation)" label="Delete" severity="danger" href="javascript:;" class="ms-3"><i class='bx bxs-trash'></i></a> -->
												<!-- <ConfirmPopup></ConfirmPopup> -->
											</div>
											
										</td>
									</tr>
									<tr v-else>
										<td colspan="7" class="text-center text-danger">
											No activations found
										</td>
									</tr>
									
								
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>

		<Dialog v-model:visible="visible" modal header="Add Activation Manager" :style="{ width: '30rem' }">
             
              <form class="row g-3" @submit.prevent="addActivationManager">
				<div class="col-md-12">
					<div class="card my-card flex justify-center">
						<label for="input1" class="form-label">Activation Name</label>
						   <InputText type="text" v-model="activationName" :disabled="true" />
				</div>                        
				</div>
				<div class="col-md-12">
					<div class="card my-card flex justify-center">
						<label for="input1" class="form-label">Select Staff</label>
						<AutoComplete v-model="staffValue" forceSelection dropdown :suggestions="mappedUsers" 
                              @item-select="onUserChange($event)" @complete="search" field="name" placeholder="Select Staff Member" />
						   <div class="input-errors" v-for="error of v$.staff.$errors" :key="error.$uid">
						   <div class="text-danger">User is required</div>
						</div>
				</div>     
				</div>
				<div class="modal-footer">
					<button type="submit" class="btn maz-gradient-btn w-100">Submit</button>
				</div>
				
			</form>
		   
		</Dialog>
    </Layout>
</template>
<style>
.p-splitbutton {
    height: 36px !important;
}
</style>
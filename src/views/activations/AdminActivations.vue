<script setup>
import { onMounted, ref, watch } from 'vue';
import Layout from '@/views/shared/Layout.vue';
import BreadCrumb from '@/components/BreadCrumb.vue';
import useToaster from '@/composables/useToaster';
import { useActivation } from '@/stores/activation';
import AutoComplete from 'primevue/autocomplete';
import { useRegion } from '@/stores/useRegion';
import SplitButton from 'primevue/splitbutton';
import Dialog from 'primevue/dialog';
import { useCampaignStore } from '@/stores/useCampaign';
import { useConfirm } from "primevue/useconfirm";
import { useRoute } from 'vue-router';
import URLrouter from '@/router';

const route = useRoute();
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
let showLoading = ref(false);
const regions = ref([]);
const campaignName = ref([]);

onMounted(() => {
	getActivationsByCampaignId();
	getRegions();
	getCampaignName();
})


const getCampaignName = async () => {
	campaignStore.getCampaignName(campaignId.value).then(function (response) {
		campaignName.value = response.data.name;
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
		getActivationsByCampaignId();
	 }
  };

  const getActivationsByCampaignId = async () => {
	showLoading.value = true;
	activation.getActivationsByCampaignId(campaignId.value).then(function (response) {
		console.log(response.data)
		activations.value = response.data.content
	}).catch(function (error) {
		toaster.error("Error fetching activations");
		console.log(error);
	}).finally(function () {
	})
  }

 
  const deleteActivation = (activ) => {
	if(!window.confirm("Are you sure you want to delete this activation?")){return}
		activation.deleteActivation(activ.id).then(function (response) {
		toaster.success("Activation deleted successfully");
		//refetch data
		getActivationsByCampaignId();
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
        label: 'Edit',
        icon: 'bx bx-edit-alt fs-4',
        command: () => {
            URLrouter.push(`/create-activation?activation=${activation.id}&campaign=${campaignId.value}&name=${campaignName.value}`);
        }
    },
    {
        label: 'Delete',
        icon: 'bx bxs-trash fs-4 text-danger text-success',
        command: () => {
            deleteActivation(activation);
        }
    },
    {
        label: 'Add Activation Manager',
        icon: 'bx bx-user-plus text-success fs-3',
        command: () => {
            // unitForm.warehouse = warehouse.id
            openModal('top',activation);
        }
    }
];

const visible = ref(false);
const position = ref('top');
let editForm = ref({
	staff: null
});

const openModal = (pos,activation) => {   
    position.value = pos;
    visible.value = true;
	editForm.staff = activation;
}


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
						  <div class="ms-auto">
							<router-link :to="`/create-activation?campaign=${campaignId}&name=${campaignName}`"  class="btn maz-gradient-btn mt-2 mt-lg-0">
							<i class="bx bxs-plus-square"></i>Create Activation</router-link></div>
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
										<th>Pain Points</th>
										<th>Target Group</th>
										<th>Actions</th>
									</tr>
								</thead>
								<tbody>
									<tr v-if="activations?.length > 0" v-for="activation in activations" :key="activation.id">
										<td>{{activation.name}}</td>
										<td>{{ campaignName }}</td>
										<td>{{ getRegionName(activation.region) }}</td>
										<td>R {{activation.budget}}</td>
										<td>{{activation.startDate}}</td>
										<td>{{activation.endDate}}</td>
										<td>{{activation.painPoints}}</td>
										<td>{{activation.targetGroup}}</td>
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
             
              <form class="row g-3" >
				<div class="col-md-12">
					<div class="card my-card flex justify-center">
						<label for="input1" class="form-label">Unit Name</label>
						   <InputText type="text" v-model="editForm.activation" />
				</div>                        
				</div>
				<div class="col-md-12">
					<!-- <div class="card my-card flex justify-center">
						<label for="input1" class="form-label">Select Staff</label>
						<AutoComplete v-model="editForm.staff" forceSelection dropdown :suggestions="mappedUsers" 
                              @item-select="onUserChange($event)" @complete="search" field="name" placeholder="Select Staff" />
						   <div class="input-errors" v-for="error of v$.staff.$errors" :key="error.$uid">
						   <div class="text-danger">User is required</div>
						</div>
				</div>                          -->
				</div>
				<div class="modal-footer">
					<button type="button" class="btn maz-gradient-btn w-100">'Submit'</button>
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
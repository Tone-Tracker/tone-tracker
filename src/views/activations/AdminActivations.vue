<script setup>
import { onMounted, ref, reactive } from 'vue';
import Layout from '@/views/shared/Layout.vue';
import BreadCrumb from '@/components/BreadCrumb.vue';
import useToaster from '@/composables/useToaster';
import { useActivation } from '@/stores/activation';
import { useRegion } from '@/stores/useRegion';
import { useCampaignStore } from '@/stores/useCampaign';
import { useConfirm } from "primevue/useconfirm";


const activation = useActivation();
const toaster = useToaster();
const region = useRegion();
const campaignStore = useCampaignStore();

const searchInput = ref('');
let activations = ref([]);
let showLoading = ref(false);
let modalData = reactive({});
const regions = ref([]);
const campaigns = ref([]);

onMounted(() => {
	getActivations();
	getRegions();
	getCampaigns();
})


const getCampaigns = async () => {
	campaignStore.getCampaigns().then(function (response) {
		campaigns.value = response.data;
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
		getActivations();
	 }
  };

  const getActivations = async () => {
	showLoading.value = true;
	activation.getActivations().then(function (response) {
		showLoading.value = false;
		activations.value = response.data.content
	}).catch(function (error) {
		toaster.error("Error fetching activations");
		console.log(error);
	}).finally(function () {
		showLoading.value = false;
	})
  }

 
  const deleteActivation = (activ) => {
		activation.deleteActivation(activ.id).then(function (response) {
		toaster.success("Activation deleted successfully");
		//refetch data
		getActivations();
	   }).catch(function (error) {
		toaster.error("Error deleting user");
		console.log(error);
	   })	
 
}
const confirm = useConfirm();
const deleteRecord = (event, activation) => {
    confirm.require({
        target: event.currentTarget,
        message: 'Do you want to delete this record?',
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
			deleteActivation(activation);
        },
        reject: () => {
            //do nothing
        }
    });
};

const getRegionName = (region) => {
    return regions.value.find(r => r.id === region).name
}

const getCampaignName = (campaign_id) => {
	if(!campaign_id) return ''
    return campaigns.value.find(c => c.id === campaign_id).name
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
								type="text" class="form-control ps-5 radius-30" placeholder="Search"> <span class="position-absolute top-50 product-show translate-middle-y"><i class="bx bx-search"></i></span>
							</div>
						  <div class="ms-auto">
							<router-link to="/create-activation"  class="btn maz-gradient-btn radius-30 mt-2 mt-lg-0">
							<i class="bx bxs-plus-square"></i>Add</router-link></div>
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
										<td>{{ getCampaignName(activation.campaign) }}</td>
										<td>{{ getRegionName(activation.region) }}</td>
										<td>{{activation.budget}}</td>
										<td>{{activation.startDate}}</td>
										<td>{{activation.endDate}}</td>
										<td>{{activation.painPoints}}</td>
										<td>{{activation.targetGroup}}</td>
										<td>
											<div class="d-flex order-actions">
												<router-link :to="`/edit-activation/${activation.id}`" class="">
													<i class='bx bxs-edit'></i></router-link>
													<router-link to="/tasks" class="ms-3">
														<i class='bx bxs-bullseye'></i>
													</router-link>
												<a @click="deleteRecord($event,activation)" label="Delete" severity="danger" href="javascript:;" class="ms-3"><i class='bx bxs-trash'></i></a>
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
			</div>
		</div>
    </Layout>
</template>
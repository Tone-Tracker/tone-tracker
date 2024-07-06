<script setup>
import { useActivation } from '@/stores/activation';
import { useRoute } from 'vue-router';
import InputNumber from 'primevue/inputnumber';
import Layout from '@/views/shared/Layout.vue';
import AutoComplete from 'primevue/autocomplete';
import BreadCrumb from '@/components/BreadCrumb.vue';
import { ref,reactive, watch, onMounted } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import useToaster from '@/composables/useToaster';
import { useRegion } from '@/stores/useRegion';
import { useCampaignStore } from '@/stores/useCampaign';

let campaign = ref(null);


const activation = useActivation();
const toaster = useToaster();
const route = useRoute();
const regionStore = useRegion();
const campaignStore = useCampaignStore();

let campaigns = ref([]);
let activationId = ref(null);//For edit
let dropdownItems = ref([]);
const regions = ref([]);

onMounted(() => {
	getRegions();
	getCampaigns();
    activationId.value = route.params.id;
    activationId.value ? getActivationById() : null;
});



watch(() => route.params.id, (newId) => {
    activationId.value = newId;
    });

const getRegions = async () => {
	regionStore.getRegions().then(function (response) {
		regions.value = response.data.content;
	})
}
const getCampaigns = async () => {
	campaignStore.getCampaigns().then(function (response) {
		campaigns.value = response.data;
		dropdownItems.value = [...campaigns.value];
	})
}


let showLoading = ref(false);

const form = reactive({
	  name: '',
	  budget: '',
      campaign: '',
	  region_id: '',
      startDate: '',
	  endDate: '',
      brief: "",
	  targetGroup: "",
	  painPoints: ""
    });

    const getActivationById = async () => {
        activation.getActivationById(activationId.value).then(function (response) {
            campaign = campaigns.value.find(campaign => campaign.id === response.data.campaign)?.name;//bind campaign on autocomplete
            Object.assign(form, response.data);
        })
    }


	const rules = {
		name: { required },
		budget: { required },
		campaign: { required },
		region: { required },
		startDate: { required },
		endDate: { required },
		targetGroup: { required },
        brief: { required },
		painPoints: { required }
    }
	const v$ = useVuelidate(rules, form)

	const onSubmit = async () => {
		const isFormValid = await v$.value.$validate();
		if (!isFormValid) {
			return
		}
			if(activationId.value){
				return activation.update(activationId.value, form).then(function (response) {
					toaster.success("Activation updated successfully");
				})
			}else{
		
			activation.submit(form)
			.then(function (response) {
		        emit('closeModal');
				toaster.success("Activation created successfully");
				}).catch(function (error) {
					toaster.error("Error creating user");
					console.log(error);
		    });
		 }
		
	}
	const search = (event) => {
    const query = event.query.toLowerCase();
	let myObj = campaigns.value.filter(client => client.name?.toLowerCase().includes(query));
	dropdownItems.value = myObj.map(client => client.name);
};

const onCampaignChange = (event) => {
	form.campaign = campaigns.value.find(campaign => campaign.name === event.value).id;
	console.log(form.campaign);
};


</script>
<template>

    <Layout>
        <div class="page-wrapper">
			<div class="page-content">
                <BreadCrumb :title="activationId ? 'Edit Activation' : 'Create Activation'" icon="bx bxs-user-badge"/>
				<div class="card">
					<div class="card-body">
						<div class="row">
                            <div class="col-lg-12">
                             <div class="border border-3 p-4 rounded">
                               <div class="row g-3">
                                 <div class="col-md-4">
                                     <label for="name" class="form-label">Activation Name</label>
                                     <input v-model="form.name" type="text" class="form-control" id="name" >
                                     <div class="input-errors" v-for="error of v$.name.$errors" :key="error.$uid">
                                         <div class="text-danger">First Name is required</div>
                                       </div>
                                   </div>
                                   <!-- <div class="col-md-4 card">
                                    <label for="budget" class="form-label">Budget</label>
                                    <InputNumber v-model="value1" inputId="currency-us" mode="currency" currency="ZAR" locale="en-US" fluid />
                                    <div class="input-errors" v-for="error of v$.budget.$errors" :key="error.$uid">
                                        <div class="text-danger">Budget is required</div>
                                      </div>
                                  </div> -->
                                   <div class="col-md-4">
                                     <label for="budget" class="form-label">Budget</label>
                                     <input v-model="form.budget" type="text" class="form-control" id="budget" >
                                     <div class="input-errors" v-for="error of v$.budget.$errors" :key="error.$uid">
                                         <div class="text-danger">Budget is required</div>
                                       </div>
                                   </div> 
 
                                   <div class="card maz-top flex justify-center col-md-4">
                                     <label for="input1" class="form-label">Select Campaign</label>
                                     <AutoComplete  v-model="campaign" forceSelection dropdown :suggestions="dropdownItems" 
                                         @item-select="onCampaignChange" @complete="search" field="name" />
                                     <div class="input-errors" v-for="error of v$.campaign.$errors" :key="error.$uid">
                                         <div class="text-danger">Campaign is required</div>
                                     </div>
                                 </div>
 
 
                                   <div class="col-md-4 mt-custom">
                                     <label for="region" class="form-label">Region</label>
                                     <select v-model="form.region" class="form-control" id="activation-area">
                                         <option :value="''" :selected="true">Select Region</option>
                                         <option v-for="region in regions" :key="region" :value="region.id">{{ region.name }}</option>
                                     </select>
                                     <div class="input-errors" v-for="error of v$.region.$errors" :key="error.$uid">
                                         <div class="text-danger">Region is required</div>
                                       </div>
                                   </div>
                                   <div class="col-md-4 mt-custom">
                                    <label for="brief" class="form-label">Brief</label>
                                    <input v-model="form.brief" type="text" class="form-control" id="brief" >
                                    <div class="input-errors" v-for="error of v$.brief.$errors" :key="error.$uid">
                                        <div class="text-danger">Start Date is required</div>
                                      </div>
                                  </div>
                                   <div class="col-md-4 mt-custom">
                                     <label for="start-date" class="form-label">Start Date</label>
                                     <input v-model="form.startDate" type="date" class="form-control" id="start-date" >
                                     <div class="input-errors" v-for="error of v$.startDate.$errors" :key="error.$uid">
                                         <div class="text-danger">Start Date is required</div>
                                       </div>
                                   </div>
                                   
                                   <div class="col-md-4">
                                     <label for="end-date" class="form-label">End Date</label>
                                     <input v-model="form.endDate" type="date" class="form-control" id="end-date" >
                                     <div class="input-errors" v-for="error of v$.endDate.$errors" :key="error.$uid">
                                         <div class="text-danger">End Date is required</div>
                                       </div>
                                   </div>
 
                                   <div class="col-md-4">
                                     <label for="targetGroup" class="form-label">Target Group</label>
                                     <input v-model="form.targetGroup" type="text" class="form-control" id="targetGroup" >
                                     <div class="input-errors" v-for="error of v$.targetGroup.$errors" :key="error.$uid">
                                         <div class="text-danger">Target Group is required</div>
                                       </div>
                                   </div>
 
                                   <div class="col-md-4">
                                     <label for="campaign" class="form-label">Pin Points</label>
                                     <input v-model="form.painPoints" type="text" class="form-control" id="painPoints" >
                                     <div class="input-errors" v-for="error of v$.painPoints.$errors" :key="error.$uid">
                                         <div class="text-danger">Pin Points is required</div>
                                       </div>
                                   </div>
 
                                   
                                   <div class="upload-section">
                                    <label for="file-upload" class="file-upload-label">
                                        <input type="file" id="file-upload">
                                        <div
                                            class="d-flex flex-column align-items-center justify-content-center upload-box text-white">
                                            <div class="fs-1">+</div>
                                            <div class="mb-6">
                                                <span class="fs-5">Upload file</span>
                                            </div>
                                        </div>

                                    </label>
                                </div>

                                   <div class="col-12">
                                       <div class="d-grid">
                                         <button @click="onSubmit" class="btn maz-gradient-btn" type="button"> 
                                             <span v-if="showLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                             {{ activationId ?  'Update' : 'Submit' }}
                                         </button>
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
<style>
.maz-top{
    margin-top: 0.3rem !important;
}

.upload-section {
    margin: 20px 0;
}
.mt-custom{
    margin-top: -9px !important;
}

.file-upload-label {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
}

.file-upload-label input[type="file"] {
    display: none;
}

.upload-box {
    width: 700px;
    height: 100px;
    border: 2px dashed #fff;
    font-size: 2em;
    color: #555;
}

.upload-button {
    background-color: #007bff;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    font-size: 1em;
    cursor: pointer;
}

.upload-button:hover {
    background-color: #0056b3;
}
</style>
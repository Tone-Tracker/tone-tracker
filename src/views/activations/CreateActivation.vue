<script setup>
import { useActivation } from '@/stores/activation';
import { useRoute } from 'vue-router';
import Layout from '@/views/shared/Layout.vue';
import DatePicker from 'primevue/datepicker';
import BreadCrumb from '@/components/BreadCrumb.vue';
import InputNumber from 'primevue/inputnumber';
import InputText from 'primevue/inputtext';
import { ref,reactive, watch, onMounted } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import useToaster from '@/composables/useToaster';
import { useRegion } from '@/stores/useRegion';
import moment from 'moment';

const route = useRoute();
const campaignId = ref(route.query.campaign);
const campaignName = ref(route.query.name);
const activationManager = ref(route.query.manager);
const activationId = ref(route.query.activation);


const loading = ref(false);
const activation = useActivation();
const toaster = useToaster();
const selectedFile = ref(null);


const regionStore = useRegion();


const regions = ref([]);

onMounted(() => {
	getRegions();
    if(activationId.value) {//Its edit
        getActivationById();
    }
});



watch(() => route.params.id, (newId) => {
    activationId.value = newId;
    });



const getRegions = async () => {
	regionStore.getRegions().then(function (response) {
		regions.value = response.data.content;
	})
}


const form = reactive({
	  name: '',
	  budget: null,
      campaign: campaignId.value,
	  region: '',
      startDate: '',
	  endDate: '',
      brief: "",
	  targetGroup: "",
	  painPoints: ""
    });

    const getActivationById = async () => {
    activation.getActivationById(activationId.value).then(function (response) {
        console.log(response.data);
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

    const onFileChange = (event) => {
    selectedFile.value = event.target.files[0];
}

	const onSubmit = async () => {
		const isFormValid = await v$.value.$validate();
		if (!isFormValid) {
			return
		}

        const formData = new FormData();
        formData.append('briefFile', selectedFile.value);
        formData.append('ActivationDTO', new Blob([JSON.stringify(form)], { type: 'application/json' }));

        const config = {
        useMultipartFormData: true // Add this flag to the request config
         };

			if(activationId.value){
				return activation.update(activationId.value, form).then(function (response) {
                    loading.value = false;
					toaster.success("Activation updated successfully");
				})
			}else{
		
			activation.submit(formData, config)
			.then(function (response) {
                loading.value = false;
				toaster.success("Activation created successfully");
				}).catch(function (error) {
                    loading.value = false;
					toaster.error("Error creating user");
					console.log(error);
            }).finally(function () {
                loading.value = false;
            });
		 }
	}
	

</script>
<template>

    <Layout>
        <div class="page-wrapper">
			<div class="page-content">
                <BreadCrumb :title="activationId ? 'Edit Activation' : 'Create Activation'" icon="bx bxs-user-badge"/>
                <div class="d-flex ">
                    <h5 class="mx-2">Campaign: {{campaignName}}</h5>
                    <h5 class="mx-2">Activation Manager: <span class="maz-gradient-txt">{{activationManager}}</span></h5>
                </div>
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
                                         <div class="text-danger">Activation Name is required</div>
                                       </div>
                                   </div>
                                   <div class="col-md-4 maz-top flex justify-center card">
                                    <label for="budget" class="form-label">Budget</label>
                                    <InputNumber v-model="form.budget" inputId="currency-us" mode="currency" currency="ZAR" locale="en-US" fluid />
                                    <div class="input-errors" v-for="error of v$.budget.$errors" :key="error.$uid">
                                        <div class="text-danger">Budget is required</div>
                                      </div>
                                  </div> 
 
                                   <div class="card maz-top flex justify-center col-md-4">
                                     <label for="input1" class="form-label">Campaign</label>
                                     <InputText v-model="campaignName" disabled="disabled" class="form-control" id="activation-area"/>
                                 </div>
 
 
                                   <div class="col-md-3 mt-custom">
                                     <label for="region" class="form-label">Region</label>
                                     <select v-model="form.region" class="form-control" id="activation-area">
                                         <option :value="''" :selected="true" :disabled="disabled">Select Region</option>
                                         <option v-for="region in regions" :key="region" :value="region.id">{{ region.name }}</option>
                                     </select>
                                     <div class="input-errors" v-for="error of v$.region.$errors" :key="error.$uid">
                                         <div class="text-danger">Region is required</div>
                                       </div>
                                   </div>
                                   
                                   <div class="col-md-3 card justify-center mt-custom">

                                    <div class="card fuck-top flex justify-center">
                                        <label for="input1" class="form-label">Start Date</label>
                                        <DatePicker v-model="form.startDate" showButtonBar showIcon fluid :showOnFocus="true" />
                                           <div class="input-errors" v-for="error of v$.startDate.$errors" :key="error.$uid">
                                           <div class="text-danger">Start Date is required</div>
                                        </div>
                                     </div> 
                                   </div>
                                   
                                   <div class="col-md-3 card justify-center mt-custom">

                                    <div class="card fuck-top flex justify-center">
                                        <label for="input1" class="form-label">End Date</label>
                                        <DatePicker v-model="form.endDate" showButtonBar showIcon fluid :showOnFocus="true" />
                                           <div class="input-errors" v-for="error of v$.endDate.$errors" :key="error.$uid">
                                           <div class="text-danger">End Date is required</div>
                                        </div>
                                     </div> 

                                   </div>
 
                                   <div class="col-md-3 mt-custom">
                                     <label for="targetGroup" class="form-label">Target Group</label>
                                     <input v-model="form.targetGroup" type="text" class="form-control" id="targetGroup" >
                                     <div class="input-errors" v-for="error of v$.targetGroup.$errors" :key="error.$uid">
                                         <div class="text-danger">Target Group is required</div>
                                       </div>
                                   </div>

                                  <div class="text-areas-container">
                                    <div class="col-md-12 mt-custom-2">
                                        <label for="brief" class="form-label">Brief</label>
                                        <textarea v-model="form.brief" class="form-control" id="brief" ></textarea>
                                        <div class="input-errors" v-for="error of v$.brief.$errors" :key="error.$uid">
                                            <div class="text-danger">Brief is required</div>
                                          </div>
                                      </div>
    
                                       <div class="col-md-12 mt-custom-2">
                                         <label for="campaign" class="form-label">Pin Points</label>
                                         <textarea v-model="form.painPoints" type="text" class="form-control" id="painPoints" ></textarea>
                                         <div class="input-errors" v-for="error of v$.painPoints.$errors" :key="error.$uid">
                                             <div class="text-danger">Pin Points is required</div>
                                           </div>
                                       </div>
                                  </div>
 
                                   
                                   <div class="upload-section">
                                    <label for="file-upload" class="file-upload-label">
                                        <input type="file" @change="onFileChange" class="form-control" id="file-upload">
                                        
                                            class="d-flex flex-column align-items-center justify-content-center upload-box text-white">
                                            <input type="file" id="file-upload" hidden>
                                            <div class="fs-1">+</div>
                                            <div class="mb-6">
                                                <span class="fs-5">Upload file</span>
                                            </div>
                                        </label>

                                    </div>
                                </div>

                                   <div class="col-12">
                                       <div class="d-grid">
                                         <button @click="onSubmit" :disabled="loading" class="btn maz-gradient-btn d-flex justify-content-center align-items-center" type="button"> 
                                            <div v-if="loading" class="spinner-border text-white " role="status"> <span class="visually-hidden">Loading...</span></div>
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

.mt-custom-2{
    margin-top: 2rem !important;
}

.my-card {
    box-shadow: 0 0rem 0rem rgb(0 0 0 / 20%) !important;
    margin-bottom: -15px;
}

.fuck-top{
    margin-top: -.9rem !important;
}

.p-datepicker {
    margin-top: -.4rem !important;
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
.text-areas-container{
    margin-top: -5rem;
}
</style>
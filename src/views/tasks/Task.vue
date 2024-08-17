<script setup>
import moment from 'moment';
import Layout from '@/views/shared/Layout.vue';
import BreadCrumb from '@/components/BreadCrumb.vue';
import Dialog from 'primevue/dialog';
import { usePlacesAutocomplete } from 'vue-use-places-autocomplete'
import InputText from 'primevue/inputtext';
import ConfirmPopup from 'primevue/confirmpopup';
import InputNumber from 'primevue/inputnumber';
import Select from 'primevue/select';
import { useRoute } from 'vue-router';
import DatePicker from 'primevue/datepicker';
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { useActivation } from '@/stores/activation';
import { useTask } from '@/stores/task';
import { onMounted, ref, reactive } from 'vue';
import useToaster from '@/composables/useToaster';
import { useConfirm } from "primevue/useconfirm";
import GoogleAutocomplete from '@/components/GoogleAutocomplete.vue';
import Drawer from 'primevue/drawer';
import AutoComplete from 'primevue/autocomplete';
import { watch } from 'vue';
import { geocodeByAddress, getLatLng,geocodeByLatLng,geocodeByPlaceId } from 'vue-use-places-autocomplete'
import FileUpload from 'primevue/fileupload';
import Button from 'primevue/button';
import Badge from 'primevue/badge';


const route = useRoute();
const activationName = ref(route.query.name);
const activation = ref(route.query.activation);

const visible = ref(false);
const tasks = ref([]);
const position = ref('top');

const toaster = useToaster();
const taskStore = useTask();
const confirm = useConfirm();

onMounted(() => {
    getTasksByActivationId();
})

const query = ref('');
const formattedSuggestions = ref([]);

const { suggestions,loading,sessionToken,refreshSessionToken } = usePlacesAutocomplete(query, {
  debounce: 500,
  minLengthAutocomplete: 3,
  refreshSessionToken: true
});

    const filteredCities = ref([]);

    const filterCities = (event) => {
      const searchQuery = event.query.toLowerCase();
      filteredCities.value = formattedSuggestions.value.filter(city => city.name.toLowerCase().includes(searchQuery));
    };

watch(suggestions, (newSuggestions) => {
      formattedSuggestions.value = newSuggestions.map(suggestion => ({
        name: suggestion.description,
        place_id: suggestion.place_id
      }));
    });

    const statuses = ref([
        { name: 'Finished', code: 'FINISHED' },
        { name: 'Planned', code: 'PLANNED' },
        { name: 'On Track', code: 'ONTRACK' },
        { name: 'Delayed', code: 'DELAYED' },
        { name: 'At Risk', code: 'ATRISK' }
    ]);

    const onSelectLocation = (event) => {
        console.log('event',event);
        getGeoCode(event);
       
    };

    const getGeoCode = async (event) => {
        const results =  await geocodeByAddress(event.value.name);
        const byPlacesId = await geocodeByPlaceId(event.value.place_id)
        // const { lat, lng } =  getLatLng(results);
        form.address = results[0].formatted_address;
        form.longitude = results[0].geometry.viewport.Hh.lo;
        form.latitude = results[0].geometry.viewport.Yh.hi


    }

    const types = ref([
        { name: 'Third Party', code: 'THIRDPARTY' },
        { name: 'Inhouse', code: 'INHOUSE' }
    ]);

const status = ref(null);
const type = ref(null);
const showLoading = ref(false);
const form = reactive({
    status: '',
    type: '',
    startDate: null,
	plannedEndDate: null,
	timeRecord: null,
    completion: null,
    jobNumber: null,
    name: null,
    address: null,
    longitude: null,
    latitude: null,
    NDAFile: null,
    SLAFile: null,
    activation: activation.value
});

const rules = { 
    status: { required },
    type: {required},
    name: { required },
    startDate: { required },
    plannedEndDate: { required },
	timeRecord: { required },
	jobNumber: { required },
	completion: { required },
    activation: { required }
};
const v$ = useVuelidate(rules, form);

const onSubmit = async () => {
    const isFormValid = await v$.value.$validate();
    if (!isFormValid) {return;}
    showLoading.value = true;
    
    if(isEdit.value){
        taskStore.update(taskId.value,form).then(function (response) {
            toaster.success("Task updated successfully");
            visible.value = false;
            getTasksByActivationId();
        }).catch(function (error) {
            toaster.error("Error updating task");
            console.log(error);
        });
    } 
    else {

        const formData = new FormData();
        formData.append('NDAFile', form.NDAFile);
        formData.append('SLAFile', form.SLAFile);
        formData.append('ActivationDTO', new Blob([JSON.stringify(form)], { type: 'application/json' }));

        const config = {
            useMultipartFormData: true // Add this flag to the request config
        };

        taskStore.submit(form,config).then(function (response) {
            showLoading.value = false;
        toaster.success("Task created successfully");
        visible.value = false;
        getTasksByActivationId();
    }).catch(function (error) {
        toaster.error("Error creating task");
        console.log(error);
    }).finally(() => {
        showLoading.value = false;
    });
    }
    
};

const onStatusChange = (event) => {
    form.status = event.value.code;
}


const onTypeChange = (event) => {
    form.type = event.value.code;
}

const onPlannedEndDateChange = (event) => {
    form.plannedEndDate = moment(event).format('YYYY-MM-DD');
}

const onPlannedStartDateChange = (event) => {
    form.startDate = moment(event).format('YYYY-MM-DD');
}

const getTasksByActivationId = async () => {
  taskStore.getTasksByActivationId(activation.value).then(response => {
  console.log("tasks", response.data);
    tasks.value = response.data;
  }).catch(error => {
    toaster.error("Error fetching tasks");
    console.log(error);
  }).finally(() => {
    //
  });
};




const taskId = ref(null);
const isEdit = ref(false);




const openModal = (pos,task) => {
    showLoading.value = false;
    if(task) {//edit
    isEdit.value = true;
    taskId.value=task.id;
    // form.activation = task.activation;
    status.value = statuses.value.find(stat => stat.code === task.status);
    form.status = form.status = statuses.value.find(stat => stat.code === task.status).code;

    type.value = types.value.find(stat => stat.code === task.type);
    form.type = form.type = types.value.find(stat => stat.code === task.type).code;
    Object.assign(form, {
    // status: task.status,
     startDate: task.startDate,
     plannedEndDate: task.plannedEndDate,
     timeRecord: task.timeRecord,
     completion: task.completion,
     jobNumber: Number(task.jobNumber),
     name: task.name,
    //  activation: task.activation
    })
  }else{
    
    Object.assign(form, {
     status: null,
     type: null,
     startDate: null,
     plannedEndDate: null,
     timeRecord: null,
     completion: null,
     jobNumber: null,
     name:null,
    //  activation: null
    })
  }  
    position.value = pos;
    visible.value = true;
}

const getStatus = (status) => {
    return statuses.value.find(stat => stat.code === status).name;
}



const getClass = (status) => {
    if(status === 'FINISHED') {
        return 'risk-finished';
    } else if(status === 'PLANNED') {
        return 'risk-planned';
    } else if(status === 'ONTRACK') {
        return 'risk-on-track';
    } else if(status === 'DELAYED') {
        return 'risk-delayed';
    } else if(status === 'ATRISK') {
        return 'risk-at-risk';
    }
}

const deleteTask = (task) => {
  taskStore.deleteTask(task.id).then(function (response) {
    toaster.success("Task deleted successfully");
    getTasksByActivationId();
  }).catch(function (error) {
    toaster.error("Error deleting task");
    console.log(error);
  });
}

const handlePlaceChanged = (place) => {
  console.log('Selected place:', place);
  // You can access more details about the place here
};


const deleteRecord = (event, task) => {
  confirm.require({
    target: event.currentTarget,
    message: 'Do you want to delete this task?',
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
      deleteTask(task);
    },
    reject: () => {
      // do nothing
    }
  });
};

const NDAFile = ref(null);
const SLAFile = ref(null);
const onNDAFileChange = (event) => {
    //if file is not pdf
    if (!event.target.files[0].name.includes(".pdf")) {
        toaster.error("Please upload a pdf file");
        NDAFile.value = null;
        return
    }
    NDAFile.value = event.target.files[0];
    form.NDAFile = event.target.files[0];
}
const onSLAFileChange = (event) => {
    if (!event.target.files[0].name.includes(".pdf")) {
        toaster.error("Please upload a pdf file");
        NDAFile.value = null;
        return
    }
    SLAFile.value = event.target.files[0];
    form.SLAFile = event.target.files[0];
}

const removeFile = (type) => {
    if(type === 'nda') {
        NDAFile.value = null;
    }else{
        SLAFile.value = null;
    }
}

</script>
<template>
    <Layout>
        <div class="page-wrapper">
            <div class="page-content">
                <BreadCrumb title="Tasks" icon="bx bx-task" />
                <h4 class="mx-2">{{activationName}}</h4>
                <div class="card">
                    <div class="card-body">
                            <div class="table-container-colour pt-2 p-5">
                                <div class="d-flex justify-content-between align-items-center mb-4">
                                    <h5>Main tasks to set up</h5>
                                    <button type="button" class="btn maz-gradient-btn" @click="openModal('top')" >Add New Task</button>
                                </div>
                                <table class="table table-dark table-bordered">
                                    <thead>
                                        <tr class="table-dark-color">
                                            <th>Activation</th>
                                            <th>Task</th>
                                            <th>Risk</th>
                                            <th>Start Date</th>
                                            <th>End Date</th>
                                            <th>Time Record</th>
                                            <th>Completion</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-if="tasks.length > 0" v-for="task in tasks" :key="task.id" class="table-dark-black">
                                            <td>{{ activationName }}</td>
                                            <td>{{ task.jobNumber }}</td>
                                            <td  :class="getClass(task.status)">
                                                {{ getStatus(task.status) }}
                                            </td>
                                            <td>{{task.startDate}}</td>
                                            <td>{{task.plannedEndDate}}</td>
                                            <td>{{task.timeRecord}}</td>
                                            <td>{{task.completion}}</td>
                                            <td>
                                                <div class="d-flex order-actions">
                                                  <a @click="openModal('top',task)" href="javascript:;" >
                                                    <i class='bx bxs-edit'></i>
                                                  </a>

                                                  <router-link :to="`/tasks/${task.id}?name=${task.name}`" class="ms-1" click="openModal('top',task)">
                                                    <i class='text-success bx bx-bullseye'></i>
                                                  </router-link>
                                                  
                                                  <a @click="deleteRecord($event, task)" href="javascript:;" class="ms-1">
                                                    <i class='bx bxs-trash text-danger'></i>
                                                  </a>
                                                  <ConfirmPopup></ConfirmPopup>
                                                </div>
                                                
                                              </td>
                                        </tr>
                                        <tr v-else>
                                            <td colspan="7" class="text-center text-danger">
                                                No tasks found.
                                            </td>
                                        </tr>
                                       
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Dialog v-model:visible="visible" modal :header="isEdit ? 'Edit Task' : 'Add Task'" :style="{ width: '50rem' }">
                
                <form @submit.prevent="onSubmit" class="row g-3">
                    <div class="col-md-6">
                        <div class="card my-card flex justify-center">
                            <label for="input1" class="form-label">Activation</label>
                             <InputText v-model="activationName" disabled />
                        </div> 
                    </div>

                    <div class="col-md-6">
                        <div class="card my-card flex justify-center">
                            <label for="input1" class="form-label">Name</label>
                            <InputText v-model="form.name" inputId="withoutgrouping"  :useGrouping="false" fluid />
                               <div class="input-errors" v-for="error of v$.name.$errors" :key="error.$uid">
                               <div class="text-danger">Name is required</div>
                            </div>
                    </div>                        
                    </div>
                    <div class="col-md-6">
                        <div class="card my-card flex justify-center">
                            <label for="input1" class="form-label">Job Number</label>
                            <InputNumber v-model="form.jobNumber" inputId="withoutgrouping" :useGrouping="false" fluid />
                               <div class="input-errors" v-for="error of v$.jobNumber.$errors" :key="error.$uid">
                               <div class="text-danger">Job Number is required</div>
                            </div>
                    </div>                        
                    </div>

                    <div class="col-md-6">
                        <div class="card my-card flex justify-center">
                            <label for="input1" class="form-label">Risk</label>
                            <Select v-model="status" @change="onStatusChange($event)" :options="statuses" showClear  optionLabel="name" placeholder="Select Risk" class="w-full md:w-56" />
                               <div class="input-errors" v-for="error of v$.status.$errors" :key="error.$uid">
                               <div class="text-danger">Risk is required</div>
                            </div>
                    </div>                        
                    </div>


                    <div class="col-md-6">
                        <div class="card my-card flex justify-center">
                            <label for="input1" class="form-label">Type</label>
                            <Select v-model="type" @change="onTypeChange($event)" :options="types" showClear  optionLabel="name" placeholder="Select Type" class="w-full md:w-56" />
                               <div class="input-errors" v-for="error of v$.type.$errors" :key="error.$uid">
                               <div class="text-danger">Type is required</div>
                            </div>
                     </div>                        
                    </div>

                    <div class="col-md-6">
                        <div class="card my-card flex justify-center">
                            <label for="input1" class="form-label">Planned Start Date</label>
                            <DatePicker v-model="form.startDate" @date-select="onPlannedStartDateChange($event)" showButtonBar showIcon fluid :showOnFocus="true" />
                               <div class="input-errors" v-for="error of v$.startDate.$errors" :key="error.$uid">
                               <div class="text-danger">Start date is required</div>
                            </div>
                    </div>
                </div>


                    <div class="col-md-6">
                        <div class="card my-card flex justify-center">
                            <label for="input1" class="form-label">Planned End Date</label>
                            <DatePicker v-model="form.plannedEndDate" @date-select="onPlannedEndDateChange($event)" showButtonBar showIcon fluid :showOnFocus="true" />
                               <div class="input-errors" v-for="error of v$.plannedEndDate.$errors" :key="error.$uid">
                               <div class="text-danger">End date is required</div>
                            </div>
                    </div>                        
                    </div>
                    <div class="col-md-6">
                        <div class="card my-card flex justify-center">
                            <label for="input1" class="form-label">Time Record</label>
                               <InputNumber v-model="form.timeRecord" inputId="withoutgrouping" fluid />
                               <div class="input-errors" v-for="error of v$.timeRecord.$errors" :key="error.$uid">
                               <div class="text-danger">Time Record is required</div>
                            </div>
                    </div>                        
                    </div>
                    <div class="col-md-6">
                        <div class="card my-card flex justify-center">
                            <label for="input1" class="form-label">Completion</label>
                               <InputText type="text" v-model="form.completion" />
                               <div class="input-errors" v-for="error of v$.completion.$errors" :key="error.$uid">
                               <div class="text-danger">Completion is required</div>
                            </div>
                    </div>                        
                    </div>
                    

                    <div class="col-md-6">
                        <div class="card my-card flex justify-center">
                            <label for="input1" class="form-label">Location</label>
                            <AutoComplete v-model="query" :suggestions="formattedSuggestions" 
                            optionLabel="name" @complete="filterCities" @item-select="onSelectLocation($event)" class="row mx-1" />
                               <div class="input-errors" v-for="error of v$.completion.$errors" :key="error.$uid">
                               <div class="text-danger">Location is required</div>
                            </div>
                    </div>                        
                    </div>

                    <template v-if="form.type == 'THIRDPARTY'">
                        <div class="col-md-6 mt-4">
                            <div class="NDA-container">
                                <div class="file-upload-wrapper">
                                    <input id="nda-file-upload-input" type="file" accept="application/pdf" hidden @change="onNDAFileChange($event)">
                                    <label for="nda-file-upload-input" class="custom-file-upload">Click to upload NDA file</label>
                                </div>
                            
                                <div v-if="NDAFile" id="file-preview" class="file-upload-preview mt-2">
                                    <img id="file-preview-image" src="/src/assets/images/pdf.png" alt="File Preview">
                                    <button type="button" class="file-remove-button" @click="removeFile('nda')">×</button>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 mt-4">
                            <div class="SLA-container">
                                <div class="file-upload-wrapper">
                                    <input id="sla-file-upload-input" type="file" accept="application/pdf" hidden @change="onSLAFileChange($event)">
                                    <label for="sla-file-upload-input" class="custom-file-upload">Click to upload SLA file</label>
                                </div>
                            
                                <div v-if="SLAFile" id="file-preview" class="file-upload-preview mt-2">
                                    <img id="file-preview-image" src="/src/assets/images/pdf.png" alt="File Preview">
                                    <button type="button" class="file-remove-button" @click="removeFile('sla')">×</button>
                                </div>
                            </div>
                        </div>
                    </template>

                    <div class="modal-footer" style="margin-top: 2rem">
                       
                        <button type="submit" class="btn  maz-gradient-btn w-100 text-white d-flex justify-content-center align-items-center">
                            <div
                            v-if="showLoading"
                            class="spinner-border text-white"
                            role="status"
                          >
                            <span class="visually-hidden">Loading...</span>
                          </div>
                          {{ isEdit ? 'Update' : 'Submit' }}</button>
                    </div>
                    
                </form>
            </Dialog>
    </Layout>
</template>
<style scoped>
.table-container-colour {
    background-color: #212020 !important;
}

.table-dark-color {
    background-color: #252525;
}

.table-dark-black {
    background-color: #1e1e1e;
}

.table-dark-light {
    background-color: #504f4f;
}

.table-dark td,
.table-dark th,
.table-dark thead th {
    padding: 10px !important;
    border: none !important;
}


.show {
    display: block;
}



.risk-at-risk {
    background-color: #ff0055;
    color: white;
}

.risk-on-track {
    background-color: #00d2ff;
    color: white;
}

.risk-planned {
    background-color: #ffa500;
    color: white;
}
.risk-finished {
    background-color: #15ca20 !important;
    color: white;
}

.risk-delayed {
    background-color: #b200ff;
    color: white;
}

.my-card {
    box-shadow: 0 0rem 0rem rgb(0 0 0 / 20%) !important;
    margin-bottom: -15px;
}
.p-autocomplete-input {
    width: 100% !important;
}


 .custom-file-upload {
    border: 2px solid;
    border-image: linear-gradient(to right, #9A3AB1, #117AD1) 1;
    display: inline-block;
    padding: 0.5rem 1rem;
    cursor: pointer;
    border-radius: 50px;
    color: #fff;
    text-align: center;
    width: 100%;
}

.custom-file-upload:hover {
    background-color: linear-gradient(to right, #9A3AB1, #117AD1);
    border-image: linear-gradient(to right, #9A3AB1, #117AD1) 1;
}

.file-upload-wrapper {
    position: relative;
    margin-top: 1.5rem;
}

.file-upload-preview {
    width: 100px;
    height: 100px;
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid #d6d6d6;
    position: relative;
    display: inline-block;
}

.file-upload-preview img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.file-remove-button {
    position: absolute;
    top: -1px;
    right: -1px;
    background-color: #ff4d6d;
    border-radius: 10%;
    width: 20px;
    height: 20px;
    color: white;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

</style>

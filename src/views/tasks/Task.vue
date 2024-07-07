<script setup>
import moment from 'moment';
import Layout from '@/views/shared/Layout.vue';
import BreadCrumb from '@/components/BreadCrumb.vue';
import Dialog from 'primevue/dialog';
import AutoComplete from 'primevue/autocomplete';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Select from 'primevue/select';
import DatePicker from 'primevue/datepicker';
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { useActivation } from '@/stores/activation';
import { useTask } from '@/stores/task';
import { onMounted, ref, reactive } from 'vue';
import useToaster from '@/composables/useToaster';


const visible = ref(false);
const activations = ref([]);
const tasks = ref([]);
const activation = ref(null);
const position = ref('top');
const dropdownItems = ref([]);

const activationStore = useActivation();
const toaster = useToaster();
const taskStore = useTask();

onMounted(() => {
    getActivations();
    getTasks();
})


    const statuses = ref([
    { name: 'Finished', code: 'FINISHED' },
    { name: 'Planned', code: 'PLANNED' },
    { name: 'On Track', code: 'ONTRACK' },
    { name: 'Delayed', code: 'DELAYED' },
    { name: 'At Risk', code: 'ATRISK' }
]);

const status = ref(null);
const form = reactive({
    status: '',
	plannedEndDate: null,
	timeRecord: null,
    completion: null,
    jobNumber: null,
    activation: null
});

const rules = { 
    status: { required },
	plannedEndDate: { required },
	timeRecord: { required },
	jobNumber: { required },
	completion: { required },
    activation: { required },
};
const v$ = useVuelidate(rules, form);

const onSubmit = async () => {
    const isFormValid = await v$.value.$validate();
    if (!isFormValid) {
        return;
    }
    taskStore.submit(form).then(function (response) {
        toaster.success("Activation created successfully");
        getActivations();
    }).catch(function (error) {
        toaster.error("Error creating activation");
        console.log(error);
    });
};

const onStatusChange = (event) => {
    console.log(event.value.code);
    form.status = event.value.code;
}

const onPlannedEndDateChange = (event) => {
    form.plannedEndDate = moment(event).format('YYYY-MM-DD');
}

const getTasks = async () => {
  taskStore.getTasks().then(response => {
    tasks.value = response.data.content;
  }).catch(error => {
    toaster.error("Error fetching activations");
    console.log(error);
  }).finally(() => {
    //
  });
};
const getActivations = async () => {
  activationStore.getActivations().then(response => {
    activations.value = response.data.content;
    dropdownItems.value = [...activations.value];
  }).catch(error => {
    toaster.error("Error fetching activations");
    console.log(error);
  }).finally(() => {
    //
  });
};

const search = (event) => {
    const query = event.query.toLowerCase();
	let myObj = activations.value.filter(activation => activation.name.toLowerCase().includes(query));
    dropdownItems.value = myObj.map(activation => activation.name);
};

const onActivationChange = (event) => {
	form.activation = activations.value.find(activation => activation.name === event.value).id;
};
const getActivationName =  (id) => {
    return activations.value.find(activation => activation.id === id).name;
}

const openModal = (pos) => {  
    position.value = pos;
    visible.value = true;
}

</script>
<template>
    <Layout>
        <div class="page-wrapper">
            <div class="page-content">
                <BreadCrumb title="Tasks" icon="bx bx-task" />
                <div class="card">
                    <div class="card-body">
                            <div class="table-container-colour pt-2 p-5">
                                <div class="d-flex justify-content-between align-items-center mb-4">
                                    <h5>Main tasks to set up</h5>
                                    <button type="button" class="btn maz-gradient-btn" @click="openModal('top')">Add New Task</button>
                                </div>
                                <table class="table table-dark table-bordered">
                                    <thead>
                                        <tr class="table-dark-color">
                                            <th>Activation</th>
                                            <th>Task</th>
                                            <th>Risk</th>
                                            <th>Planned End date</th>
                                            <th>Time Record</th>
                                            <th>Project Responsible</th>
                                            <th>Completion</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="task in tasks" :key="task.id" class="table-dark-black">
                                            <td>{{ getActivationName(task.activation) }}</td>
                                            <td>{{ task.jobNumber }}</td>
                                            <td class="risk-at-risk">{{task.status}}</td>
                                            <td>{{task.plannedEndDate}}</td>
                                            <td>{{task.timeRecord}}</td>
                                            <td>--To be Decided--</td>
                                            <td>{{task.completion}}</td>
                                        </tr>
                                       
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Dialog v-model:visible="visible" modal header="Add Task" :style="{ width: '50rem' }">

                <form @submit.prevent="onSubmit" class="row g-3">
                    <div class="col-md-6">
                        <div class="card my-card flex justify-center">
                            <label for="input1" class="form-label">Select Activation</label>
                             <AutoComplete v-model="activation" forceSelection dropdown :suggestions="dropdownItems" 
                              @item-select="onActivationChange" @complete="search" field="name" placeholder="Select Activation" />
                               <div class="input-errors" v-for="error of v$.activation.$errors" :key="error.$uid">
                               <div class="text-danger">Activation is required</div>
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

                    <div class="modal-footer">
                        <!-- <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button> -->
                        <button type="submit" class="btn maz-gradient-btn w-100">Submit</button>
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

.risk-delayed {
    background-color: #b200ff;
    color: white;
}

.my-card {
    box-shadow: 0 0rem 0rem rgb(0 0 0 / 20%) !important;
    margin-bottom: -15px;
}

</style>

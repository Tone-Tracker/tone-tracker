<script setup>
import moment from 'moment';
import Layout from '@/views/shared/Layout.vue';
import BreadCrumb from '@/components/BreadCrumb.vue';
import Dialog from 'primevue/dialog';
import AutoComplete from 'primevue/autocomplete';
import InputText from 'primevue/inputtext';
import ConfirmPopup from 'primevue/confirmpopup';
import InputNumber from 'primevue/inputnumber';
import Select from 'primevue/select';
import DatePicker from 'primevue/datepicker';
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { useActivation } from '@/stores/activation';
import { useTask } from '@/stores/task';
import { onMounted, ref, reactive } from 'vue';
import useToaster from '@/composables/useToaster';
import { useConfirm } from "primevue/useconfirm";



const visible = ref(false);
const activations = ref([]);
const tasks = ref([]);
const activation = ref(null);
const position = ref('top');
const dropdownItems = ref([]);

const activationStore = useActivation();
const toaster = useToaster();
const taskStore = useTask();
const confirm = useConfirm();

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
    if (!isFormValid) {return;}
    if(isEdit.value){
        taskStore.update(taskId.value,form).then(function (response) {
            toaster.success("Task updated successfully");
            visible.value = false;
            getTasks();
        }).catch(function (error) {
            toaster.error("Error updating task");
            console.log(error);
        });
    } 
    else {
        taskStore.submit(form).then(function (response) {
        toaster.success("Task created successfully");
        visible.value = false;
        getTasks();
    }).catch(function (error) {
        toaster.error("Error creating task");
        console.log(error);
    });
    }
    
};

const onStatusChange = (event) => {
    form.status = event.value.code;
}

const onPlannedEndDateChange = (event) => {
    form.plannedEndDate = moment(event).format('YYYY-MM-DD');
}

const getTasks = async () => {
  taskStore.getTasks().then(response => {
    tasks.value = response.data.content;
  }).catch(error => {
    toaster.error("Error fetching tasks");
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

const taskId = ref(null);
const isEdit = ref(false);
const openModal = (pos,task) => {
    if(task) {//edit
    isEdit.value = true;
    taskId.value=task.id;
    form.activation = task.activation;
    activation.value = activations.value.find(activation => activation.id === task.activation).name;
    status.value = statuses.value.find(stat => stat.code === task.status);
    form.status = form.status = statuses.value.find(stat => stat.code === task.status).code;
    Object.assign(form, {
    // status: task.status,
     plannedEndDate: task.plannedEndDate,
     timeRecord: task.timeRecord,
     completion: task.completion,
     jobNumber: Number(task.jobNumber),
     activation: task.activation
    })
  }else{
    isEdit.value = false;
    taskId.value = null;
    activation.value = null;
    status.value = null;
    form.activation = null;
    Object.assign(form, {
     status: null,
     plannedEndDate: null,
     timeRecord: null,
     completion: null,
     jobNumber: null,
     activation: null
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
    getTasks();
  }).catch(function (error) {
    toaster.error("Error deleting task");
    console.log(error);
  });
}


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
                                    <button type="button" class="btn maz-gradient-btn" @click="openModal('top')" >Add New Task</button>
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
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="task in tasks" :key="task.id" class="table-dark-black">
                                            <td>{{ getActivationName(task.activation) }}</td>
                                            <td>{{ task.jobNumber }}</td>
                                            <td  :class="getClass(task.status)">
                                                {{ getStatus(task.status) }}
                                            </td>
                                            <td>{{task.plannedEndDate}}</td>
                                            <td>{{task.timeRecord}}</td>
                                            <td>--To be Decided--</td>
                                            <td>{{task.completion}}</td>
                                            <td>
                                                <div class="d-flex order-actions">
                                                  <a @click="openModal('top',task)" href="javascript:;" >
                                                    <i class='bx bxs-edit'></i>
                                                  </a>
                                                  <a @click="deleteRecord($event, task)" href="javascript:;" class="ms-3">
                                                    <i class='bx bxs-trash'></i>
                                                  </a>
                                                  <ConfirmPopup></ConfirmPopup>
                                                </div>
                                                
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
                        <button type="submit" class="btn maz-gradient-btn w-100">{{ isEdit ? 'Update' : 'Submit' }}</button>
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

</style>

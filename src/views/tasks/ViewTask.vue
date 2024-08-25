<script setup>
import Layout from '../shared/Layout.vue';
import BreadCrumb from '../../components/BreadCrumb.vue';
import { onMounted, reactive, ref } from 'vue';
import { usePromoter } from '@/stores/promoter';
import { useTask } from '@/stores/task';
import { useRoute, useRouter } from 'vue-router';
import Image from 'primevue/image';
import avatarGenerator from '@/helpers/avatarGenerator';
import useToaster from '@/composables/useToaster';

const route = useRoute();
const router = useRouter();
const toaster = useToaster();


const isLoading = ref(false);

const taskName = ref(route.query.name);

const singleTask = ref({});
const bids = ref([]);
const availablePromoters = ref([]);

const taskStore = useTask();
const taskId = ref(route.params.id);

onMounted(() => {
    getAvailablePromoters();
    getTask();
    getBids();
    
});

const statuses = ref([
    { name: 'Finished', code: 'FINISHED' },
    { name: 'Planned', code: 'PLANNED' },
    { name: 'On Track', code: 'ONTRACK' },
    { name: 'Delayed', code: 'DELAYED' },
    { name: 'At Risk', code: 'ATRISK' }
]);

const getStatus = (status) => {
    let myStatus = statuses.value.find((s) => s.code === status);
    return myStatus ? myStatus.name : '';
};

const form = reactive({
    status: '',
    type: '',
    address: '',
    startDate: null,
	plannedEndDate: null,
	timeRecord: null,
    completion: null,
    jobNumber: null,
    name: null
});

const getTask = async () => {
  taskStore.getTask(taskId.value).then(response => {
    singleTask.value = response.data
    Object.assign(form, response.data);
  }).catch(error => {
    toaster.error("Error fetching task");
    console.log(error);
  }).finally(() => {
    //
  });
};

const getBids = async () => {
  taskStore.getBids(taskId.value).then(response => {
    console.log("bids", response.data);
    bids.value = response.data
    Object.assign(form, response.data);
  }).catch(error => {
    toaster.error("Error fetching task");
    console.log(error);
  }).finally(() => {
    //
  });
};



  const getAvailablePromoters = async () => {  
  taskStore.getAvailablePromotersByTaskId(taskId.value).then(response => {
    console.log("tasks", response.data);
    availablePromoters.value = response.data;
  }).catch(error => {
    //toaster.error("Error fetching users");
    console.log(error);
  }).finally(() => {
    
  });
};




const redirectToProfile = (user) => {
  alert("user", user);
	let client = user.id;
	router.push({ path: `/profile/${user.id}/?taskId=${taskId.value}` });
}

const selectedPromoterIds = ref([]);
const togglePromoterSelection = (promoterId) => {
    const index = selectedPromoterIds.value.indexOf(promoterId);
    if (index > -1) {
        selectedPromoterIds.value.splice(index, 1); // Unselect (remove from array)
    } else {
        selectedPromoterIds.value.push(promoterId); // Select (add to array)
    }
    console.log('selectedPromoterIds',selectedPromoterIds.value);
    
};

const saveSelectedPromoters = () => {
  isLoading.value = true;
  
  // Ensure selectedPromoterIds.value is an array before sending it
  const promoterIdsArray = Array.isArray(selectedPromoterIds.value) ? selectedPromoterIds.value : [selectedPromoterIds.value];

  taskStore.addPromotersToTask(taskId.value, promoterIdsArray)
    .then(response => {
      console.log("response", response);
      toaster.success("Promoters added successfully");
      getTask();
      getAvailablePromoters();
    })
    .catch(error => {
      toaster.error("Error adding promoters");
      console.log(error);
    })
    .finally(() => {
      isLoading.value = false;
    });
}


</script>
<template>
  <Layout>
    <!--start page wrapper -->
    <div class="page-wrapper">
      <div class="page-content">
        <BreadCrumb :title="taskName" icon="bx bx-task" />
        <div class="row">
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-body">
                        <div class="row g-2">
                            <div class="col-md-4">
                                <label for="input1" class="form-label">Task Name</label>
                                <input v-model="taskName" type="text" readonly class="form-control" id="input1" >
                            </div>
                            <div class="col-md-4">
                                <label for="input1" class="form-label">Activation Name</label>
                                <input v-model="taskName" type="text" readonly class="form-control" id="input1" >
                            </div>
                            <div class="col-md-4">
                                <label for="input2" class="form-label">Job Number</label>
                                <input v-model="form.jobNumber" type="text" readonly class="form-control" id="input2" >
                            </div>
                            <div class="col-md-4">
                                <label for="input3" class="form-label">Risk</label>
                                <input :value="getStatus(form.status)" type="text" readonly class="form-control" id="input3">
                            </div>

                            <div class="col-md-4">
                                <label for="input1" class="form-label">Type</label>
                                <input v-model="form.type" type="text" readonly class="form-control" id="input1" >
                            </div>
                            <div class="col-md-4">
                                <label for="input2" class="form-label">Start Date</label>
                                <input v-model="form.startDate" type="text" readonly class="form-control" id="input2" >
                            </div>
                            <div class="col-md-4">
                                <label for="input2" class="form-label">Planned End Date</label>
                                <input v-model="form.plannedEndDate" type="text" readonly class="form-control" id="input2" >
                            </div>
                            <div class="col-md-4">
                                <label for="input3" class="form-label">Time Record</label>
                                <input v-model="form.timeRecord" type="text" readonly class="form-control" id="input3">
                            </div>


                            <div class="col-md-4">
                                <label for="input1" class="form-label">Completion</label>
                                <input v-model="form.completion" type="text" readonly class="form-control" id="input1" >
                            </div>
                            <div class="col-md-4">
                                <label for="input2" class="form-label">Location</label>
                                <input v-model="form.address" type="text" readonly class="form-control" id="input2" >
                            </div>
                            

                        </div>
                    </div>
                </div>
            </div>
         
        </div>

        <!-- show promoters -->
        <div v-if="singleTask && singleTask.type === 'INHOUSE'">
          <div class="row mt-6 row-cols-xl-9 gap-4">
            <div>
              <h4 class="mb-2 ml-2">Promoters on job</h4>
            </div>
            <template v-if="singleTask.promoterDetails?.length > 0">
              <div v-for="promoter in singleTask.promoterDetails" :key="promoter.id" class="col-img">
                <div class="gallery">
                  <div class="card flex justify-center">
                    <Image alt="Image" preview>
                      <template #previewicon>
                        <i class='bx bx-search-alt-2'></i>
                      </template>
                      <template #image>
                          <img v-if="promoter.userDetails.image != null"
                          :src="promoter.userDetails.image ? promoter.userDetails.image : avatarGenerator(promoter.userDetails.firstName, promoter.userDetails.lastName)" 
                          alt="image" width="250" />
                      </template>
                      <template #preview="slotProps">
                        <img 
                          :src="promoter.userDetails.image ? promoter.userDetails.image : avatarGenerator(promoter.userDetails.firstName, promoter.userDetails.lastName)" 
                          alt="preview" :style="slotProps.style" @click="slotProps.onClick" />
                      </template>
                    </Image>
                  </div>
                  <div>
                    <RouterLink :to="`/profile/${promoter.id}?taskId=${taskId}`">
                    <div class="desc cursor-pointer" >
                      {{ promoter.userDetails.firstName }} {{ promoter.userDetails.lastName }}
                    </div>
                  </RouterLink>
                  </div>
                </div>
              </div>  
            </template>  
            <template v-else>
              <div class="text-center mt-2 text-danger">No available Promoters on the job.</div>
            </template> 
          </div>        
          <div class="row mt-6 row-cols-xl-9 gap-4">
            <div>
              <h4 class="mb-2 ml-2">Available Promoters</h4>
            </div>
            <template v-if="availablePromoters?.length > 0">
              <div v-for="availablePromoter in availablePromoters" :key="availablePromoter.id" class="col-img">
                <div class="gallery">
                  <div class="card flex justify-center">
                    <KeepAlive>
                      <Image alt="Image" preview>
                        <template #previewicon>
                          <i class='bx bx-search-alt-2'></i>
                        </template>
                        <template #image>
                          <img
                            :src="availablePromoter.userDetails.image ? availablePromoter.userDetails.image : avatarGenerator(availablePromoter.userDetails.firstName, availablePromoter.userDetails.lastName)" 
                            alt="image" width="250" />
                        </template>
                        <template #preview="slotProps">
                          <img 
                            :src="availablePromoter.userDetails.image ? availablePromoter.userDetails.image : avatarGenerator(availablePromoter.userDetails.firstName, availablePromoter.userDetails.lastName)" 
                            alt="preview" :style="slotProps.style" @click="slotProps.onClick" />
                        </template>
                      </Image>
                    </KeepAlive>
                  </div>
                  <div class="checkbox">
                    <input type="checkbox" id="select" @change="togglePromoterSelection(availablePromoter.id)">
                    <span>&#x2713;</span>
                  </div>
                  <div>
                    <div class="desc cursor-pointer" @click="redirectToProfile(availablePromoter)">
                      {{ availablePromoter.userDetails.firstName }} {{ availablePromoter.userDetails.lastName }}
                    </div>
                  </div>
                </div>
              </div>  
            </template>
            <template v-else>
              <div class="text-center mt-2 text-danger">No available Promoters.</div>
            </template> 
            <div class="ms-auto" v-if="selectedPromoterIds.length > 0">
              <a @click="saveSelectedPromoters" href="javascript:;" class="w-80 btn d-flex justify-content-center align-items-center maz-gradient-btn radius-30 mt-lg-0">
                <div v-if="isLoading" class="spinner-border text-white" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
                <i v-if="!isLoading" class="bx bxs-plus-square"></i>
                {{ isLoading ? '' : 'Save' }}
              </a>
            </div>
          </div>
        </div>

      <!-- end show promoters -->
       <!-- show a table of bids -->
        <div v-if="singleTask && singleTask.type === 'THIRDPARTY'">
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
              <tr v-if="bids?.length > 0" v-for="bid in bids" :key="bid.id">
                <td>Test</td>
                <td>{{ bid.taskDTO?.name }}</td>
                <td>{{ bid.taskDTO?.status }}</td>
                <td>{{ bid.taskDTO?.startDate }}</td>
                <td>{{ bid.taskDTO?.plannedEndDate }}</td>
                <td>{{ bid.taskDTO?.timeRecord }}</td>
                <td>{{ bid.taskDTO?.completion }}</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
       <!-- end show here -->

      </div>
    </div>
    <!--start switcher-->
  </Layout>
</template>



<style scoped>

.main-dashboard-head {
  display: flex;
  align-items: center;
}

.page-icon {
  max-width: 4rem !important;
  fill: linear-gradient(to right, #9A3AB1, #117A);
  margin-right: 1rem
}

.maz-height {
  font-size: 3rem;
  height: 7rem;
}

html.dark-theme .widgets-icons {
  color: #fff;
}

.maz-table-row-height {
  height: 55px;
}

.col-width-30 {
  width: 4.5%;
}

.col-width-10 {
  width: 10%;
}

div.gallery {
  margin: 5px;
  border: 1px solid #12181A;
  float: left;
  width: 180px;
}

div.gallery:hover {
  border: 1px solid #777;
}

div.gallery img {
  width: 100%;
  height: auto;
}

.col-img {
  position: relative;
  display: inline-block;
  width: 200px;
  
}

.gallery {
  position: relative;
}

.gallery img {
  width: 100%;
  height: auto;
}

.desc {
  text-align: center;
  padding: 10px;
  font-size: 18px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
}

.checkbox {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 24px;
  height: 24px;
  background-color: white;
  border: 2px solid #000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.checkbox input[type="checkbox"] {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  width: 100%;
  height: 100%;
  margin: 0;
}

.checkbox input[type="checkbox"]:checked+span {
  background-color: white;
  font-weight: 1000;
  color: black;
  background-color: transparent;
}

div.desc {
  padding: 13px;
  text-align: center;
}

.col-img {
  flex: 0 0 0%;
}

.mt-6 {
  margin-top: 2rem !important;
}

.asc {
  text-align: center;
  background: #12181A;
  width: 180px;
  line-height: 1;
  /* font-size: 1.2rem; */
  font-weight: 600;
}

.maz-table {
  background: #575757;
}

html.dark-theme .table td,
html.dark-theme .table th {
  border-color: #141414;
}

@media (max-width: 768px) {
  .main-dashboard-head {
    flex-direction: column;
    align-items: flex-start;
  }

  .col-img {
    width: 100%;
  }

  .gallery {
    width: 100%;
  }

  .table-responsive {
    overflow-x: auto;
  }

  .my-table {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}

/* ///////////// */
.img-fluid {
            /* border-radius: 8px; */
            transition: transform 0.2s;
        }

        .img-fluid:hover {
            transform: scale(1.05);
        }

        .container {
            text-align: center;
        }

        @media (max-width: 576px) {
            .col-sm-6 {
                flex: 0 0 100%;
                max-width: 100%;
            }
        }
</style>

<script setup>
import Layout from '../shared/Layout.vue';
import BreadCrumb from '../../components/BreadCrumb.vue';
import { onMounted, reactive, ref } from 'vue';
import { useClientStore } from '@/stores/useClient';
import { usePromoter } from '@/stores/promoter';
import { useTask } from '@/stores/task';
import { useRoute, useRouter } from 'vue-router';
import TaskTable from '@/components/TaskTable.vue';
import { useUserStore } from '@/stores/userStore';
import Image from 'primevue/image';


const route = useRoute();
const router = useRouter();


const taskName = ref(route.query.name);

const tasks = ref([]);
const users = ref([]);
const clients = ref([]);
const promoters = ref([]);

const clientStore = useClientStore();
const taskStore = useTask();
const userStore = useUserStore();
const promoterStore = usePromoter();
const taskId = ref(route.params.id);

onMounted(() => {
    getAvailablePromoters();
    getUsers();
    getTask();
    
});

const statuses = ref([
    { name: 'Finished', code: 'FINISHED' },
    { name: 'Planned', code: 'PLANNED' },
    { name: 'On Track', code: 'ONTRACK' },
    { name: 'Delayed', code: 'DELAYED' },
    { name: 'At Risk', code: 'ATRISK' }
]);

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
    Object.assign(form, response.data);
  }).catch(error => {
    toaster.error("Error fetching task");
    console.log(error);
  }).finally(() => {
    //
  });
};

const getUsers = async () => {
	userStore.getUsers().then(function (response) {
    
		users.value = response.data.content
	}).catch(function (error) {
		toaster.error("Error fetching promoter");
		console.log(error);
	}).finally(function () {
		//
	})
  }
  

  const getAvailablePromoters = async () => {  
  taskStore.getTasksByPromoterId(taskId.value).then(response => {
    console.log("tasks", response.data);
    promoters.value = response.data.content;
  }).catch(error => {
    //toaster.error("Error fetching users");
    console.log(error);
  }).finally(() => {
    
  });
};

const getAllClients = () => {
  clientStore.getClients().then(function (response) {
    clients.value = response.data.content;
  }).catch(function (error) {
    toaster.error("Error fetching users");
    console.log(error);
  }).finally(function () {
    ///
  })
}


const redirectToProfile = (user) => {
	let client = user.id;
	router.push({ path: '/profile', query: { client } });
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
                                <input v-model="form.risk" type="text" readonly class="form-control" id="input3">
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
                            <!-- <div class="col-md-4">
                                <label for="input3" class="form-label">Time Record</label>
                                <input v-model="form.timeRecord" type="text" readonly class="form-control" id="input3">
                            </div> -->


                        </div>
                    </div>
                </div>
            </div>
         
        </div>

        <div class="row mt-6 row-cols-xl-9 gap-4">
          <div class="">
            <h4 class="mb-2 ml-2">Available Promoters</h4>
          </div>
          <div v-for="user in promoters" :key="user.id" class="col-img ">
            <div  class="gallery">
            
                <!-- <img src="../../assets/images/avatars/avatar-1.png" alt="Cinque Terre" class="img-fluid"> -->
                <div class="card flex justify-center">
                  <Image alt="Image" preview>
                      <template #previewicon>
                        <i class='bx bx-search-alt-2' ></i>
                      </template>
                      <template #image>
                          <img src="https://primefaces.org/cdn/primevue/images/galleria/galleria11.jpg" alt="image" width="250" />
                      </template>
                      <template #preview="slotProps">
                          <img src="https://primefaces.org/cdn/primevue/images/galleria/galleria11.jpg" alt="preview" :style="slotProps.style" @click="slotProps.onClick" />
                      </template>
                  </Image>
                  </div>
             
              <div class="checkbox">
                <input type="checkbox" id="select">
                <span>&#x2713;</span>
              </div>
              <div>
                <div class="desc cursor-pointer" @click="redirectToProfile(user)">
                  {{ user.firstName }} {{ user.lastName }}</div>
              </div>
            </div>
          </div>   
         
        </div>

        <div class="row mt-6 row-cols-xl-9 gap-4">
          <div class="">
            <h4 class="mb-2 ml-2">Promoters on job</h4>
          </div>
          <div class="col-img ">
            <div class="gallery">
              <router-link to="/profile">
                <img src="../../assets/images/avatars/avatar-1.png" alt="Cinque Terre" class="img-fluid">
              </router-link>
              <div>
                <div class="desc">Mazisi Msebele</div>
                <div><button class="btn btn-danger rounded-0 w-100">Remove</button></div>
              </div>
            </div>
          </div>
    
        
        </div>
     
      </div>
    </div>
    <!--start switcher-->
  </Layout>
</template>



<style scoped>
@import 'lightbox2/dist/css/lightbox.css';

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

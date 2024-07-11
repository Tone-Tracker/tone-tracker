<script setup>
import Layout from '../shared/Layout.vue';
import BreadCrumb from '../../components/BreadCrumb.vue';
import { onMounted, ref } from 'vue';
import { useClientStore } from '@/stores/useClient';
import { usePromoter } from '@/stores/promoter';
import { useTask } from '@/stores/task';
import { useRoute, useRouter } from 'vue-router';
import TaskTable from '@/components/TaskTable.vue';
import { useUserStore } from '@/stores/userStore';
import Image from 'primevue/image';


const route = useRoute();
const router = useRouter();


const selectedClient = ref('');

const tasks = ref([]);
const users = ref([]);
const clients = ref([]);


const clientStore = useClientStore();
const taskStore = useTask();
const userStore = useUserStore();
onMounted(() => {
    getUsers();
    getTasks();
	  getAllClients();
});

const statuses = ref([
    { name: 'Finished', code: 'FINISHED' },
    { name: 'Planned', code: 'PLANNED' },
    { name: 'On Track', code: 'ONTRACK' },
    { name: 'Delayed', code: 'DELAYED' },
    { name: 'At Risk', code: 'ATRISK' }
]);

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

const getUsers = async () => {
	userStore.getUsers().then(function (response) {
    console.log(response.data)
		users.value = response.data.content
	}).catch(function (error) {
		toaster.error("Error fetching promoter");
		console.log(error);
	}).finally(function () {
		//
	})
  }

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
        <BreadCrumb title="Report" icon="bx bx-line-chart" />
        <div class="row row-cols-xl-9">
          <div class="d-flex align-items-center justify-content-between ms-2">
            <h4 class="mb-2 ml-2">Projects</h4>
            <div class="align-self-end mb-4"><button class="btn rounded-0 btn-primary">Download report</button></div>
          </div>
          <div class="ms-2">
            <h4 class="mb-2 ml-2">Team</h4>
          </div>
          <div class="d-flex gap-5">

            <div class="col-img">
             <div class="gallery">
              <div class="asc py-3">TTG Head Office Super User</div>
              <router-link to="/profile">
                <img src="../../assets/images/avatars/avatar-1.png" alt="Cinque Terre" class="img-fluid">
              </router-link>
            </div>
          </div>
        
        </div>
       
        </div>

        <div class="row mt-6 row-cols-xl-9 gap-4">
          <div class="">
            <h4 class="mb-2 ml-2">Available Promoters</h4>
          </div>
          <div v-for="user in users" :key="user.id" class="col-img ">
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
                <div><button class="btn btn-primary rounded-0 w-100">Add</button></div>
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
              <div class="checkbox">
                <input type="checkbox" id="select">
                <span>&#x2713;</span>
              </div>
              <div>
                <div class="desc">Mazisi Msebele</div>
                <div><button class="btn btn-primary rounded-0 w-100">Add</button></div>
              </div>
            </div>
          </div>
    
        
        </div>
     
      </div>

      <div class="col-12 col-lg-12 mt-4 mb-6 ps-3">
        <h2 class="mb-4"><i class='bx bx-check-circle text-primary'></i> Completed:</h2>
      </div>

      <div class="row">
        <div class="col-xl-4 col-lg-12 col-md-12 col-sm-12">
          <div class="card radius-10">
            <div class="card-body">
              <div class="">
                <div id="chart3" style="height:250px;"><svg height="250" version="1.1" width="665.328" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="overflow: hidden; position: relative;">
                    <desc style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">Created with Raphaël 2.2.0</desc>
                    <defs style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></defs>
                    <path fill="none" stroke="#008cff" d="M332.664,201.66666666666669A76.66666666666667,76.66666666666667,0,0,0,408.94122662266636,132.71767299982181" stroke-width="2" opacity="0" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 0;"></path>
                    <path fill="#008cff" stroke="#ffffff" d="M332.664,204.66666666666669A79.66666666666667,79.66666666666667,0,0,0,411.92598766442285,133.01966889981483L442.1052381977387,136.07318299974432A110,110,0,0,1,332.664,235Z" stroke-width="3" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></path>
                    <path fill="none" stroke="#15ca20" d="M408.94122662266636,132.71767299982181A76.66666666666667,76.66666666666667,0,0,0,261.12270210661495,97.4387867918025" stroke-width="2" opacity="1" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 1;"></path>
                    <path fill="#15ca20" stroke="#ffffff" d="M411.92598766442285,133.01966889981483A79.66666666666667,79.66666666666667,0,0,0,258.3232600151347,96.36030453582956L225.35205315992243,83.65818018770375A115,115,0,0,1,447.0798399339995,136.5765094997327Z" stroke-width="3" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></path>
                    <path fill="none" stroke="#fd3550" d="M261.12270210661495,97.4387867918025A76.66666666666667,76.66666666666667,0,0,0,332.6399144567186,201.66666288331834" stroke-width="2" opacity="0" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 0;"></path>
                    <path fill="#fd3550" stroke="#ffffff" d="M258.3232600151347,96.36030453582956A79.66666666666667,79.66666666666667,0,0,0,332.638971978938,204.6666627352743L332.6294424813789,234.99999457171762A110,110,0,0,1,230.01778997905626,85.45565061432532Z" stroke-width="3" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></path><text x="332.664" y="115" text-anchor="middle" font-family="&quot;Arial&quot;" font-size="15px" stroke="none" fill="#000000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: middle; font-family: Arial; font-size: 15px; font-weight: 800;" font-weight="800" transform="matrix(1.7424,0,0,1.7424,-246.9778,-93.5455)" stroke-width="0.5739130434782609">
                      <tspan dy="6" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">Nokia</tspan>
                    </text><text x="332.664" y="135" text-anchor="middle" font-family="&quot;Arial&quot;" font-size="14px" stroke="none" fill="#000000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: middle; font-family: Arial; font-size: 14px;" transform="matrix(1.5972,0,0,1.5972,-198.6743,-75.8472)" stroke-width="0.6260869565217391">
                      <tspan dy="5" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">30</tspan>
                    </text>
                  </svg></div>
              </div>
            </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item d-flex bg-transparent justify-content-between align-items-center border-top">
                Apple <span class="badge bg-danger rounded-pill">20</span>
              </li>
              <li class="list-group-item d-flex bg-transparent justify-content-between align-items-center">Samsung <span class="badge bg-primary rounded-pill">15</span>
              </li>
              <li class="list-group-item d-flex bg-transparent justify-content-between align-items-center">Nokia <span class="badge bg-success rounded-pill">30</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="col-xl-8 col-lg-12 col-md-12 col-sm-12">
         
          <TaskTable :tasks="tasks" :statuses="statuses"/>  
        </div>
      </div>

      <div class="card bg-primary p-5">
        <div class="card-body">
          <div class="my-table" style="padding-left: 7rem;padding-right: 7rem;">
            <div class="col-12">
              <h3 class="text-center fs-2 bg-gray">Post campaign analysis</h3>
            </div>
            <table class="table table-bordered mb-0 maz-table">
              <thead>
                <tr>
                  <th scope="col">JOBS</th>
                  <th scope="col">COMMENT</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Reported By</td>
                  <td>Mazisi Msebele</td>
                </tr>
                <tr>
                  <td>What worked</td>
                  <td>
                    <ol>
                      <li style="list-style:disc;">MC shoutouts, drive interest and sales</li>
                      <li style="list-style:disc;">Price point packages to be reconsidered for some venues - As seen
                        with Milano, it produces good results - All venues that have price points & specials that accommodate the affordability of the crowd always have good sales</li>
                      <li style="list-style:disc;">Good sales reps and venue relationships (Drama, Nostra, Milano, Liv Sandton, Groove</li>
                      <li style="list-style:disc;">Tales</li>
                    </ol>
                  </td>
                </tr>
                <tr>
                  <td>What didn't work</td>
                  <td>
                    <ol>
                      <li style="list-style:disc;">Club refused to play AV as they were promoting their content</li>
                      <li style="list-style:disc;">Club manager bought 12 bottles to win the 3L bottles and did not
                        consume the purchased 12 bottles throughout the night</li>
                      <li style="list-style:disc;">Insisted on full kit to be used for set up (Delayed set up by an
                        hour)</li>
                    </ol>
                  </td>
                </tr>

                <tr>
                  <td>Suggestions</td>
                  <td>
                    <ol>
                      <li style="list-style:disc;">Clear comms and expectations between venue and sales reps</li>
                      <li style="list-style:disc;">Review venue selections for next activation round</li>
                    </ol>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="mt-2 text-center cursor-pointer d-flex justify-content-center align-items-center">
              <span>Load More</span>
              <i class='bx bx-chevron-down fs-2'></i>
            </div>
          </div>
        </div>
      </div>

      <div class="card radius-10 w-100">
        <div class="card-header">
          <div class="d-flex align-items-center justify-content-center">
            <h6 class="mb-0 text-center fs-2">Overall Summary</h6>
          </div>
        </div>
        <div class="card-body">
          <div class="chart-container1">
            <canvas id="chart8" width="1301" height="380" style="display: block; box-sizing: border-box; height: 380px; width: 1301px;"></canvas>
          </div>
        </div>
      </div>

      <div class="row my-6 row-cols-xl-9">
        <div class="">
          <h4 class="mb-2 ml-2">Gallery</h4>
        </div>
        <div class="col-img">
          <div class="gallery">
            <a data-lightbox="image-1" data-title="My caption" href="../../assets/images/avatars/avatar-1.png">
              <img src="../../assets/images/avatars/avatar-1.png" alt="Cinque Terre" class="img-fluid">
            </a>
          </div>
        </div>
        <div class="col-img">
          <div class="gallery">
            <a data-lightbox="image-1" data-title="My caption" href="../../assets/images/avatars/avatar-2.png">
              <img src="../../assets/images/avatars/avatar-2.png" alt="Forest" class="img-fluid">
            </a>
          </div>
        </div>
        <div class="col-img">
          <div class="gallery">
            <a data-lightbox="image-1" data-title="My caption" href="../../assets/images/avatars/avatar-3.png">
              <img src="../../assets/images/avatars/avatar-3.png" alt="Northern Lights" class="img-fluid">
            </a>
          </div>
        </div>
        <div class="col-img">
          <div class="gallery">
            <a data-lightbox="image-1" data-title="My caption" href="../../assets/images/avatars/avatar-4.png">
              <img src="../../assets/images/avatars/avatar-4.png" alt="Mountains" class="img-fluid">
            </a>
          </div>
        </div>
        <div class="col-img">
          <div class="gallery">
            <a href="../../assets/images/avatars/avatar-5.png" data-lightbox="image-1" data-title="My caption">
              <img src="../../assets/images/avatars/avatar-5.png" alt="Mountains" class="img-fluid">
            </a>
          </div>
        </div>
        <div class="col-img">
          <div class="gallery">
            <a data-lightbox="image-1" data-title="My caption" href="../../assets/images/avatars/avatar-6.png">
              <img src="../../assets/images/avatars/avatar-6.png" alt="Mountains" class="img-fluid">
            </a>
          </div>
        </div>
        <div class="mt-2 text-center cursor-pointer d-flex justify-content-center align-items-center">
          <span>Load More</span>
          <i class='bx bx-chevron-down fs-2'></i>
        </div>
      </div>

      
       <!-- <div class="row mt-6 row-cols-xl-9 row ms-3 me-3">
            <div class="my-4">
              <h4 class="">Gallery</h4>
            </div>
            <div v-for="i in 12" class="col-lg-4 col-md-3 col-sm-6">
                <img src="../../assets/images/avatars/avatar-1.png" class="img-fluid" alt="Image 1">
            </div>
      </div> -->
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

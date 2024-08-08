<script setup>
import { onMounted,ref,watch } from 'vue';
import { useActivation } from '@/stores/activation';
import { useRoute } from 'vue-router';
import Layout from '../shared/Layout.vue';
import TaskTable from '@/components/TaskTable.vue';
import { useTask } from '@/stores/task';
import Image from 'primevue/image';


const envPath = import.meta.env.VITE_S3_URL;
const taskStore = useTask();
const route = useRoute();
const activationStore = useActivation();

const tasks = ref([]);
const activationId = ref(route.query.activation);
const activationName = ref(route.query.name);
const campaignName = ref(route.query.campaign);
const activation = ref({});

const statuses = ref([
    { name: 'Finished', code: 'FINISHED' },
    { name: 'Planned', code: 'PLANNED' },
    { name: 'On Track', code: 'ONTRACK' },
    { name: 'Delayed', code: 'DELAYED' },
    { name: 'At Risk', code: 'ATRISK' }
]);



watch(() => route.params.activation, (newId) => {
    activationId.value = newId;
});

onMounted(() => {
    console.log('activationId',activationId.value)
    if(activationId.value){
        getActivationById();
    }
    
    getTasks();
    
});
const activationImages = ref([]);
const getActivationById = async () => {
    activationStore.getActivationById(activationId.value).then(function (response) {
        activation.value = response.data;
		getActivationImages(response.data.id);
    })
}


const getActivationImages = async (id) => {
    activationStore.getActivationImages(id).then(function (response) {
		console.log('activationImages',response)
        activationImages.value = response.data.content;
    })   
}

const getTasks = async () => {
  taskStore.getTasksByActivationId(activationId.value).then(response => {
    tasks.value = response.data;
  }).catch(error => {
    toaster.error("Error fetching tasks");
    console.log(error);
  }).finally(() => {
    //
  });
};

</script>
<template>
    <Layout>
        <div class="page-wrapper">
			<div class="page-content">
				<!--end breadcrumb-->
				<div class="container">
					<div class="main-body">
						<div class="row">
							<div class="col-lg-4">
								<div class="card">
									<div class="card-body">
										<div class="d-flex flex-column align-items-center text-center">
											<img src="/src/assets/images/avatars/avatar-10.png" alt="Admin" class="rounded-circle p-1 bg-primary" width="110">
											<div class="mt-3">
												<h4>{{ activation ? activationName : activation.name }}</h4>
												<p class="text-secondary mb-1">{{ campaignName }} Campaign</p>
											</div>
										</div>
										<hr class="my-4">
										<ul class="list-group list-group-flush">
											<li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
												<h6 class="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-globe me-2 icon-inline"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>Website</h6>
												<span class="text-secondary">https://codervent.com</span>
											</li>
											<li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
												<h6 class="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-github me-2 icon-inline"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>Github</h6>
												<span class="text-secondary">codervent</span>
											</li>
											<li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
												<h6 class="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-twitter me-2 icon-inline text-info"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>Twitter</h6>
												<span class="text-secondary">@codervent</span>
											</li>
											<li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
												<h6 class="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-instagram me-2 icon-inline text-danger"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>Instagram</h6>
												<span class="text-secondary">codervent</span>
											</li>
											<li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
												<h6 class="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-facebook me-2 icon-inline text-primary"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>Facebook</h6>
												<span class="text-secondary">codervent</span>
											</li>
										</ul>
									</div>
								</div>
							</div>
							
							<div class="col-lg-8">
								<div class="card">
									<div class="card-body">
										<div class="row mb-3">
											<div class="col-sm-3">
												<h6 class="mb-0">Name</h6>
											</div>
											<div class="col-sm-9 text-secondary">
												<input type="text" readonly class="form-control" :value="activation.name">
											</div>
										</div>
										<div class="row mb-3">
											<div class="col-sm-3">
												<h6 class="mb-0">Budget</h6>
											</div>
											<div class="col-sm-9 text-secondary">
												<input type="text" readonly class="form-control" :value="activation.budget">
											</div>
										</div>
										<div class="row mb-3">
											<div class="col-sm-3">
												<h6 class="mb-0">Start Date</h6>
											</div>
											<div class="col-sm-9 text-secondary">
												<input type="text" readonly class="form-control" :value="activation.startDate">
											</div>
										</div>
										<div class="row mb-3">
											<div class="col-sm-3">
												<h6 class="mb-0">End Date</h6>
											</div>
											<div class="col-sm-9 text-secondary">
												<input type="text" readonly class="form-control" :value="activation.endDate">
											</div>
										</div>
										<div class="row mb-3">
											<div class="col-sm-3">
												<h6 class="mb-0">Pain Points</h6>
											</div>
											<div class="col-sm-9 text-secondary">
												<input type="text" readonly class="form-control" :value="activation.painPoints">
											</div>
										</div>
                                        <div class="row mb-3">
											<div class="col-sm-3">
												<h6 class="mb-0">Brief</h6>
											</div>
											<div class="col-sm-9 text-secondary">
												<input type="text" readonly class="form-control" :value="activation.brief">
											</div>
										</div>
                                        <div class="row mb-3">
											<div class="col-sm-3">
												<h6 class="mb-0">Target Group</h6>
											</div>
											<div class="col-sm-9 text-secondary">
												<input type="text" readonly class="form-control" :value="activation.targetGroup">
											</div>
										</div>
										<!-- <div class="row">
											<div class="col-sm-3"></div>
											<div class="col-sm-9 text-secondary">
												<input type="button" class="btn btn-primary px-4" value="Save Changes">
											</div>
										</div> -->
									</div>
								</div>
								<div class="row">
									<div class="col-sm-12">
										<div class="card">
											<div class="card-body">
												<h5 class="d-flex align-items-center mb-3">Tasks</h5>
												<div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">         
                                                    <TaskTable :tasks="tasks" :statuses="statuses"/>  
                                                </div>
												
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div class="row mt-2 row-cols-xl-9 gap-4">
							<div class="">
							  <h4 class="mb-2 ml-2">Activation Images</h4>
							</div>
							<div v-for="activationImage in activationImages" :key="activationImage.id" class="col-img ">
							  <div  class="gallery">	
								  <div class="card flex justify-center">
									<Image alt="Image" preview>
										<template #previewicon>
										  <i class='bx bx-search-alt-2' ></i>
										</template>
										<template #image>
											<img :src="`${envPath}${activationImage.path}`" alt="image" width="250" />
										</template>
										<template #preview="slotProps">
											<img :src="`${envPath}${activationImage.path}`" alt="preview" :style="slotProps.style" @click="slotProps.onClick" />
										</template>
									</Image>
									</div>
							   
								<!-- <div class="checkbox">
								  <input type="checkbox" id="select">
								  <span>&#x2713;</span>
								</div> -->
							  </div>
							</div>
					  
						   
						  </div>
					</div>
				</div>
			</div>
		</div>
    </Layout>
</template>
<style scoped>
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
</style>
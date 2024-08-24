<script setup>
import BreadCrumb from "@/components/BreadCrumb.vue";
import Layout from "../shared/Layout.vue";
import { useAuth } from '@/stores/auth';
import { useTask } from "@/stores/task";
import { onMounted, ref } from "vue";
import { useRoute } from 'vue-router';
import Drawer from "primevue/drawer";
import PDF from "pdf-vue3";

const taskStore = useTask();
const authStore = useAuth();
const route = useRoute();

const user = JSON.parse(authStore.user);
const taskId = ref(route.params.id);
const singleTask = ref({});
const tasks = ref([]);

onMounted(() => {
  if(!user.activeUserId){
    return
  }
  getTask();
});
const bid = ref(null)
const getTask = async () => {
  taskStore.getTask(taskId.value).then(response => {
	console.log(response.data)
    singleTask.value = response.data?.taskDTO;
	bid.value =response.data
  }).catch(error => {
    toaster.error("Error fetching task");
    console.log(error);
  }).finally(() => {
    //
  });
};

const visible = ref(false);
const fullPath = ref(null);

const previewBase64PDF = () => {
        visible.value = true;
		fullPath.value = import.meta.env.VITE_S3_URL + singleTask.value.path;
   console.log(fullPath.value)
}
const download = () => {
     try {
        const link = document.createElement('a');
        link.href = import.meta.env.VITE_S3_URL + singleTask.value.path;
        link.setAttribute('download', '');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        console.error('Error downloading document:', error);
    }
};
</script>

<template>
    <Layout>
        <div class="page-wrapper">
			<div class="page-content">
				<!--breadcrumb-->
				<div class="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
					<div class="breadcrumb-title pe-3">View Task</div>
					
					<div class="ms-auto">
						<div class="btn-group">
							<router-link :to="`/add-supplier-costing/${bid?.id}`" class="btn btn maz-gradient-btn">Add Costing</router-link>
						</div>
					</div>
				</div>
				<!--end breadcrumb-->
				<div class="row">
					<div class="col-xl-8">
						
						<div class="card">
							<div class="card-body p-4">
								<div class="row g-3">
									<div class="col-md-6">
										<label for="input1" class="form-label">Name</label>
										<input type="text" class="form-control" id="input1" :value="singleTask.name">
									</div>

									
									<div class="col-md-6">
										<label for="input2" class="form-label">Job Number</label>
										<input type="text" class="form-control" id="input2" :value="singleTask.jobNumber">
									</div>
									<div class="col-md-6">
										<label for="input3" class="form-label">Status</label>
										<input type="text" class="form-control" id="input3" :value="singleTask.status">
									</div>
									<div class="col-md-6">
										<label for="input4" class="form-label">Address</label>
										<input type="email" class="form-control" id="input4" :value="singleTask.address">
									</div>
									<div class="col-md-6">
										<label for="input5" class="form-label">Start Date</label>
										<input type="text" class="form-control" id="input5" :value="singleTask.startDate">
									</div>
									<div class="col-md-6">
										<label for="input6" class="form-label">End Date</label>
										<input type="text" class="form-control" id="input6" :value="singleTask.plannedEndtext">
									</div>

									<div class="col-md-6">
										<label for="input6" class="form-label">Time Record</label>
										<input type="text" class="form-control" id="input6" :value="singleTask.timeRecord">
									</div>
									
								</div>
							</div>
						</div>
					</div>


                    <div class="col-xl-4 ">
						<h4>Documents</h4>
						<div class="card">
							<div class="card-body p-4">
								<form class="row g-3" v-if="singleTask.path">
									<div class="col-md-12">
                                        <div  class="file-details mt-3 p-1 border rounded d-flex align-items-center">
                                            <div class="file-icon me-3" v-tooltip.bottom="'View File'">
                                              <img @click="previewBase64PDF"  src="/src/assets/images/pdf.png" alt="pdf" class="img-fluid cursor-pointer" style=" width: 100px; height: 100px; border-radius: 6px;"/>
                                            </div>
                                            <div class="file-info">
                                              <!-- <p class="m-0 text-white">Brief.pdf</p> -->
                                            </div>
                                            <div class="ms-auto">
                                                <i @click="download" class='bx bxs-download maz-gradient-txt fs-2 cursor-pointer' v-tooltip="'Download'" ></i>
                                             
                                            </div>
                                          </div>
									</div>
								</form>
								<div class="text-danger">No brief document uploaded.</div>
							</div>
						</div>
					</div>
				</div>
				<!--end row-->

				<div class="card flex justify-center">
					<Drawer v-model:visible="visible" position="right" header="View Brief File" class="!w-full md:!w-80 lg:!w-[40rem]" style="width: 30rem!important;">
						<button @click="download" class="btn w-100 maz-gradient-btn mb-2" type="button">
							<i class='bx bxs-download'></i>
							Download</button>
						<PDF :src="fullPath" />
					</Drawer>
					
				</div>

			</div>
		</div>
    </Layout>
  </template>
  
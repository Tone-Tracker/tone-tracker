/**
Author: Mazisi Msebele
Date: 04/06/2024
**/

<template>
    <Layout>
        <!--start page wrapper -->
        <div class="page-wrapper">
            <div class="page-content">

                <!-- <BreadCrumb title="Profile" icon="bx bx-user-circle" /> -->
                <div class="main-dashboard-head">
                    <BreadCrumb title="Profile" icon="bx bxs-user"/>
                </div>
                <div class="row g-5">
                    <div class="ol-xl-4 col-lg-6 col-md-6 col-sm-12">
                        <div class="card-c">
                            <div class="d-flex flex-column card-header-c">
                                <div class="image-container">
                                    <div class="card flex justify-center">
                                        <Image alt="Image" preview>
                                            <template #previewicon>
                                              <i class='bx bx-search-alt-2' ></i>
                                            </template>
                                            <template #image>
                                                <img 
                                                :src="userInfo?.path ? envPath + userInfo?.path 
                                                : `https://ui-avatars.com/api/?name=${ getFullName() }&background=4263C5`" 
                                                alt="image" width="350" />
                                            </template>
                                            <template #preview="slotProps">
                                                <img 
                                                :src="userInfo?.path ? envPath + userInfo?.path : `https://ui-avatars.com/api/?name=${ getFullName() }&background=4263C5`" alt="preview" :style="slotProps.style" @click="slotProps.onClick" />
                                            </template>
                                        </Image>
                                        </div>
                                    <!-- <img src="g" alt="Admin" class="zoom-image" style="width: 300px; height: 350px;"> -->
                                    <div v-if="isMyProfile()" @click="showModal = true"
                                        class="edit-icon" data-bs-toggle="modal" data-bs-target="#addProfilePicModal">
                                        <i class='bx bx-edit-alt fs-2'></i>
                                    </div>
                                </div>

                                <div class="mt-3 mb-4">
                                    <h4 class="text- ">{{ getFullName() }} </h4>
                                </div>

                             
                                <!-- Add Profile picture modal -->
                                <div v-if="showModal" class="modal fade" id="addProfilePicModal" tabindex="-1" aria-labelledby="addModalLabel"
                                aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="addModalLabel">Update Profile Picture</h5>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                aria-label="Close"></button>
                                                
                                        </div>
                                        <div class="modal-body">
                                            <!-- <input accept="image/*" @change="onProfilePicSelect($event)" type="file" name="prof-pic-upload" id="prof-pic-upload" hidden />
                                           <label  for="prof-pic-upload" class="w-100 btn btn-lg btn-success px-5"><i class='bx bx-image-add fs-3' ></i>Upload</label> -->
                                           <FileUploadForCropper
                                           :showFilePreview="showFilePreview" 
                                            accept="image/*" 
                                            fileType="image" 
                                            @fileUploaded="onProfilePicSelect"
                                            @fileDropped="onfileDropped"
                                         />
                                          
                                          <VuePictureCropper
                                          :boxStyle="{
                                            width: '100%',
                                            height: '100%',
                                            backgroundColor: '#f8f8f8',
                                            margin: 'auto',
                                          }"
                                          :img="pic"
                                          :options="{
                                            viewMode: 1,
                                            dragMode: 'move',
                                            aspectRatio: 1,
                                            cropBoxResizable: false,
                                          }"
                                          :presetMode="{
                                            mode: 'fixedSize',
                                            width: 300,
                                            height: 400,
                                          }"
                                          @ready="ready"
                                          class="mt-3"
                                        />
                                          
                                        <div class="tools" v-if="showTools">
                                            <button class="btn" data-bs-dismiss="modal">
                                              Cancel
                                            </button>
                                            <!-- <button class="btn" @click="clear">
                                              Clear
                                            </button> -->
                                            <button class="btn" @click="reset">
                                              Reset
                                            </button>
                                          </div>
                                        </div>

                                        <div class="modal-footer">
                                            <div class="col-12 mt-4">
                                                <div class="d-grid">
                                                    <button @click="getResult" class="btn maz-gradient-btn"
                                                        type="button">
                                                        Save
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
                    <div class="ol-xl-4 col-lg-6 col-md-6 col-sm-12">
                        <div class="card">
                            <div class="card-body p-4">
									<div class="row mb-3">
										<label for="first-name" class="col-sm-3 col-form-label">First Name</label>
										<div class="col-sm-9">
											<div class="position-relative input-icon">
												<input type="text" class="form-control" id="first-name" v-model="form.firstName">
												<span class="position-absolute top-50 translate-middle-y"><i class="bx bx-user"></i></span>
											</div>
										</div>
									</div>
                                    <div class="row mb-3">
										<label for="last-name" class="col-sm-3 col-form-label">Last Name</label>
										<div class="col-sm-9">
											<div class="position-relative input-icon">
												<input type="text" class="form-control" id="last-name" v-model="form.lastName">
												<span class="position-absolute top-50 translate-middle-y"><i class="bx bx-user"></i></span>
											</div>
										</div>
									</div>
									<div class="row mb-3">
										<label for="phone" class="col-sm-3 col-form-label">Phone Number</label>
										<div class="col-sm-9">
											<div class="position-relative input-icon">
												<input type="tel" class="form-control" id="phone" v-model="form.phone">
												<span class="position-absolute top-50 translate-middle-y"><i class="bx bx-phone"></i></span>
											</div>
										</div>
									</div>
									<div class="row mb-3">
										<label for="email" class="col-sm-3 col-form-label">Email Address</label>
										<div class="col-sm-9">
											<div class="position-relative input-icon">
												<input type="email" class="form-control" id="email" v-model="form.email">
												<span class="position-absolute top-50 translate-middle-y"><i class="bx bx-envelope"></i></span>
											</div>
										</div>
									</div>
                                    <div class="row mb-3">
										<label for="email" class="col-sm-3 col-form-label">Company Name</label>
										<div class="col-sm-9">
											<div class="position-relative input-icon">
												<input type="text" class="form-control" id="email" v-model="form.name">
												<span class="position-absolute top-50 translate-middle-y"><i class='bx bxs-institution'></i></span>
											</div>
										</div>
									</div>
                                    <div class="row mb-3">
										<label for="bio" class="col-sm-3 col-form-label">Description</label>
										<div class="col-sm-9">
											<textarea class="form-control" id="bio" rows="3" v-model="form.bio"></textarea>
										</div>
									</div>
									<div class="row" v-if="isMyProfile()">
										<label class="col-sm-3 col-form-label"></label>
										<div class="col-sm-9">
											<div class="d-md-flex justify-content-center align-items-center d-grid align-items-center gap-3">
												<button @click="updateProfile" type="button" class="btn maz-gradient-btn w-100 px-4">
                                                    <div v-if="showLoading" class="spinner-border text-white " role="status"> <span class="visually-hidden">Loading...</span>
                                                    </div>
                                                    {{ showLoading ?  '' : 'Update' }}
                                                </button>
											</div>
										</div>
									</div>
								</div>
                        </div>
                       <!-- fgfgfg -->
                    </div>
                    <div class="col-xl-4 col-lg-12 col-md-12 col-sm-12" v-if="isMyProfile()">
                        <div class="card">
                            <div class="card-body p-4">
									<div class="row mb-3">
										<label for="password" class="col-sm-3 col-form-label">New Password</label>
										<div class="col-sm-9">
											<div class="position-relative input-icon">
												<input type="text" class="form-control" id="password" placeholder="New Password" v-model="password">
												<span class="position-absolute top-50 translate-middle-y"><i class='bx bx-lock-alt'></i></span>
											</div>
                                            <div
                                            class="input-errors"
                                            v-for="error of v$.password.$errors"
                                            :key="error.$uid">
                                            <div class="text-danger">Password is required</div>
                                            </div>
										</div>
									</div>
                                    <div class="row mb-3">
										<label for="password-confirm" class="col-sm-3 col-form-label">Confirm Password</label>
										<div class="col-sm-9">
											<div class="position-relative input-icon">
												<input type="text" class="form-control" id="password-confirm" placeholder="Confirm Password" v-model="confirmPassword">
												<span class="position-absolute top-50 translate-middle-y"><i class='bx bx-lock-alt'></i></span>
											</div>
                                            <div
                                            class="input-errors"
                                            v-for="error of v$.confirmPassword.$errors"
                                            :key="error.$uid">
                                            <div class="text-danger">Please confirm your password</div>
                                            </div>
										</div>
									</div>
									<div class="row" v-if="isMyProfile()">
										<label class="col-sm-3 col-form-label"></label>
										<div class="col-sm-9">
											<div class="d-md-flex justify-content-center align-items-center d-grid align-items-center gap-3">
												<button @click="updatePassword" type="button" class="btn maz-gradient-btn w-100 px-4">
                                                    <div v-if="showPasswordLoading" class="spinner-border text-white " role="status"> <span class="visually-hidden">Loading...</span>
                                                    </div>
                                                    {{ showPasswordLoading ?  '' : 'Update Password' }}
                                                </button>
											</div>
										</div>
									</div>
								</div>
                        </div>
                       <!-- fgfgfg -->
                    </div>               
                </div>

            </div>
        </div>
    </Layout>
</template>
<script setup>
import VuePictureCropper, { cropper } from 'vue-picture-cropper'
import Layout from '../shared/Layout.vue';
import { onMounted, reactive, ref, watch } from 'vue';
import { usePromoter} from '@/stores/promoter';
import useToaster from '@/composables/useToaster';
import { useRoute } from 'vue-router';
import { useAuth } from '@/stores/auth';
import Image from 'primevue/image';
import { useVuelidate } from "@vuelidate/core";
import { required, sameAs } from "@vuelidate/validators";
import { useUserStore } from '@/stores/userStore';
import FileUploadForCropper from '../upload/FileUploadForCropper.vue';
import BreadCrumb from '../../components/BreadCrumb.vue';


const envPath = import.meta.env.VITE_AWS_S3_BUCKET;

onMounted(() => {
    getUser();
})
const promoterStore = usePromoter();
const authStore = useAuth();
const route = useRoute();
const toaster = useToaster();
const userStore = useUserStore();
const promoterId = ref(route.params.id);
const userIdParam = ref(route.params.userId);
const activeUserId = ref(route.params.id);
const totalSizePercent = ref(0);


const totalSize = ref(0);
const showLoading = ref(false);
const showPasswordLoading = ref(false);

const user = JSON.parse(authStore.user);
console.log('User',user)
const profilePicName = ref('');
const profilePicPreview = ref(null);
const profilePic = ref(null);
const showTools = ref(false);

const password = ref('');
const confirmPassword = ref('');

const rules = {
  password: { required },
  confirmPassword: { sameAs: sameAs(password) }
}
    const v$ = useVuelidate(rules, { password, confirmPassword })


const updatePassword = async () => {
    const isFormCorrect = await v$.value.$validate();
      if (!isFormCorrect) {
        showPasswordLoading.value = false;
        return;
      }
    showPasswordLoading.value = true;
    userStore.updatePassword(user.id,password.value).then(function (response) {
        showPasswordLoading.value = false;
        toaster.success('Password updated successfully');
        password.value = '';
        confirmPassword.value = '';
        v$.value.$reset();
        v$.$errors = [];
    }).catch(function (error) {
        showPasswordLoading.value = false;
        toaster.error('Something went wrong')
        console.log(error)
    }).finally(() => {
        showPasswordLoading.value = false
    })
}
const updateProfile = () => {
    showLoading.value = true;
    userStore.updateProfile(user.id,form.value).then(function (response) {
        getUser();
        showLoading.value = false;
        toaster.success('Profile updated successfully')
    }).catch(function (error) {
        showLoading.value = false;
        toaster.error('Something went wrong')
        console.log(error)
    }).finally(() => {
        showLoading.value = false
    })
}

const pic = ref('');
const uploadInput = ref(null)
    const result = reactive({
      dataURL: '',
      blobURL: '',
    })

    const showFilePreview = ref(true);

const onProfilePicSelect = (event) => {
    console.log('event', event)
      // Reset last selection and results
      pic.value = ''
      result.dataURL = ''
      result.blobURL = ''

      // Get selected files
      const { files } = event.target
      if (!files || !files.length) return

      // Convert to dataURL and pass to the cropper component
      const file = files[0];
      console.log('filesSelect', files)
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        // Update the picture source of the `img` prop
        pic.value = String(reader.result)

        // Show the modal
        showTools.value = true

        // Clear selected files of input element
        if (!uploadInput.value) return
        uploadInput.value.value = ''
      }

    //const file = event.target.files[0];
    
    if (file) {
        profilePicName.value = file.name;
        profilePicPreview.value = URL.createObjectURL(file);
    }
    profilePic.value = file;
};

const onfileDropped = (dropedFile) => {
   console.log('dropedFile', dropedFile)
      // Reset last selection and results
      pic.value = ''
      result.dataURL = ''
      result.blobURL = ''

      // Get selected files
      const files = dropedFile;
      console.log('filesDrop', files)
      if (!files || !files.length) return

      // Convert to dataURL and pass to the cropper component
      const file = files[0]
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        // Update the picture source of the `img` prop
        pic.value = String(reader.result)

        // Show the modal
        showTools.value = true

        // Clear selected files of input element
        if (!uploadInput.value) return
        uploadInput.value.value = ''
      }

    
    if (file) {
        profilePicName.value = file.name;
        profilePicPreview.value = URL.createObjectURL(file);
    }
    profilePic.value = file;
};


const showModal = ref(true);

async function getResult() {
      if (!cropper) return
      const base64 = cropper.getDataURL()
      const blob = await cropper.getBlob()
      if (!blob) return

      const file = await cropper.getFile({
        fileName: `${userInfo.value.firstName}_${userInfo.value.lastName}`
      })

      console.log({ base64, blob, file })
      result.dataURL = base64
      result.blobURL = URL.createObjectURL(blob)
      const formData = new FormData();
        formData.append('profilePicture',  file);
        const config = {
        useMultipartFormData: true // Add this flag to the request config
        };
        promoterStore.uploadSingleImage(user.id,formData, config).then(function (response) {
            console.log('response', response);
            toaster.success('Profile picture updated successfully');
            getUser();
            showModal.value = false;
            document.querySelector('.modal-backdrop').remove();
            
        }).catch(function (error) {
            toaster.error('Ooops! Something went wrong');
            console.log(error)
        })

    }

    /**
     * Clear the crop box
     */
    function clear() {
      if (!cropper) return
      cropper.clear()
    }

    /**
     * Reset the default cropping area
     */
    function reset() {
      if (!cropper) return
      cropper.reset()
    }

    /**
     * The ready event passed to Cropper.js
     */
    function ready() {
      console.log('Cropper is ready.')
    }

const userInfo = ref(null);
const form = ref({
    staff: user.activeUserId,
    firstName: null,
    lastName: null,
	phone: null,
	email: null,
    name: null,
    description: null,
    role:null
});
console.log('Form',form)
const getUser = () => {
    userStore.getUser(userIdParam.value).then(function (response) {
        console.log('userInfo',response);
        userInfo.value = response.data;
        Object.assign(form.value, {
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            phone: response.data.phone,
            email: response.data.email,
            role: response.data.role
        })
        
  }).catch(function (error) {
    toaster.error("Error fetching profile");
    console.log(error);
  });
}



const isMyProfile = () => {
    console.log(promoterId.value, user.activeUserId)
    return promoterId.value == user.activeUserId;
}
const uploadEvent = (callback) => {
    totalSizePercent.value = totalSize.value / 10;
    callback();
};


const getFullName = () => {
    if(!userInfo.value) {
        return '';
    }
    return `${userInfo.value.firstName} ${userInfo.value.lastName}`
}



</script>
<style>
/* //Acordion// */
html.dark-theme .accordion-item {
    /* color: #e4e5e6; */
    background-color: #0F0F0F;
    border: none;
}


div.gallery {
    margin: 5px;
    border: 1px solid #12181A;
    float: left;
    width: 160px;
}

div.gallery:hover {
    border: 1px solid #777;
}

div.gallery img {
    width: 95%;
    height: auto;
}

div.desc {
    padding: 13px;
    text-align: center;
}

.col-img {
    flex: 0 0 0%;
}

.zoom-image {
    width: 100%;
    /* Full width */
    height: 100%;
    /* Full height */
    transition: transform 0.3s ease-in-out;
    /* Smooth transition */
}

.image-container:hover .zoom-image {
    transform: scale(1.1);
    /* Zoom in (1.2 = 120%) */
}

.dark-theme .card {
    background-color: transparent !important;
    padding: 0px !important;
}

/* Add some basic styling for the modal */
.modal-content {
    background-color: #1a1a1a;
    color: #ffffff;
}

.modal-header {
    border-bottom: 1px solid #2a2a2a;
}

.modal-footer {
    border-top: 1px solid #2a2a2a;
}

.btn-close {
    color: #ffffff;
}

/* //////////drag and drop///////////////// */
.drag-drop-area {
    border: 2px dashed #5A5959;
    border-radius: 5px;
    padding: 20px;
    text-align: center;
    cursor: pointer;
    transition: background-color 0.3s;
}

.drag-drop-area:hover,
.drag-drop-area.drag-over {
    background-color: #2a2a2a;
}

.drag-drop-text {
    color: #5A5959;
}

#fileList {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.file-item {
    background-color: #2a2a2a;
    padding: 5px 10px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    gap: 5px;
}

.file-item .remove-file {
    cursor: pointer;
    color: #ff6b6b;
}



.comment-section {
    max-width: 700px;
    margin: 2rem auto;
    background-color: #2c2e33;
    padding: 1.5rem;
    border-radius: 10px;
}
.form-control {
    background-color: #1d1f24;
    color: #ced4da;
    border: 1px solid #404348;
}
.form-control:focus {
    background-color: #1d1f24;
    color: #ced4da;
    border-color: #4a9bfc;
    box-shadow: none;
}
.btn-primary {
    background-color: #4a9bfc;
    border-color: #4a9bfc;
}
.comment {
    margin-top: 1.5rem;
}
.comment .user {
    display: flex;
    align-items: center;
}
.comment .user img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 0.75rem;
}
.comment .user-name {
    font-weight: 500;
    color: #fff;
}
.comment .comment-date {
    color: #a9acb0;
    font-size: 0.9rem;
}
.comment .comment-text {
    margin-top: 0.5rem;
    color: #ced4da;
}






.image-container {
    width: 370px;
    position: relative;
    display: inline-block;
}

.edit-icon {
    position: absolute;
    top: -5px;
    right: 20px;
    border-radius: 50%;      
    padding: 5px;  
    cursor: pointer;
}

.edit-icon i {
    font-size: 20px; 
    color: #fff;
}
</style>

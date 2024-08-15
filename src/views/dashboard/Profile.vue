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
                    <span class="font-welcome">Profile</span>
                </div>
                <p class="text-white">Promoter</p>


                <div class="row justify-content-space-between gap-5">
                    <div class="col-lg-5">
                        <div class="card-c">
                            <div class="d-flex flex-column card-header-c">
                                <div class="image-containerr">
                                    <div class="card flex justify-center">
                                        <Image alt="Image" preview>
                                            <template #previewicon>
                                              <i class='bx bx-search-alt-2' ></i>
                                            </template>
                                            <template #image>
                                                <img 
                                                src="/src/assets/images/gallery/10.png" 
                                                alt="image" width="350" />
                                            </template>
                                            <template #preview="slotProps">
                                                <img 
                                                src="/src/assets/images/gallery/10.png" alt="preview" :style="slotProps.style" @click="slotProps.onClick" />
                                            </template>
                                        </Image>
                                        </div>
                                    <!-- <img src="g" alt="Admin" class="zoom-image" style="width: 300px; height: 350px;"> -->
                                    <div v-if="isMyProfile()" 
                                        class="edit-icon" data-bs-toggle="modal" data-bs-target="#addProfilePicModal">
                                        <i class='bx bx-edit-alt fs-2'></i>
                                    </div>
                                </div>

                                <div class="mt-3">
                                    <h4 class="text-center">{{ getFullName() }} 
                                    </h4>
                                </div>

                                <div class="profile-imgs mb-4">
                                    <div class="">
                                        <div class="col-img">
                                            <div class="gallery ms-0">
                                                <div class="card flex justify-center">
                                                    <Image alt="Image" preview>
                                                        <template #previewicon>
                                                          <i class='bx bx-search-alt-2' ></i>
                                                        </template>
                                                        <template #image>
                                                            <img 
                                                            src="../../assets/images/avatars/avatar-1.png" 
                                                            alt="image" width="250" />
                                                        </template>
                                                        <template #preview="slotProps">
                                                            <img 
                                                            src="../../assets/images/avatars/avatar-1.png" alt="preview" :style="slotProps.style" @click="slotProps.onClick" />
                                                        </template>
                                                    </Image>
                                                    </div>

                                            </div>
                                        </div>
                                     
                                    </div>
                                </div>
                                <div class="mb-4">
                                    <button v-if="isMyProfile()"
                                        class="btn rounded-0 btn-primary ps-5 pe-5 d-flex justify-content-center align-items-center"
                                        data-bs-toggle="modal" data-bs-target="#addModal">
                                        <span>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                viewBox="0 0 24 24" style="fill: #ffffff;transform: msFilter;">
                                                <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path>
                                            </svg>
                                        </span><span>Add</span>
                                    </button>

                                </div>
                                <!-- Add Modal -->
                                <div class="modal fade" id="addModal" tabindex="-1" aria-labelledby="addModalLabel"
                                    aria-hidden="true">
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title" id="addModalLabel">Drag and drop your images</h5>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                    aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body">
                                                <FileUpload name="demo[]" url="/api/upload" @upload="onTemplatedUpload($event)"  :multiple="true" accept="image/*" @select="onSelectedFiles">
                                                    <template #header="{ chooseCallback, uploadCallback, clearCallback, files }">
                                                        <div class="d-flex flex-wrap justify-content-between align-items-center flex-grow-1 gap-4">
                                                            <div class="d-flex gap-2">
                                                                <Button @click="chooseCallback()" icon="bx bx-images" class="btn btn-outline-secondary text-white rounded"></Button>
                                                                <Button @click="clearCallback()" icon="bx bx-x" class="btn btn-outline-danger rounded" :disabled="!files || files.length === 0"></Button>
                                                            </div>
                                                        </div>
                                                    </template>
                                                    <template #content="{ files, uploadedFiles, removeUploadedFileCallback, removeFileCallback }">
                                                        <div class="d-flex flex-column gap-4 pt-4">
                                                            <div v-if="files.length > 0">
                                                                <div class="d-flex flex-wrap gap-4">
                                                                    <div v-for="(file, index) of files" :key="file.name + file.type + file.size" class="p-4 rounded border d-flex flex-column border-secondary align-items-center gap-2">
                                                                        <div>
                                                                            <img role="presentation" :alt="file.name" :src="file.objectURL" width="100" height="50" />
                                                                        </div>
                                                                        <span class="font-weight-bold text-truncate w-75">{{ file.name }}</span>
                                                                        <div>{{ formatSize(file.size) }}</div>
                                                                        <Button icon="bx bx-x" @click="onRemoveTemplatingFile(file, removeFileCallback, index)" class="btn btn-outline-danger rounded" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                        
                                                            <div v-if="uploadedFiles.length > 0">
                                                                <div class="d-flex flex-wrap gap-4">
                                                                    <div v-for="(file, index) of uploadedFiles" :key="file.name + file.type + file.size" class="p-4 rounded border d-flex flex-column border-secondary align-items-center gap-2">
                                                                        <div>
                                                                            <img role="presentation" :alt="file.name" :src="file.objectURL" width="100" height="50" />
                                                                        </div>
                                                                        <span class="font-weight-bold text-truncate w-75">{{ file.name }}</span>
                                                                        <div>{{ formatSize(file.size) }}</div>
                                                                        <Badge value="Completed" class="mt-4 badge bg-success" />
                                                                        <Button icon="bx bx-x" @click="removeUploadedFileCallback(index)" class="btn btn-outline-danger rounded" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </template>
                                                    <template #empty>
                                                        <div class="d-flex align-items-center justify-content-center flex-column">
                                                            <i class="bx bx-cloud-upload border border-2 rounded-circle p-4 fs-6 text-muted" />
                                                            <p class="mt-3 mb-0">Drag and drop files to here to upload.</p>
                                                        </div>
                                                    </template>
                                                </FileUpload>
                                            </div>

                                            <div class="modal-footer">
                                                <div class="col-12 mt-4">
                                                    <div class="d-grid">
                                                        <button @click="onSubmit" class="btn maz-gradient-btn"
                                                            type="button">
                                                            Submit
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Add Profile picture modal -->
                                <div class="modal fade" id="addProfilePicModal" tabindex="-1" aria-labelledby="addModalLabel"
                                aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="addModalLabel">Add Profile Picture</h5>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                aria-label="Close"></button>
                                                
                                        </div>
                                        <div class="modal-body">
                                            <input accept="image/*" @change="onProfilePicSelect($event)" type="file" name="prof-pic-upload" id="prof-pic-upload" hidden />
                                           <label  for="prof-pic-upload" class="w-100 btn btn-lg btn-success px-5"><i class='bx bx-image-add fs-3' ></i>Upload</label>
                                           <!-- <p v-if="profilePicName" class="text-center text-white mt-2">{{ profilePicName }}</p> -->

                                           <!-- <div v-if="profilePicPreview" class="text-center mt-3">
                                            <img :src="profilePicPreview" alt="Profile Preview" class="img-thumbnail" style="max-width: 100%; height: auto;">

                                          </div> -->
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
                                            dragMode: 'crop',
                                            aspectRatio: 1,
                                          }"
                                          @ready="ready"
                                          class="mt-3"
                                        />
                                          
                                        <div class="tools" v-if="showTools">
                                            <button class="btn">
                                              Cancel
                                            </button>
                                            <button class="btn" @click="clear">
                                              Clear
                                            </button>
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
                            <div class="mb-1">
                                <p class="text-white">Give Rating</p>
                            </div>
                            <div class="card flex justify-center">
                                <Rating v-model="value" />
                            </div>

                            <div class="mt-3">
                                <h5 class="">Comment</h5>
                            </div>

                            <!-- comment -->
                            <div class="accordion" id="accordionExample">
                                <div class="accordion-item">

                                    <div id="collapseOne" class="accordion-collapse collapse show"
                                        data-bs-parent="#accordionExample">
                                        <div class="accordion-body">
                                            <div>
                                                <p class="text-white">Give Rating</p>
                                                <p class="text-white">Top-Notch Professionalism! Our experience with
                                                    this promoter was
                                                    marked
                                                    by exceptional professionalism.
                                                </p>
                                                <p>11 August 2023</p>
                                            </div>

                                            <div>
                                                <p class="text-white">Give Rating</p>
                                                <p class="text-white">Impressed by the promoter’s agility and
                                                    adaptability. They responded
                                                    swiftly to changes, making the entire process stress-free.
                                                </p>
                                                <p>8 September 2023</p>
                                            </div>
                                        </div>
                                    </div>
                                    <h2 class="accordion-header">
                                        <button class="accordion-button m" type="button" data-bs-toggle="collapse"
                                            data-bs-target="#collapseOne" aria-expanded="true"
                                            aria-controls="collapseOne">
                                        </button>
                                    </h2>
                                </div>
                            </div>
                        </div>

                        <div class="prmoters-jobs">
                            <!-- <h5 class="text-white">Others promoters jobs</h5> -->
                            <div class="row mt-6  row-cols-xl-9 ">
                                <div class="">
                                    <h4 class="mb-2 mt-5 ml-2">Others promoters jobs</h4>
                                </div>

                                <div class="d-flex">
                                    <div class="col-img">
                                        <div class="gallery">
                                      
                                            <div class="card flex justify-center">
                                                <Image alt="Image" preview>
                                                    <template #previewicon>
                                                      <i class='bx bx-search-alt-2' ></i>
                                                    </template>
                                                    <template #image>
                                                        <img 
                                                        src="../../assets/images/avatars/avatar-1.png" 
                                                        alt="image" width="250" />
                                                    </template>
                                                    <template #preview="slotProps">
                                                        <img 
                                                        src="../../assets/images/avatars/avatar-1.png" alt="preview" :style="slotProps.style" @click="slotProps.onClick" />
                                                    </template>
                                                </Image>
                                                </div>
                                            <div class="desc">Mazisi Msebele</div>
                                        </div>
                                    </div>
                                    
                                </div>

                                <div
                                    class="mt-2 text-center cursor-pointer d-flex justify-content-center align-items-center">
                                    <span>Load More</span>
                                    <i class='bx bx-chevron-down fs-2'></i>
                                </div>
                            </div>
                        </div>


                       
                    </div>
                    <div class="col-lg-5">
                        <div class="card">
                            <div class="card-body">
                                <div class="row mb-3">
                                    <div>
                                        <h6 class="mb-0">Age: {{ promoterData ? promoterData.dob : '' }}</h6>
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <div>
                                        <h6 class="mb-0">Height: {{ promoterData ? promoterData.height : '' }}</h6>
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <div>
                                        <h6 class="mb-0">Location: Capetown</h6>
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <div>
                                        <h6 class="mb-0">Top size: {{ promoterData ? promoterData.topSize : '' }}</h6>
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <div>
                                        <h6 class="mb-0">Pants Size: {{ promoterData ? promoterData.pantsSize : '' }}</h6>
                                    </div>
                                </div>

                                <div class="row mb-3">
                                    <div>
                                        <h6 class="mb-0">Dress Size: {{ promoterData ? promoterData.dressSize : '' }}</h6>
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <div>
                                        <h6 class="mb-0">Experience</h6>
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <div>
                                        <h6 class="mb-0">Savanna</h6>
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <div>
                                        <h6 class="mb-0">Hennessy</h6>
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <div>
                                        <h6 class="mb-0">Sky Vodka</h6>
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <div>
                                        <h6 class="mb-0">Castle Lite</h6>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-12">
                                <div class="card">
                                    <div class="card-body">
                                        <h5 class="d-flex align-items-center mb-3">Bio</h5>
                                        <p>Web Design</p>
                                        <p>
                                            {{ promoterData ? promoterData.bio : '' }}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
        <!--start switcher-->
    </Layout>
</template>
<script setup>
import VuePictureCropper, { cropper } from 'vue-picture-cropper'
import Layout from '../shared/Layout.vue';
import BreadCrumb from '../../components/BreadCrumb.vue';
import Rating from 'primevue/rating';
import { onMounted, reactive, ref } from 'vue';
import { usePromoter} from '@/stores/promoter';
import useToaster from '@/composables/useToaster';
import { useRoute } from 'vue-router';
import { usePrimeVue } from 'primevue/config';
import FileUpload from 'primevue/fileupload';
import Button from 'primevue/button';
import Badge from 'primevue/badge';
import { useAuth } from '@/stores/auth';
import Image from 'primevue/image';

onMounted(() => {
    getPromoterDetails();
})
const value = ref(null);
const promoterStore = usePromoter();
const authStore = useAuth();
const route = useRoute();
const toaster = useToaster();
const files = ref([]);
const promoterId = ref(route.params.id);
const totalSizePercent = ref(0);

const $primevue = usePrimeVue();
const totalSize = ref(0);

const user = JSON.parse(authStore.user)
const promoterData = ref({});
const profilePicName = ref('');
const profilePicPreview = ref(null);
const profilePic = ref(null);
const showTools = ref(false);

const pic = ref('');
const uploadInput = ref(null)
    const result = reactive({
      dataURL: '',
      blobURL: '',
    })


const onProfilePicSelect = (event) => {

      // Reset last selection and results
      pic.value = ''
      result.dataURL = ''
      result.blobURL = ''

      // Get selected files
      const { files } = event.target
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

    //const file = event.target.files[0];
    
    if (file) {
        profilePicName.value = file.name;
        profilePicPreview.value = URL.createObjectURL(file);
    }
    profilePic.value = file;
};

async function getResult() {
      if (!cropper) return
      const base64 = cropper.getDataURL()
      const blob = await cropper.getBlob()
      if (!blob) return

      const file = await cropper.getFile({
        fileName: 'mazisi',
      })

      console.log({ base64, blob, file })
      result.dataURL = base64
      result.blobURL = URL.createObjectURL(blob)
      //isShowModal.value = false
      const formData = new FormData();
        formData.append('pic',  file);
        const config = {
        useMultipartFormData: true // Add this flag to the request config
        };
        console.log(formData)
        // return

        promoterStore.uploadPromoterImages(formData, config).then(function (response) {
            console.log(response);
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


const getPromoterDetails = () => {
    promoterStore.getTalentByTalentId(promoterId.value).then(function (response) {
        promoterData.value = response.data;
  }).catch(function (error) {
    toaster.error("Error fetching profile");
    console.log(error);
  });
}


const isMyProfile = () => {
    // console.log(promoterId.value, user.activeUserId)
    return promoterId.value == user.activeUserId;
}
const onRemoveTemplatingFile = (file, removeFileCallback, index) => {
    removeFileCallback(index);
    totalSize.value -= parseInt(formatSize(file.size));
    totalSizePercent.value = totalSize.value / 10;
};


const onSelectedFiles = (event) => {
    files.value = event.files;
    files.value.forEach((file) => {
        totalSize.value += parseInt(formatSize(file.size));
    });
};

const uploadEvent = (callback) => {
    totalSizePercent.value = totalSize.value / 10;
    callback();
};

const formatSize = (bytes) => {
    const k = 1024;
    const dm = 3;
    const sizes = $primevue.config.locale.fileSizeTypes;

    if (bytes === 0) {
        return `0 ${sizes[0]}`;
    }

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

    return `${formattedSize} ${sizes[i]}`;
};


const getFullName = () => {
    if(!promoterData.value.userDetails) {
        return '';
    }
    return `${promoterData.value.userDetails.firstName} ${promoterData.value.userDetails.lastName}`
}

const onSubmit = () => {

    const formData = new FormData();
        //   formData.append('images', files.value);

          files.value.forEach((file) => {
        formData.append('files[]', file); // Append each file to the FormData
    });

     // Inspect the FormData contents
     for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
    }
    const config = {
    useMultipartFormData: true // Add this flag to the request config
};
    promoterStore.uploadPromoterImages(formData, config).then(function (response) {
        console.log(response);
    })

}





</script>
<style>
/* //Acordion// */
html.dark-theme .accordion-item {
    /* color: #e4e5e6; */
    background-color: #0F0F0F;
    border: none;
}

.accordion-body {
    padding: 0 0 0 0 !important;
    background-color: #000;
}

.accordion-button {

    background-color: #0F0F0F !important;
    border: none;
}

.accordion-button:not(.collapsed) {
    margin-bottom: 10px;
    /* Adjust the value as needed */
}

.accordion-button:focus {
    outline: none;
    box-shadow: none;
    border: none;
}

.accordion-button.m::after {
    color: #5A5959 !important;
}

.accordion-button::after {
    margin: auto !important;
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










.image-container {
    width: 300px;
    position: relative;
    display: inline-block;
}

.edit-icon {
    position: absolute;
    top: 3px;
    right: 3px;
    border-radius: 50%;      
    padding: 5px;  
    cursor: pointer;
}

.edit-icon i {
    font-size: 20px; 
    color: #fff;
}
</style>

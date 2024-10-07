<script setup>
import PDF from 'pdf-vue3';
import Drawer from 'primevue/drawer';
import { reactive, ref } from 'vue';
import useToaster from '@/composables/useToaster';
import { useDocUpload } from '@/stores/docUpload';

const props = defineProps({
  title: String,
  docType: String,
  accept: String,
  fileType: String,
  showFilePreview: Boolean
})

const emit = defineEmits(['fileUploaded','fileDropped']);
const toaster = useToaster();
const uploadStore = useDocUpload();

const files = ref([]);
const isDragging = ref(false);
const showLoading = ref(false);

function onFileChange(event) {
  if (event.target.files) {
    files.value = event.target.files;
    emit('fileUploaded', files.value);
  }
}

function onDrop(event) {  
  const droppedFiles = event.dataTransfer.files;
  if (droppedFiles.length === 0) {
    return;
  }

  for (let i = 0; i < droppedFiles.length; i++) {
    if (props.fileType === 'image' && !droppedFiles[i].type.includes("image")) {
      toaster.error("File skipped as it is not an image");
      continue;
    }
    //get images only
    if (props.fileType === 'image' && droppedFiles[i].type.includes("image")) {
      files.value.push(droppedFiles[i]);
    }
  }
  emit('fileDropped', event.dataTransfer.files);
  isDragging.value = false;
}

function onDragOver(event) {
  event.preventDefault();
}

function onDragEnter() {
  isDragging.value = true;
}

function onDragLeave() {
  isDragging.value = false;
}

function removeFile(fileIndex) {
  const fileArray = Array.from(files.value);
  fileArray.splice(fileIndex, 1);
  files.value = fileArray;
  emit('fileUploaded',files.value)
}

const view_uploaded_file_visible = ref(false);
const base64PDF = ref(null);
const previewBase64PDF = (file) => {
    //convert brief file to base64
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
        base64PDF.value = reader.result
     
        
        view_uploaded_file_visible.value = true;
    };
}

const config = {
    useMultipartFormData: true
};


const form = reactive({type: 'NDA'});

const submitFile = () => {
  if(!file.value) {return}
  const formData = new FormData();
  formData.append('file', file.value);
  formData.append('form', JSON.stringify(form));
  showLoading.value = true;
  uploadStore.submit(formData, config).then(() => {
    emits('done-uploading');
    form.file = null;
    file.value = null;
    toaster.success("NDA uploaded successfully");
    showLoading.value = false;
  }).catch((error) => {
    toaster.error('Error uploading NDA');
    console.log(error);
  }).finally(() => {
    showLoading.value = false;
  })

}



</script>
<template>
    <div class="container col-md-12 mt-3">
    <div 
    class="file-drop-zone" 
    @dragover.prevent="onDragOver" 
    @drop.prevent="onDrop" 
    @dragleave="onDragLeave" 
    @dragenter="onDragEnter"
    :class="{ 'file-drop-zone-active': isDragging }"
  >
    <div class="text-center">
      <i class='bx bx-cloud-upload text-white fs-1' ></i>
      <p class="mt-2 text-white">Drag and drop your file here or <label for="nda-fileInput" class="text-primary" style="cursor: pointer;">select file to upload</label></p>
      <input id="nda-fileInput" type="file" :accept="accept" multiple class="d-none" @change="onFileChange">
    </div>
  </div>

  <div v-if="files && showFilePreview" v-for="(file, index) in files" class="file-details mt-3 p-1 border rounded d-flex align-items-center">
    <div class="file-icon me-3">
      <img v-if="fileType === 'pdf'" @click="previewBase64PDF" 
      src="/src/assets/images/pdf.png" 
      alt="" class="img-fluid cursor-pointer" style=" width: 100px; height: 100px; border-radius: 6px;"/>
      <i v-else class='bx bx-image-alt fs-1 maz-gradient-txt cursor-pointer' @click="previewBase64PDF(file)"></i>
    </div>
    <div class="file-info">
      <p class="m-0 text-white">{{ file.name }}</p>
      <small class="m-0 text-white">{{ (file.size / 1024).toFixed(2) }} KB</small>
    </div>
    <div class="ms-auto">
      <span class="cursor-pointer" @click="removeFile(index)">
          <i class='bx bx-trash fs-3 text-danger' ></i>
      </span>
    </div>
  </div>
  <!-- <div class="d-grid">
  <button @click="submitFile" type="button" class="btn  maz-gradient-btn w-100 text-white d-flex justify-content-center align-items-center mt-3">
    <span v-if="showLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
    {{ showLoading ? 'Uploading...' : 'Submit' }}
  </button>
  </div> -->
  <div class="card flex justify-center">
    <Drawer v-model:visible="view_uploaded_file_visible" position="right" :header="`Preview ${fileType} File`" class="!w-full md:!w-80 lg:!w-[40rem]" style="width: 30rem!important;">
        <PDF v-if="fileType === 'pdf'" :src="base64PDF" />
        <img v-else :src="base64PDF" style="width: 26rem!important;" />
    </Drawer>
</div>
</div>

</template>
<style scoped>
.file-drop-zone {
    border: 3px dashed #9A3AB1;
    border-radius: 10px;
    padding: 50px 20px;
    transition: background-color 0.3s, border-color 0.3s;
  }
  
  .file-drop-zone-active {
    background-color: #e2efff;
    border-color: #0056b3;
  }
  
  .file-details {
    background-color: #333;
  }
  
  .file-icon svg {
    color: #ff4d6d;
  }
</style>
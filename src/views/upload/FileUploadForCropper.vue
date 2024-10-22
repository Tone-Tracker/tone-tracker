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

const file = ref(null);
const isDragging = ref(false);
const showLoading = ref(false);

function onFileChange(event) {
  const selectedFile = event.target.files;
  if (selectedFile) {
    file.value = selectedFile;
    emit('fileUploaded', event);
  }
}

function onDrop(event) {  
  const droppedFiles = event.dataTransfer.files;
  console.log(event);
  if (droppedFiles.length === 0) {
    return;
  }
  const droppedFile = droppedFiles[0];
  //if its not image 
  if (!droppedFile.type.includes("image")) {
    file.value = null;
    toaster.error("Only image files are allowed");
    return;
  }
  file.value = droppedFile;
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

function removeFile() {
  file.value = null;
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
      <p class="mt-2">Drag and drop your file here or <label for="nda-fileInput" class="text-primary" style="cursor: pointer;">select file to upload</label></p>
      <input id="nda-fileInput" type="file" :accept="accept" class="d-none" @change="onFileChange">
    </div>
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
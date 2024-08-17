<script setup>
import Layout from '@/views/shared/Layout.vue';
import BreadCrumb from '@/components/BreadCrumb.vue';
import { ref } from 'vue';
import NDAFileUpload from './NDAFileUpload.vue';
import SLAFileUpload from './SLAFileUpload.vue';

const file = ref(null);
const isDragging = ref(false);

function onFileChange(event) {
  const selectedFile = event.target.files[0];
  if (selectedFile) {
    file.value = selectedFile;
  }
}

function onDrop(event) {
  const droppedFile = event.dataTransfer.files[0];
  if (droppedFile) {
    file.value = droppedFile;
  }
  isDragging.value = false;
}

function onDragOverNDA(event) {
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
    <Layout>
        <div class="page-wrapper">
            <div class="page-content">
                <BreadCrumb title="Upload Documents" icon="" />
                <p>Upload supporting contract / documentation</p>


                <div class="card">
                    <div class="card-body row">
                        
                            <NDAFileUpload />
                            <SLAFileUpload />
                        
                   
                </div>
            </div>
        </div>
        </div>
    </Layout>
</template>



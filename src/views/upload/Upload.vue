<script setup>
import Layout from '@/views/shared/Layout.vue';
import BreadCrumb from '@/components/BreadCrumb.vue';
import { ref } from 'vue';
import NDAFileUpload from './NDAFileUpload.vue';
import SLAFileUpload from './SLAFileUpload.vue';
import { useDocUpload } from '@/stores/docUpload';


const uploadStore = useDocUpload();
const files = ref([]);



const  getFiles = () => {
    uploadStore.DocsFiles().then(function (response) {
        files.value = response.data.content;
    }).catch(error => {
        console.log(error);
        toaster.error("Error fetching files");
    })
  };

</script>
<template>
    <Layout>
        <div class="page-wrapper">
            <div class="page-content">
                <BreadCrumb title="Upload Documents" icon="" />
                <p>Upload supporting contract / documentation</p>


                <div class="card">
                    <div class="card-body row">
                        
                            <NDAFileUpload @done-uploading="getFiles" />
                            <SLAFileUpload @done-uploading="getFiles" />
                        
                   
                </div>
            </div>
        </div>
        </div>
    </Layout>
</template>



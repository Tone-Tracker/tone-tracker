<script setup>
import Layout from '@/views/shared/Layout.vue';
import BreadCrumb from '@/components/BreadCrumb.vue';
import { onMounted, ref, watch } from 'vue';
import { useBrief } from '@/stores/brief';
import { useRoute } from 'vue-router';

const route = useRoute();
const briefStore = useBrief();
let briefs = ref([]);
let brief = ref({});
const briefId = ref(route.query.brief?.id || null);

watch(() => route.query.brief?.id, (newId) => {
    briefId.value = newId;
    if (briefId.value) {
        getBriefById();
    }
});

onMounted(() => {
    getBriefs();
    if (briefId.value) {
        getBriefById();
    }
});

const getBriefs = async () => {
    try {
        const response = await briefStore.getBriefs();
        briefs.value = response.data;

		console.log('Fetched briefs:', response.data);
    } catch (error) {
        console.error('Error fetching briefs:', error);
    }
};

const getBriefById = async () => {
    try {
        const response = await briefStore.getBriefById(briefId.value);
        brief.value = response.data;	
    } catch (error) {
        console.error('Error fetching brief by ID:', error);
    }
};

const downloadDocument = async (path) => {
    try {
        const response = await briefStore.getDocument(path);
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'document.pdf'); // Adjust filename and type as needed
        document.body.appendChild(link);
        link.click();
        link.remove();
    } catch (error) {
        console.error('Error downloading document:', error);
    }
};

</script>
<template>
    <Layout>
        <div class="page-wrapper">
            <div class="page-content">
                <BreadCrumb title="Briefs" icon="" />
                <p>View and upload briefs</p>

                <div class="card">
                    <div class="card-body">
                        <div>
                            <div class="bg-dark mb-4">
                                <button class="btn rounded-0 btn-primary">+ New</button>
                            </div>
                        </div>
                        <div class="row">
                            <div v-if="briefs.length > 0" v-for="(briefItem, index) in briefs" :key="briefItem.id" class="col-md-2 col-lg-2">
                                <div class="brief-card">
                                    <h5 class="py-1 px-4 mb-0 text-center bg-black">{{ briefItem.activationName }}</h5>
                                    <div class="text-center">
                                        <img src="https://www.iconpacks.net/icons/1/free-document-icon-901-thumb.png" class="bg-white" />
                                    </div>
                                    <div class="d-flex justify-content-between align-items-center">
                                        <button class="btn bg-black text-white w-100 rounded-0 btn-outline-light" @click="downloadDocument(briefItem.path)">Read</button>
                                        <button class="btn text-white w-100 rounded-0 border border-primary bg-primary btn-outline-light">Share</button>
                                    </div>
                                    <div>
                                        <div class="d-flex mt-4 mb-3 custom-checkbox">
                                            <div class="d-flex align-items-center gap-2 w-100">
                                                <label> Accept</label>
                                                <input type="checkbox" checked />
                                            </div>
                                            <div class="d-flex justify-content-end align-items-center gap-2 w-100">
                                                <label> Decline</label>
                                                <input class="me-0" type="checkbox" />
                                            </div>
                                        </div>
                                        <div class="d-flex justify-content-center">
                                            <button class="btn text-white rounded-0 w-50 btn-save mt-2">Save</button>
                                        </div>
                                    </div>
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
.bg-white {
	background-color: #dedede;
} 

.bg-black {
	background-color: black !important;
}

.brief-card {
	margin-bottom: 1rem;
}

.brief-card img {
	width: 100%;
	height: auto;
}

.new-badge {
	background-color: orange;
	color: white;
	padding: 0.2rem 0.5rem;
	border-radius: 0.3rem;
	font-size: 0.8rem;
}

.btn-save {
	background-color: #007bff;
	border: none;
}

.btn-save:hover {
	background-color: #0056b3;
}

.custom-checkbox input[type="checkbox"] {
	margin-right: 0.5rem;
}

.doc-icon {
	font-size: 5rem;
}
</style>
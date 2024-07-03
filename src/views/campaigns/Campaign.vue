<script setup>
import { onMounted, ref, reactive } from 'vue';
import AutoComplete from 'primevue/autocomplete';
import FileUpload from 'primevue/fileupload';
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import Layout from '@/views/shared/Layout.vue';
import BreadCrumb from '@/components/BreadCrumb.vue';
import useToaster from '@/composables/useToaster';
import { useCampaignStore } from '@/stores/useCampaign';
import { useClientStore } from '@/stores/useClient';

const toaster = useToaster();
const campaignStore = useCampaignStore();
const clientStore = useClientStore();
let clients = ref([]);
let dropdownItems = ref([]);
let campaigns = ref([]);
let client_id=ref(null);

const form = reactive({
	name: '',
	client_id: null
});

onMounted(() => {
  getAllClients();
  getAllCampaigns();
});
const search = (event) => {
    const query = event.query.toLowerCase();
	let myObj = clients.value.filter(client => client.name.toLowerCase().includes(query));
    dropdownItems.value = myObj.map(client => client.name);
};

const rules = { 
	name: { required },
	client_id: { required }
};
const v$ = useVuelidate(rules, form);

const createCampaign = async () => {
	const isFormValid = await v$.value.$validate();
	if (!isFormValid) {
		return;
	}
    campaignStore.submitCampaign(form).then(function (response) {
        toaster.success("Campaign created successfully");
        getAllCampaigns();
    }).catch(function (error) {
        toaster.error("Error creating campaign");
        console.log(error);
    });
};

const getAllCampaigns = () => {
    campaignStore.getCampaigns().then(function (response) {
        campaigns.value = response.data;
    }).catch(function (error) {
        toaster.error("Error fetching campaigns");
        console.log(error);
    }).finally(function () {
    });
};
const getAllClients = () => {
    clientStore.getClients().then(function (response) {
        clients.value = response.data.content;
        dropdownItems.value = [...clients.value];
    }).catch(function (error) {
        toaster.error("Error fetching clients");
        console.log(error);
    }).finally(function () {
        
    });
};

const deleteCampaign = (campaign) => {
    if (confirm(`Are you sure you want to delete ${campaign.name}?`)) {
        campaignStore.deleteCampaign(campaign.id).then(function (response) {
            toaster.success("Campaign deleted successfully");
            getAllCampaigns();
        }).catch(function (error) {
            toaster.error("Error deleting campaign");
            console.log(error);
        });
    }
};

const editClient = (client) => {
    clients.value.forEach(c => c.isEditing = false);
    client.isEditing = true;
};

const onClientChange = (event) => {
	form.client_id = clients.value.find(client => client.name === event.value).id;
	console.log(form.client_id);
};


const updateCampaign = (client) => {
    client.isEditing = false;
    campaignStore.updateCampaign(client).then(response => {
        toaster.success("Campaign updated successfully");
        getAllClients();
    }).catch(error => {
        toaster.error("Error updating client");
        console.log(error);
    });
};

const fileUpload = (event) => {
    console.log(event);
};

const vFocus = {
    mounted: (el) => el.focus()
};
</script>

<template>
    <Layout>
        <div class="page-wrapper">
            <div class="page-content">
                <BreadCrumb title="Campaigns" icon="" />
                <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-8 col-lg-8 col-xl-8 d-flex">
                                <div class="card radius-10 w-100">
                                    <div class="card-body">
                                        <div class="table-responsive">
                                            <table class="table mb-0">
                                                <thead class="table-light">
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Campaign Name</th>
                                                        <th>Client Name</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-if="campaigns" v-for="(campaign, index) in campaigns" :key="campaign.id">
                                                        <td>{{ index + 1 }}</td>
                                                        <td v-if="!campaign.isEditing">{{ campaign.name }}</td>
                                                        <td v-else>
                                                            <input v-focus type="text" v-model="campaign.name" @blur="updateCampaign(campaign)" @keyup.enter="updateCampaign(campaign)" class="no-border-input"/>
                                                        </td>
                                                        <td></td>
                                                        <td>
                                                            <div class="d-flex order-actions">
                                                                <a v-if="!campaign.isEditing" @click="editClient(campaign)" href="javascript:;">
                                                                    <i class='bx bxs-edit'></i>
                                                                </a>
                                                                <a v-else @click="updateCampaign(campaign)" href="javascript:;" class="ms-3">
                                                                    <i class='bx bx-check text-success'></i>
                                                                </a>
                                                                <a @click="deleteCampaign(campaign)" href="javascript:;" class="ms-3">
                                                                    <i class='bx bxs-trash'></i>
                                                                </a>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr v-else>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td colspan="7" class="text-center"></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-4 col-lg-4 col-xl-4 d-flex">
                                <div class="card w-100 radius-10">
                                    <div class="card-body">
                                        <div class="table-responsive">
                                            <form class="">
                                                <div class="col-md-12">
                                                    <label for="input1" class="form-label">Campaign Name</label>
                                                    <input v-model="form.name" type="text" class="form-control" id="input1" />
                                                    <div class="input-errors" v-for="error of v$.client_id.$errors" :key="error.$uid">
                                                        <div class="text-danger">Campaign name is required</div>
                                                    </div>
                                                </div>
                                                <div class="card flex justify-center">
													<label for="input1" class="form-label">Choose Client</label>
                                                    <AutoComplete v-model="client_id" forceSelection dropdown :suggestions="dropdownItems" 
														@item-select="onClientChange" @complete="search" field="name" />
                                                    <div class="input-errors" v-for="error of v$.client_id.$errors" :key="error.$uid">
                                                        <div class="text-danger">Client is required</div>
                                                    </div>
                                                </div>
                                                <div class="card flex justify-center">
                                                    <FileUpload mode="basic" name="demo[]" url="/api/upload" accept="image/*" customUpload @uploader="fileUpload($event)" />
                                                </div>
                                            </form>
                                            <div class="ms-auto mt-4">
                                                <a @click="createCampaign" href="javascript:;" class="w-100 btn maz-gradient-btn radius-30 mt-2 mt-lg-0">
                                                    <i class="bx bxs-plus-square"></i>Create Client
                                                </a>
                                            </div>
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
.mt-4 {
    margin-top: 1rem;
}
.no-border-input {
    border: none;
	color: #000;
    outline: none;
	background: #fff
}

.card {
    padding-top: 10px !important;
    padding: 0px
}
.p-button {
    width: 25rem !important;
}

.text-danger {
    color: red;
}
</style>

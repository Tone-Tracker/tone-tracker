<script setup>
import { onMounted, ref,watch, reactive } from 'vue';
import FileUpload from 'primevue/fileupload';
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import Layout from '@/views/shared/Layout.vue';
import BreadCrumb from '@/components/BreadCrumb.vue';
import useToaster from '@/composables/useToaster';
import { useCampaignStore } from '@/stores/useCampaign';
import { useClientStore } from '@/stores/useClient';
import { useConfirm } from "primevue/useconfirm";
import { useRoute } from 'vue-router';

const route = useRoute();
const clientId = ref(route.query.client);


watch(
  () => route.query.client,
  (newClientId) => {
    clientId.value = newClientId;
  }
);


const toaster = useToaster();
const campaignStore = useCampaignStore();
const clientStore = useClientStore();
const confirm = useConfirm();

let clients = ref([]);
const clientName = ref('');
let campaigns = ref([]);

const form = reactive({
	name: '',
	client: clientId.value
});

onMounted(() => {
  getClientName();
  getCampaignsByClientId();
});


const rules = { 
	name: { required },
	client: { required }
};
const v$ = useVuelidate(rules, form);

const createCampaign = async () => {
	const isFormValid = await v$.value.$validate();
	if (!isFormValid) {
		return;
	}
    campaignStore.submitCampaign(form).then(function (response) {
        toaster.success("Campaign created successfully");
        getCampaignsByClientId();
    }).catch(function (error) {
        toaster.error("Error creating campaign");
        console.log(error);
    });
};

const getCampaignsByClientId = async () => {
    campaignStore.getCampaignsByClientId(clientId.value).then(function (response) {
        console.log(response.data);
        campaigns.value = response.data;
    }).catch(function (error) {
        toaster.error("Error fetching campaigns");
        console.log(error);
    }).finally(function () {
    });
};
const getClientName = async () => {
    clientStore.getClientByClientId(clientId.value).then(function (response) {
        clientName.value = response.data.name;
    }).catch(function (error) {
        console.log(error);
    }).finally(function () {
        
    });
};

const deleteCampaign = (campaign) => {
        campaignStore.deleteCampaign(campaign.id).then(function (response) {
            toaster.success("Campaign deleted successfully");
            getCampaignsByClientId();
        }).catch(function (error) {
            toaster.error("Error deleting campaign");
            console.log(error);
        });
  
};

const editClient = (client) => {
    clients.value.forEach(c => c.isEditing = false);
    client.isEditing = true;
};



const updateCampaign = (client) => {
    client.isEditing = false;
    campaignStore.updateCampaign(client).then(response => {
        toaster.success("Campaign updated successfully");
        getClientName();
    }).catch(error => {
        toaster.error("Error updating client");
        console.log(error);
    });
};

const fileUpload = (event) => {
    console.log(event);
};

const deleteRecord = (event, campaign) => {
    confirm.require({
        target: event.currentTarget,
        message: 'Do you wish to delete this campaign?',
        // icon: 'bx bx-trash text-danger',
		icon: '',
        rejectProps: {
            label: 'Cancel',
            severity: '',
            outlined: true
        },
        acceptProps: {
            label: 'Delete',
            severity: 'danger'
        },
        accept: () => {
			deleteCampaign(campaign);
        },
        reject: () => {
            //do nothing
        }
    });
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
                                                    <tr v-if="campaigns.length > 0" v-for="(campaign, index) in campaigns" :key="campaign.id">
                                                        <td>{{ index + 1 }}</td>
                                                        <td v-if="!campaign.isEditing">{{ campaign.name }}</td>
                                                        <td v-else>
                                                            <input v-focus type="text" v-model="campaign.name" @blur="updateCampaign(campaign)" @keyup.enter="updateCampaign(campaign)" class="no-border-input"/>
                                                        </td>
                                                        <td>{{ clientName }}</td>
                                                        <td>
                                                            <div class="d-flex order-actions">
                                                                <a v-if="!campaign.isEditing" @click="editClient(campaign)" href="javascript:;">
                                                                    <i class='bx bxs-edit'></i>
                                                                </a>
                                                                <a v-else @click="updateCampaign(campaign)" href="javascript:;" class="ms-3">
                                                                    <i class='bx bx-check text-success'></i>
                                                                </a>
                                                                <router-link :to="`/admin-activations?campaign=${campaign.id}`" v-tooltip.bottom="'View Activations'" class="ms-3">
                                                                    <i class='bx bxs-bullseye text-success'></i>
                                                                </router-link>
                                                                <a @click="deleteRecord($event,campaign)" href="javascript:;" class="ms-3">
                                                                    <i class='bx bxs-trash text-danger'></i>
                                                                </a>
                                                                <ConfirmPopup></ConfirmPopup>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr v-else>
                                                        <td colspan="7" class="text-center text-danger">{{ clientName }} has no campaigns.</td>
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
                                                    <div class="input-errors" v-for="error of v$.name.$errors" :key="error.$uid">
                                                        <div class="text-danger">Campaign name is required</div>
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

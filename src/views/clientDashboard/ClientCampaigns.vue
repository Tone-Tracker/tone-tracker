<script setup>
import Layout from '@/views/shared/Layout.vue';
import BreadCrumb from '@/components/BreadCrumb.vue';
import { useAuth } from '@/stores/auth';
import { onMounted,ref } from 'vue';
import { useCampaignStore } from '@/stores/useCampaign';

const campaign = useCampaignStore();

const authStore = useAuth();
const client = ref(JSON.parse(authStore.client));
const user = JSON.parse(authStore.user);
console.log('client',client.value)

const campaigns = ref([]);

onMounted(() => {
    if(user.role == 'CLIENT'){
        getCampaignsByClientId();
    }
});

/*
*This fetches regions by staff id. Basically its for regional manager
*/
const getCampaignsByClientId = () => {
    campaign.getCampaignsByClientId(client.value.id).then(function (response) {
    console.log('Campaigns',response)
     campaigns.value = response.data;
  }).catch(function (error) {
    console.log(error);
  }).finally(function () {
    ///
  })
}


</script>
<template>
    <Layout>
        <div class="page-wrapper">
            <div class="page-content">
                <!-- <BreadCrumb :title="user.role == 'TTG_REGIONAL_MANAGER' ? 'WELCOME' : 'JOBS'" icon="" />
                <p class="fs-3 text-white">{{ user.role == 'TTG_REGIONAL_MANAGER' ? 'All Regions' : 'Active Campaigns'  }}</p> -->
                <div class="card">
                    <div class="card-body">
                        <!-- Code here -->
                        <div class="">
                            <div class="row g-4">
                                <router-link v-if="campaigns?.length > 0" v-for="campaign in campaigns" :key="campaign.id" class="col-md-4 col-lg-3"  
                                    :to="`/admin-activations?campaign=${campaign.id}&name=${campaign.name}`">
                                    <div class="job-item">
                                        <div class="image-container">
                                            <img src="../../assets/images/Component 102 – 1.png" :alt="campaign.name">
                                            <span>{{ campaign.name }}</span>
                                        </div>
                                        <div class="details">
                                            <div class="d-flex align-items-center justify-content-between">
                                                <div>Number Of Activations:</div>
                                                <div>38%</div>
                                            </div>
                                            <div class="d-flex align-items-center justify-content-between">
                                                <div>Leads:</div>
                                                <div>102,000</div>
                                            </div>
                                            <div class="d-flex align-items-center justify-content-between">
                                                <div>Activations completed:</div>
                                                <div>10</div>
                                            </div>
                                            <div class="d-flex align-items-center justify-content-between">
                                                <div>Ongoing activations:</div>
                                                <div>15</div>
                                            </div>
                                        </div>
                                    </div>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    </Layout>
</template>
<style scoped>




.job-item {
    margin-bottom: 20px;
    cursor: pointer;
}



.image-container {
    position: relative;
    border: 2px solid #fff;
    height: 14rem;
}

.job-item img {
    width: 100%;
    height: 14rem;
    display: block;
}

.job-item span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(0, 0, 0, 0.7);
    padding: 10px;
    text-align: center;
    font-size: 1.5em;
    border-radius: 8px;
    transition: opacity 0.3s ease-in-out;
    font-weight: 700;
}

.job-item .details {
    background-color: #333;
    padding: 10px;
    text-align: left;
    font-size: 1em;
    /* border-radius: 8px; */
    display: none;
    white-space: pre-line;
    color: white;
}

.job-item:hover .details {
    display: block;
}

.job-item.new .image-container::after {
    content: 'New';
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: orange;
    color: white;
    padding: 5px 10px;
    font-size: 0.9em;
    border-radius: 3px;
    z-index: 1;
}

.image-container::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 2px solid #fff;
    z-index: 0;
}

.details p {
    margin: 0;
    display: flex;
    justify-content: space-between;
}
</style>
import { defineStore } from 'pinia';
import axiosInstance from '@/axiosInstance';
import { ref } from 'vue';

export const useCampaignStore = defineStore('useCampaign', () => {
  const allCampaigns = ref([]);
    function submitCampaign(form,config) {
      console.log(form);
      console.log(form);
      return axiosInstance.post(`/api/campaigns`,form,config);
    }

    const getCampaigns = () => {
      return axiosInstance.get(`/api/campaigns`);
    }
    const getCampaignName = (campaignId) => {
      return axiosInstance.get(`/api/campaigns/${campaignId}`);
    }
    const getTimeSheetReport = (campaignId) => {
      return axiosInstance.get(`/api/campaigns/budget`);
    }

    const updateCampaign = (client) => {
      let obj = {name: client.name}
      return axiosInstance.put(`/api/campaigns/${client.id}`,obj);
    }
    const deleteCampaign = (id) => {
      return axiosInstance.delete(`/api/campaigns/${id}`);
    }

    const  getCampaignsByClientId = (id) => {
      return axiosInstance.get(`/api/campaigns/${id}/client`);
    }

    
    const  getStatusReport = (id) => {
      return axiosInstance.get(`/api/campaigns/${id}/report`);
    }

    const setCampaigns = (campaigns) => {
      allCampaigns.value = campaigns;
    }
  
    return { getCampaignName,setCampaigns,allCampaigns,getTimeSheetReport,submitCampaign,getStatusReport, getCampaigns,updateCampaign,deleteCampaign,getCampaignsByClientId }
  })
import { defineStore } from 'pinia';
import axiosInstance from '@/axiosInstance';

export const useCampaignStore = defineStore('useCampaign', () => {
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

    const updateCampaign = (client) => {
      let obj = {name: client.name}
      return axiosInstance.put(`/api/campaigns/${client.id}`,obj);
    }
    const deleteCampaign = (id) => {
      return axiosInstance.delete(`/api/campaigns/${id}`);
    }

    const  getCampaignsByClientId = (id) => {
      return axiosInstance.get(`/api/campaigns/client/${id}`);
    }

    
    const  getStatusReport = (id) => {
      return axiosInstance.get(`/api/campaigns/${id}/report`);
    }
  
    return { getCampaignName,submitCampaign,getStatusReport, getCampaigns,updateCampaign,deleteCampaign,getCampaignsByClientId }
  })
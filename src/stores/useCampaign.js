import { defineStore } from 'pinia';
import axiosInstance from '@/axiosInstance';

export const useCampaignStore = defineStore('useCampaign', () => {
    function submitCampaign(form) {
      return axiosInstance.post(`/api/campaigns`,form);
    }

    const getCampaigns = () => {
      return axiosInstance.get(`/api/campaigns`);
    }

    const updateCampaign = (client) => {
      let obj = {name: client.name}
      return axiosInstance.put(`/api/campaigns/${client.id}`,obj);
    }
    const deleteCampaign = (id) => {
      return axiosInstance.delete(`/api/campaigns/${id}`);
    }
    
  
    return { submitCampaign,getCampaigns,updateCampaign,deleteCampaign }
  })
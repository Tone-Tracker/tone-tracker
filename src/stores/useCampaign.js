import { defineStore } from 'pinia';
import axiosInstance from '@/axiosInstance';

export const useCampaignStore = defineStore('useCampaign', () => {
    function submitClient(form) {
      return axiosInstance.post(`/api/clients`,form);
    }

    const getClients = () => {
      return axiosInstance.get(`/api/clients`);
    }

    const updateClient = (client) => {
      let obj = {name: client.name}
      return axiosInstance.put(`/api/clients/${client.id}`,obj);
    }
    const deleteClient = (id) => {
      return axiosInstance.delete(`/api/clients/${id}`);
    }
    
  
    return { submitClient,getClients,updateClient,deleteClient }
  })
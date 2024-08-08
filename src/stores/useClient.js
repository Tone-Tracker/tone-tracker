import { defineStore } from 'pinia';
import axiosInstance from '@/axiosInstance';

export const useClientStore = defineStore('useClientStore', () => {

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

    const  getClientByClientId = (id) => {
      return axiosInstance.get(`/api/clients/${id}`);
    }    
    }
    const  getClientByUserId = (id) => {
      return axiosInstance.get(`/api/clients/${id}`);
    }
   
  
    return {getClientByClientId, submitClient,getClients,updateClient,deleteClient ,getClientByUserId}
  })
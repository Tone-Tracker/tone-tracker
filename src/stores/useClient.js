import { defineStore } from 'pinia';
import axiosInstance from '@/axiosInstance';
import { ref } from 'vue';

export const useClientStore = defineStore('useClientStore', () => {

  const allClients = ref([]);

    function submitClient(form) {
      return axiosInstance.post(`/api/clients`,form);
    }

    const getClients = () => {
      return axiosInstance.get(`/api/clients`);
    }

    const updateClient = (clientId,clientData) => {
      return axiosInstance.put(`/api/clients/${clientId}`,clientData);
    }
    const deleteClient = (id) => {
      return axiosInstance.delete(`/api/clients/${id}`);
    }

    const  getClientByClientId = (id) => {
      return axiosInstance.get(`/api/clients/${id}`);
    }    
    
    const  getClientByUserId = (id) => {
      return axiosInstance.get(`/api/clients/${id}`);
    }

    const setClients = (clients) => {
      allClients.value = clients
    }
   
  
    return {getClientByClientId, submitClient,getClients,updateClient,deleteClient ,getClientByUserId,setClients,allClients}
})
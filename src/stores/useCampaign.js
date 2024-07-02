import { defineStore } from 'pinia';
import { useNetworkStatus } from './networkStatus';
import useToaster from '@/composables/useToaster';
import { useAuth } from '@/stores/auth';
import axiosInstance from '@/axiosInstance';

export const useClientStore = defineStore('useClientStore', () => {
  const isOnline = useNetworkStatus();
  const toaster = useToaster();
  const auth = useAuth();

    function submitClient(form) {
      if(!isOnline.online) {toaster.warning("Check your internet connection");return}
      return axiosInstance.post(`/api/clients`,form);
    }

    const getClients = () => {
      return axiosInstance.get(`/api/clients`);
    }

    const updateClient = (client) => {
      let obj = {name: client.name}
      return axiosInstance.put(`/api/clients/${client.id}`,obj,);
    }
    const deleteClient = (id) => {
      return axiosInstance.delete(`/api/clients/${id}`);
    }
    
  
    return { submitClient,getClients,updateClient,deleteClient }
  })
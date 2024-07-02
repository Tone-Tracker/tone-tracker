import { defineStore } from 'pinia';
import axios from "axios";
import { useNetworkStatus } from './networkStatus';
import useToaster from '@/composables/useToaster';
import { useAuth } from '@/stores/auth';
import { ref, computed, reactive } from 'vue'
import router from '@/router';

export const useClientStore = defineStore('useClientStore', () => {
  const isOnline = useNetworkStatus();
  const toaster = useToaster();
  const auth = useAuth();

  const URL = import.meta.env.VITE_SERVER_URL;

    function submitClient(form) {
      if(!auth.token){return router.push('/')}
      if(!isOnline.online) {toaster.warning("Check your internet connection");return}
      
      return axios.post(`${URL}/api/clients`, form, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token}`
        }
      })
    }

    const getClients = () => {
      if(!auth.token) {router.push('/')}
      return axios.get(`${URL}/api/clients`,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token}`
        }
      })
    }

    const updateClient = (client) => {
      let obj = {name: client.name}
      if(!auth.token) {router.push('/')}
      return axios.put(`${URL}/api/clients/${client.id}`,obj, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token}`
        }
      })
    }
    const deleteClient = (id) => {
      if(!auth.token) {router.push('/')}
      return axios.delete(`${URL}/api/clients/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token}`
        }
      })
    }
    
  
    return { submitClient,getClients,updateClient,deleteClient }
  })
import { defineStore } from 'pinia';
import axiosInstance from '@/axiosInstance';

export const useRegion = defineStore('region', () => {

    function submit(form) {
      return axiosInstance.post(`/api/regions`,form);
    }

    const getRegions = () => {
      return axiosInstance.get(`/api/regions`);
    }

    const update = (client) => {
      let obj = {name: client.name}
      return axiosInstance.put(`/api/regions/${client.id}`,obj);
    }
    const deleteRegion = (id) => {
      return axiosInstance.delete(`/api/regions/${id}`);
    }

    const addRegionalManager = (data) => {
      return axiosInstance.post(`/api/regionalManagers`,data);
    }
    
  
    return { submit,getRegions,update,deleteRegion,addRegionalManager }
  })
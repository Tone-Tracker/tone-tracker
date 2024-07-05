import { defineStore } from 'pinia';
import axiosInstance from '@/axiosInstance';

export const useActivation = defineStore('activation', () => {

    function submit(form) {
      return axiosInstance.post(`/api/activations`,form);
    }

    const getActivations = () => {
      return axiosInstance.get(`/api/activations`);
    }

    const update = (client) => {
      let obj = {name: client.name}
      return axiosInstance.put(`/api/activations/${client.id}`,obj);
    }
    const deleteActivation = (id) => {
      return axiosInstance.delete(`/api/activations/${id}`);
    }
    
  
    return { submit,getActivations,update,deleteActivation }
  })
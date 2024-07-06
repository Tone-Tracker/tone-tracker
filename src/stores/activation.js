import { defineStore } from 'pinia';
import axiosInstance from '@/axiosInstance';

export const useActivation = defineStore('activation', () => {

    function submit(form) {
      return axiosInstance.post(`/api/activations`,form);
    }

    const getActivations = () => {
      return axiosInstance.get(`/api/activations`);
    }

    const update = (id,formData) => {
      return axiosInstance.put(`/api/activations/${id}`,formData);
    }
    const deleteActivation = (id) => {
      return axiosInstance.delete(`/api/activations/${id}`);
    }

    const getActivationById = (id) => {
      return axiosInstance.get(`/api/activations/${id}`);
    }
    
  
    return { submit,getActivations,update,deleteActivation,getActivationById }
  })
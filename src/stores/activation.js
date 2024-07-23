import { defineStore } from 'pinia';
import axiosInstance from '@/axiosInstance';

export const useActivation = defineStore('activation', () => {

    function submit(formData, config) {
      return axiosInstance.post(`/api/activations`,formData, config);
    }

    const getActivations = () => {
      return axiosInstance.get(`/api/activations`);
    }

    const update = (id,form) => {
      return axiosInstance.put(`/api/activations/${id}`,form);
    }
    const deleteActivation = (id) => {
      return axiosInstance.delete(`/api/activations/${id}`);
    }

    const getActivationById = (id) => {
      return axiosInstance.get(`/api/activations/${id}`);
    }
    const getActivationsByCampaignId = (campaignId) => {
      return axiosInstance.get(`/api/activations/campaign/${campaignId}`);
    }
  
  
    return { submit,getActivations,update,deleteActivation,getActivationById,getActivationsByCampaignId }
  })
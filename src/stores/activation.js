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
  
    const getActivationByStaffId = (staffId) => {
      return axiosInstance.get(`/api/activations/staff/${staffId}`);
    }

    const uploadImages = (formData, config) => {

      console.log(formData);
      // change this endpoint @Busani
      return axiosInstance.post(`/api/images`,formData, config);
    }
  
    return { submit,getActivations,update,deleteActivation,getActivationById,getActivationsByCampaignId,getActivationByStaffId,uploadImages }
  })
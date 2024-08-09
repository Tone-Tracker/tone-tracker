import { defineStore } from 'pinia';
import axiosInstance from '@/axiosInstance';

export const usePromoter = defineStore('promoter', () => {

  
    function submitPromoter(form) {
      return axiosInstance.post(`/api/promoters`,form,{
        useMultipartFormData: false
      });
    }

    const getPromoters = () => {
      return axiosInstance.get(`/api/promoters`);
    }

    const updatePromoter = (id, data) => {
      return axiosInstance.put(`/api/promoters/${id}`,data);
    }
    const deletePromoter = (id) => {
      return axiosInstance.delete(`/api/promoters/${id}`);
    }

    const uploadPromoterImages = (formData, config) => {
      return axiosInstance.post(`/api/images`, formData, config);
    }
      
    return { submitPromoter, getPromoters, updatePromoter, deletePromoter, uploadPromoterImages }
  })
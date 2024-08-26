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

    const uploadSingleImage = (formData, config) => {
      return axiosInstance.post(`/api/images/single`, formData, config);
    }

    const uploadImages = (formData, config) => {
      return axiosInstance.post(`/api/images`, formData, config);
    }
    const  getTalentByTalentId = (id) => {
      return axiosInstance.get(`/api/promoters/${id}`);
    } 
    
    const getOtherPromotersByTaskId = (taskId) => {
      return axiosInstance.get(`/api/promoters/task/${taskId}`)
    }
    
    const  getTalentByUserId = (id) => {
      return axiosInstance.get(`/api/promoters/${id}`);
    }

    const checkIn = (coOrdObj ) => {
      return axiosInstance.post(`/api/checkins`,coOrdObj);
    }
   
    const submitRating = (raterId, rate) => {
      return axiosInstance.post(`/api/users/${raterId}`,rate);
    }
    const addExperience = (data) => {
      return axiosInstance.post(`/api/promoters/experiences`,data);
    }

    return { checkIn, addExperience,submitPromoter, getPromoters, updatePromoter, deletePromoter, submitRating, uploadSingleImage,
      uploadImages ,getTalentByTalentId,getTalentByUserId, getOtherPromotersByTaskId}
  })
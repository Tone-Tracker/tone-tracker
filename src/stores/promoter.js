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

    return { checkIn, submitPromoter, getPromoters, updatePromoter, deletePromoter, submitRating, uploadPromoterImages ,getTalentByTalentId,getTalentByUserId, getOtherPromotersByTaskId}
  })
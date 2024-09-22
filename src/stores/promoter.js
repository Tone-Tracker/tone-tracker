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
      return axiosInstance.put(`/api/users/${id}`,data);
    }
    const deletePromoter = (id) => {
      return axiosInstance.delete(`/api/promoters/${id}`);
    }

    const uploadSingleImage = (userId,formData, config) => {
      return axiosInstance.put(`/api/users/profile-picture/${userId}`, formData, config);
    }

    const uploadImages = (formData, config) => {
      return axiosInstance.post(`/api/images`, formData, config);
    }
    const getImages = (userId, entity,activeUserId) => {
      return axiosInstance.get(`/api/images/all/${entity}/${userId}/activeUser/${activeUserId}`);
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

    return { checkIn, addExperience,submitPromoter, getPromoters,getImages, updatePromoter, deletePromoter, submitRating, uploadSingleImage,
      uploadImages ,getTalentByTalentId,getTalentByUserId, getOtherPromotersByTaskId}
  })
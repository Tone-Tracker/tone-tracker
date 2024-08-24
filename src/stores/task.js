import { defineStore } from 'pinia';
import axiosInstance from '@/axiosInstance';

export const useTask = defineStore('task', () => {

    function submit(form,config) {
      return axiosInstance.post(`/api/tasks`,form, config);
    }

    const getTasks = () => {
      return axiosInstance.get(`/api/tasks`);
    }

    const update = (id,formData, config) => {
      return axiosInstance.put(`/api/tasks/${id}`,formData, config);
    }

    const addPromotersToTask = (taskId, arrayOfPromoterIDs) => {
      return axiosInstance.post(
          `/api/tasks/promoters/${taskId}`,
          arrayOfPromoterIDs           
      );
     }
     
     const addThirdPartiesToTask = (taskId, arrayOfThirdPartyIDs) => {
      return axiosInstance.post(
          `/api/tasks/thirdParties/${taskId}`,
          arrayOfThirdPartyIDs           
      );
     }
  
  
    const deleteTask = (id) => {
      return axiosInstance.delete(`/api/tasks/${id}`);
    }

    const getTask = (id) => {
      return axiosInstance.get(`/api/bids/${id}`);
    }

    const getTasksByActivationId = (id) => {
      return axiosInstance.get(`/api/tasks/activation/all/${id}`);
    }
    const getTasksByPromoterId = (id) => {
      return axiosInstance.get(`/api/tasks/${id}/promoters`);
    }

    const getSuppliers = () => {
      return axiosInstance.get(`/api/bids`);
    }
  
    return { submit, getSuppliers, getTasks,update,deleteTask,getTasksByActivationId,getTasksByPromoterId,getTask,addPromotersToTask,addThirdPartiesToTask }
  })
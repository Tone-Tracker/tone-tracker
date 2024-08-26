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
     
     const addThirdPartiesToTask = (arrayOfThirdPartyIDs) => {
      return axiosInstance.post(`/api/bids`,arrayOfThirdPartyIDs           
      );
     }
  
  
    const deleteTask = (id) => {
      return axiosInstance.delete(`/api/tasks/${id}`);
    }

    const getTask = (id) => {
      return axiosInstance.get(`/api/tasks/${id}`);
    }

    const getTasksByActivationId = (id) => {
      return axiosInstance.get(`/api/tasks/activation/all/${id}`);
    }
    const getTasksByPromoterId = (id) => {
      return axiosInstance.get(`/api/tasks/promoter/${id}`);
    }

    const getAvailablePromotersByTaskId = (id) => {
      return axiosInstance.get(`/api/tasks/${id}/promoters`);
    }

    const getBids = (taskId) => {
      return axiosInstance.get(`/api/bids/task/${taskId}`);
    }
    

    const getSuppliers = () => {
      return axiosInstance.get(`/api/bids`);
    }

    const submitPODocument = (formData, config) => {
      return axiosInstance.post(`/api/taskAwards`,formData, config);
    }

    const getTaskImages = (taskId, entity,activeUserId) => {
      return axiosInstance.get(`/api/images/all/${entity}/${taskId}/activeUser/${activeUserId}`);
    }
    const getCheckins = () => {
      return axiosInstance.get(`/api/checkins`);
    }
  
    return { submit, getSuppliers,getBids, submitPODocument,getAvailablePromotersByTaskId,getTaskImages,
      getTasks,update,deleteTask,getTasksByActivationId,getTasksByPromoterId,getTask,addPromotersToTask,addThirdPartiesToTask,getCheckins }
    
  })
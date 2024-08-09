import { defineStore } from 'pinia';
import axiosInstance from '@/axiosInstance';

export const useTask = defineStore('task', () => {

    function submit(form) {
      return axiosInstance.post(`/api/tasks`,form);
    }

    const getTasks = () => {
      return axiosInstance.get(`/api/tasks`);
    }

    const update = (id,formData) => {
      return axiosInstance.put(`/api/tasks/${id}`,formData);
    }
    const deleteTask = (id) => {
      return axiosInstance.delete(`/api/tasks/${id}`);
    }

    const getTasksByActivationId = (id) => {
      return axiosInstance.get(`/api/tasks/activation/all/${id}`);
    }
    const getTasksByPromoterId = (id) => {
      return axiosInstance.get(`/api/tasks/promoter/all/${id}`);
    }
  
    return { submit,getTasks,update,deleteTask,getTasksByActivationId,getTasksByPromoterId }
  })
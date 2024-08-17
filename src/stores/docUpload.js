import { defineStore } from 'pinia';
import axiosInstance from '@/axiosInstance';

export const useDocUpload = defineStore('docUpload', () => {

    function submit(formData, config) {
      return axiosInstance.post(`/api/docs`,formData, config);
    }

    const getDocs = () => {
      return axiosInstance.get(`/api/docs`);
    }
    const deleteDoc = (id) => {
      return axiosInstance.delete(`/api/docs/${id}`);
    }
    return { submit, getDocs, deleteDoc }
  
  })  
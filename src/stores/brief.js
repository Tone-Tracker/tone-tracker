import { defineStore } from 'pinia';
import axiosInstance from '@/axiosInstance';

export const useBrief = defineStore('brief', () => {

    function submit(formData, config) {
      return axiosInstance.post(`/api/briefs`,formData, config);
    }

    const getBriefs = () => {
      return axiosInstance.get(`/api/briefs`);
    }

    const update = (id,form) => {
      return axiosInstance.put(`/api/briefs/${id}`,form);
    }
    const deleteBrief = (id) => {
      return axiosInstance.delete(`/api/briefs/${id}`);
    }

    const getBriefById = (id) => {
      return axiosInstance.get(`/api/briefs/${id}`);
    }

    const getDocument = (path) => {
      return axiosInstance.get(`/api/briefs/document`, { params: { path }, responseType: 'blob' });
    }

    return { submit, getBriefs, update, deleteBrief, getBriefById, getDocument }
  
  })  
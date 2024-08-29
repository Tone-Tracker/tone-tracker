import { defineStore } from 'pinia';
import axiosInstance from '@/axiosInstance';

export const useLead = defineStore('lead', () => {

    function submit(formData, config) {
      return axiosInstance.post(`/api/leads`,formData, config);
    }

    const getLeads = () => {
      return axiosInstance.get(`/api/leads`);
    }

   

    return { submit, getLeads }
  
  }) 
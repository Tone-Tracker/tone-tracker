import { defineStore } from 'pinia';
import axiosInstance from '@/axiosInstance';

export const useCrmStore = defineStore('useCrm', () => {

    const getCrm = () => {
        return axiosInstance.get(`/api/leads/search`);
    }

    const createCrm = (form) => {
        console.log(form);
        return axiosInstance.post(`/api/leads`,form);
    }
    const crmFilterByActivation = (search,activationId) => {
        return axiosInstance.get(`/api/leads/search?searchkeyword=${search}&activation=${activationId}`);
    }

    return {getCrm, createCrm,crmFilterByActivation}
})
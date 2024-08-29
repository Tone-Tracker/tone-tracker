import { defineStore } from 'pinia';
import axiosInstance from '@/axiosInstance';

export const useCrmStore = defineStore('useCrm', () => {

    const getCrm = () => {
        return axiosInstance.get(`/api/leads`);
    }

    const createCrm = (form) => {
        return axiosInstance.post(`/api/leads`,form);
    }

    return {getCrm, createCrm}
})
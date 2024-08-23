import { defineStore } from 'pinia';
import axiosInstance from '@/axiosInstance';

export const useSupplier = defineStore('supplier', () => {

    function submit(data, supplierId) {
      return axiosInstance.post(`/api/costs/thirdPartyId/${supplierId}`,data);
    }

    const getThirdParties = () => {
      return axiosInstance.get(`/api/thirdParties`);
    }
    const deleteDoc = (id) => {
      return axiosInstance.delete(`/api/docs/${id}`);
    }
    return { submit, getThirdParties, deleteDoc }
  
  })  
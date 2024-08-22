import { defineStore } from 'pinia';
import axiosInstance from '@/axiosInstance';

export const useSupplier = defineStore('supplier', () => {

    function submit(data, supplierId) {
      return axiosInstance.post(`/api/costs/thirdPartyId/${supplierId}`,data);
    }

    const getcosts = () => {
      return axiosInstance.get(`/api/costs`);
    }
    const deleteDoc = (id) => {
      return axiosInstance.delete(`/api/docs/${id}`);
    }
    return { submit, getDocs, deleteDoc }
  
  })  
import { defineStore } from 'pinia';
import axiosInstance from '@/axiosInstance';

export const useSupplier = defineStore('supplier', () => {

    function submit(data, supplierId) {
      return axiosInstance.post(`/api/costs/thirdPartyId/${supplierId}`,data);
    }

    const getThirdParties = () => {
      return axiosInstance.get(`/api/thirdParties`);
    }


    const getThirdPartyTasks = (thirdPartyId) => {
      return axiosInstance.get(`api/tasks/thirdParty/${thirdPartyId}`);
    }

    return { submit, getThirdParties,getThirdPartyTasks }
  
  })  
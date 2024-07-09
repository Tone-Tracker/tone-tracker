import { defineStore } from 'pinia';
import axiosInstance from '@/axiosInstance';

export const useWarehouse = defineStore('warehouse', () => {

    function submit(form) {
      return axiosInstance.post(`/api/warehouses`,form);
    }

    const getWarehouses = () => {
      return axiosInstance.get(`/api/warehouses`);
    }

    const update = (id,formData) => {
      return axiosInstance.put(`/api/warehouses/${id}`,formData);
    }
    const deleteWarehouse = (id) => {
      return axiosInstance.delete(`/api/warehouses/${id}`);
    }

  
    return { submit,getWarehouses,update,deleteWarehouse }
  })
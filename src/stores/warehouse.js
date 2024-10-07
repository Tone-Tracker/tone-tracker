import { defineStore } from 'pinia';
import axiosInstance from '@/axiosInstance';
import { ref } from 'vue';

export const useWarehouse = defineStore('warehouse', () => {

  const allWarehouses = ref([]);

    function submit(form) {
      return axiosInstance.post(`/api/warehouses`,form);
    }

    const getWarehouses = () => {
      return axiosInstance.get(`/api/warehouses`);
    }


    const getWarehousesByRegionId = (regionId) => {
      return axiosInstance.get(`/api/warehouses/region/${regionId}`);
    }

    const update = (id,formData) => {
      return axiosInstance.put(`/api/warehouses/${id}`,formData);
    }
    const deleteWarehouse = (id) => {
      return axiosInstance.delete(`/api/warehouses/${id}`);
    }

    const viewWarehouse = (id) => {
      return axiosInstance.get(`/api/warehouses/${id}`);
    }

    const setAllWarehouses = (data) => {
      allWarehouses.value = data;
    }
  
    return { allWarehouses,setAllWarehouses,submit,getWarehouses,update,deleteWarehouse,getWarehousesByRegionId,viewWarehouse }
  })
import { defineStore } from 'pinia';
import axiosInstance from '@/axiosInstance';

export const useStock = defineStore('stock', () => {

    function addStock(form, config) {
      return axiosInstance.post(`/api/stocks`,form, config);
    }   

    const getStockByUnit = (unitId) => {
      return axiosInstance.get(`/api/stocks/unit/${unitId}`);
    }
  
    return { addStock, getStockByUnit }
  })
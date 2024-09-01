import { defineStore } from 'pinia';
import axiosInstance from '@/axiosInstance';

export const useStock = defineStore('stock', () => {

    function addStock(form) {
      return axiosInstance.post(`/api/stocks`,form);
    }   
  
    return { addStock }
  })
import { defineStore } from 'pinia';
import axiosInstance from '@/axiosInstance';

export const useSizes = defineStore('sizes', () => {

    const getSizes = () => {
      return axiosInstance.get(`/api/sizes`);
    }

    return { getSizes }
  })
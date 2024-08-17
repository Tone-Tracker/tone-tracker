import { defineStore } from 'pinia';
import axiosInstance from '@/axiosInstance';

export const useComments = defineStore('comments', () => {
  
    function submitComment(formData) {
      return axiosInstance.post(`/api/comments`,formData);
    }

    const getComments = () => {
      return axiosInstance.get(`/api/comments`);
    }

    const deleteComment = (id) => {
      return axiosInstance.put(`/api/comments/${id}`);
    }

    return {  submitComment, getComments, deleteComment}
  })
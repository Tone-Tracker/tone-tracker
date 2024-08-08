import { defineStore } from 'pinia';
import { ref, computed } from 'vue'
import axiosInstance from '@/axiosInstance';
import router from '@/router';

export const useAuth = defineStore('auth', () => {
   
    function attempt(form) { 
      return axiosInstance.post(`/authenticate`,form,);  
    }

    const logout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      router.push('/').then(() => {
        window.location.reload()
      })
    }

    const token = computed(() => {
      return localStorage.getItem('token')
    })
    const user = computed(() => {
      return localStorage.getItem('user')
    })

    const client = computed(() => {
      return localStorage.getItem('client')
    })
  
    const getRoles = () => {
        return axiosInstance.get(`/api/roles`);
    }
    return { attempt, logout, token, user, client, getRoles }
  })
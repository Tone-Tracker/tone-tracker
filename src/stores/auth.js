import { defineStore } from 'pinia';
import { ref, computed } from 'vue'
import axiosInstance from '@/axiosInstance';
import router from '@/router';
import useToaster from '@/composables/useToaster';

export const useAuth = defineStore('auth', () => {
    const toaster = useToaster();
   
    function attempt(form) { 
      return axiosInstance.post(`/authenticate`,form,);  
    }

    const logout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      toaster.success("Logout successful");
      router.push('/')
    }

    const token = computed(() => {
      return localStorage.getItem('token')
    })
    const user = computed(() => {
      return localStorage.getItem('user')
    })
  
    return { attempt, logout, token, user }
  })
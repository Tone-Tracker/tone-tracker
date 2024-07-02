import { defineStore } from 'pinia';
import { ref, computed } from 'vue'
import axios from "axios";
import router from '@/router';
import useToaster from '@/composables/useToaster';

export const useAuth = defineStore('auth', () => {

    const SERVER_URL = import.meta.env.VITE_SERVER_URL;
    const toaster = useToaster();
   
    function attempt(form) {      
     return axios.post(`${SERVER_URL}/authenticate`, {
        email: form.email,
        password: form.password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })    
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
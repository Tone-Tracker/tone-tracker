import { defineStore } from 'pinia';
import axios from "axios";
import { useNetworkStatus } from './networkStatus';
import useToaster from '@/composables/useToaster';
import { useAuth } from '@/stores/auth';
import { ref, computed, reactive } from 'vue'

export const useUserStore = defineStore('useUserStore', () => {
  const isOnline = useNetworkStatus();
  const toaster = useToaster();
  const auth = useAuth();

  /**
   * Generates a random password of length 8 using a predefined character set.
   *
   * @return {string} The randomly generated password.
   */
  function generatePassword() {
    let chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let passwordLength = 8;
    let password = '';
    for (let i = 0; i < passwordLength; i++) {
      let randomNumber = Math.floor(Math.random() * chars.length);
      password += chars.substring(randomNumber, randomNumber + 1);
    }
    return password;
  }
  
    function submitUser(form) {
      if(!isOnline.online) {
        toaster.warning("Check your internet connection");
        return
      }
      const user = reactive({
        email: form.email,
        firstName: form.firstName,
        lastName: form.lastName,
        phone: form.phoneNumber,
        height: form.height,
        location: [],
        topSize: form.topSize,
        pantsSize: form.pantsSize,
        dressSize: form.dressSize,
        bio: '',
        password: generatePassword()
      });
      
      return axios.post(`${import.meta.env.VITE_SERVER_URL}/register`, user, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }

    const getUsers = () => {
      return axios.get(`${import.meta.env.VITE_SERVER_URL}/api/users`,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token}`
        }
      })
    }

    const updateUser = (id, data) => {
      return axios.put(`${import.meta.env.VITE_SERVER_URL}/api/users/${id}`,data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token}`
        }
      })
    }
    
  
    return { submitUser,getUsers,updateUser }
  })
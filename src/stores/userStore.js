import { defineStore } from 'pinia';
import axios from "axios";
import { ref, computed, reactive } from 'vue'

export const useUserStore = defineStore('useUserStore', () => {
  
    function submitUser(form) {
      const user = reactive({
        email: form.email,
        firstName: form.firstName,
        lastName: form.lastName,
        phone: form.phoneNumber,
        activationArea: form.activationArea,
        height: form.height,
        location: form.location,
        topSize: form.topSize,
        pantsSize: form.pantsSize,
        dressSize: form.dressSize,
        bio: form.bio,
        password: form.password
      });
      return axios.post(`${import.meta.env.VITE_SERVER_URL}/register`, user, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }
  
    return { submitUser }
  })
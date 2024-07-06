import { defineStore } from 'pinia';
import axiosInstance from '@/axiosInstance';
import { reactive } from 'vue';

export const useUserStore = defineStore('useUserStore', () => {
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
      const userData = reactive({
        email: form.email,
        firstName: form.firstName,
        lastName: form.lastName,
        role: form.role,
        phone: form.phone,
        height: form.height,
        location: [],
        topSize: form.topSize,
        pantsSize: form.pantsSize,
        dressSize: form.dressSize,
        bio: '',
        password: generatePassword()
      });
      return axiosInstance.post(`/api/users`,userData,);
    }

    const getUsers = () => {
      return axiosInstance.get(`/api/users`);
    }

    const updateUser = (id, data) => {
      return axiosInstance.put(`/api/users/${id}`,data);
    }
    const deleteUser = (id) => {
      return axiosInstance.delete(`/api/users/${id}`);
    }
      
    return { submitUser,getUsers,updateUser,deleteUser }
  })
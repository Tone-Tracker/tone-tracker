import { defineStore } from 'pinia';
import axiosInstance from '@/axiosInstance';
import { reactive, ref } from 'vue';
import { type } from 'jquery';

export const useUserStore = defineStore('useUserStore', () => {

  const allUsers = ref([]);
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
        type : form.type,
        name: form.name,
        description:'',
        password: generatePassword()
      });
      return axiosInstance.post(`/api/users`,userData,);
    }

    function submitContact(form) {
      return axiosInstance.post(`/api/users`,form);
    }

    const getUsers = () => {
      return axiosInstance.get(`/api/users`);
    }

    const  getUser = (id) => {
      return axiosInstance.get(`/api/users/${id}`);
    } 

    const getUserByRole = (role) => {
      return axiosInstance.get(`/api/users/role?role=${role}`);
    }

    const createStaffMember = (data) => {
      return axiosInstance.post(`/api/users`,data);
    }

    const updateUser = (id, data) => {
      return axiosInstance.put(`/api/users/${id}`,data);
    }
    const deleteUser = (id) => {
      return axiosInstance.delete(`/api/users/${id}`);
    }

    const updateProfile = (userId, data) => {
      return axiosInstance.put(`/api/users/${userId}`,data);
    }
    const updatePassword = (userId, password) => {
      return axiosInstance.post(`/api/users/reset/update-password?userId=${userId}&password=${password}`);      
    }

    const updatePasswordInternal = (userId, password) => {
      return axiosInstance.post(`/api/users/update?userId=${userId}&password=${password}`);      
    }

    const setAllUsers = (data) => {
      allUsers.value = data;
    }
      
    return { updateProfile,setAllUsers,allUsers,updatePasswordInternal,submitUser,createStaffMember,getUsers,updateUser,deleteUser,getUser,getUserByRole,updatePassword,submitContact }
  })
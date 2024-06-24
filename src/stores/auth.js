import { defineStore } from 'pinia';
import axios from "axios";


export const useAuth = defineStore('auth', () => {
  
    const SERVER_URL = import.meta.env.VITE_SERVER_URL;
   
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
  
    return { attempt }
  })
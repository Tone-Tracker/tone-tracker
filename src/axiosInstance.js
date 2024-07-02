/**
 * Author: Mazisi Msebele
 * Date: 2023-06-01 23:58
 * 
 */
import axios from 'axios';
import { useAuth } from '@/stores/auth';
import { useRouter } from 'vue-router';
import { useNetworkStatus } from './stores/networkStatus';
import useToaster from './composables/useToaster';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const isOnline = useNetworkStatus();
    const toaster = useToaster();
    if (!isOnline.online) {
      return toaster.error('Check your internet connection');
    }
    const auth = useAuth();
    if (auth.token) {
      config.headers['Authorization'] = `Bearer ${auth.token}`;
    } else {
      const router = useRouter();
      router.push('/');
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;

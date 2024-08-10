<template>
    <button @click="getLocation" :disabled="isLoading" class="rounded btn  btn-sm rounded-5"> 
      {{ isLoading ? 'Loading...' : 'Get Location' }}
    </button>
    
    <div v-if="showLocationDetails && coords">
      Latitude: {{ coords.latitude.toFixed(2) }}<br>
      Longitude: {{ coords.longitude.toFixed(2) }}
    </div>
    <div v-if="error">
      Error: {{ error }}
    </div>
  </template>
  
  <script setup>
  import { useGeolocation } from '@vueuse/core';
  import { ref } from 'vue';
  
  const { coords, error, resume, pause } = useGeolocation();
  const showLocationDetails = ref(false);
  const isLoading = ref(false);
  
  const getLocation = () => {
    isLoading.value = true;
    resume();
    showLocationDetails.value = true;
    isLoading.value = false;
  };
  </script>
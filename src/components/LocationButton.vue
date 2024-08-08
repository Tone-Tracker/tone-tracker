<template>
    <button @click="getLocation" :disabled="isLoading">
      {{ isLoading ? 'Loading...' : 'Get Location' }}
    </button>
    <div v-if="showLocation">
      Latitude: {{ coords.latitude }}
      Longitude: {{ coords.longitude }}
    </div>
    <div v-if="error">
      Error: {{ error }}
    </div>
  </template>
  
  <script setup>
  import { useGeolocation } from '@vueuse/core';
  import { ref } from 'vue';
  
  const { coords, error, resume, pause } = useGeolocation();
  const showLocation = ref(false);
  const isLoading = ref(false);
  
  const getLocation = () => {
    isLoading.value = true;
    resume();
    showLocation.value = true;
    isLoading.value = false;
  };
  </script>
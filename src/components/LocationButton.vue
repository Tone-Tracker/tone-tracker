<template>
    <button @click="getLocation" :disabled="isLoading" class="rounded btn  btn-sm rounded-5"> 
      {{ isLoading ? 'Loading...' : 'Check in' }}
    </button>
    
    
    <div v-if="error">
      Please allow location access in your browser settings
    </div>
  </template>
  
  <script setup>
  import { useGeolocation } from '@vueuse/core';
  import { ref } from 'vue';
  import { usePromoter } from '@/stores/promoter';
  
  const { coords, error, resume, pause } = useGeolocation();
  const showLocationDetails = ref(false);
  const isLoading = ref(false);

  const promoterStore = usePromoter();
  
  const getLocation = () => {
    isLoading.value = true;
    resume();
    showLocationDetails.value = true;
    isLoading.value = false;
    const coordObj = {
      "latitude": coords.value.latitude,
      "longitude": coords.value.longitude
    }
     promoterStore.checkIn(coordObj).then(function (response) {
        console.log(response.data);
        isLoading.value = false;
        showLocationDetails.value = true;
        isLoading.value = false;
     })
  };
  </script>
import { defineStore } from 'pinia';

import { ref, computed } from 'vue'

export const useUserStore = defineStore('useUserStore', () => {
    const count = ref(0)
    const name = ref('Eduardo')
    const doubleCount = computed(() => count.value * 2)
    function submitUser(form) {
      console.log('Form submitted: ', form)
      //got to server
    }
  
    return { count, name, doubleCount, submitUser }
  })
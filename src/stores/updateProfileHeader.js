import { ref } from 'vue';
import { defineStore } from 'pinia';
import { useAuth } from './auth';

export const updateProfileHeader = defineStore('profileHeader', () => {
  const auth = useAuth();
  const user = ref(JSON.parse(auth.user));

  const profilePicture = ref(user.value?.profilePicture);

  function setProfilePicture(path) {
    profilePicture.value = path;
    user.value.path = path; 
    localStorage.setItem('user', JSON.stringify(user.value));
  }

  return {
    profilePicture,
    setProfilePicture,
    user,
  };
});


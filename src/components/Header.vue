<template>
  <header>
    <div class="topbar d-flex flex-column align-items-center border-0">
      <nav class="navbar navbar-expand-lg d-flex justify-content-between w-100">
        <DarkThemeNavbarToggle />
        <!-- <div class="d-flex align-items-center justify-content-between">
          
        </div> -->
        <div class="logo-container">
          <img class="logo" src="/src/assets/images/logo/white-logo.png" alt="Logo" />
        </div>

        <div class="search-bar-container text-center d-lg-flex w-100 justify-content-center">
          <div class="input-group custom-width-70">
            <span class="input-group-text" id="addon-wrapping"><i class='bx bx-search'></i></span>
            <input
              type="text"
              class="form-control me-4"
              aria-label="Text input with dropdown suggestions"
              placeholder="Search For More Here...."
              v-model="query"
              @input="onInput"
              @keydown.enter="selectFirstSuggestion"
            />
            <button class="btn btn-outline-secondary w-20 maz-gradient-btn ps-4 pe-4" @click="search">SEARCH</button>

            <ul v-if="filteredSuggestions.length" class="suggestions-list">
              <li
                v-for="(suggestion, index) in filteredSuggestions"
                :key="index"
                @click="selectSuggestion(suggestion)"
              >
              <router-link :to="`/report?activation=${suggestion.id}`">
                {{ suggestion.name }} 
              </router-link>
              </li>
            </ul>
          </div>
        </div>

        <div class="user-box dropdown px-3 d-flex align-items-center justify-content-center gap-5">
          <div class="d-flex justify-content-center align-items-center justify-content-center gap-2">
            <a @click="redirectToProfile" class="d-flex align-items-center nav-link gap-3" href="javascript:;" role="button">
            <img :src="user.path ? envPath + user.path : '../assets/images/placeholder.jpg'" class="user-img" :alt="user.firstName + ' ' + user.lastName" />
            </a>
            <a @click="redirectToProfile" class="profile-link cursor-pointer"><span class="fs-6 later-space">MY PROFILE</span></a>
          </div>
          
          <a @click="logout" class="logout-link fs-6 d-flex align-items-center justify-content-center gap-1 cursor-pointer"><i class="bx bx-log-out fs-1"></i><span class="fs-6 later-space">LOGOUT</span></a>
        </div>

          <!-- User Profile Section -->
      <!-- <div class="user-box">
        <img :src="user.path ? envPath + user.path : '../assets/images/placeholder.jpg'" class="user-img" :alt="user.firstName + ' ' + user.lastName" />
        <a @click="redirectToProfile" class="profile-link">My Profile</a>
        <a @click="logout" class="logout-link"><i class="bx bx-log-out"></i> Logout</a>
      </div> -->
      </nav>

    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import DarkThemeNavbarToggle from './DarkThemeNavbarToggle.vue';
import axios from 'axios';
import { useAuth } from '@/stores/auth';
import router from '@/router';
import { updateProfileHeader } from '@/stores/updateProfileHeader';


const { profilePicture, setProfilePicture } = updateProfileHeader();



const envPath = import.meta.env.VITE_AWS_S3_BUCKET;

const auth = useAuth();
const user = JSON.parse(auth.user);


const query = ref('');
const allActivations = ref([]);
const filteredSuggestions = ref([]);

let debounceTimeout = null; // To hold the debounce timer

const redirectToProfile = () => {
  if(user.role == 'TTG_SUPER_ADMIN' || user.role == 'TTG_HEAD_ADMIN' || user.role == 'TTG_REGIONAL_MANAGER' || user.role == 'TTG_ACTIVATION_MANAGER'){
    router.push({ path: `/staff-profile/${user?.activeUserId}/${user?.id}` });
  }else if(user.role == 'TTG_TALENT'){
    // return console.log('hhh',user)
    // path: `/profile/${promoter.userDetails?.id}/${promoter?.id}`
    router.push({ path: `/profile/${user?.id}/${user?.activeUserId}` });
  }else if(user.role == 'SUPPLIER'){
    router.push({ path: `/supplier-profile/${user?.activeUserId}/${user?.id}` });
  }else if(user.role == 'CLIENT'){
    router.push({ path: `/client-profile/${user?.activeUserId}/${user?.id}` });
  }
}

// Fetch all activations from the API
const fetchAllActivations = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/activations/admins`);
    allActivations.value = response.data;
  } catch (error) {
    console.error('Error fetching all activations:', error);
  }
};

// Debounced search function
const onInput = () => {
  clearTimeout(debounceTimeout); // Clear the previous debounce timer
  debounceTimeout = setTimeout(() => {
    if (query.value.length > 0) {
      // Filter based on the activation 'name' property
      filteredSuggestions.value = allActivations.value.filter(activation =>
        activation.name?.toLowerCase().includes(query.value.toLowerCase())
      );
    } else {
      filteredSuggestions.value = [];
    }
  }, 300); // 300ms debounce delay
};

// Select a suggestion when clicked
const selectSuggestion = (suggestion) => {
  query.value = suggestion.name; // Assuming 'name' is the desired field
  filteredSuggestions.value = [];
};

// Select the first suggestion when the user presses "Enter"
const selectFirstSuggestion = () => {
  if (filteredSuggestions.value.length > 0) {
    selectSuggestion(filteredSuggestions.value[0]);
  }
};

// Perform the search (e.g., handle form submission or API call)
const search = () => {
  // Implement the logic to handle the actual search
  console.log('Search initiated with query:', query.value);
};

// Fetch activations when the component is mounted
onMounted(() => {
  fetchAllActivations();
});
</script>





<style scoped>
/* Add your styles here */
.suggestions-list {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
.suggestions-list li {
  cursor: pointer;
  padding: 5px;
}
.suggestions-list li:hover {
  background-color: #eee;
}
</style>


<style scoped>
.form-control {
  background-color: #3b3b3b !important;
  border-left: 0 !important;
  border-top-left-radius: 0;
  border-top: 2px solid #ffff !important;
  border-bottom: 2px solid #ffff !important;
  border-right: 2px solid #ffff !important;
  text-align: left;
  color: white !important;
}

.form-control:focus {
  border-left: 0;
  outline: 0;
}

.form-control::placeholder {
  text-align: left;
  color: white !important;
}

.search-bar-container {
  cursor: pointer;
  position: relative;
  max-width: 1100px;
}

.search-bar-container .user-box span {
  letter-spacing: 4px;

}

.search-bar-container button {
  letter-spacing: 4px;
}

.custom-width-70 {
  width: 70%;
}

.user-img {
  width: 51px;
  height: 51px;
  border: none !important;
}

html.dark-theme .user-box {
  border-left: 0px solid rgb(255 255 255 / .15);
  border-right: 0px solid rgb(255 255 255 / .15);
}

html.dark-theme .input-group-text {
  color: #ffff;
  background-color: #3b3b3b !important;
  border: 2px solid #ffff;
  border-radius: 0;
  border-right: 0px;
}

.btn.btn-outline-secondary {
  color: white !important;  /* Ensure button text is white */
}

.maz-gradient-btn {
  color: white !important;  /* Additional selector to ensure white text */
}

/* Updated search icon color */
.input-group-text i {
  color: #ffffff;
}

.input-group-text .bx-search {
  color: #ffffff;
}

.btn {
  border-radius: 0;
}

.logo-container {
  /* flex-grow: 1; */
  display: flex;
  justify-content: center;
}

.logo {
  width: 266px;
}

.suggestions-list {
  position: absolute;
  top: 100%;
  left: 43px;
  width: 84%;;
  background-color: #1C1C1C;
  border: 1px solid #000000;
  z-index: 1000;
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 200px;
  overflow-y: auto;
}

.suggestions-list li {
  padding: 10px;
  cursor: pointer;
  color: white;
}

.suggestions-list li:hover {
  background-color: #2A2A2A;
}


.topbar .navbar {
    width: 100%;
    /* height: 60px; */
    padding-left: 2.5rem;
    padding-right: 2.5rem;
    padding-top: 1.3rem;
    padding-bottom: 1.3rem;
    border: none !important;
}

.later-space {
  letter-spacing: 3px;
}

@media (max-width: 991.98px) {
  .search-bar-container {
    display: none !important;
  }
  .custom-width-70 {
    width: 100%;
  }
}

@media (max-width: 767.98px) {
  .logo-container {
    justify-content: flex-start;
  }
  .user-box {
    /* order: -1; */
  }
  .navbar {
    /* flex-direction: column; */
    /* align-items: start; */
  }
  .logo {
    width: 150px;
  }
}






</style>

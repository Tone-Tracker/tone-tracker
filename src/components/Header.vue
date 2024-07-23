<template>
  <header>
    <div class="topbar d-flex align-items-center">
      <nav class="navbar navbar-expand-lg flex justify-content-between flex-direction-row w-100">
        <div class="mobile-toggle-menu d-lg-none">
          <i class='bx bx-menu'></i>
        </div>
        <div class="logo-container">
          <img class="logo" src="/src/assets/images/logo/white-logo.png" alt="Logo">
        </div>

        <div class="search-bar-container d-none d-lg-flex w-100 justify-content-center">
          <div class="input-group custom-width-70">
            <span class="input-group-text" id="addon-wrapping"><i class='bx bx-search'></i></span>
            <input
              type="text"
              class="form-control"
              aria-label="Text input with dropdown suggestions"
              placeholder="Search For Projects..." 
              v-model="query"
              @input="onInput"
            />
            <button class="btn btn-outline-secondary w-20 maz-gradient-btn">Search</button>
            <ul v-if="filteredSuggestions.length" class="suggestions-list">
              <li
                v-for="(suggestion, index) in filteredSuggestions"
                :key="index"
                @click="selectSuggestion(suggestion)"
              >
                {{ suggestion }}
              </li>
            </ul>
          </div>
        </div>

        <div class="user-box dropdown px-3">
          <a class="d-flex align-items-center nav-link gap-3" href="#" role="button">
            <img src="/src/assets/images/logo/Ellipse.png" class="user-img" alt="user avatar">
          </a>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue';

const query = ref('');
const suggestions = ['Project Alpha', 'Project Beta', 'Project Gamma', 'Project Delta'];
const filteredSuggestions = ref([]);

const onInput = () => {
  if (query.value.length > 0) {
    filteredSuggestions.value = suggestions.filter(suggestion =>
      suggestion.toLowerCase().includes(query.value.toLowerCase())
    );
  } else {
    filteredSuggestions.value = [];
  }
};

const selectSuggestion = (suggestion) => {
  query.value = suggestion;
  filteredSuggestions.value = [];
};
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
  background-color: #1C1C1C !important;
  border-left: 0 !important;
  border-top-left-radius: 0;
  /* border: 1px solid #000000 !important; */
  border-top: 1px solid #000000 !important;
  border-bottom: 1px solid #000000 !important;
  text-align: center;
  color: white !important;
}

.form-control::placeholder {
  text-align: center;
  color: white !important;
}

.form-control:focus {
  border-left: 0;
  outline: 0;
}

.search-bar-container {
  cursor: pointer;
  position: relative;
}

.custom-width-70 {
  width: 70%;
}

.user-img {
  width: 58px;
  height: 58px;
  border: none !important;
}

html.dark-theme .user-box {
  border-left: 0px solid rgb(255 255 255 / .15);
  border-right: 0px solid rgb(255 255 255 / .15);
}

html.dark-theme .input-group-text {
  color: #d1d7de;
  background-color: #1C1C1C !important;
  border: 1px solid #000000;
  border-radius: 0;
}

.btn {
  border-radius: 0;
}

.logo-container {
  flex-grow: 1;
  display: flex;
  justify-content: center;
}

.logo {
  width: 180px;
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
    order: -1;
  }
  .navbar {
    flex-direction: column;
    align-items: start;
  }
  .logo {
    width: 150px;
  }
}
</style>

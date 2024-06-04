import './assets/css/app.css';
import './assets/css/bootstrap.min.css';
import './assets/css/bootstrap-extended.css';
import './assets/css/dark-theme.css';
import './assets/css/header-colors.css';
import './assets/css/icons.css';
import './assets/css/pace.min.css';
import './assets/css/semi-dark.css';
import $ from 'jquery';



import './assets/js/app.js';

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.config.globalProperties.$ = $

app.mount('#app')

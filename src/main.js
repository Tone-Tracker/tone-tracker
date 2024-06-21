import './assets/css/app.css';
import './assets/css/bootstrap.min.css';
import './assets/css/bootstrap-extended.css';
import './assets/css/dark-theme.css';
import './assets/css/header-colors.css';
import './assets/css/icons.css';
import './assets/css/pace.min.css';
import './assets/css/semi-dark.css';
import $ from 'jquery';
import lightbox from 'lightbox2';
import 'lightbox2/dist/css/lightbox.css';

// import './assets/plugins/simplebar/css/simplebar.css';
// import './assets/plugins/perfect-scrollbar/css/perfect-scrollbar.css'



import './assets/js/app.js';
import './assets/js/bootstrap.bundle.min.js';
import './assets/plugins/chartjs/js/chart.js';
import './assets/plugins/chartjs/js/chartjs-custom.js';
// import './assets/js/index3.js';

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { VueFire, VueFireAuth } from 'vuefire'
import { firebaseApp } from '@/firebase.js'

const app = createApp(App)

app.use(VueFire, {
    // imported above but could also just be created here
    firebaseApp,
    modules: [VueFireAuth()],
  })
app.use(createPinia())
app.use(router)
app.use(lightbox)
app.config.globalProperties.$ = $

app.mount('#app')

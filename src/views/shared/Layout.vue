<template>
  <div class="wrapper">

    <Header />
    <!-- <SideNav /> -->
    <Admin />

    <div class="overlay toggle-icon"></div>

    <BackToTop />
    <Footer />
    <slot />
  </div>
</template>
<script setup>
import { defineAsyncComponent } from 'vue'
import Header from '../../components/Header.vue';
import SideNav from '../../components/SideNav.vue';
import Admin from '../../components/Admin.vue';
import BackToTop from '../../components/BackToTop.vue';

const Footer = defineAsyncComponent(() =>
  import('../../components/Footer.vue')
)
</script>
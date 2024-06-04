<template>
  <div class="wrapper">
    <SideNav />
    <Header />

    <div class="overlay toggle-icon"></div>
		
		  <BackToTop />
		  <Footer/>
    <slot/>
</div>
</template>
<script setup>
import { defineAsyncComponent } from 'vue'
import Header from '../../components/Header.vue';
import SideNav from '../../components/SideNav.vue';
import BackToTop from '../../components/BackToTop.vue';

const Footer = defineAsyncComponent(() =>
  import('../../components/Footer.vue')
)
</script>
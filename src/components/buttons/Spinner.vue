<template>
        <span v-if="true" role="status" aria-hidden="true"></span>
</template>
<script setup>

  defineProps({
    showLoading: {
      type: String,
      required: true
    }
   
  })
  </script>
  
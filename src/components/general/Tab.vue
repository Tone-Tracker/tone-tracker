<template>
  <li :class="classes" role="presentation">
    <slot></slot>
  </li>
</template>
<script setup>
const modelValue = defineProps({
  classes: {
    type: [String, Array, Object],
    default: ''
  }
})

</script>
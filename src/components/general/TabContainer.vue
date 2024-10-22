<template>
    <ul :class="classes" role="tablist">
        <slot></slot>
    </ul>
</template>
<script setup>
const modelValue = defineProps({
  classes: {
    type: [String, Array, Object],
    default: ''
  }
})

</script>
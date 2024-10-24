<template>

    <div :class="classes">
      <img v-if="promoter.userDetails.path" :src="`${envPath}${promoter.userDetails.path}`" width="110" height="110" class="rounded-circle shadow" alt="">
      <img v-else src="https://tonetrackerfrontend.s3.af-south-1.amazonaws.com/do_not_delete/placeholder.jpg" width="110" height="110" class="rounded-circle shadow" alt="">
      <h5 class="mb-0 mt-5">{{ promoter.userDetails.firstName }} {{ promoter.userDetails.lastName }}</h5>
      <p class="mb-3">{{ promoter.userDetails.email }}</p>
      <div class="list-inline contacts-social mt-3 mb-3"> 
        <a v-tooltip.right="'Edit'" @click="edit(promoter)" href="javascript:;" class="list-inline-item maz-gradient-btn text-white border-0">
          <i class="bx bxs-edit"></i>
        </a>
      </div>
      <div class="d-grid"> 
        <Button @click="redirectToProfile(promoter)" classes="btn btn-outline-primary radius-15" type="button" text="Submit">
          <template #content>
              View Profile
          </template>									  
        </Button>
      </div>
    </div>
      
</template>
<script setup>
import Button from './buttons/Button.vue';

const emit = defineEmits(['gotToProfile', 'edit']);

    const envPath = import.meta.env.VITE_AWS_S3_BUCKET;

    const modelValue = defineProps({
      promoter: {
        type: Object,
        default: {},
        required: true,
      },
      classes: {
        type: [String, Array, Object],
        default: ''
      },
      isMyProfile: {
        type: Function,
        default: () => false
      },
      isStaff: {
        type: Boolean,
        default: false
      },
    })
  const redirectToProfile = (user) => {
    emit('gotToProfile', user)
  }

  const edit = (user) => {
    emit('edit', user)
  }
</script>
<script setup>
import { ref, reactive, watch } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, email } from '@vuelidate/validators';
import useToaster from '@/composables/useToaster';
import { useCrmStore } from '@/stores/crm';

const emit = defineEmits(['closeModal']);
const props = defineProps({
  showModal: Boolean,
  modalData: Object
});

const crmStore = useCrmStore();
const toaster = useToaster();
let showLoading = ref(false);
let form = reactive({
  firstName : '',
  lastName: '',
  email: '',
  phone: '',
  optin: '',
  activationArea: '',
  region: ''
});

watch(() => props.modalData, (newVal) => {
  Object.assign(form, {
    firstName: newVal.firstName || '',
    lastName: newVal.lastName || '',
    email: newVal.email || '',
    phone: newVal.phone || '',
    optin: newVal.optin || '',
    activationArea: newVal.activationArea || '',
    region: newVal.region || ''
  });
}, { deep: true });

const rules = {
  firstName: { required },
  email: { required, email },
  lastName: { required },
  phone: { required },
  role: { required },
};

const v$ = useVuelidate(rules, form);

const onSubmit = async () => {
  const isFormValid = await v$.value.$validate();
  if (!isFormValid) return;

  showLoading.value = true;
  try {
    if (props.modalData.id) {
      await crmStore.updateUser(props.modalData.id, form);
      toaster.success("User updated successfully");
    } else {
      await crmStore.submitUser(form);
      toaster.success("User created successfully");
    }
    emit('closeModal');
  } catch (error) {
    toaster.error("Error saving user");
    console.error(error);
  } finally {
    showLoading.value = false;
  }
};
</script>

<template>
  <div v-if="showModal" class="modal fade show d-block" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ modalData.id ? 'Update User' : 'Create User' }}</h5>
          <button type="button" class="btn-close" @click="emit('closeModal')" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <!-- Form Fields -->
          <div class="row g-3">
            <div class="col-md-6">
              <label for="firstName" class="form-label">First Name</label>
              <input v-model="form.firstName" type="text" class="form-control" id="firstName">
              <div class="text-danger" v-if="v$.firstName.$error">First Name is required</div>
            </div>
            <div class="col-md-6">
              <label for="lastName" class="form-label">Last Name</label>
              <input v-model="form.lastName" type="text" class="form-control" id="lastName">
              <div class="text-danger" v-if="v$.lastName.$error">Last Name is required</div>
            </div>
            <div class="col-md-6">
              <label for="email" class="form-label">Email</label>
              <input v-model="form.email" type="email" class="form-control" id="email">
              <div class="text-danger" v-if="v$.email.$error">Email is required</div>
            </div>
            <div class="col-md-6">
              <label for="cell" class="form-label">Cell Number</label>
              <input v-model="form.phone" type="text" class="form-control" id="cell">
              <div class="text-danger" v-if="v$.phone.$error">Cell Number is required</div>
            </div>
            <div class="col-md-6">
              <label for="cell" class="form-label">Optin</label>
              <input v-model="form.phone" type="checkbox" class="form-control" id="optin">
              <div class="text-danger" v-if="v$.phone.$error">Optin</div>
            </div>
            <div class="col-md-6">
              <label for="cell" class="form-label">Activation Area</label>
              <input v-model="form.phone" type="text" class="form-control" id="activationArea">
              <div class="text-danger" v-if="v$.phone.$error">Activation Area is required</div>
            </div>
            <div class="col-md-6">
              <label for="cell" class="form-label">Region</label>
              <input v-model="form.phone" type="text" class="form-control" id="region">
              <div class="text-danger" v-if="v$.phone.$error">Region is required</div>
            </div>
          </div>
          <!-- Additional form fields can be added here -->

          <div class="mt-4">
            <button @click="onSubmit" class="btn btn-primary">
              <span v-if="showLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              {{ modalData.id ? 'Update' : 'Submit' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

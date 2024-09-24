<script setup>
import { ref, reactive, watch } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, email } from '@vuelidate/validators';
import useToaster from '@/composables/useToaster';
import { useCrmStore } from '@/stores/crm';
import { useActivation } from '@/stores/activation';

const emit = defineEmits(['closeModal']);
const props = defineProps({
  showModal: Boolean,
  modalData: Object,
  regions: Array
});

const crmStore = useCrmStore();
const toaster = useToaster();
let showLoading = ref(false);
let activations = ref([]);
const activationStore = useActivation();
let form = reactive({
  name : '',
  surname: '',
  email: '',
  phone: '',
  optIn: '',
  activation: '',
  region: '',
  address: ''
});

watch(() => props.modalData, (newVal) => { 
  Object.assign(form, {
    name: newVal.name || '',
    surname: newVal.surname || '',
    email: newVal.email || '',
    phone: newVal.phone || '',
    optIn: newVal.optIn || '',
    activation: newVal.activation || 4,
    region: newVal.region || '',
    address: ''
  });
}, { deep: true });

const rules = {
  name: { required },
  surname: { required },
  email: { required , email},
  phone: { required },
  activation: {  },
  region: { required },
  address: { required }
};

const v$ = useVuelidate(rules, form);

const getAllActivationsByRegion = async () => {
  showLoading.value = true;
  try {
    const response = await activationStore.getAllActivationByRegionId(form.region);
    activations.value = response.data.content;
  } catch (error) {
    toaster.error("Error fetching Activation Area");
    console.error(error);
  } finally {
    showLoading.value = false;
  }
};

const onSubmit = async () => { 
  const isFormValid = await v$.value.$validate();
  if (!isFormValid) return;

  showLoading.value = true;
  try {
    
      console.log(form);
      await crmStore.createCrm(form);
      toaster.success("User created successfully");
    
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
  <div class="row g-3">
    <div class="col-md-6">
      <label for="name" class="form-label">Name</label>
      <input v-model="form.name" type="text" class="form-control" id="name">
      <div class="text-danger" v-if="v$.name.$error">Name is required</div>
    </div>
    <div class="col-md-6">
      <label for="surname" class="form-label">Surname</label>
      <input v-model="form.surname" type="text" class="form-control" id="surname">
      <div class="text-danger" v-if="v$.surname.$error">Surname is required</div>
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

    <div class="col-md-9">
      <label for="address" class="form-label">Address</label>
      <input v-model="form.address" type="text" class="form-control" id="address">
      <div class="text-danger" v-if="v$.address.$error">Address is required</div>
    </div>
    <div class="col-md-3">
      <label for="address" class="form-label d-block invisible">Address</label>
      <input v-model="form.optIn" type="checkbox" class="" id="optin">
      <label for="optin" class="form-label ms-2">Opt In</label>
    </div> 
    
    <div class="col-md-6">
      <label for="region" class="form-label">Region</label>
      <select @change="getAllActivationsByRegion" v-model="form.region" class="form-select" id="region">
        <option value="" selected disabled>Select Region</option>
        <option v-for="region in regions" :key="region" :value="region.id">
          {{ region.name }}
        </option>
      </select>
      <div class="text-danger" v-if="v$.region.$error">Region is required</div>
    </div>
    <div class="col-md-6" v-if="form.region != ''">
      <label for="Activation" class="form-label">Activation Area</label>
      <select v-model="form.activation" class="form-select" id="activation">
        <option value="" selected disabled>Select Activation Area</option>
        <option v-for="activation in activations" :key="activation" :value="activation.id">
          {{ activation.name }}
        </option>
      </select>
      <div class="text-danger" v-if="v$.activation.$error">Activation Area is required</div>
    </div>
               
  </div>
  
  <div class="mt-4">
    <button @click="onSubmit" class="btn btn-primary maz-gradient-btn w-100">
      <span v-if="showLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
      {{ modalData.id ? 'Update' : 'Submit' }}
    </button>
  </div>
</template>

<script setup>
import { onMounted, ref, reactive, watch } from 'vue';
import Layout from '@/views/shared/Layout.vue';
import BreadCrumb from '@/components/BreadCrumb.vue';
import Textarea from 'primevue/textarea';
import Dialog from 'primevue/dialog';
import { useVuelidate } from '@vuelidate/core';
import { email, required } from '@vuelidate/validators';
import useToaster from '@/composables/useToaster';
import { usePrimeVue } from 'primevue/config';
import { useSizes } from '@/stores/sizes';
import Select from 'primevue/select';
import Paginator from 'primevue/paginator';
import { useSupplier } from '@/stores/supplier';
import { useUserStore } from '@/stores/userStore';
import axios from 'axios';

const supplierStore = useSupplier();
const userStore = useUserStore();
const toaster = useToaster();
const sizeStore = useSizes();
const envPath = import.meta.env.VITE_AWS_S3_BUCKET;

let sizes = ref([]);
let promoters = ref([]);
let paginatedPromoters = ref([]); // This will store the promoters to be displayed on the current page
let showLoading = ref(false);
let searchInput = ref('');
const filteredPromoters = ref([]);

// Pagination Variables
const currentPage = ref(1); // Current page
const rowsPerPage = ref(10); // Rows per page
const totalRecords = ref(0); // Total number of records

const form = reactive({
  firstName: null,
  lastName: null,
  name: null,
  phone: null,
  email: null,
  user: null,
  description: null,
  id: null
});

onMounted(() => {
  getSuppliers();
  getAllSizes();
});

const rules = {
  firstName: { required },
  lastName: { required },
  email: { required, email },
  phone: { required },
  user: { required },
  // name: { required },
};
const v$ = useVuelidate(rules, form);

const onSubmit = async () => {
  const isFormValid = await v$.value.$validate();
  if (!isFormValid) { return; }
  
  if (isEdit.value) {
    userStore.updateUser(supplierId.value, form).then(function (response) {
      toaster.success("Supplier updated successfully");
      visible.value = false;
      getSuppliers();
    }).catch(function (error) {
      toaster.error("Error updating supplier");
      console.log(error);
    });
  } else {

    axios.put(import.meta.env.VITE_SERVER_URL, form).then(function (response) {
      toaster.success("Supplier created successfully");
      visible.value = false;
      getSuppliers();
    }).catch(function (error) {
      toaster.error("Error creating supplier");
      console.log(error);
    });
    // userStore.submitUser(form).then(function (response) {
    //   toaster.success("Supplier created successfully");
    //   visible.value = false;
    //   getSuppliers();
    // }).catch(function (error) {
    //   toaster.error("Error creating supplier");
    //   console.log(error);
    // });
  }
};



const onInput = () => {
  if (searchInput.value) {
    const searchTerm = searchInput.value.toLowerCase();
    promoters.value = originalPromoters.value.filter((promoter) => {
      return (
       promoter.bio?.toLowerCase().includes(searchTerm) ||
       promoter.firstName?.toLowerCase().includes(searchTerm) ||
       promoter.lastName?.toLowerCase().includes(searchTerm) ||
       promoter.email?.toLowerCase().includes(searchTerm) ||
       promoter.phone?.toLowerCase().includes(searchTerm)
      );
    });
  } else {
    promoters.value = [...originalPromoters.value]; // Reset to original full list if no search term
  }

  updatePaginatedPromoters(); // Ensure the list is paginated after search
};

let originalPromoters = ref([]); // Store the original unfiltered list

// Fetch all promoters and store them in both originalPromoters and promoters.value
const getSuppliers = async () => {
  showLoading.value = true;
  supplierStore.getAllSuppliers().then(response => {
    showLoading.value = false;
    originalPromoters.value = response.data.content; // Store original list
    promoters.value = [...originalPromoters.value]; // Set the current promoters list
    totalRecords.value = promoters.value.length;
    updatePaginatedPromoters(); // Update paginated data after fetching promoters
  }).catch(error => {
    toaster.error("Error fetching suppliers");
    console.log(error);
  }).finally(() => {
    showLoading.value = false;
  });
};

const updatePaginatedPromoters = () => {
  const start = (currentPage.value - 1) * rowsPerPage.value;
  const end = start + rowsPerPage.value;
  paginatedPromoters.value = promoters.value.slice(start, end);
};

// Handle page change in pagination
const onPageChange = (event) => {
  currentPage.value = event.page + 1; // PrimeVue Paginator is zero-based, so we add 1
  rowsPerPage.value = event.rows;
  updatePaginatedPromoters(); // Update paginated data when the page changes
};


const getAllSizes = async () => {
  showLoading.value = true;
  sizeStore.getSizes().then(response => {
    sizes.value = response.data;
  }).catch(error => {
    console.log(error);
  }).finally(() => {
    showLoading.value = false;
  });
};


let user_id = ref(null);
const visible = ref(false);
let isEdit = ref(false);
let supplierId = ref(null);

const position = ref('top');
const dropdownItems = ref([]);



const openPosition = (pos, promoter) => {
  console.log('promoter', promoter.firstName)
  if (promoter) {
    isEdit.value = true;
    supplierId.value = promoter.id;
    form.user = promoter.id;
    user_id.value = promoter.id;
      
    Object.assign(form, {
      firstName : promoter.firstName,
      lastName : promoter.lastName,
      email : promoter.email,
      phone: promoter.phone,
      bio: promoter.bio,
      role: promoter.role,
      name: promoter.name,
      description: promoter.description,
      id: promoter.id
    });
    
  } else {
    isEdit.value = false;
    Object.assign(form, {
      user: null,
      user_id: null,
      name: null,
      description: null,
    });
  }
  position.value = pos;
  visible.value = true;
};


const $primevue = usePrimeVue();

const files = ref([]);


const formatSize = (bytes) => {
  const k = 1024;
  const dm = 3;
  const sizes = $primevue.config.locale.fileSizeTypes;

  if (bytes === 0) {
    return `0 ${sizes[0]}`;
  }

  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

  return `${formattedSize} ${sizes[i]}`;
};

const genders = ref([
  { name: 'MALE', code: 'MALE' },
  { name: 'FEMALE', code: 'FEMALE' },
]);
const myGender = ref();
const genderChange = (event) => {
  form.gender = myGender.value.code;
};
</script>

<template>
  <Layout>
    <div class="page-wrapper">
      <div class="page-content">
        <BreadCrumb title="Suppliers" icon="bx bxs-user-detail" />
        <div class="card">
          <div class="card-body">
            <div class="d-lg-flex align-items-center mb-4 gap-3">
              <div class="position-relative">
                <input v-model="searchInput" @input="onInput" type="text" class="form-control ps-5" placeholder="Search">
                <span class="position-absolute top-50 product-show translate-middle-y">
                  <i class="bx bx-search"></i>
                </span>
              </div>
              <div class="ms-auto"></div>
            </div>
            

            <div class="row row-cols-1 row-cols-lg-2 row-cols-xl-4">
              <div class="col"  v-for="promoter in paginatedPromoters" :key="promoter.id">
                <div class="card radius-15">
                  <div class="card-body text-center">
                    <div class="p-4 border radius-15">
                      <img v-if="promoter.path" :src="`${envPath}${promoter.path}`" width="110" height="110" class="rounded-circle shadow" alt="">
                      <img v-else src="../../assets/images/placeholder.jpg" width="110" height="110" class="rounded-circle shadow" alt="">
                      <h5 class="mb-0 mt-5">{{ promoter.firstName }} {{ promoter.lastName }}</h5>
                      <p class="mb-3">{{ promoter.email }}</p>
                      <div class="list-inline contacts-social mt-3 mb-3"> 
                        <a v-tooltip.right="'Edit'" @click="openPosition('top', promoter)" href="javascript:;" class="list-inline-item maz-gradient-btn text-white border-0">
                        <i class="bx bxs-edit"></i>
                      </a>
                      </div>
                      <div class="d-grid"> 
                        <router-link :to="{ path: `/supplier-profile/${promoter?.activeUserId}/${promoter?.id}` }" class="btn btn-outline-primary radius-15">View Profile</router-link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Pagination -->
            <Paginator
              :first="(currentPage - 1) * rowsPerPage"
              :rows="rowsPerPage"
              :totalRecords="totalRecords"
              :rowsPerPageOptions="[5, 10, 20, 30]"
              @page="onPageChange"
            />
          </div>
        </div>
      </div>
    </div>

    <Dialog v-model:visible="visible" position="top" modal :header="isEdit ? 'Edit Supplier' : 'Add Supplier'" :style="{ width: '50rem' }">
     
      <div class="row g-3">
        <div class="col-md-6">
          <label for="firstName" class="form-label">First Name</label>
          <input v-model="form.firstName" type="text" class="form-control" id="firstName" >
          <div class="input-errors" v-for="error of v$.firstName.$errors" :key="error.$uid">
            <div class="text-danger">First Name is required</div>
          </div>
        </div>
        <div class="col-md-6">
          <label for="lastName" class="form-label">Last Name</label>
          <input v-model="form.lastName" type="text" class="form-control" id="lastName" >
          <div class="input-errors" v-for="error of v$.lastName.$errors" :key="error.$uid">
            <div class="text-danger">Last Name is required</div>
          </div>
        </div>
        <div class="col-md-6">
          <label for="email" class="form-label">Email</label>
          <input v-model="form.email" type="email" class="form-control" id="email" >
          <div class="input-errors" v-for="error of v$.email.$errors" :key="error.$uid">
            <div class="text-danger">Email is required</div>
          </div>
        </div>
        <div class="col-md-6">
          <label for="cell" class="form-label">Phone Number</label>
          <input v-model="form.phone" type="text" class="form-control" id="cell" >
          <div class="input-errors" v-for="error of v$.phone.$errors" :key="error.$uid">
            <div class="text-danger">Cell Number is required</div>
          </div>
        </div>
        <div class="col-md-12">
          <label for="name" class="form-label">Name</label>
          <input v-model="form.name" type="text" class="form-control" id="name" >
          <!-- <div class="input-errors" v-for="error of v$.name.$errors" :key="error.$uid">
            <div class="text-danger">Name is required</div>
          </div> -->
        </div>
     
        <div class="col-md-12">
          <label for="name" class="form-label">Description</label>
          <Textarea v-model="form.description" autoResize rows="5" cols="91" />
          <!-- <div class="input-errors" v-for="error of v$.description.$errors" :key="error.$uid">
            <div class="text-danger">Description is required</div>
          </div> -->
        </div>
      </div>

      <div class="col-12 mt-4">
        <div class="d-grid">
          <button @click="onSubmit" class="btn maz-gradient-btn" type="button">
            {{ isEdit ? 'Update' : 'Submit' }}
          </button>
        </div>
      </div>
    </Dialog>
  </Layout>
</template>


<style scoped>
.mt-4 {
  margin-top: 1rem;
}

.p-dialog-mask {
  align-items: start !important;
}

.btn-outline-secondary {
  height: 2rem !important;
}

.p-button:not(:disabled):hover {
  background: transparent;
  border: 0;
}

.p-button {
  background: transparent;
  border: 0;
}

.p-popover.p-component {
  left: 50rem !important;
}

</style>

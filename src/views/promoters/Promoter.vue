<script setup>
import { onMounted, ref, reactive } from 'vue';
import Layout from '@/views/shared/Layout.vue';
import BreadCrumb from '@/components/BreadCrumb.vue';
import Textarea from 'primevue/textarea';
import Dialog from 'primevue/dialog';
import { useVuelidate } from '@vuelidate/core';
import { email, required } from '@vuelidate/validators';
import { usePromoter } from '@/stores/promoter';
import useToaster from '@/composables/useToaster';
import { usePrimeVue } from 'primevue/config';
import { useSizes } from '@/stores/sizes';
import Select from 'primevue/select';
import Paginator from 'primevue/paginator';
import { useAuth } from '@/stores/auth';

const promoterStore = usePromoter();
const toaster = useToaster();
const sizeStore = useSizes();
const auth = useAuth();

const envPath = import.meta.env.VITE_AWS_S3_BUCKET;
const uploader = JSON.parse(auth.user);

let sizes = ref([]);
let promoters = ref([]);
let paginatedPromoters = ref([]);
let showLoading = ref(false);
let searchInput = ref('');
const filteredPromoters = ref([]);

// Pagination Variables
const currentPage = ref(1);
const rowsPerPage = ref(10);
const totalRecords = ref(0);

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  role: "TTG_TALENT",
  dressSize: null,
  pantsSize: '',
  topSize: null,
  height: '',
  bio: '',
  gender: null
});

onMounted(() => {
  getAllPromoters();
  getAllSizes();
});

const rules = {
  firstName: { required },
  lastName: { required },
  email: { required, email },
  phone: { required },
  dressSize: { required },
  pantsSize: { required },
  height: { required },
  topSize: { required },
  bio: { required },
  gender: { required },
  role: { required }
};

const v$ = useVuelidate(rules, form);

const onSubmit = async () => {
  const isFormValid = await v$.value.$validate();
  if (!isFormValid) return;
  
  showLoading.value = true;
  if (isEdit.value) {
    promoterStore.updatePromoter(promoterId.value, form).then(function (response) {
      toaster.success("Promoter updated successfully");
      visible.value = false;
      getAllPromoters();
    }).catch(function (error) {
      toaster.error("Error updating promoter");
      console.log(error);
    }).finally(() => {
      showLoading.value = false;
    });
  } else {
    promoterStore.submitPromoter(form).then(function (response) {
      toaster.success("Promoter created successfully");
      visible.value = false;
      getAllPromoters();
    }).catch(function (error) {
      toaster.error("Error creating promoter");
      console.log(error);
    }).finally(() => {
      showLoading.value = false;
    });
  }
};

const onGenderChange = (event) => {
  let selectedGender = event.target.value.toLowerCase();
  
  if (selectedGender === 'all') {
    promoters.value = [...originalPromoters.value];
  } else {
    promoters.value = originalPromoters.value.filter((promoter) => {
      return promoter.gender?.toLowerCase() === selectedGender.toLowerCase();
    });
  }
  
  updatePaginatedPromoters();
};

const onInput = () => {
  if (searchInput.value) {
    const searchTerm = searchInput.value.toLowerCase();
    promoters.value = originalPromoters.value.filter((promoter) => {
      const userDetails = promoter.userDetails;
      const experiences = promoter.experiences.map(exp => `${exp.name} ${exp.description} ${exp.duration}`).join(" ");
      return (
        promoter.height?.toString().includes(searchTerm) ||
        promoter.topSize?.toLowerCase().includes(searchTerm) ||
        promoter.pantsSize == searchInput.value ||
        promoter.dressSize?.toLowerCase().includes(searchTerm) ||
        promoter.bio?.toLowerCase().includes(searchTerm) ||
        userDetails.firstName?.toLowerCase().includes(searchTerm) ||
        userDetails.lastName?.toLowerCase().includes(searchTerm) ||
        userDetails.email?.toLowerCase().includes(searchTerm) ||
        userDetails.phone?.toLowerCase().includes(searchTerm) ||
        experiences?.toLowerCase().includes(searchTerm)
      );
    });
  } else {
    promoters.value = [...originalPromoters.value];
  }

  updatePaginatedPromoters();
};

let originalPromoters = ref([]);

const getAllPromoters = async () => {
  showLoading.value = true;
  promoterStore.getPromoters().then(response => {
    showLoading.value = false;
    originalPromoters.value = response.data.content;
    promoters.value = [...originalPromoters.value];
    totalRecords.value = promoters.value.length;
    updatePaginatedPromoters();
  }).catch(error => {
    toaster.error("Error fetching promoters");
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

const onPageChange = (event) => {
  currentPage.value = event.page + 1;
  rowsPerPage.value = event.rows;
  updatePaginatedPromoters();
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

const deletePromoter = (promoter) => {
  promoterStore.deletePromoter(promoter.id).then(response => {
    toaster.success("Promoter deleted successfully");
    getAllPromoters();
  }).catch(error => {
    toaster.error("Error deleting promoter");
    console.log(error);
  });
};

let isEdit = ref(false);
let promoterId = ref(null);

const visible = ref(false);
const toggleModal = () => {
  isEdit.value = false;
  visible.value = true;
  Object.assign(form, {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: "TTG_TALENT",
    dressSize: null,
    pantsSize: '',
    topSize: null,
    height: '',
    bio: '',
    gender: null
  });
};

const openPosition = (pos, promoter) => {
  if (promoter) {
    isEdit.value = true;
    promoterId.value = promoter.userDetails?.id;
    Object.assign(form, {
      firstName: promoter.userDetails.firstName,
      lastName: promoter.userDetails?.lastName,
      email: promoter.userDetails?.email,
      dressSize: promoter.dressSize,
      phone: promoter.userDetails?.phone,
      pantsSize: promoter.pantsSize,
      topSize: promoter.topSize,
      height: promoter.height,
      bio: promoter.bio,
      gender: promoter.gender
    });
  } else {
    toggleModal();
  }
  visible.value = true;
};

const genders = ref([
  { name: 'MALE', code: 'MALE' },
  { name: 'FEMALE', code: 'FEMALE' },
]);

const genderChange = (event) => {
  form.gender = event.value.code;
};

const $primevue = usePrimeVue();

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
</script>

<template>
  <Layout>
    <div class="page-wrapper">
      <div class="page-content">
        <BreadCrumb title="Promoters" icon="bx bxs-user-badge" />
        <div class="card">
          <div class="card-body">
            <div class="d-lg-flex align-items-center mb-4 gap-3">
              <div class="position-relative">
                <input v-model="searchInput" @input="onInput" type="text" class="form-control ps-5" placeholder="Search">
                <span class="position-absolute top-50 product-show translate-middle-y">
                  <i class="bx bx-search"></i>
                </span>
              </div>
              <div class="row">
                <div class="col-lg-3 col-md-6">
                  <select @change="onGenderChange" class="form-select form-select-sm bg-maz-light">
                    <option selected disabled>Filter by sex</option>
                    <option value="all">All</option>
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                  </select>
                </div>
              </div>
              <div class="ms-auto">
                <a @click="toggleModal" href="javascript:;" class="btn maz-gradient-btn mt-2 mt-lg-0">
                  <i class="bx bxs-plus-square"></i>Add Promoter
                </a>
              </div>
            </div>
            
            <div class="row row-cols-1 row-cols-lg-2 row-cols-xl-3 row-cols-xxl-4">
              <div class="col" v-for="promoter in paginatedPromoters" :key="promoter.id">
                <div class="card radius-15">
                  <div class="card-body text-center">
                    <div class="p-4 border radius-15">
                      <img v-if="promoter.userDetails.path" :src="`${envPath}${promoter.userDetails.path}`" width="110" height="110" class="rounded-circle shadow" alt="">
                      <img v-else src="../../assets/images/placeholder.jpg" width="110" height="110" class="rounded-circle shadow" alt="">
                      <h5 class="mb-0 mt-5">{{ promoter.userDetails.firstName }} {{ promoter.userDetails.lastName }}</h5>
                      <p class="mb-3">{{ promoter.userDetails.email }}</p>
                      <div class="list-inline contacts-social mt-3 mb-3"> 
                        <a v-tooltip.right="'Edit'" @click="openPosition('top', promoter)" href="javascript:;" class="list-inline-item maz-gradient-btn text-white border-0">
                          <i class="bx bxs-edit"></i>
                        </a>
                      </div>
                      <div class="d-grid"> 
                        <router-link :to="{ 
                          path: `/profile/${promoter.userDetails?.id}/${promoter?.id}`, 
                          query: { uploader: uploader?.id } 
                        }"
                         class="btn btn-outline-primary radius-15">View Profile</router-link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

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

    <Dialog v-model:visible="visible" position="top" modal :header="isEdit ? 'Edit Promoter' : 'Add Promoter'" :style="{ width: '50rem' }">
      <div class="row g-3">
        <div class="col-md-6">
          <label for="firstName" class="form-label">First Name</label>
          <input v-model="form.firstName" type="text" class="form-control" id="firstName">
          <div class="input-errors" v-for="error of v$.firstName.$errors" :key="error.$uid">
            <div class="text-danger">First Name is required</div>
          </div>
        </div>
        <div class="col-md-6">
          <label for="lastName" class="form-label">Last Name</label>
          <input v-model="form.lastName" type="text" class="form-control" id="lastName">
          <div class="input-errors" v-for="error of v$.lastName.$errors" :key="error.$uid">
            <div class="text-danger">Last Name is required</div>
          </div>
        </div>
        <div class="col-md-6">
          <label for="email" class="form-label">Email</label>
          <input v-model="form.email" type="email" class="form-control" id="email">
          <div class="input-errors" v-for="error of v$.email.$errors" :key="error.$uid">
            <div class="text-danger">Email is required</div>
          </div>
        </div>
        <div class="col-md-6">
          <label for="phone" class="form-label">Phone Number</label>
          <input v-model="form.phone" type="text" class="form-control" id="phone">
          <div class="input-errors" v-for="error of v$.phone.$errors" :key="error.$uid">
            <div class="text-danger">Phone Number is required</div>
          </div>
        </div>
        <div class="col-md-6">
          <label for="gender" class="form-label me-2">Gender</label>
          <Select v-model="form.gender" :options="genders" @change="genderChange" optionLabel="name" placeholder="Select gender" class="w-full" />
          <div class="input-errors" v-for="error of v$.gender.$errors" :key="error.$uid">
            <div class="text-danger">Gender is required</div>
          </div>
        </div>
        <div class="d-flex justify-content-between gap-1">
          <div class="col-md-3">
          <label for="dressSize" class="form-label">Dress Size</label>
          <select v-model="form.dressSize" class="form-control" id="dressSize">
            <option v-for="size in sizes" :key="size" :value="size">{{ size }}</option>
          </select>
          <div class="input-errors" v-for="error of v$.dressSize.$errors" :key="error.$uid">
            <div class="text-danger">Dress Size is required</div>
          </div>
        </div>
        <div class="col-md-3">
          <label for="pantsSize" class="form-label">Pants Size</label>
          <input v-model="form.pantsSize" class="form-control" id="pantsSize" />
          <div class="input-errors" v-for="error of v$.pantsSize.$errors" :key="error.$uid">
            <div class="text-danger">Pants Size is required</div>
          </div>
        </div>
        <div class="col-md-3">
          <label for="topSize" class="form-label">Top Size</label>
          <select v-model="form.topSize" class="form-control" id="topSize">
            <option v-for="size in sizes" :key="size" :value="size">{{ size }}</option>
          </select>
          <div class="input-errors" v-for="error of v$.topSize.$errors" :key="error.$uid">
            <div class="text-danger">Top Size is required</div>
          </div>
        </div>
        <div class="col-md-3">
          <label for="height" class="form-label">Height</label>
          <input v-model="form.height" type="number" class="form-control" id="height">
          <div class="input-errors" v-for="error of v$.height.$errors" :key="error.$uid">
            <div class="text-danger">Height is required</div>
          </div>
        </div>
        </div>
       
        <div class="col-12">
          <label for="bio" class="form-label">Bio</label>
          <Textarea v-model="form.bio" autoResize rows="5" cols="30" class="w-100" />
          <div class="input-errors" v-for="error of v$.bio.$errors" :key="error.$uid">
            <div class="text-danger">Bio is required</div>
          </div>
        </div>
      </div>

      <div class="col-12 mt-4">
        <div class="d-grid">
          <button @click="onSubmit" class="btn maz-gradient-btn" type="button">
            <span v-if="showLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
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

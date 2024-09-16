<script setup>
import { onMounted, ref, reactive, watch } from 'vue';
import { truncateText } from '@/helpers/helpers';
import Layout from '@/views/shared/Layout.vue';
import BreadCrumb from '@/components/BreadCrumb.vue';
import AutoComplete from 'primevue/autocomplete';
import Textarea from 'primevue/textarea';
import Dialog from 'primevue/dialog';
import ConfirmPopup from 'primevue/confirmpopup';
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { usePromoter } from '@/stores/promoter';
import useToaster from '@/composables/useToaster';
import { useConfirm } from "primevue/useconfirm";
import { usePrimeVue } from 'primevue/config';
import FileUpload from 'primevue/fileupload';
import Button from 'primevue/button';
import { useUserStore } from '@/stores/userStore';
import Badge from 'primevue/badge';
import { useSizes } from '@/stores/sizes';
import Popover from 'primevue/popover';
import Select from 'primevue/select';
import Paginator from 'primevue/paginator';

const promoterStore = usePromoter();
const toaster = useToaster();
const userStore = useUserStore();
const confirm = useConfirm();
const sizeStore = useSizes();
const envPath = import.meta.env.VITE_AWS_S3_BUCKET;

let users = ref([]);
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
  user: null,
  dressSize: null,
  pantsSize: null,
  client: null,
  topSize: null,
  height: null,
  bio: null,
  gender: null
});

onMounted(() => {
  getAllPromoters();
  getAllUsers();
  getAllSizes();
});

const rules = {
  user: { required },
  dressSize: { required },
  pantsSize: { required },
  height: { required },
  topSize: { required },
  bio: { required },
  gender: { required },
};
const v$ = useVuelidate(rules, form);

const onSubmit = async () => {
  const isFormValid = await v$.value.$validate();
  if (!isFormValid) { return; }
  
  if (isEdit.value) {
    promoterStore.updatePromoter(promoterId.value, form).then(function (response) {
      toaster.success("Promoter updated successfully");
      visible.value = false;
      getAllPromoters();
    }).catch(function (error) {
      toaster.error("Error updating promoter");
      console.log(error);
    });
  } else {
    promoterStore.submitPromoter(form).then(function (response) {
      toaster.success("Promoter created successfully");
      visible.value = false;
      getAllPromoters();
    }).catch(function (error) {
      toaster.error("Error creating promoter");
      console.log(error);
    });
  }
};

// Filter by gender
const onGenderChange = (event) => {
  let selectedGender = event.target.value.toLowerCase();
  
  if (selectedGender === 'all') {
    promoters.value = [...originalPromoters.value]; // Reset to original full list
  } else {
    promoters.value = originalPromoters.value.filter((promoter) => {
      return promoter.gender?.toLowerCase() === selectedGender.toLowerCase();
    });
  }
  
  updatePaginatedPromoters(); // Ensure the list is paginated after filtering
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
    promoters.value = [...originalPromoters.value]; // Reset to original full list if no search term
  }

  updatePaginatedPromoters(); // Ensure the list is paginated after search
};

let originalPromoters = ref([]); // Store the original unfiltered list

// Fetch all promoters and store them in both originalPromoters and promoters.value
const getAllPromoters = async () => {
  showLoading.value = true;
  promoterStore.getPromoters().then(response => {
    showLoading.value = false;
    originalPromoters.value = response.data.content; // Store original list
    promoters.value = [...originalPromoters.value]; // Set the current promoters list
    totalRecords.value = promoters.value.length;
    updatePaginatedPromoters(); // Update paginated data after fetching promoters
  }).catch(error => {
    toaster.error("Error fetching users");
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
    toaster.error("Error fetching users");
    console.log(error);
  }).finally(() => {
    showLoading.value = false;
  });
};

const getAllUsers = async () => {
  showLoading.value = true;
  userStore.getUserByRole('TTG_TALENT').then(response => {
    users.value = response.data.content;
    dropdownItems.value = [...users.value];
  }).catch(error => {
    toaster.error("Error fetching users");
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

let user_id = ref(null);
const visible = ref(false);
let isEdit = ref(false);
let promoterId = ref(null);

const position = ref('top');
const dropdownItems = ref([]);

const search = (event) => {
  const query = event.query.toLowerCase();
  let myObj = users.value.filter(user => user.firstName.toLowerCase().includes(query));
  dropdownItems.value = myObj.map(user => user.firstName + ' ' + user.lastName);
};

const onUserChange = (event) => {
  form.user = users.value.find(user => user.firstName + ' ' + user.lastName === event.value).id;
};

const openPosition = (pos, promoter) => {
  if (promoter) {
    isEdit.value = true;
    promoterId.value = promoter.id;
    form.user = promoter.user;
    user_id.value = users.value.find(user => user.id === promoter.user).firstName + ' ' + users.value.find(user => user.id === promoter.user).lastName;
    Object.assign(form, {
      dressSize: promoter.dressSize,
      pantsSize: promoter.pantsSize,
      topSize: promoter.topSize,
      height: promoter.height,
      bio: promoter.bio,
      gender: promoter.gender
    });
    myGender.value = form.gender;
  } else {
    isEdit.value = false;
    Object.assign(form, {
      user: null,
      user_id: null,
      dressSize: null,
      pantsSize: null,
      topSize: null,
      height: null,
      bio: null,
      gender: null
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
              <div class="ms-auto"></div>
            </div>
            
            
            
            <!-- Promoters list -->
            <div class="row g-2">
              <div v-for="promoter in paginatedPromoters" :key="promoter.id" class="col-md-3">
                <div class="gallery card w-100">
                  <div class="asc py-3">
                    {{ promoter.userDetails.firstName }} {{ promoter.userDetails.lastName }}
                  </div>
                  <router-link :to="{ path: `/profile/${promoter.userDetails?.id}/${promoter?.id}` }">
                    <div style="height: 200px; overflow: hidden;">
                      <img v-if="promoter.userDetails.path" :src="`${envPath}${promoter.userDetails.path}`" alt="Promoter Image" class="img-fluid w-100 h-100" style="object-fit: cover;" />
                      <img src="../../assets/images/placeholder.jpg" v-else icon="pi pi-user" size="xlarge" />
                    </div>
                  </router-link>
                  <div class="card-body">
                    <div class="d-flex justify-content-end order-actions cursor-pointer">
                      <a @click="openPosition('top', promoter)" class="cursor-pointer">
                        <i class="bx bxs-edit"></i>
                      </a>
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

    <Dialog v-model:visible="visible" position="top" modal :header="isEdit ? 'Edit Promoter' : 'Add Promoter'" :style="{ width: '50rem' }">
      <div class="card flex justify-center">
        <label for="input1" class="form-label">Gender </label>
        <Select v-model="myGender" :options="genders" @change="genderChange" optionLabel="name" placeholder="Select gender" checkmark :highlightOnSelect="false" class="w-full md:w-56" />
        <div class="input-errors" v-for="error of v$.gender.$errors" :key="error.$uid">
          <div class="text-danger">Gender is required</div>
        </div>
      </div>
      <div class="row g-3">
        <div class="col-md-3">
          <label for="dress_size" class="form-label">Dress Size</label>
          <select v-model="form.dressSize" class="form-control" id="dress_size">
            <option v-for="size in sizes" :key="size.id" :value="size">{{ size }}</option>
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
          <label for="height" class="form-label">Height</label>
          <input v-model="form.height" type="number" class="form-control" id="height">
          <div class="input-errors" v-for="error of v$.height.$errors" :key="error.$uid">
            <div class="text-danger">Height is required</div>
          </div>
        </div>
        <div class="col-md-3">
          <label for="top-size" class="form-label">Top Size</label>
          <select v-model="form.topSize" class="form-control" id="top-size">
            <option v-for="size in sizes" :key="size.id" :value="size">{{ size }}</option>
          </select>
          <div class="input-errors" v-for="error of v$.topSize.$errors" :key="error.$uid">
            <div class="text-danger">Top Size is required</div>
          </div>
        </div>
        <div class="col-md-3">
          <label for="bio" class="form-label">Bio</label>
          <Textarea v-model="form.bio" autoResize rows="5" cols="100" />
          <div class="input-errors" v-for="error of v$.bio.$errors" :key="error.$uid">
            <div class="text-danger">Bio is required</div>
          </div>
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

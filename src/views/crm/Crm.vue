<script setup>
import { onMounted, ref, reactive } from 'vue';
import Layout from '@/views/shared/Layout.vue';
import BreadCrumb from '@/components/BreadCrumb.vue';
import useToaster from '@/composables/useToaster';
import { useCrmStore } from '@/stores/crm';
import CrmModal from './CrmModal.vue';

let showModal = ref(false);
let showLoading = ref(false);
let modalData = reactive({});
let users = ref([]);
const crmStore = useCrmStore();
const toaster = useToaster();

onMounted(() => {
  getAllUsers();
});

let newUser = reactive({
  name: '',
  surname: '',
  email: '',
  cell: '',
  optin: false,
  area: '',
  region: ''
});

const getAllUsers = async () => {
  showLoading.value = true;
  try {
    const response = await crmStore.getCrm();
    users.value = response.data.content;
  } catch (error) {
    toaster.error("Error fetching users");
    console.error(error);
  } finally {
    showLoading.value = false;
  }
};

const toggleModal = () => {
  showModal.value = true;
  modalData.value = {};
};

const hideModal = () => {
  showModal.value = false;
  getAllUsers();
};

const submitUserDetails = () => {
  console.log("User Details Submitted:", newUser);
  // Handle form submission logic
  hideModal();
};
</script>

<template>
    <Layout>
      <div class="page-wrapper">
        <div class="page-content">
          <BreadCrumb title="CRM" icon="bx bxs-calculator" />
  
          <div>
            <div class="table-container-colour p-5">
              <div class="d-flex justify-content-between">
                <h5>Database</h5>
                <button class="btn btn-primary" @click="toggleModal">Add New User</button>
              </div>
              <table class="table table-dark table-bordered">
                <thead>
                  <tr class="table-dark-color">
                    <th>Contact Name</th>
                    <th>Contact Surname</th>
                    <th>Email</th>
                    <th>Cell Number</th>
                    <th>Opt-in</th>
                    <th>Activation Area</th>
                    <th>Region</th>
                  </tr>
                </thead>
                <tbody>
                  <!-- User rows will be rendered here -->
                </tbody>
              </table>
              <div class="text-end">
                <button class="btn btn-secondary btn-export rounded-0 mb-0 mx-2">Export</button>
                <button class="btn btn-primary btn-download rounded-0 mb-0">Download</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  
    <!-- Modal component -->
    <CrmModal 
      v-if="showModal" 
      :showModal="showModal" 
      :modalData="modalData" 
      @closeModal="hideModal" 
    />
  </template>
  
  <style scoped>
.mt-4 {
    margin-top: 1rem;
}
.no-border-input {
    border: none;
	color: #000;
    outline: none;
	background: #fff
}

.card {
    padding-top: 10px !important;
    padding: 0px
}
.p-button {
    width: 25rem !important;
}

.text-danger {
    color: red;
}
</style>
<script setup>
import { onMounted, ref, reactive } from 'vue';
import Layout from '@/views/shared/Layout.vue';
import BreadCrumb from '@/components/BreadCrumb.vue';
import useToaster from '@/composables/useToaster';
import { useCrmStore } from '@/stores/crm';
import CrmModal from './CrmModal.vue';
import CRMChart from './CRMChart.vue';
import html2pdf from "html2pdf.js";
import { debounce } from '@/helpers/helpers';

import { useRegion } from '@/stores/useRegion';
import { onClickOutside } from '@vueuse/core';
import HTMLTableToPDF from '@/components/HTMLTableToPDF.vue';
import Dialog from 'primevue/dialog';
import Checkbox from 'primevue/checkbox';
import Select from 'primevue/select';
import axios from 'axios';

let showModal = ref(false);
let showLoading = ref(false);
let modalData = reactive({});
let users = ref([]);
let regions = ref([]);
const crmStore = useCrmStore();
const regionStore = useRegion();
const toaster = useToaster();
const allActivations = ref([]);
const uniqueActivations = ref([]);//for dropdown filter

onMounted(() => {
  getAllUsers();
  getAllRegions();
  getAllActivations();
});

let newUser = reactive({
  name: '',
  surname: '',
  email: '',
  phone: '',
  optIn: false,
  activation : ''
});

const getAllActivations = async () => {
  try {
    showLoading.value = true;
    const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/activations/admins`);
    allActivations.value = response.data?.map((activation) => ({
        id: activation.id,
        name: activation.name,
      }));
      showLoading.value = false;
  } catch (error) {
    showLoading.value = false;
    console.error('Error fetching all activations:', error);
  }
};
const getAllUsers = async () => {
  showLoading.value = true;
  try {
    const response = await crmStore.getCrm();
    users.value = response.data.content;
    console.log("users", users.value);
    uniqueActivations.value = [
  ...new Map(
    users.value.map((user) => [user.activationName, { id: user.activation, activationName: user.activationName }])
      ).values(),
    ];

    console.log("uniqueActivations", uniqueActivations.value);
  } catch (error) {
    toaster.error("Error fetching users");
    console.error(error);
  } finally {
    showLoading.value = false;
  }
};


const getAllRegions = async () => {
  showLoading.value = true;
  try {
    const response = await regionStore.getRegions(); console.log("response", response);
    regions.value = response.data.content;
  } catch (error) {
    toaster.error("Error fetching regions");
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

let showDropdown = ref(null);
onClickOutside(showDropdown, event => showDropdown.value.classList.remove('show'));

const toggleDropdown = () => {
    showDropdown.value.classList.toggle('show');
};


const searchInput = ref('');
const filterByActivation = async (activation) => {
  try {
    if (searchInput.value === '' && activation === '') {
      return getAllUsers(); // Function to get all users when search input is empty
    } else {
      showLoading.value = true;
      
      // Call the server to filter users based on activation status and search input
      const response = await crmStore.crmFilterByActivation(searchInput.value, activation);
      users.value = response.data.content;
    }
  } catch (error) {
    toaster.error("Error fetching users");
    console.error(error);
  } finally {
    showLoading.value = false;
  }
  toggleDropdown(); 
};
const debouncedFilterByActivation = debounce(filterByActivation, 500);
const onSearchInput = (activation) => {
  debouncedFilterByActivation(activation ? activation : ''); 
};

const clearFilter = () => {
  searchInput.value = '';
  getAllUsers();
  toggleDropdown();
}


    function fnExcelReport() {
  var table = document.getElementById('my-invoice'); // id of table
  var tableHTML = table.outerHTML;
  var fileName = 'crm_data.xls';

  var msie = window.navigator.userAgent.indexOf("MSIE ");

  // If Internet Explorer
  if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
    dummyFrame.document.open('txt/html', 'replace');
    dummyFrame.document.write(tableHTML);
    dummyFrame.document.close();
    dummyFrame.focus();
    return dummyFrame.document.execCommand('SaveAs', true, fileName);
  }
  //other browsers
  else {
    var a = document.createElement('a');
    tableHTML = tableHTML.replace(/  /g, '').replace(/ /g, '%20'); // replaces spaces
    a.href = 'data:application/vnd.ms-excel,' + tableHTML;
    a.setAttribute('download', fileName);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}

const tableHeaders = ref([
    "Name",
    "Surname",
    "Email",
    "Cell Number",
    "Opt-in",
    "Activation Area",
    "Region",
]);

const selectedActivation = ref();
const filteredUsers = ref([]);

const onActivationChange = (activation) => {
  filteredUsers.value = [];
  filteredUsers.value = users.value.filter((user) => user.activation === activation.id);
}

</script>

<template>
    <Layout>
      <div class="page-wrapper">
        <div class="page-content">
          <BreadCrumb title="CRM" icon="bx bxs-calculator" />
            <!-- Code here -->
            <div class="">
                <div class="table-container-colour pl-5">
                  <div class="mb-2 d-flex justify-content-between ">
                    <Select @change="onActivationChange(selectedActivation)" @clear="clearFilter" showClear :loading="showLoading" v-model="selectedActivation" :options="allActivations" filter optionLabel="name" 
                    placeholder="Select activation" class="w-90">
                      <template #value="slotProps">
                          <div v-if="slotProps.value" class="flex items-center">
                              <div>{{ slotProps.value.name }}</div>
                          </div>
                          <span v-else>
                              {{ slotProps.placeholder }}
                          </span>
                      </template>
                      <template #option="slotProps">
                          <div class="flex items-center">
                              <div>{{ slotProps.option.name }}</div>
                          </div>
                      </template>
                  </Select>
                    <!-- <input type="text" class="form-control" placeholder="Search" v-model="searchInput" @input="onSearchInput('')" style="width: 25rem;"> -->
                    <button class="btn btn-primary maz-gradient-btn" @click="toggleModal">Add New User</button>
                  </div>
                    <div class="d-flex justify-content-between">
                        <h5>Database</h5>
                        <div class="filter-dropdown">
                            <h5 style="display: inline;">Filter</h5>
                            <img src="https://img.icons8.com/ios-filled/20/ffffff/filter.png" alt="Filter Icon"
                                class="filter-icon" @click="toggleDropdown" />
                            <div ref="showDropdown" class="filter-dropdown-content">
                                <a class="cursor-pointer" v-for="activation in uniqueActivations" :key="activation.id" 
                                 @click="filterByActivation(activation?.id)">{{ activation.activationName }}</a>
                                <hr/>
                                <a class="cursor-pointer" @click="clearFilter">Clear Filter</a>
                            </div>
                        </div>

                    </div>
                    <table class="table table-striped table-bordered " id="my-invoice">
                      <thead>
                        <tr class="table-dark-color">
                          <th>Contact Name</th>
                          <th>Contact Surname</th>
                          <th>Email</th>
                          <th>Cell Number</th>
                          <th>Opt-in</th>
                          <th>Address</th>
                          <th>Region</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-if="filteredUsers?.length > 0" v-for="user in filteredUsers" :key="user.id">
                          <td>{{ user.name }}</td>
                          <td>{{ user.surname }}</td>
                          <td>{{ user.email }}</td>
                          <td>{{ user.phone }}</td>
                          
                          <td>
                            <Checkbox v-model="user.optIn" :binary="true" />
                          </td>
                          <td>{{ user.address }}</td>
                          <td>{{ user.regionName }}</td>
                        </tr>
                      </tbody>
                    </table>
                    <div class="text-end">
                        <button class="btn btn-secondary btn-export rounded-0 mb-0 mx-2" @click="fnExcelReport" type="button">Export</button>
                        <HTMLTableToPDF :headers="tableHeaders" :data="users"/>
                    </div>
                    <iframe id="dummyFrame" style="display:none"></iframe>
                </div>
            </div>
            <CRMChart/>
        </div>
    </div>
    </Layout>
  
    <!-- Modal component -->
     <Dialog v-model:visible="showModal" position="top" modal header="Add User" :style="{ width: '35rem' }" >
    <CrmModal
      :showModal="showModal" 
      :modalData="modalData" 
      :regions="regions" 
      @closeModal="hideModal" 
    />
  </Dialog>
  </template>
  
  <style scoped>

  .p-select{
    width: 30% !important;
  }
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
.filter-dropdown {
  position: relative;
  display: inline-block;
}

.filter-dropdown-content {
  display: none;
  position: absolute;
  background-color: #1e90ff;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  right: 0rem;
}

.filter-dropdown-content a {
  color: white;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.filter-dropdown-content a:hover {
  background-color: #0056b3;
}

.filter-icon {
  width: 20px;
  margin-left: 10px;
  cursor: pointer;
}

.show {
  display: block;
}
</style>
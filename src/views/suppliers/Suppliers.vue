<script setup>
import { onMounted, ref, reactive, watch } from 'vue';
import Layout from '@/views/shared/Layout.vue';
import BreadCrumb from '@/components/BreadCrumb.vue';
import Textarea from 'primevue/textarea';
import Dialog from 'primevue/dialog';
import { useVuelidate } from '@vuelidate/core';
import { email, required } from '@vuelidate/validators';
import useToaster from '@/composables/useToaster';
import { useSizes } from '@/stores/sizes';
import Paginator from '@/components/Paginator.vue';
import { useSupplier } from '@/stores/supplier';
import { useUserStore } from '@/stores/userStore';
import Button from '@/components/buttons/Button.vue';
import Spinner from '@/components/buttons/Spinner.vue';
import Row from '@/components/general/Row.vue';
import Column from '@/components/general/Column.vue';
import InputLabel from '@/components/form-components/InputLabel.vue';
import Input from '@/components/form-components/Input.vue';
import InputError from '@/components/form-components/InputError.vue';
import InputNumber from '@/components/form-components/InputNumber.vue';
import Card from '@/components/general/Card.vue';
import CardBody from '@/components/general/CardBody.vue';
import PromoterCard from '@/components/PromoterCard.vue';
import SupplierCard from '@/components/SupplierCard.vue';
import router from '@/router';
import SearchInput from '@/components/form-components/SearchInput.vue';

const supplierStore = useSupplier();
const userStore = useUserStore();
const toaster = useToaster();
const sizeStore = useSizes();
const envPath = import.meta.env.VITE_AWS_S3_BUCKET;

const allData = ref([]); //for pagination


let sizes = ref([]);
const promoters = ref([...supplierStore.allSuppliers]);
let showLoading = ref(false);
let searchInput = ref('');

const form = reactive({
  firstName: null,
  lastName: null,
  name: null,
  phone: null,
  email: null,
  user: null,
  description: null,
  gender: null,
  role: "SUPPLIER",
  password: "cpweb",

});

onMounted(() => {
  getSuppliers();
  getAllSizes();
});

const genders = ref([
  { name: 'Male', value: 'male' },
  { name: 'Female', value: 'female' },
  { name: 'Other', value: 'other' }
]);

const rules = {
  firstName: { required },
  lastName: { required },
  email: { required, email },
  phone: { required },
  // gender: { required },
};
const v$ = useVuelidate(rules, form);

const onSubmit = async () => {
  const isFormValid = await v$.value.$validate();
  if (!isFormValid) return; // Stop if the form is not valid
   showLoading.value = true;
  try {
    if (isEdit.value) {
      await userStore.updateUser(supplierId.value, form);
      toaster.success("Supplier updated successfully");
      showLoading.value = false;
    } else {
      supplierStore.submitSupplier(form).then(function (response) {
      getSuppliers();
      showLoading.value = false;
      visible.value = false;
      toaster.success("Supplier created successfully");

      }).catch(function (error) {
        showLoading.value = false;
        toaster.error("Error creating supplier");
        console.log(error);
      });
      
    }
  } catch (error) {
    toaster.error("Error processing supplier");
    console.error(error);
  }
};

const onInput = () => {
  if (searchInput.value) {
    const searchTerm = searchInput.value.toLowerCase();
    //will go to server
   
  } else {
    promoters.value = [...supplierStore.allSuppliers]; // Reset to original full list if no search term
  }

};


const getSuppliers = async () => {
  showLoading.value = true;
  supplierStore.getAllSuppliers().then(response => {
    showLoading.value = false;
    supplierStore.setAllSuppliers(response.data.content);
    allData.value = response.data;
    promoters.value = [...supplierStore.allSuppliers]; 
  }).catch(error => {
    toaster.error("Error fetching suppliers");
    console.log(error);
  }).finally(() => {
    showLoading.value = false;
  });
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

const openPosition = (promoter) => {
  if (promoter) {
    isEdit.value = true;
    supplierId.value = promoter.id;
    form.user = promoter.id;
    user_id.value = promoter.id;

    Object.assign(form, {
      firstName: promoter.firstName,
      lastName: promoter.lastName,
      email: promoter.email,
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
  visible.value = true;
};


const toggleModal = () => {
  isEdit.value = false; // Reset edit mode
  form.firstName = null;
  form.lastName = null;
  form.email = null;
  form.phone = null;
  form.description = null;
  visible.value = true; // Show modal
};

const handlePageChange = (newPage) => {
  supplierStore.getPromoters(newPage).then(function (response) {
    supplierStore.setAllPromoters(response.data.content);
    promoters.value = [...supplierStore.allPromoters];
  });
};

const redirectToProfile = (user) => {
	if(!user) return
  router.push({
    path: `/supplier-profile/${user?.activeUserId}/${user?.id}`
  });
};

</script>

<template>
  <Layout>
    <div class="page-wrapper">
      <div class="page-content">
        <BreadCrumb title="Suppliers" icon="bx bxs-user-detail" />
        <div class="card">
          <div class="card-body">
            <div class="d-lg-flex align-items-center mb-4 gap-1">
              <div class="position-relative">
                <SearchInput 
                  placeholder="Search" 
                  id="searchInput"
                  v-model="searchInput" @input="onInput" classes="form-control ps-5" type="search">
                  <template #search>
                    <span class="position-absolute top-50 product-show translate-middle-y">
                      <i class="bx bx-search"></i>
                    </span>
                  </template>
								</SearchInput>
              </div>
              <div class="ms-auto">
                <Button @click="toggleModal" classes="btn maz-gradient-btn mt-2 mt-lg-0" type="button">
                  <template #content>
                    Add Supplier
                  </template>									  
                </Button>
              </div>
            </div>

            <div class="row row-cols-1 row-cols-lg-2 row-cols-xl-3 row-cols-xxl-4">

              <Column class="col" v-if="promoters?.length > 0" v-for="promoter in promoters" :key="promoter.id">
								<Card classes="radius-15">
									<CardBody class="text-center">
							         <SupplierCard 
                          :promoter="promoter" 
                          classes="p-4 border radius-15" 
                          @gotToProfile="redirectToProfile" 
                          @edit="openPosition"
                      />
                   </CardBody>
						       </Card>
							</Column>
            </div>

            <Paginator :page="allData?.page" @changePage="handlePageChange" v-if="!showLoading" />
          </div>
        </div>
      </div>
    </div>

    <Dialog v-model:visible="visible" position="top" modal :header="isEdit ? 'Edit Supplier' : 'Add Supplier'" :style="{ width: '50rem' }">
      <Row class="g-3">        
        <Column classes="col-md-6">
          <InputLabel labelText="First Name" classes="form-label" htmlFor="firstName"/>
          <Input v-model="form.firstName" type="text" classes="form-control" id="firstName" placeholder="" />
          <InputError classes="input-errors" :errors="v$.firstName.$errors" message="First Name is required" />
        </Column>

        <Column classes="col-md-6">
          <InputLabel labelText="Last Name" classes="form-label" htmlFor="lastName"/>
          <Input v-model="form.lastName" type="text" classes="form-control" id="lastName" placeholder="" />
          <InputError classes="input-errors" :errors="v$.lastName.$errors" message="Last Name is required" />
          </Column>

          <Column classes="col-md-6">
          <InputLabel labelText="Email" classes="form-label" htmlFor="email"/>
          <Input v-model="form.email" type="email" classes="form-control" id="email" placeholder="" />
          <InputError classes="input-errors" :errors="v$.email.$errors" message="Email is required" />
          </Column>

          <Column classes="col-md-6">
          <InputLabel labelText="Phone Number" classes="form-label" htmlFor="cell"/>
          <InputNumber v-model="form.phone" classes="form-control" id="cell" placeholder="" />
          <InputError classes="input-errors" :errors="v$.phone.$errors" message="Phone Number is required" />
          </Column>

          <Column classes="col-md-12">
            <InputLabel labelText="Name" classes="form-label" htmlFor="name"/>
            <Input v-model="form.name" type="text" classes="form-control" id="name" placeholder="" />
          </Column>
       
        <Column class="col-md-12">
          <InputLabel labelText="Description" classes="form-label" htmlFor="description"/>
          <Textarea v-model="form.description" id="description" autoResize rows="5" cols="91"/>
        </Column>
         
      </Row>

      <Column class="col-12 mt-4">
        <div class="d-grid">
          <Button @click="onSubmit" classes="btn maz-gradient-btn" type="button" text="Submit">
            <template #content>
            {{ isEdit ? showLoading ? '' : 'Update' : showLoading ? '' : 'Submit' }}
            </template>									  
            <Spinner v-if="showLoading" class="spinner-border spinner-border-sm" />
          </Button>
        </div>
      </Column>
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

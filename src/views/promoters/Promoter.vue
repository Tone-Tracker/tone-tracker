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
import { useUserStore } from '@/stores/userStore';
import Badge from 'primevue/badge';

const promoterStore = usePromoter();
const toaster = useToaster();
const userStore = useUserStore();
const confirm = useConfirm();

let users = ref([]);
let promoters = ref([]);
let showLoading = ref(false);
let searchInput = ref('');


const form = reactive({
  user: null,
	dressSize: null,
	pantsSize: null,
	client: null,
  topSize: null,
  height: null,
  bio: null
});

onMounted(() => {
  getAllPromoters();
  getAllUsers();
});


const rules = { 
  user: { required },
	dressSize: { required },
	pantsSize: { required },
	height: { required },
	topSize: { required },
  bio: { required },
};
const v$ = useVuelidate(rules, form);


const onSubmit = async () => {
	const isFormValid = await v$.value.$validate();
	if (!isFormValid) {
    console.log('fuckit')
		return;
	}
  if(isEdit.value){
    promoterStore.updatePromoter(promoterId.value,form).then(function (response) {
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


const onInput = () => {
  if (searchInput.value) {
    users.value = users.value.content.filter(user =>
      user.firstName.toLowerCase().includes(searchInput.value.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchInput.value.toLowerCase())
    );
  } else {
    getAllPromoters();
  }
};

const getAllPromoters = async () => {
  showLoading.value = true;
  promoterStore.getPromoters().then(response => {
    showLoading.value = false;
    promoters.value = response.data;
  }).catch(error => {
    toaster.error("Error fetching users");
    console.log(error);
  }).finally(() => {
    showLoading.value = false;
  });
};
const getAllUsers = async () => {
  showLoading.value = true;
  userStore.getUsers().then(response => {
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

const getFullName = (promoter) => {
   return users.value.find(user => user.id === promoter.user).firstName + ' ' + users.value.find(user => user.id === promoter.user).lastName
}

const search = (event) => {
    const query = event.query.toLowerCase();
	  let myObj = users.value.filter(user => user.firstName.toLowerCase().includes(query));
    dropdownItems.value = myObj.map(user => user.firstName + ' ' + user.lastName);
};

const onUserChange = (event) => {
	form.user = users.value.find(user => user.firstName + ' ' + user.lastName === event.value).id;
};



const openPosition = (pos,promoter) => {
  if(promoter) {//edit
    isEdit.value = true;
    promoterId.value=promoter.id;
    form.user=promoter.user
    user_id.value = users.value.find(user => user.id === promoter.user).firstName + ' ' + users.value.find(user => user.id === promoter.user).lastName
    Object.assign(form, {
      dressSize: promoter.dressSize,
      pantsSize: promoter.pantsSize,
      topSize: promoter.topSize,
      height: promoter.height,
      bio: promoter.bio
    })
  }else{
    isEdit.value = false
    Object.assign(form, {
      user: null,
      user_id: null,
      dressSize: null,
      pantsSize: null,
      topSize: null,
      height: null,
      bio: null
    })
  }
    position.value = pos;
    visible.value = true;
}

const deleteRecord = (event, promoter) => {
  confirm.require({
    target: event.currentTarget,
    message: 'Do you want to delete this promoter?',
    icon: '',
    rejectProps: {
      label: 'Cancel',
      severity: '',
      outlined: true
    },
    acceptProps: {
      label: 'Delete',
      severity: 'danger'
    },
    accept: () => {
      deletePromoter(promoter);
    },
    reject: () => {
      // do nothing
    }
  });
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
                <input v-model="searchInput" @input="onInput"
                  type="text" class="form-control ps-5 radius-30" placeholder="Search">
                <span class="position-absolute top-50 product-show translate-middle-y">
                  <i class="bx bx-search"></i>
                </span>
              </div>
              <div class="ms-auto">
                <a  @click="openPosition('top')" class="btn maz-gradient-btn radius-30 mt-2 mt-lg-0">
                  <i class="bx bxs-plus-square"></i>Add Promoter</a>
              </div>
            </div>
            <div class="table-responsive">
              <table class="table mb-0">
                <thead class="table-light">
                  <tr>
                    <th>Full Name</th>
                    <th>Height</th>
                    <th>Dress Size</th>
                    <th>Pants Size</th>
                    <th>Top Size</th>
                    <th>Bio</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="promoters" v-for="promoter in promoters" :key="promoter.id">
                    <td>{{ getFullName(promoter) }}</td>
                    <td> <Badge :value="promoter.height" severity="success"></Badge></td>
                    <td><Badge :value="promoter.dressSize" severity="info"></Badge></td>
                    <td><Badge :value="promoter.pantsSize" severity="warn"></Badge></td>
                    <td><Badge :value="promoter.topSize" severity="danger"></Badge></td>
                    <td>{{ truncateText(promoter.bio,60) }} 
                      <span @click="openPosition('top',promoter)" class="cursor-pointer text-primary">See More</span>
                    </td>
                    <td>
                      <div class="d-flex order-actions">
                        <a @click="openPosition('top',promoter)" href="javascript:;" >
                          <i class='bx bxs-edit'></i>
                        </a>
                        <a @click="deleteRecord($event, promoter)" href="javascript:;" class="ms-3">
                          <i class='bx bxs-trash'></i>
                        </a>
                        <ConfirmPopup></ConfirmPopup>
                      </div>
					  
                    </td>
                  </tr>
                  <tr v-else>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td colspan="7" class="text-center"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>


	<Dialog v-model:visible="visible" modal header="Add Promoter" :style="{ width: '50rem' }">
    <div class="card flex justify-center">
      <label for="input1" class="form-label">Choose User</label>
       <AutoComplete v-model="user_id" forceSelection dropdown :suggestions="dropdownItems" 
        @item-select="onUserChange" @complete="search" field="name" />
         <div class="input-errors" v-for="error of v$.user.$errors" :key="error.$uid">
         <div class="text-danger">User is required</div>
          </div>
     </div>
     <div class="row g-3">
      <div class="col-md-3">
        <label for="dress_size" class="form-label">Dress Size</label>
        <input v-model="form.dressSize" type="number" class="form-control" id="dress_size" >
        <div class="input-errors" v-for="error of v$.dressSize.$errors" :key="error.$uid">
          <div class="text-danger">Dress Size is required</div>
          </div>
        </div>
        <div class="col-md-3">
        <label for="pantsSize" class="form-label">Pants Size</label>
        <input v-model="form.pantsSize" type="number" class="form-control" id="pantsSize" >
        <div class="input-errors" v-for="error of v$.pantsSize.$errors" :key="error.$uid">
          <div class="text-danger">Pants Size is required</div>
          </div>
        </div>
        <div class="col-md-3">
        <label for="height" class="form-label">Height</label>
        <input v-model="form.height" type="number" class="form-control" id="height" >
        <div class="input-errors" v-for="error of v$.height.$errors" :key="error.$uid">
          <div class="text-danger">Email is required</div>
          </div>
        </div>
        <div class="col-md-3">
        <label for="top-size" class="form-label">Top Size</label>
        <input v-model="form.topSize" type="number" class="form-control" id="top-size" >
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

        
        <div class="col-12">
          <div class="d-grid">
          <button @click="onSubmit" class="btn maz-gradient-btn" type="button"> 
            {{ isEdit ? 'Update' : 'Submit' }}
          </button>
          </div>
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
  align-items:start !important;
}
</style>

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

const promoterStore = usePromoter();
const toaster = useToaster();
const userStore = useUserStore();
const confirm = useConfirm();
const sizeStore = useSizes();

let users = ref([]);
let sizes = ref([]);
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
	if (!isFormValid) {return;}
  // let formData = new FormData();
  // formData.append('user', form.user);
  // formData.append('dressSize', form.dressSize);
  // formData.append('pantsSize', form.pantsSize);
  // formData.append('client', form.client);
  // formData.append('topSize', form.topSize);
  // formData.append('height', form.height);
  // formData.append('bio', form.bio);
  // //loop files and append to form data
  // for (let i = 0; i < files.value.length; i++) {
  //   formData.append('files', files.value[i]);
  // }
  
  
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
    const searchTerm = searchInput.value.toLowerCase();

    promoters.value = promoters.value.filter((promoter) => {
      const userDetails = promoter.userDetails;
      const experiences = promoter.experiences.map(exp => `${exp.name} ${exp.description} ${exp.duration}`).join(" ");

      return (
        promoter.height?.toString().includes(searchTerm) ||
        promoter.topSize?.toLowerCase().includes(searchTerm) ||
        promoter.pantsSize?.toLowerCase().includes(searchTerm) ||
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
    getAllPromoters(); 
  }
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
const getAllPromoters = async () => {
  showLoading.value = true;
  promoterStore.getPromoters().then(response => {
    showLoading.value = false;
    promoters.value = response.data.content;
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
      bio: promoter.bio,
      gender: promoter.gender
    });
    myGender.value = form.gender
  }else{
    isEdit.value = false
    Object.assign(form, {
      user: null,
      user_id: null,
      dressSize: null,
      pantsSize: null,
      topSize: null,
      height: null,
      bio: null,
      gender: null
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

const $primevue = usePrimeVue();

const totalSize = ref(0);
const totalSizePercent = ref(0);
const files = ref([]);

const onRemoveTemplatingFile = (file, removeFileCallback, index) => {
    removeFileCallback(index);
    totalSize.value -= parseInt(formatSize(file.size));
    totalSizePercent.value = totalSize.value / 10;
};

const onClearTemplatingUpload = (clear) => {
    clear();
    totalSize.value = 0;
    totalSizePercent.value = 0;
};

const onSelectedFiles = (event) => {
    files.value = event.files;
    files.value.forEach((file) => {
        totalSize.value += parseInt(formatSize(file.size));
    });
};

const uploadEvent = (callback) => {
    totalSizePercent.value = totalSize.value / 10;
    callback();
};

const onTemplatedUpload = () => {
    // toast.add({ severity: "info", summary: "Success", detail: "File Uploaded", life: 3000 });
};

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
    //  myGender.value = event.value.code;
     form.gender = myGender.value.code
}
const getDressSize = (size) => {
    if (!size) {return ""}
    if (size === "SMALL") {
      return "S"      
    } else if (size === "MEDIUM") {
      return "M"
    } else if (size === "LARGE") {
      return "L"
    } else if (size === "X_LARGE") {
      return "XL"
    } else if (size === "XX_LARGE") {
      return "XXL"
    } else if (size === "XXX_LARGE") {
      return "XXXL"
    }else if (size === "X_SMALL") {
      return "XS"
    }
}
const op = ref();
const selectedPromoter = ref(null);
const toggle = (event, promoter) => {
  selectedPromoter.value = promoter;
    op.value.toggle(event);
}

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
                  type="text" class="form-control ps-5" placeholder="Search">
                <span class="position-absolute top-50 product-show translate-middle-y">
                  <i class="bx bx-search"></i>
                </span>
              </div>
              <div class="ms-auto">
                <!-- <a  @click="openPosition('top')" class="btn mr-2 maz-gradient-btn radius-30 mt-2 mt-lg-0">
                  <i class="bx bxs-plus-square"></i>Add Promoter</a> -->
                  <!-- <label for="csv-file" class="mx-2 btn maz-gradient-btn radius-30 mt-2 mt-lg-0">
                    <i class="bx bx-import"></i>Upload CSV</label>
                    <input type="file" id="csv-file" ref="file" hidden /> -->
              </div>
            </div>
            <div class="table-responsive">
              <table class="table mb-0">
                <thead class="table-light">
                  <tr>
                    <th>Full Name</th>
                    <th>Height</th>
                    <th>Gender</th>
                    <th>Dress Size</th>
                    <th>Pants Size</th>
                    <th>Top Size</th>
                    <th>Bio</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="promoters.length > 0" v-for="promoter in promoters" :key="promoter.id">
                    <td>{{ promoter.userDetails.firstName }}{{ promoter.userDetails.lastName }}</td>
                    <td> <Badge :value="`${promoter.height} cm`" severity="success"></Badge></td>
                    <td>{{ promoter.gender }}</td>
                    <td><Badge :value="getDressSize(promoter.dressSize)" severity="info"></Badge></td>
                    <td><Badge :value="promoter.pantsSize" severity="warn"></Badge></td>
                    <td><Badge :value="getDressSize(promoter.topSize)" severity="danger"></Badge></td>
                    <td>{{ truncateText(promoter.bio,60) }} 
                      <span @click="toggle($event, promoter)" class="cursor-pointer text-primary">See More</span>
                     
                    </td>
                    <td>
                      <div class="d-flex order-actions">
                        <a @click="openPosition('top',promoter)" href="javascript:;" >
                          <i class='bx bxs-edit'></i>
                        </a>
                        <!-- <a @click="deleteRecord($event, promoter)" href="javascript:;" class="ms-3">
                          <i class='bx bxs-trash text-danger'></i>
                        </a> -->
                        <ConfirmPopup></ConfirmPopup>
                      </div>
					  
                    </td>
                  </tr>
                  <tr v-else>
                    <td colspan="7" class="text-center text-danger">No promoters found.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <Popover ref="op" appendTo="body">
          <p>{{ selectedPromoter.bio }}</p>
      </Popover>
      </div>
    </div>


	<Dialog v-model:visible="visible" position="top" modal :header="isEdit ? 'Edit Promoter' : 'Add Promoter' " :style="{ width: '50rem' }">
    <div class="card flex justify-center">
      <label for="input1" class="form-label">Gender </label>
      <Select v-model="myGender" :options="genders"  @change="genderChange"
      optionLabel="name" placeholder="Select gender" 
      checkmark :highlightOnSelect="false" class="w-full md:w-56" />
      <div class="input-errors" v-for="error of v$.gender.$errors" :key="error.$uid">
        <div class="text-danger">Gender is required</div>
        </div>
     </div>
     <div class="row g-3">
      <div class="col-md-3">
        <label for="dress_size" class="form-label">Dress Size</label>
        <select v-model="form.dressSize" class="form-control" id="dress_size" >
          <option v-for="size in sizes" :key="size.id" :value="size">{{ size }}</option>
        </select>
        <div class="input-errors" v-for="error of v$.dressSize.$errors" :key="error.$uid">
          <div class="text-danger">Dress Size is required</div>
          </div>
        </div>
        <div class="col-md-3">
        <label for="pantsSize" class="form-label">Pants Size</label>
        
        <input  v-model="form.pantsSize" class="form-control" id="pantsSize"   />
        
        <div class="input-errors" v-for="error of v$.pantsSize.$errors" :key="error.$uid">
          <div class="text-danger">Pants Size is required</div>
          </div>
        </div>
        <div class="col-md-3">
        <label for="height" class="form-label">Height</label>
        <input v-model="form.height" type="number" class="form-control" id="height" >
        <div class="input-errors" v-for="error of v$.height.$errors" :key="error.$uid">
          <div class="text-danger">Height is required</div>
          </div>
        </div>
        <div class="col-md-3">
        <label for="top-size" class="form-label">Top Size</label>
        <select v-model="form.topSize" class="form-control" id="top-size" >
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
  align-items:start !important;
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

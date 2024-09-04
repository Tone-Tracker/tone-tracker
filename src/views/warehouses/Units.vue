
<script setup>
import Layout from '../shared/Layout.vue';
import BreadCrumb from '../../components/BreadCrumb.vue';
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { useWarehouse } from '@/stores/warehouse';
import Popover from 'primevue/popover';
import InputText from 'primevue/inputtext';
import { reactive } from 'vue';
import InputNumber from 'primevue/inputnumber';
import useToaster from '@/composables/useToaster';
import { useStock } from '@/stores/stock';
import FileUploadGeneric from '../upload/FileUploadGeneric.vue';
import Dialog from 'primevue/dialog';
import Avatar from 'primevue/avatar';
import Drawer from 'primevue/drawer';
import Image from 'primevue/image';
import SplitButton from 'primevue/splitbutton';

const envPath = import.meta.env.VITE_AWS_S3_BUCKET;

const route = useRoute();
const warehouseStore = useWarehouse();
const toaster = useToaster();
const stock = useStock();
const warehouseName = ref(route.query.name);
const warehouse = ref(null);
const op = ref();
const unitId = ref();
const loading = ref(false);
const stockList = ref([]);
const searchInput = ref('');
const merchendiseList = ref([]);
const brandings = ref([]);
const visible = ref(false);
const showFilePreview = ref(true);


watch(searchInput, () => {
	merchendiseList.value = stockList.value?.filter((stock) => stock.type === 'MERCH' && stock.description.toLowerCase().includes(searchInput.value.toLowerCase()));
	brandings.value = stockList.value?.filter((stock) => stock.type === 'BRANDING' && stock.description.toLowerCase().includes(searchInput.value.toLowerCase()));
})


onMounted(() => {
	getWarehouse();
});

const getWarehouse = () => {
	warehouseStore.viewWarehouse(route.params.id).then((response) => {
		warehouse.value = response.data;
	});
}
const unitName = ref(null);
const onUnitChange = (event) => {
	unitId.value = null;     // reset the unit
	unitId.value = event.target.value;
	stockForm.unit = event.target.value;
	unitName.value = warehouse.value?.unitsList?.filter((unit) => unit.id == event.target.value)[0]?.name;
	console.log(unitName.value);
	getStock();
}

const getStock = () => {
	stock.getStockByUnit(unitId.value).then((response) => {
		console.log(response.data);
		stockList.value = response.data;
		merchendiseList.value = response.data?.filter((stock) => stock.type === 'MERCH');
		brandings.value = response.data?.filter((stock) => stock.type === 'BRANDING');
	});
}

const toggle = (event) => {
    op.value.toggle(event);
}

const stockForm = reactive({
    description: '',
    quantity: null,
    type: '',
	unit: null
});

const stockRules = { 
    description: { required },
    quantity: { required },
    type: { required },
};
const stockV$ = useVuelidate(stockRules, stockForm);
const selectedFile = ref(null);
const submitStock = async () => {
	const isFormValid = await stockV$.value.$validate();
    if (!isFormValid) {return;}
	loading.value = true;
    try {
		const formData = new FormData();
		formData.append('stockImage', selectedFile.value);
		formData.append('description', stockForm.description);
		formData.append('quantity', stockForm.quantity);
		formData.append('type', stockForm.type);
		formData.append('unit', stockForm.unit);

		const config = {
      useMultipartFormData: true // Add this flag to the request config
    };

        await stock.addStock(formData, config);
		visible.value = false;
		getStock();
        toaster.success("Region created successfully");
        stockForm.description = ''; // Reset the form input
		stockForm.quantity = '';
		stockForm.type = '';
        stockV$.value.$reset(); // Reset the validatione();
		stockV$.$errors = [];
    } catch (error) {
        toaster.error("Error creating region");
        console.log(error);
    } finally {
        loading.value = false;
    }
}


const onFileChange = (uploadedFile) => {
    console.log('event', uploadedFile);
    selectedFile.value = uploadedFile;
}

const onfileDropped = (dropedFile) => {
   console.log('dropedFile', dropedFile);
      selectedFile.value = null

      // Get selected files
      const files = dropedFile;
      if (!files) return
      const file = files[0];
      selectedFile.value = file;
};
const showStockImage = ref(false);
const stockImagePreview = ref(null);
const viewStockImagePreview = (model) => {
	if(!model?.stockImage) {
		showStockImage.value = false;
		return;
	}
	showStockImage.value = true;
	stockImagePreview.value = envPath + model?.stockImage ;
}

const items = (region) => [
    {
        label: 'Edit',
        icon: 'bx bx-bullseye fs-4 text-white',
        command: () => {
            openModal('top', region)
        }
    },
	{
        label: 'Assign Regional Manager',
        icon: 'bx bx-user fs-4 text-white',
        command: () => {
            openModal('top', region)
        }
    },
    {
        label: 'Add Warehouse',
        icon: 'bx bx-building-house fs-4 text-white',
        command: () => {
            openWarehouseModal(region)
        }
    },
    {
        label: 'Delete',
        icon: 'bx bx-trash text-danger fs-4 ',
        command: () => {
            deleteRecord(region)
        }
    }
];

const editBranding = (branding) => {
    brandings.value.forEach(c => c.isEditing = false);
    branding.isEditing = true;
};

</script>

<template>
    <Layout>
		<!--start page wrapper -->
		<div class="page-wrapper">
			<div class="page-content">

				<BreadCrumb title="Warehousing" icon="bx bxs-school"/>
				<div class="row">
					<div class="col-lg-1"></div>
					<div class="col-lg-8">
						<h4 class="mb-4">{{ warehouseName }}</h4>
					</div>
					
				</div>
				

                <div class="row">
					<div class="col-lg-1"></div>
                    <div class="col-lg-10 col-md-12">
						<div class="gradient-card">
						  <div class="content">
							<strong>Region:</strong> Gauteng Central<br>
							<strong>Number of storage units:</strong> {{ warehouse?.numberOfUnits }} unit(s)<br>
							<strong>Capacity:</strong> 50%<br>
							<strong>Number of items:</strong> 1500
						  </div>
						</div>
					  </div>
                  
                 </div>


				 <div class="row mt-4">
					<div class="col-lg-1"></div>
                    <div class="col-lg-3 col-md-6">
						<select @change="onUnitChange" class="form-select form-select-sm bg-maz-light" aria-label=".form-select-sm example">
							<option :value="''" selected="selected" disabled>Filter by unit</option>
							<option v-for="(unit,index) in warehouse?.unitsList" :key="unit + index" 
							:value="unit.id">
								{{ unit.name }}
							</option>
						</select>
					  </div>
					  <div class="col-lg-4 col-md-6">
						
					  </div>
					  <div class="col-lg-3 col-md-6">
						<div class="container ">
							<div class="search-container">
							  <input v-model="searchInput" type="text" class="form-control search-input" placeholder="Search for item">
							  <i class="bx bx-search search-icon"></i>
							</div>
						  </div>
					  </div>
					  <div class="col-lg-1"></div>
                 </div>
				
				

				 <div class="row mt-4 ">
					<div class="col-lg-1"></div>
					<div class="col-12 col-lg-3">
						<div class="card radius-10">
							 <div class="card-body">
								<div class="card card-custom">
									<h5>Stock check</h5>
									<p class="text-light"><strong>Storage Capacity:</strong> 50%</p>
									<p class="text-light"><strong>Days since last check:</strong> 15 Days</p>
									<p class="text-light"><strong>Checked by:</strong> Tumelo Moloka</p>
								  </div>
							
								  <div class="card card-custom">
									<h5>Inventory accuracy</h5>
									<div class="chart-container">
									  <canvas id="inventoryAccuracyChart"></canvas>
									</div>
								  </div>
							 </div>
						</div>
					</div>


					<div class="col-12 col-lg-6 d-flex">
						<div class="card radius-10 w-100">
						  <div class="card-header">
							  <div class="d-flex align-items-center">
								  <div>
									  <h6 class="mb-0">In Stock</h6>
								  </div>
								  <div class="dropdown ms-auto">
									 <button @click="visible=true" 
									 :disabled="!unitId"
									 type="button" class="btn maz-gradient-btn">Add Stock</button>
								  </div>
							  </div>
						  </div>
						  <div class="card-body row  mx-2">
							<div class="table-responsive table table-dark table-striped w-50">
								<table class="table align-middle mb-0">
								 <thead class="table-light">
								  <tr style="background:#1D2126">
									<th>#</th>
									<th>Description</th>
									<th>Number</th>
									<th>Action</th>
								  </tr>
								  </thead>
								  <tbody>
									<tr v-if="brandings?.length > 0" v-for="branding in brandings" class="maz-table-row-height">
										<td>
										  <Avatar  @click="viewStockImagePreview(branding)" 
										  :image="branding.stockImage ? envPath + branding.stockImage : `https://ui-avatars.com/api/?name=${ branding.description }&background=4263C5`" 
										   class="mr-2 cursor-pointer" size="large" shape="circle" />
										
										</td>
								   <td v-if="!branding.isEditing">{{branding.description}}</td>
								   <td v-else>
									<input style="width: 60%" v-focus type="text" v-model="branding.description" @blur="update(branding)" @keyup.enter="update(branding)" class="no-border-input"/>
								</td>
								   <td>{{branding.quantity}}</td>
								   <td>
									<SplitButton v-if="!branding.isEditing" @click="editBranding(branding)" class="text-white" label="" 
													icon="bx bx-edit fs-4" 
													dropdownIcon="text-white fs-4 bx bx-chevron-down" 
													:model="items(branding)"/>
									<button v-else @click="update(branding)" class="btn btn-sm maz-gradient-btn" type="button">
										<i class='bx bx-check text-success'></i>
									</button>  
								   </td>
								  </tr>
								  <tr v-else ><td colspan="7" class="text-center text-danger">No results found.</td></tr>
			   
								 </tbody>
							   </table>
							 </div>

							 
							 <div class="table-responsive table table-dark table-striped w-50">
								<table class="table align-middle mb-0">
								 <thead class="table-light">
								  <tr style="background:#1D2126">
									<th>
										#
									</th>
									<th>Description</th>
									<th>Number</th>
									<th>Action</th>
								  </tr>
								  </thead>
								  <tbody>
									<tr v-if="merchendiseList?.length > 0" v-for="merch in merchendiseList" class="maz-table-row-height">
								   <td>
									<div class="card flex justify-center">
										<Avatar image="/images/avatar/amyelsner.png" class="mr-2" size="xlarge" shape="circle" />
									</div>
								   </td>
								   <td>{{merch.description}}</td>
								   <td>{{merch.quantity}}</td>
								   <td></td>
								  </tr>
			   
								  <tr v-else ><td colspan="7" class="text-center text-danger">No results found.</td></tr>
								 </tbody>
							   </table>
							 </div>
						  </div>
						</div>
					 </div>
				</div>



			</div>
		</div>
		<Dialog v-model:visible="visible" position="top" modal :header="`Add Stock to ${unitName}`" style="width: 30rem">
               
			<form @submit.prevent="submitStock" class="row mt-3">
                
				<div class="col-md-12">
					<div class="card my-card flex justify-center">
						<label for="input1" class="form-label">Description</label>
						   <InputText type="text" v-model="stockForm.description" />
						   <div class="input-errors" v-for="error of stockV$.description.$errors" :key="error.$uid">
						   <div class="text-danger">Description is required</div>
					</div>
				</div>                        
				</div>


				<div class="col-md-12">
					<div class="card my-card flex justify-center">
						<label for="input1" class="d-flex form-label">Quantity
						</label>
						   <InputNumber inputId="minmax" :min="0" v-model="stockForm.quantity" />
						   <div class="input-errors" v-for="error of stockV$.quantity.$errors" :key="error.$uid">
						   <div class="text-danger">Quantity is required</div>
						</div>
				</div>                        
				</div>
				<div class="col-md-12">
					<div class="card my-card flex justify-center">
						<label for="input1" class="d-flex form-label">Stock type</label>
						   <select v-model="stockForm.type" class="form-control">
							   <option :value="''" disabled :selected="true" >Choose stock type</option>
							   <option value="BRANDING">Branding</option>
							   <option value="MERCH">Merchandising</option>
						   </select>
						   <div class="input-errors" v-for="error of stockV$.type.$errors" :key="error.$uid">
						   <div class="text-danger">Stock type is required</div>
						</div>
				</div>                        
				</div>
				<div class="col-md-12">
					<div class="card my-card flex justify-center">
						<FileUploadGeneric 
						:showFilePreview="showFilePreview" 
						accept="image/*" 
						fileType="image" 
						@fileUploaded="onFileChange"
							@fileDropped="onfileDropped"
							/>
				</div>                        
				</div>
				<div class="modal-footer">
					<button type="submit" class="btn maz-gradient-btn w-100" :disabled="loading">
					<div v-if="loading" class="spinner-border text-white" role="status">
						<span class="visually-hidden">Loading...</span>
					</div>
					Submit
				</button>
				</div>
				
			</form>
        </Dialog>
		<div class="card flex justify-center">
			<Drawer v-model:visible="showStockImage" position="right" :header="`View Stock Image`" class="w-100 md:!w-80 lg:!w-[40rem]" style="width: 30rem!important;">
				<!-- <img :src="stockImagePreview" style="width: 26rem!important;" /> -->
				<Image :src="stockImagePreview" alt="Image" width="450" preview />
			</Drawer>
		</div>
</Layout>
</template>


<style scoped>
.width-50{
	width: 50%;
}

.gradient-card {
	border-radius: 10px;
	padding: 20px;
	color: white;
	position: relative;
	overflow: hidden;
  }
  .gradient-card::before {
	content: '';
	position: absolute;
	top: -5px;
	left: -5px;
	right: -5px;
	bottom: -5px;
	z-index: -1;
	background: linear-gradient(135deg, #8e44ad, #3498db);
	border-radius: 15px;
  }
  .gradient-card .content {
	background: #0E0C19;
	border-radius: 10px;
	padding: 12px;
	z-index: 1;
  }

  .search-container {
	position: relative;
	display: inline-block;
  }

  .search-input {
	width: 100%;
	padding-right: 40px; /* Adjust padding to fit the icon */
	padding-left: 10px; /* Optional: adjust left padding for better appearance */
	border: 0;
	border-radius: 5px;
	height: 35px;
	background-color: #1e1e1e; /* Match the background color */
	color: white;
  }

  .search-input::placeholder {
	color: #bbb;
  }

  .search-icon {
	position: absolute;
	right: 10px;
	top: 50%;
	transform: translateY(-50%);
	color: #bbb;
	cursor: pointer;
  }

  .search-input:focus + .search-icon {
	display: none;
  }

  .search-input:focus {
	outline: none;
	border-color: #3498db; /* Change border color on focus */
  }

  .card-custom {
	background-color: #1e1e1e;
	color: #ffffff;
	border-radius: 10px;
	padding: 20px;
	margin: 20px 0;
  }

  .card-custom h5,
  .card-custom p {
	margin-bottom: 10px;
  }

  input::placeholder {
	color: #bbb;
  }

  .popover {
    --bs-popover-bg: none !important;
  }

  .my-card {
    margin-top: -12px !important;
}
.stock-image{
	border-radius: 50%;
	height: 50px;
	width: 50px;
}
</style>
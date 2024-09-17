
<script setup>
import Layout from '../shared/Layout.vue';
import BreadCrumb from '../../components/BreadCrumb.vue';
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { useWarehouse } from '@/stores/warehouse';
import { useAuth } from '@/stores/auth';
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
import CustomApex from './CustomApex.vue';

const envPath = import.meta.env.VITE_AWS_S3_BUCKET;
const authStore = useAuth();
const user = JSON.parse(authStore.user);

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
const editVisible = ref(false);
const stockMovementVisible = ref(false);
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
const viewedUnit = ref(null);
const onUnitChange = (event) => {
	unitId.value = null;     // reset the unit
	unitId.value = event.target.value;
	stockForm.unit = event.target.value;
	unitName.value = warehouse.value?.unitsList?.filter((unit) => unit.id == event.target.value)[0]?.name;
	viewedUnit.value= null;
	viewedUnit.value = warehouse.value?.unitsList?.filter((unit) => unit.id == event.target.value)[0];
	console.log(viewedUnit.value);
	getStock();
}


const getStock = () => {
	stock.getStockByUnit(unitId.value).then((response) => {
		stockList.value = response.data;
		merchendiseList.value = response.data?.filter((stock) => stock.type === 'MERCH');
		brandings.value = response.data?.filter((stock) => stock.type === 'BRANDING');
	});
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
const config = {
      useMultipartFormData: true // Add this flag to the request config
    };
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

const editedStock = ref(null);
const editForm = reactive({
    description: '',
    quantityInUnit: null,
    type: '',
	unit: null
});
const editStockRules = { 
    description: { required },
    quantityInUnit: { required },
    type: { required },
};
const editStockV$ = useVuelidate(editStockRules, editForm);
const openEditModal = (stock) => {
	console.log(stock);
	editedStock.value = null;//resetting the value just in case
	editedStock.value = stock;
	editForm.id = stock.id;
	editForm.description = stock.description;
	editForm.quantityInUnit = stock.quantityInUnit;
	editForm.type = stock.type;
	editForm.unit = stock.unit;
	editVisible.value = true
}




const toggle = (event) => {
    op.value.toggle(event);
}

const items = (stock) => [
    {
        label: 'Edit',
        icon: 'bx bx-edit fs-4 text-white',
        command: () => {
			openEditModal( stock)
        }
    },
	{
        label: 'Take/Use Stock',
        icon: 'bx bx-minus-circle fs-4 text-white',
        command: () => {
            openStockMovementModal(stock);
        }
    },
    // {
    //     label: 'Delete',
    //     icon: 'bx bx-trash text-danger fs-4 ',
    //     command: () => {
    //         deleteRecord(region)
    //     }
    // }
];

const editBranding = (branding) => {
    brandings.value.forEach(c => c.isEditing = false);
    branding.isEditing = true;
};


const stockMovement = ref(null);
const stockMovementForm = reactive({
    movementType: '',
	stock: stockMovement?.id,
	staff: user?.activeUserId,
	quantity: 0,
});
const stockMovementRules = { 
    movementType: { required },
    quantity: { required },
};
const stockMvV$ = useVuelidate(stockMovementRules, stockMovementForm);
const openStockMovementModal = (stock) => {
	stockMovement.value = stock
	stockMovementForm.stock = stock.id;
	stockMovementVisible.value = true
}

const submitStockMovement = async () => {	
	const isFormValid = await stockMvV$.value.$validate();
    if (!isFormValid) {return;}
	stock.stockMovement(stockMovementForm).then(response => {
		toaster.success("Stock updated successfully");
		getStock();
		stockMovementVisible.value = false;
	}).catch(error => {
		toaster.error("Error updating stock");
		console.log(error);
	})
};
const updateStock = () => {
	const formData = new FormData();
	formData.append('file', selectedFile.value);
	formData.append('description', editForm.description);
	formData.append('quantityInUnit', editForm.quantityInUnit);
	formData.append('type', editForm.type);
	formData.append('unit', editForm.unit);
loading.value = true;
	
	stock.updateStock(editForm.id,formData, config).then(response => {
		toaster.success("Stock updated successfully");
		getStock();
		editVisible.value = false;
		loading.value = false;
	}).catch(error => {
		loading.value = false;
		toaster.error("Error updating stock");
		console.log(error);
	}).finally(() => {
		loading.value = false;
	})
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
							<strong>Region:</strong> {{ warehouse?.regionName}}<br>
							<strong>Number of storage units:</strong> {{ warehouse?.numberOfUnits }} unit(s)<br>
							<strong>Capacity:</strong> {{ warehouse?.capacity }}%<br>
							<strong>Number of items:</strong> {{ warehouse?.numberOfItems }}
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
					<!-- <div class="col-lg-1"></div> -->
					<div class="col-12 col-lg-3">
						<div class=" radius-10">
							 <div class="card-body">
								<div class="card card-custom">
									<h5>Stock check</h5>
									<p class="text-light"><strong>Storage Capacity:</strong> {{ viewedUnit?.capacity }}%</p>
									<!-- <p class="text-light"><strong>Days since last check:</strong> 15 Days</p>
									<p class="text-light"><strong>Checked by:</strong> Tumelo Moloka</p> -->
								  </div>
								  
								  <div class=" card-custom">
									<h5>Inventory accuracy</h5>
									<div class="chart-container">
										<CustomApex v-show="unitId" :viewedUnit="viewedUnit" />
									</div>
								  </div>
							 </div>
						</div>
					</div>


					<div class="col-12 col-lg-9 d-flex">
					<div class="radius-10 w-100">
						  <div class="card-header">
							  <div class="d-flex align-items-center">
								  <div>
									  <h6 class="mb-0">In Stock</h6>
								  </div>
								  <div class="dropdown ms-auto mb-2">
									 <button @click="visible=true" 
									 :disabled="!unitId"
									 type="button" class="btn maz-gradient-btn">Add Stock</button>
								  </div>
							  </div>
						  </div>
						  <div class="card-body row mt-2 mx-2">
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
										   class="mr-2 cursor-pointer"  shape="circle" />
										
										</td>
								   <td >{{branding.description}}</td>
								
								   <td>{{branding.quantityInUnit}}</td>
								   <td>
									<SplitButton  @click="editBranding(branding)" class="text-white" label="" 
													icon="bx bx-cog fs-4" 
													dropdownIcon="text-white fs-4 bx bx-chevron-down" 
													:model="items(branding)"/>
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
											<Avatar  @click="viewStockImagePreview(merch)" 
											:image="merch.stockImage ? envPath + merch.stockImage : `https://ui-avatars.com/api/?name=${ merch.description }&background=4263C5`" 
											 class="mr-2 cursor-pointer"  shape="circle" />
										  
										  </td>
								   <td>{{merch.description}}</td>
								   <td>{{merch.quantityInUnit}}</td>
								   <td>
									<SplitButton  @click="editBranding(merch)" class="text-white" label="" 
													icon="bx bx-cog fs-4" 
													dropdownIcon="text-white fs-4 bx bx-chevron-down" 
													:model="items(merch)"/>
								   </td>
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

		<Dialog v-model:visible="stockMovementVisible" position="top" modal header="Move Stock" style="width: 30rem">
               
			<form @submit.prevent="submitStockMovement" class="row mt-3">
				<div class="col-md-12">
					<div class="card my-card flex justify-center">
						<label for="input1" class="d-flex form-label">Stock type</label>
						   <select v-model="stockMovementForm.movementType" class="form-control">
							   <option :value="''" disabled :selected="true" >Choose stock type</option>
							   <option value="IN">IN</option>
							   <option value="OUT">OUT</option>
						   </select>
						   <div class="input-errors" v-for="error of stockMvV$.movementType.$errors" :key="error.$uid">
						   <div class="text-danger">Stock type is required</div>
						</div>
				</div>                        
				</div>


				<div class="col-md-12">
					<div class="card my-card flex justify-center">
						<label for="input1" class="d-flex form-label">Quantity
						</label>
						   <InputNumber inputId="minmax" :min="0" v-model="stockMovementForm.quantity" />
						   <div class="input-errors" v-for="error of stockMvV$.quantity.$errors" :key="error.$uid">
						   <div class="text-danger">Quantity is required</div>
						</div>
				</div>                        
				</div>
				<div class="modal-footer">
					<button type="submit" class="btn maz-gradient-btn w-100" :disabled="loading">
					<div v-if="loading" class="spinner-border text-white" role="status">
						<span class="visually-hidden">Loading...</span>
					</div>
					Update
				</button>
				</div>
				
			</form>
        </Dialog>

		<Dialog v-model:visible="editVisible" position="top" modal header="Update Stock" style="width: 30rem">
               
			<form @submit.prevent="updateStock" class="row mt-3">
				<div class="col-md-12">
					<div class="card my-card flex justify-center">
						<label for="input1" class="form-label">Description</label>
						   <InputText type="text" v-model="editForm.description" />
						   <div class="input-errors" v-for="error of editStockV$.description.$errors" :key="error.$uid">
						   <div class="text-danger">Description is required</div>
					</div>
				</div>                        
				</div>


				<div class="col-md-12">
					<div class="card my-card flex justify-center">
						<label for="input1" class="d-flex form-label">Stock type</label>
						   <select v-model="editForm.type" class="form-control">
							   <option :value="''" disabled :selected="true" >Choose stock type</option>
							   <option value="BRANDING">Branding</option>
							   <option value="MERCH">Merchandising</option>
						   </select>
						   <div class="input-errors" v-for="error of editStockV$.type.$errors" :key="error.$uid">
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
					Update
				</button>
				</div>
				
			</form>
        </Dialog>
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
<script setup>
import { useUserStore } from '@/stores/userStore';
import { reactive } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, email } from '@vuelidate/validators';

const userStore = useUserStore();

const form = {
	  firstName: '',
	  lastName: '',
      email: '',
	  phoneNumber: '',
      activationArea: '',
	  location: [],
	  topSize: "X_LARGE",
          pantsSize: 30,
          dressSize: "X_LARGE",
          bio: "Angular developer",
    };

	const rules = {
		firstName: { required },
        email: { required, email },
		lastName: { required },
		phoneNumber: { required },
		activationArea: { required },
    }
	const v$ = useVuelidate(rules, form)

	const onSubmit = async () => {
		const isFormValid = await v$.value.$validate();
		if (!isFormValid) {
			return
		}else{
			userStore.submitUser(form)
		}
		
	}

</script>
<template>
    <div class="modal fade" id="create-user" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Create User</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="form-body mt-4">
					    <div class="row">
						   <div class="col-lg-12">
							<div class="border border-3 p-4 rounded">
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
									<label for="cell" class="form-label">Cell Number</label>
									<input v-model="form.phoneNumber" type="text" class="form-control" id="cell" >
									<div class="input-errors" v-for="error of v$.phoneNumber.$errors" :key="error.$uid">
										<div class="text-danger">Cell Number is required</div>
									  </div>
								  </div>
                                  <div class="col-md-12">
									<label for="activation-area" class="form-label">Activation Area</label>
									<input v-model="form.activationArea" type="text" class="form-control" id="activation-area" >
									<div class="input-errors" v-for="error of v$.activationArea.$errors" :key="error.$uid">
										<div class="text-danger">Activation Area is required</div>
									  </div>
								  </div>
								 
								  <div class="col-12">
									  <div class="d-grid">
                                         <button @click="onSubmit" type="button" class="btn maz-gradient-btn">Submit</button>
									  </div>
								  </div>
							  </div> 
						  </div>
						  </div>
					   </div><!--end row-->
					</div> 
                </div>
            </div>
        </div>
    </div>
</template>
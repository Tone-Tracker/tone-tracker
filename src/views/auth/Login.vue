<script >
import { RouterLink, RouterView } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';
import { required, email } from '@vuelidate/validators';
import { reactive } from 'vue';
import router from '@/router';
import { useMonitorSize } from '@/composables/useMonitorSize';
import { useNetworkStatus } from '@/stores/networkStatus';
import { useAuth } from '@/stores/auth';
import useToaster from '@/composables/useToaster';
import { useStorage } from '@vueuse/core'



export default {
setup(){

	const screenSizes = useMonitorSize();
	const isOnline = useNetworkStatus();
	const auth = useAuth();
	const toaster = useToaster();

	const form = reactive({
      email: '',
      password : '',
    });

	const rules = {
		password: { required },
        email: { required, email } 
    }
	const v$ = useVuelidate(rules, form)

	const onSubmit = async () => {
		// return router.push('/dashboard')
		
		if(!isOnline.online) {
			toaster.error("Check your internet connection");
			return
		}
		const isFormCorrect = await v$.value.$validate();
		if (!isFormCorrect) return;
		auth.attempt(form)
		  .then(function (response) {
			       useStorage('token', response.data.accessToken)
					toaster.success("Welcome back");
					setTimeout(() => {
						router.push('dashboard');
					},1000)
				}).catch(function (error) {
					toaster.error("Invalid credentials");
					console.log(error);
		        });

		
	}

	return {
		form, v$,onSubmit,screenSizes,
	}
}

}


    

</script>
<template>
	<!-- <img class="logo-light" src="../../assets/images/logo/white-logo.png" alt="logo">
	<img class="shoes" src="../../assets/images/login-images/Shoes.png" alt=""> -->
	<div class="logo-light"></div>
	<div class="shoes"></div> 
		<div class="container-login">

			<div class="section-authentication-cover">

				<div class="login-cover">
					<div class="row g-0">

						<div class="col-12 col-xl-7 col-xxl-8 auth-cover-left align-items-center d-none d-xl-flex">

							<div class="card shadow-none bg-transparent shadow-none rounded-0 mb-0">
								<div class="card-body">

								</div>
							</div>

						</div>

						<div
							class="col-12 col-xl-5 col-xxl-4 auth-cover-right align-items-center justify-content-center">
							<div class="card rounded-0 m-3 shadow-none bg-transparent mb-0">
								<div class="card-body p-sm-5">
									<div class="">

										<div class="form-body">
											<h5 class="mb-3 text-default">Log in</h5>
											<form @submit.prevent="onSubmit" class="row g-3">
												<div class="mb-3 col-12">
													<label for="inputEmailAddress" class="form-label">User</label>
													<input v-model="form.email" type="email" class="form-control custom-input"
														id="inputEmailAddress">

														<div class="input-errors" v-for="error of v$.email.$errors" :key="error.$uid">
															<div class="text-danger">Email is required</div>
														  </div>

														<!-- <div class="text-danger">{{ v$.email.$errors[0].$message }}</div> -->
												</div>
												<div class="mb-5 col-12">
													<label for="inputChoosePassword" class="form-label">Password</label>
													<div class="input-group" id="show_hide_password">
														<input v-model="form.password" type="password" class="form-control border-end-0"
															id="inputChoosePassword">
															

													</div>
													<div class="input-errors" v-for="error of v$.password.$errors" :key="error.$uid">
														<div class="text-danger">Password is required</div>
													  </div>
												</div>

												<div class="col-12">
													<div class="d-grid">
														<!-- <router-link to="/dashboard" type="submit"
															class="btn p-3 maz-gradient-btn">Continue</router-link> -->
															<button type="submit" 
															class="btn p-3 maz-gradient-btn">Continue</button>
													</div>
												</div>

											</form>
										</div>

									</div>
								</div>
							</div>
						</div>

					</div>
					<!--end row-->
				</div>
			</div>
		</div>
		<RouterView />
</template>
<style scoped>
.text-default {
	font-size: 40px;
	font-weight: 200;
	color: #fff
}

.form-label {
	font-size: 20px;
	font-weight: 200;
	margin-bottom: 0;
	color: #fff;
}

input[type=email] {
	border: none;
	border-bottom: 2px solid #fff;
	background-color: none;
	outline: 0;
}

input[type=email]:focus {
	border: none;
	background-color: none;
}

input[type=password] {
	border: none;
	border-bottom: 2px solid #fff;
	background-color: none;
	outline: 0;
}

input[type=password]:focus {
	border: none;
	background-color: none;
}

.section-authentication-cover {
	background: url("../../assets/images/login-images/login-cover.png");
	background-repeat: no-repeat;
	background-position: center;
	background-size: cover;

}

.auth-cover-left {
	position: relative;
	background-color: transparent;
}

.logo-light {
	position: absolute;
	height: 69px;
	width: 315px;
	background-image: url("../../assets/images/logo/white-logo.png");
	top: 20px;
	left: 40px;
}

.shoes {
	position: absolute;
	height: 108px;
	width: 105px;
	background-image: url("../../assets/images/login-images/Shoes.png");
	background-repeat: no-repeat;
	bottom: 20px;
	left: 40px
}



.form-control {
	border-radius: 0;
	background-color: transparent !important;
	padding: 0;
}

.form-control:hover {
	border: none;
	box-shadow: none;
	border-bottom: 2px solid #fff;
}

.auth-cover-right {
	background: rgb(34, 36, 35, 0.7);
	border-left: 1px solid #707070;
}

@media (max-width: 768px) {
	.shoes {
		display: none;
	}
}

@media (max-width: 575.98px) {
	.shoes {
		display: none;
	}
}
</style>
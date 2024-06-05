<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>
<template>
    
	<div class="wrapper">
		<div class="section-authentication-cover">
			<div class="">
				<div class="row g-0">

					<div class="col-12 col-xl-7 col-xxl-8 auth-cover-left align-items-center justify-content-center d-none d-xl-flex">

                        <div class="card shadow-none bg-transparent shadow-none rounded-0 mb-0">
							<div class="card-body">
                               
							</div>
						</div>
						
					</div>

					<div class="col-12 col-xl-5 col-xxl-4 auth-cover-right align-items-center justify-content-center">
						<div class="card rounded-0 m-3 shadow-none bg-transparent mb-0">
							<div class="card-body p-sm-5">
								<div class="">
								
									<div class="form-body">
										<h5 class="text-default">Login</h5>
										<form class="row g-3">
											<div class="col-12">
												<label for="inputEmailAddress" class="form-label">Email</label>
												<input type="email" class="form-control custom-input" id="inputEmailAddress" placeholder="jhon@example.com">
											</div>
											<div class="col-12">
												<label for="inputChoosePassword" class="form-label">Password</label>
												<div class="input-group" id="show_hide_password">
													<input type="password" class="form-control border-end-0" id="inputChoosePassword" value="12345678" placeholder="Enter Password"> 
													
													
												</div>
											</div>
										
											<div class="col-12">
												<div class="d-grid">
													<router-link to="/dashboard" type="submit" class="btn maz-gradient-btn">Continue</router-link>
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
.auth-cover-right{
	background: rgba(18, 24, 26, 0.7);
	opacity: .9;
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
.section-authentication-cover{
	background: url("../../assets/images/login-images/login-cover.svg");
	background-repeat: no-repeat;
	background-position: center;
}
.auth-cover-left {
 background-color: transparent;
}
</style>
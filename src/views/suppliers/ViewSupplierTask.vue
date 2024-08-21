<template>
    <Layout>
        <div class="page-wrapper">
			<div class="page-content">
				<!--breadcrumb-->
				<div class="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
					<div class="breadcrumb-title pe-3">View Task</div>
					
					<div class="ms-auto">
						<div class="btn-group">
							<router-link to="/add-supplier-costing/1" class="btn btn maz-gradient-btn">Add Costing</router-link>
						</div>
					</div>
				</div>
				<!--end breadcrumb-->
				<div class="row">
					<div class="col-xl-8 ">
						
						<div class="card">
							<div class="card-body p-4">
								<form class="row g-3">
									<div class="col-md-6">
										<label for="input1" class="form-label">First Name</label>
										<input type="text" class="form-control" id="input1" placeholder="First Name">
									</div>
									<div class="col-md-6">
										<label for="input2" class="form-label">Last Name</label>
										<input type="text" class="form-control" id="input2" placeholder="Last Name">
									</div>
									<div class="col-md-12">
										<label for="input3" class="form-label">Phone</label>
										<input type="text" class="form-control" id="input3" placeholder="Phone">
									</div>
									<div class="col-md-12">
										<label for="input4" class="form-label">Email</label>
										<input type="email" class="form-control" id="input4" placeholder="Email">
									</div>
									<div class="col-md-12">
										<label for="input5" class="form-label">Password</label>
										<input type="password" class="form-control" id="input5" placeholder="Password">
									</div>
									<div class="col-md-12">
										<label for="input6" class="form-label">DOB</label>
										<input type="date" class="form-control" id="input6" placeholder="Date of Birth">
									</div>
									<div class="col-md-12">
										<label for="input7" class="form-label">Country</label>
										<select id="input7" class="form-select">
											<option selected="">Choose...</option>
											<option>One</option>
											<option>Two</option>
											<option>Three</option>
										</select>
									</div>
									
									<div class="col-md-6">
										<label for="input8" class="form-label">City</label>
										<input type="text" class="form-control" id="input8" placeholder="City">
									</div>
									<div class="col-md-4">
										<label for="input9" class="form-label">State</label>
										<select id="input9" class="form-select">
											<option selected="">Choose...</option>
											<option>One</option>
											<option>Two</option>
											<option>Three</option>
										</select>
									</div>
									<div class="col-md-2">
										<label for="input10" class="form-label">Zip</label>
										<input type="text" class="form-control" id="input10" placeholder="Zip">
									</div>
									<div class="col-md-12">
										<label for="input11" class="form-label">Address</label>
										<textarea class="form-control" id="input11" placeholder="Address ..." rows="3"></textarea>
									</div>
								</form>
							</div>
						</div>
					</div>


                    <div class="col-xl-4 ">
						<h4>Documents</h4>
						<div class="card">
							<div class="card-body p-4">
								<form class="row g-3">
									<div class="col-md-12">
                                        <div  class="file-details mt-3 p-1 border rounded d-flex align-items-center">
                                            <div class="file-icon me-3">
                                              <img  src="/src/assets/images/pdf.png" alt="pdf" class="img-fluid cursor-pointer" style=" width: 100px; height: 100px; border-radius: 6px;"/>
                                            </div>
                                            <div class="file-info">
                                              <p class="m-0">Brief.pdf</p>
                                              <small class="m-0 text-dark">233 KB</small>
                                            </div>
                                            <div class="ms-auto">
                                                <i class='bx bxs-download text-success fs-2 cursor-pointer' v-tooltip="'Download'" ></i>
                                             
                                            </div>
                                          </div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
				<!--end row-->



			</div>
		</div>
    </Layout>
  </template>
  
  <script setup>
  import BreadCrumb from "@/components/BreadCrumb.vue";
import Layout from "../shared/Layout.vue";
  </script>
  
  
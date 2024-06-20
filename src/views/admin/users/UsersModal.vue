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
									<input type="email" class="form-control" id="firstName" >
								  </div>
								  <div class="col-md-6">
									<label for="lastName" class="form-label">Last Name</label>
									<input type="text" class="form-control" id="lastName" >
								  </div>
								  <div class="col-md-6">
									<label for="email" class="form-label">Email</label>
									<input type="email" class="form-control" id="email" >
								  </div>
								  <div class="col-md-6">
									<label for="cell" class="form-label">Cell Number</label>
									<input type="text" class="form-control" id="cell" >
								  </div>
                                  <div class="col-md-12">
									<label for="activation-area" class="form-label">Activation Area</label>
									<input type="text" class="form-control" id="activation-area" >
								  </div>
								 
								  <div class="col-12">
									  <div class="d-grid">
                                         <button type="button" class="btn maz-gradient-btn">Submit</button>
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
<template>
    <Layout>
		<!--start page wrapper -->
		<div class="page-wrapper">
			<div class="page-content">

                <div class="row">
                    <div class="col-12 col-lg-12 d-flex">
                       <div class="card radius-10 w-100">
                         <div class="card-header">
                             <div class="d-flex align-items-center">
                                 <div>
                                     <h6 class="mb-0">Sales Overview</h6>
                                 </div>
                                 <div class="dropdown ms-auto">
                                     <a class="dropdown-toggle dropdown-toggle-nocaret" href="#" data-bs-toggle="dropdown"><i class='bx bx-dots-horizontal-rounded font-22 text-option'></i>
                                     </a>
                                     <ul class="dropdown-menu">
                                         <li><a class="dropdown-item" href="javascript:;">Action</a>
                                         </li>
                                         <li><a class="dropdown-item" href="javascript:;">Another action</a>
                                         </li>
                                         <li>
                                             <hr class="dropdown-divider">
                                         </li>
                                         <li><a class="dropdown-item" href="javascript:;">Something else here</a>
                                         </li>
                                     </ul>
                                 </div>
                             </div>
                         </div>
                           <div class="card-body">
                             <div class="d-flex align-items-center ms-auto font-13 gap-2 mb-3">
                                 <span class="border px-1 rounded cursor-pointer"><i class="bx bxs-circle me-1" style="color: #14abef"></i>Sales</span>
                                 <span class="border px-1 rounded cursor-pointer"><i class="bx bxs-circle me-1" style="color: #ffc107"></i>Visits</span>
                             </div>
                             <div class="chart-container-1">
                                 <canvas id="chart1"></canvas>
                               </div>
                           </div>
                           <div class="row row-cols-1 row-cols-md-3 row-cols-xl-3 g-0 row-group text-center border-top">
                             <div class="col">
                               <div class="p-3">
                                 <h5 class="mb-0">24.15M</h5>
                                 <small class="mb-0">Overall Visitor <span> <i class="bx bx-up-arrow-alt align-middle"></i> 2.43%</span></small>
                               </div>
                             </div>
                             <div class="col">
                               <div class="p-3">
                                 <h5 class="mb-0">12:38</h5>
                                 <small class="mb-0">Visitor Duration <span> <i class="bx bx-up-arrow-alt align-middle"></i> 12.65%</span></small>
                               </div>
                             </div>
                             <div class="col">
                               <div class="p-3">
                                 <h5 class="mb-0">639.82</h5>
                                 <small class="mb-0">Pages/Visit <span> <i class="bx bx-up-arrow-alt align-middle"></i> 5.62%</span></small>
                               </div>
                             </div>
                           </div>
                       </div>
                    </div>
                  
                 </div>


				<div class="row row-cols-1 row-cols-md-3 row-cols-xl-4">
					<div class="col">
						<div class="card radius-10">
							<div class="card-body">
								<div class="text-center">
									<div class="widgets-icons mx-auto  mb-3"><i class='bx bx-scatter-chart'></i>
									</div>
									<h4 class="my-1 maz-height">84</h4>
									<p class="mb-0 text-secondary">Activation Process</p>
								</div>
							</div>
						</div>
					</div>
					<div class="col">
						<div class="card radius-10">
							<div class="card-body">
								<div class="text-center">
									<div class="widgets-icons mx-auto mb-3"><i class='bx bx-notepad' ></i>
									</div>
									<p class="mb-0 text-secondary">Leads</p>
									<h4 class="my-1 maz-height">34</h4>
									
								</div>
							</div>
						</div>
					</div>
					<div class="col">
						<div class="card radius-10">
							<div class="card-body">
								<div class="text-center">
									<div class="widgets-icons  mx-auto  mb-3">
										<i class='bx bx-check-circle'></i>
									</div>
									<p class="mb-0 text-secondary">Activations Completed</p>
									<h4 class="my-1 maz-height">56</h4>
									
								</div>
							</div>
						</div>
					</div>
					<div class="col">
						<div class="card radius-10">
							<div class="card-body">
								<div class="text-center">
									<div class="widgets-icons mx-auto  mb-3"><i class='bx bx-line-chart'></i>
									</div>
									<p class="mb-0 text-secondary">Ongoing Activations</p>
									<h4 class="my-1 maz-height">38</h4>
									
								</div>
							</div>
						</div>
					</div>
				
				</div>

				<div class="row row-cols-1 row-cols-md-3 row-cols-xl-3">
				
					<div class="col">
						<div class="card radius-10 overflow-hidden">
							<div class="card-body">
								<div class="d-flex align-items-center">
									<div>
										<p class="mb-0">Total Revenue</p>
										<h5 class="mb-0 invisible">Actual: R0.00</h5>
										<h5 class="mb-0 text-success">86%</h5>
									</div>
									<div class="ms-auto">	<h5 class="mb-0">Actual: R0.00</h5>
										<h5 class="mb-0 mt-4 float-end">Plan: R0.00</h5>
									</div>
								</div>
								<div class="progress radius-10 mt-4" style="height:25px;">
									<div class="progress-bar bg-success" role="progressbar" style="width: 76%"></div>
								</div>
							</div>
						</div>
					</div>

					
					<div class="col">
						<div class="card radius-10 overflow-hidden">
							<div class="card-body">
								<div class="d-flex align-items-center">
									<div>
										<p class="mb-0">Total Cost</p>
										<h5 class="mb-0 invisible">Actual: R0.00</h5>
										<h5 class="mb-0 text-danger">86%</h5>
									</div>
									<div class="ms-auto">	<h5 class="mb-0">Actual: R0.00</h5>
										<h5 class="mb-0 mt-4 float-end">Plan: R0.00</h5>
									</div>
								</div>
								<div class="progress radius-10 mt-4" style="height:25px;">
									<div class="progress-bar bg-danger" role="progressbar" style="width: 76%"></div>
								</div>
							</div>
						</div>
					</div>

					
					<div class="col">
						<div class="card radius-10 overflow-hidden">
							<div class="card-body">
								<div class="d-flex align-items-center">
									<div>
										<p class="mb-0">Total Margin</p>
										<h5 class="mb-0 invisible">Actual: R0.00</h5>
										<h5 class="mb-0 text-primary">86%</h5>
									</div>
									<div class="ms-auto">	<h5 class="mb-0">Actual: R0.00</h5>
										<h5 class="mb-0 mt-4 float-end">Plan: R0.00</h5>
									</div>
								</div>
								<div class="progress radius-10 mt-4" style="height:25px;">
									<div class="progress-bar bg-primary" role="progressbar" style="width: 76%"></div>
								</div>
							</div>
						</div>
					</div>
				
				</div>






				<div class="row">
					<div class="col-12 col-lg-4">
						<div class="card radius-10">
							 <div class="card-body">
								<div class="">
									<div id="chart3" style="height:250px;"><svg height="250" version="1.1" width="665.328" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="overflow: hidden; position: relative;"><desc style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">Created with Raphaël 2.2.0</desc><defs style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></defs><path fill="none" stroke="#008cff" d="M332.664,201.66666666666669A76.66666666666667,76.66666666666667,0,0,0,408.94122662266636,132.71767299982181" stroke-width="2" opacity="0" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 0;"></path><path fill="#008cff" stroke="#ffffff" d="M332.664,204.66666666666669A79.66666666666667,79.66666666666667,0,0,0,411.92598766442285,133.01966889981483L442.1052381977387,136.07318299974432A110,110,0,0,1,332.664,235Z" stroke-width="3" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></path><path fill="none" stroke="#15ca20" d="M408.94122662266636,132.71767299982181A76.66666666666667,76.66666666666667,0,0,0,261.12270210661495,97.4387867918025" stroke-width="2" opacity="1" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 1;"></path><path fill="#15ca20" stroke="#ffffff" d="M411.92598766442285,133.01966889981483A79.66666666666667,79.66666666666667,0,0,0,258.3232600151347,96.36030453582956L225.35205315992243,83.65818018770375A115,115,0,0,1,447.0798399339995,136.5765094997327Z" stroke-width="3" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></path><path fill="none" stroke="#fd3550" d="M261.12270210661495,97.4387867918025A76.66666666666667,76.66666666666667,0,0,0,332.6399144567186,201.66666288331834" stroke-width="2" opacity="0" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 0;"></path><path fill="#fd3550" stroke="#ffffff" d="M258.3232600151347,96.36030453582956A79.66666666666667,79.66666666666667,0,0,0,332.638971978938,204.6666627352743L332.6294424813789,234.99999457171762A110,110,0,0,1,230.01778997905626,85.45565061432532Z" stroke-width="3" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></path><text x="332.664" y="115" text-anchor="middle" font-family="&quot;Arial&quot;" font-size="15px" stroke="none" fill="#000000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: middle; font-family: Arial; font-size: 15px; font-weight: 800;" font-weight="800" transform="matrix(1.7424,0,0,1.7424,-246.9778,-93.5455)" stroke-width="0.5739130434782609"><tspan dy="6" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">Nokia</tspan></text><text x="332.664" y="135" text-anchor="middle" font-family="&quot;Arial&quot;" font-size="14px" stroke="none" fill="#000000" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: middle; font-family: Arial; font-size: 14px;" transform="matrix(1.5972,0,0,1.5972,-198.6743,-75.8472)" stroke-width="0.6260869565217391"><tspan dy="5" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">30</tspan></text></svg></div>
								</div>
							 </div>
							 <ul class="list-group list-group-flush">
								<li class="list-group-item d-flex bg-transparent justify-content-between align-items-center border-top">Apple <span class="badge bg-danger rounded-pill">20</span>
								</li>
								<li class="list-group-item d-flex bg-transparent justify-content-between align-items-center">Samsung <span class="badge bg-primary rounded-pill">15</span>
								</li>
								<li class="list-group-item d-flex bg-transparent justify-content-between align-items-center">Nokia <span class="badge bg-success rounded-pill">30</span>
								</li>
							</ul>
						</div>
					</div>






					<div class="col-12 col-lg-8 d-flex">
						<div class="card radius-10 w-100">
						  <div class="card-header">
							  <div class="d-flex align-items-center">
								  <div>
									  <h6 class="mb-0">Main Tasks To Set Up</h6>
								  </div>
								  <div class="dropdown ms-auto">
									 
								  </div>
							  </div>
						  </div>
						  <div class="card-body">
							<div class="table-responsive table table-dark table-striped">
								<table class="table align-middle mb-0">
								 <thead class="table-light">
								  <tr >
									<th>Project</th>
									<th>Task</th>
									<th>Risk</th>
									<th>Planned End-Date</th>
									<th>Time Record</th>
									<th>Project Responsible</th>
									<th>Completion</th>
								  </tr>
								  </thead>
								  <tbody>
									<tr class="maz-table-row-height">
								   <td>Project 1</td>
								   <td>5822</td>
								   <td style="background-color: #D1345B; text-align: center">At Risk</td>
								   <td>03-06-2020</td>
								   <td>18:00:00</td>
								   <td>Bransley</td>
								   <td>45%</td>
								  </tr>
			   
								  <tr class="maz-table-row-height">
								   <td>Project 2</td>
								   <td>4620</td>
								   <td style="background-color: #1E90D9; text-align: center">On Track</td>
								   <td>05-06-2023</td>
								   <td>18:00:00</td>
								   <td>John Doe</td>
								   <td>80%</td>
								  </tr>
			   
								  <tr class="maz-table-row-height">
								   <td>Project 3</td>
								   <td>6890</td>
								   <td style="background: #FE9947; text-align: center">Planned</td>
								   <td>06-06-2023</td>
								   <td>18:00:00</td>
								   <td>Dave</td>
								   <td>22%</td>
								  </tr>
			   
								  <tr class="maz-table-row-height">
								   <td>Project 4</td>
								   <td>3765</td>
								   <td style="background-color: #1E90D9; text-align: center">On Track</td>
								   <td>14-07-2024</td>
								   <td>18:00:00</td>
								   <td>Msebele</td>
								   <td>22%</td>
								  </tr>
								  <tr class="maz-table-row-height">
								   <td>Project 5</td>
								   <td>9240</td>
								   <td style="background-color: #A639B6; text-align: center">Delayed</td>
								   <td>18-06-2025</td>
								   <td>18:00:00</td>
								   <td>Dave</td>
								   <td>12%</td>
								  </tr>
								 </tbody>
							   </table>
							   </div>
						  </div>
						</div>
					 </div>



					
				</div>

				

				 <div class="card radius-10">
					<div class="card-header">
						<div class="d-flex align-items-center">
							<div>
								<h6 class="mb-0">Recent Orders</h6>
							</div>
							<div class="dropdown ms-auto">
								<a class="dropdown-toggle dropdown-toggle-nocaret" href="#" data-bs-toggle="dropdown"><i class='bx bx-dots-horizontal-rounded font-22 text-option'></i>
								</a>
								<ul class="dropdown-menu">
									<li><a class="dropdown-item" href="javascript:;">Action</a>
									</li>
									<li><a class="dropdown-item" href="javascript:;">Another action</a>
									</li>
									<li>
										<hr class="dropdown-divider">
									</li>
									<li><a class="dropdown-item" href="javascript:;">Something else here</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
                         <div class="card-body">
						 <div class="table-responsive">
						   <table class="table align-middle mb-0">
							<thead class="table-light">
							 <tr>
							   <th>Product</th>
							   <th>Photo</th>
							   <th>Product ID</th>
							   <th>Status</th>
							   <th>Amount</th>
							   <th>Date</th>
							   <th>Shipping</th>
							 </tr>
							 </thead>
							 <tbody><tr>
							  <td>Iphone 5</td>
							  <td><img src="../../assets/images/products/01.png" class="product-img-2" alt="product img"></td>
							  <td>#9405822</td>
							  <td><span class="badge bg-gradient-quepal text-white shadow-sm w-100">Paid</span></td>
							  <td>$1250.00</td>
							  <td>03 Feb 2020</td>
							  <td><div class="progress" style="height: 6px;">
									<div class="progress-bar bg-gradient-quepal" role="progressbar" style="width: 100%"></div>
								  </div></td>
							 </tr>
		  
							 <tr>
							  <td>Earphone GL</td>
							  <td><img src="../../assets/images/products/02.png" class="product-img-2" alt="product img"></td>
							  <td>#8304620</td>
							  <td><span class="badge bg-gradient-blooker text-white shadow-sm w-100">Pending</span></td>
							  <td>$1500.00</td>
							  <td>05 Feb 2020</td>
							  <td><div class="progress" style="height: 6px;">
									<div class="progress-bar bg-gradient-blooker" role="progressbar" style="width: 60%"></div>
								  </div></td>
							 </tr>
		  
							 <tr>
							  <td>HD Hand Camera</td>
							  <td><img src="../../assets/images/products/03.png" class="product-img-2" alt="product img"></td>
							  <td>#4736890</td>
							  <td><span class="badge bg-gradient-bloody text-white shadow-sm w-100">Failed</span></td>
							  <td>$1400.00</td>
							  <td>06 Feb 2020</td>
							  <td><div class="progress" style="height: 6px;">
									<div class="progress-bar bg-gradient-bloody" role="progressbar" style="width: 70%"></div>
								  </div></td>
							 </tr>
		  
							 <tr>
							  <td>Clasic Shoes</td>
							  <td><img src="../../assets/images/products/04.png" class="product-img-2" alt="product img"></td>
							  <td>#8543765</td>
							  <td><span class="badge bg-gradient-quepal text-white shadow-sm w-100">Paid</span></td>
							  <td>$1200.00</td>
							  <td>14 Feb 2020</td>
							  <td><div class="progress" style="height: 6px;">
									<div class="progress-bar bg-gradient-quepal" role="progressbar" style="width: 100%"></div>
								  </div></td>
							 </tr>
							 <tr>
							  <td>Sitting Chair</td>
							  <td><img src="../../assets/images/products/06.png" class="product-img-2" alt="product img"></td>
							  <td>#9629240</td>
							  <td><span class="badge bg-gradient-blooker text-white shadow-sm w-100">Pending</span></td>
							  <td>$1500.00</td>
							  <td>18 Feb 2020</td>
							  <td><div class="progress" style="height: 6px;">
									<div class="progress-bar bg-gradient-blooker" role="progressbar" style="width: 60%"></div>
								  </div></td>
							 </tr>
							 <tr>
							  <td>Hand Watch</td>
							  <td><img src="../../assets/images/products/05.png" class="product-img-2" alt="product img"></td>
							  <td>#8506790</td>
							  <td><span class="badge bg-gradient-bloody text-white shadow-sm w-100">Failed</span></td>
							  <td>$1800.00</td>
							  <td>21 Feb 2020</td>
							  <td><div class="progress" style="height: 6px;">
									<div class="progress-bar bg-gradient-bloody" role="progressbar" style="width: 40%"></div>
								  </div></td>
							 </tr>
						    </tbody>
						  </table>
						  </div>
						 </div>
					</div>


					<div class="row">
						<div class="col-12 col-lg-7 col-xl-8 d-flex">
						  <div class="card radius-10 w-100">
							<div class="card-header bg-transparent">
								<div class="d-flex align-items-center">
									<div>
										<h6 class="mb-0">Recent Orders</h6>
									</div>
									<div class="dropdown ms-auto">
										<a class="dropdown-toggle dropdown-toggle-nocaret" href="#" data-bs-toggle="dropdown"><i class='bx bx-dots-horizontal-rounded font-22 text-option'></i>
										</a>
										<ul class="dropdown-menu">
											<li><a class="dropdown-item" href="javascript:;">Action</a>
											</li>
											<li><a class="dropdown-item" href="javascript:;">Another action</a>
											</li>
											<li>
												<hr class="dropdown-divider">
											</li>
											<li><a class="dropdown-item" href="javascript:;">Something else here</a>
											</li>
										</ul>
									</div>
								</div>
							   </div>
							 <div class="card-body">
								<div class="row">
								  <div class="col-lg-7 col-xl-8 border-end">
									 <div id="geographic-map-2"></div>
								  </div>
								  <div class="col-lg-5 col-xl-4">
			                       
									<div class="mb-4">
									<p class="mb-2"><i class="flag-icon flag-icon-us me-1"></i> USA <span class="float-end">70%</span></p>
									<div class="progress" style="height: 7px;">
										 <div class="progress-bar bg-primary progress-bar-striped" role="progressbar" style="width: 70%"></div>
									 </div>
									</div>
			   
									<div class="mb-4">
									 <p class="mb-2"><i class="flag-icon flag-icon-ca me-1"></i> Canada <span class="float-end">65%</span></p>
									 <div class="progress" style="height: 7px;">
										 <div class="progress-bar bg-danger progress-bar-striped" role="progressbar" style="width: 65%"></div>
									 </div>
									</div>
			   
									<div class="mb-4">
									 <p class="mb-2"><i class="flag-icon flag-icon-gb me-1"></i> England <span class="float-end">60%</span></p>
									 <div class="progress" style="height: 7px;">
										 <div class="progress-bar bg-success progress-bar-striped" role="progressbar" style="width: 60%"></div>
									   </div>
									</div>
			   
									<div class="mb-4">
									 <p class="mb-2"><i class="flag-icon flag-icon-au me-1"></i> Australia <span class="float-end">55%</span></p>
									 <div class="progress" style="height: 7px;">
										 <div class="progress-bar bg-warning progress-bar-striped" role="progressbar" style="width: 55%"></div>
									   </div>
									</div>
			   
									<div class="mb-4">
									 <p class="mb-2"><i class="flag-icon flag-icon-in me-1"></i> India <span class="float-end">50%</span></p>
									 <div class="progress" style="height: 7px;">
										 <div class="progress-bar bg-info progress-bar-striped" role="progressbar" style="width: 50%"></div>
									   </div>
									</div>

									<div class="mb-0">
									   <p class="mb-2"><i class="flag-icon flag-icon-cn me-1"></i> China <span class="float-end">45%</span></p>
									   <div class="progress" style="height: 7px;">
										   <div class="progress-bar bg-dark progress-bar-striped" role="progressbar" style="width: 45%"></div>
										 </div>
									</div>

								  </div>
								</div>
							 </div>
						   </div>
						</div>
			   
						<div class="col-12 col-lg-5 col-xl-4 d-flex">
							<div class="card w-100 radius-10">
						     <div class="card-body">
							  <div class="card radius-10 border shadow-none">
								<div class="card-body">
									<div class="d-flex align-items-center">
										<div>
											<p class="mb-0 text-secondary">Total Likes</p>
											<h4 class="my-1">45.6M</h4>
											<p class="mb-0 font-13">+6.2% from last week</p>
										</div>
										<div class="widgets-icons-2 bg-gradient-cosmic text-white ms-auto"><i class='bx bxs-heart-circle'></i>
										</div>
									</div>
								</div>
							 </div>
							 <div class="card radius-10 border shadow-none">
								<div class="card-body">
									<div class="d-flex align-items-center">
										<div>
											<p class="mb-0 text-secondary">Comments</p>
											<h4 class="my-1">25.6K</h4>
											<p class="mb-0 font-13">+3.7% from last week</p>
										</div>
										<div class="widgets-icons-2 bg-gradient-ibiza text-white ms-auto"><i class='bx bxs-comment-detail'></i>
										</div>
									</div>
								</div>
							 </div>
							 <div class="card radius-10 mb-0 border shadow-none">
								<div class="card-body">
									<div class="d-flex align-items-center">
										<div>
											<p class="mb-0 text-secondary">Total Shares</p>
											<h4 class="my-1">85.4M</h4>
											<p class="mb-0 font-13">+4.6% from last week</p>
										</div>
										<div class="widgets-icons-2 bg-gradient-kyoto text-dark ms-auto"><i class='bx bxs-share-alt'></i>
										</div>
									</div>
								</div>
							  </div>
							 </div>

							</div>
			   
						</div>
					 </div><!--end row-->

					 <div class="row row-cols-1 row-cols-lg-3">
						 <div class="col d-flex">
                           <div class="card radius-10 w-100">
							   <div class="card-body">
								<p class="font-weight-bold mb-1 text-secondary">Weekly Revenue</p>
								<div class="d-flex align-items-center mb-4">
									<div>
										<h4 class="mb-0">$89,540</h4>
									</div>
									<div class="">
										<p class="mb-0 align-self-center font-weight-bold text-success ms-2">4.4% <i class="bx bxs-up-arrow-alt mr-2"></i>
										</p>
									</div>
								</div>
								<div class="chart-container-0 mt-5">
									<canvas id="chart3"></canvas>
								  </div>
							   </div>
						   </div>
						 </div>
						 <div class="col d-flex">
							<div class="card radius-10 w-100">
								<div class="card-header bg-transparent">
									<div class="d-flex align-items-center">
										<div>
											<h6 class="mb-0">Orders Summary</h6>
										</div>
										<div class="dropdown ms-auto">
											<a class="dropdown-toggle dropdown-toggle-nocaret" href="#" data-bs-toggle="dropdown"><i class='bx bx-dots-horizontal-rounded font-22 text-option'></i>
											</a>
											<ul class="dropdown-menu">
												<li><a class="dropdown-item" href="javascript:;">Action</a>
												</li>
												<li><a class="dropdown-item" href="javascript:;">Another action</a>
												</li>
												<li>
													<hr class="dropdown-divider">
												</li>
												<li><a class="dropdown-item" href="javascript:;">Something else here</a>
												</li>
											</ul>
										</div>
									</div>
								</div>
								<div class="card-body">
									<div class="chart-container-1 mt-3">
										<canvas id="chart4"></canvas>
									  </div>
								</div>
								<ul class="list-group list-group-flush">
									<li class="list-group-item d-flex bg-transparent justify-content-between align-items-center border-top">Completed <span class="badge bg-gradient-quepal rounded-pill">25</span>
									</li>
									<li class="list-group-item d-flex bg-transparent justify-content-between align-items-center">Pending <span class="badge bg-gradient-ibiza rounded-pill">10</span>
									</li>
									<li class="list-group-item d-flex bg-transparent justify-content-between align-items-center">Process <span class="badge bg-gradient-deepblue rounded-pill">65</span>
									</li>
								</ul>
							</div>
						  </div>
						  <div class="col d-flex">
							<div class="card radius-10 w-100">
								 <div class="card-header bg-transparent">
									<div class="d-flex align-items-center">
										<div>
											<h6 class="mb-0">Top Selling Categories</h6>
										</div>
										<div class="dropdown ms-auto">
											<a class="dropdown-toggle dropdown-toggle-nocaret" href="#" data-bs-toggle="dropdown"><i class='bx bx-dots-horizontal-rounded font-22 text-option'></i>
											</a>
											<ul class="dropdown-menu">
												<li><a class="dropdown-item" href="javascript:;">Action</a>
												</li>
												<li><a class="dropdown-item" href="javascript:;">Another action</a>
												</li>
												<li>
													<hr class="dropdown-divider">
												</li>
												<li><a class="dropdown-item" href="javascript:;">Something else here</a>
												</li>
											</ul>
										</div>
									 </div>
								 </div>
								<div class="card-body">
								   <div class="chart-container-0">
									 <canvas id="chart5"></canvas>
								   </div>
								</div>
								<div class="row row-group border-top g-0">
									<div class="col">
										<div class="p-3 text-center">
											<h4 class="mb-0 text-danger">$45,216</h4>
											<p class="mb-0">Clothing</p>
										</div>
									</div>
									<div class="col">
										<div class="p-3 text-center">
											<h4 class="mb-0 text-success">$68,154</h4>
											<p class="mb-0">Electronic</p>
										</div>
									 </div>
								</div><!--end row-->
							</div>
						  </div>
					 </div><!--end row-->

			</div>
		</div>
	<!--start switcher-->
	
</Layout>
</template>
<script setup>
import Layout from '../shared/Layout.vue';
</script>
<style>
.maz-height{
	font-size: 3rem;
}

.widgets-icons {
    width: 60px;
    height: 60px;
    background-color: #12181A; 
    font-size: 56px;
	color: green;
}

html.dark-theme .widgets-icons {
	color: #fff;
}
.maz-table-row-height{
	height: 55px;
}
</style>
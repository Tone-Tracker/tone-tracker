<template>
    <Layout>
		<!--start page wrapper -->
		<div class="page-wrapper">
			<div class="page-content">

                <BreadCrumb title="Status" icon="bx bx-notepad"/>



				<div class="row">

					<div class="col-12 col-lg-9 d-flex">
						<div class="card radius-10 w-100">
						  <div class="card-header">
							  <div class="d-flex align-items-center">
								  <div>
									  <h5 class="mb-0">View Live Data</h5>
								  </div>
								  <div class="dropdown ms-auto">
									 
								  </div>
							  </div>
						  </div>
						  <div class="card-body">
							<div class="table-responsive table table-hover table-dark table-striped">
								<table class="table align-middle mb-0">
								 <thead class="table-light">
								  <tr >
									<th class="col-width-30">Regions Activated</th>
									<th class="col-width-10 text-center">Status</th>
									<th class="col-width-10 text-center">Progress</th>
								  </tr>
								  </thead>
								  <tbody>
									<tr class="maz-table-row-height">
								   <td>Gauteng Central(GC)</td>
								   <td style="background-color: #A639B6;" class="text-center">To Be Activated</td>
								   <td class="text-center">45%</td>
								  </tr>
			   
								  <tr class="maz-table-row-height">
								   <td>North Eastern Region (NER)</td>
								   <td style="background-color: #1E90D9;" class="text-center">Activated</td>
								   <td class="text-center">80%</td>
								  </tr>
			   
								  <tr class="maz-table-row-height">
								   <td>Eastern Region (ER)</td>
								   <td style="background-color: #A639B6;" class="text-center">To Be Activated</td>
								   <td class="text-center">22%</td>
								  </tr>
			   
								  <tr class="maz-table-row-height">
								   <td>Southern Eastern Region (SR)</td>
								   <td style="background-color: #1E90D9; " class="text-center">Activated</td>
								   <td class="text-center">22%</td>
								  </tr>
								  <tr class="maz-table-row-height">
								   <td>Southern Western Region (WR)</td>
								   <td style="background-color: #A639B6;" class="text-center">To Be Activated</td>
								   <td class="text-center">12%</td>
								  </tr>
                                  <tr class="maz-table-row-height">
                                    <td>Southern Central Region (CR)</td>
                                    <td style="background-color: #A639B6;" class="text-center">To Be Activated</td>
                                    <td class="text-center">12%</td>
                                   </tr>
								 </tbody>
							   </table>
							   </div>
						  </div>
						</div>
					 </div>



					
				</div>

                <div class="row row-cols-1 row-cols-md-2 row-cols-xl-4">
					<div class="col">
						<div class="card radius-10 maz-gradient-btn">
							<div class="card-body">
								<div class="d-flex align-items-center">
									<div>
										<h4 class="my-1 text-white text-center">Report For Gauteng Central (GC)</h4>
									</div>
									<div class="text-white ms-auto font-35">
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="col">
						<div class="card radius-10 maz-gradient-btn">
							<div class="card-body">
								<div class="d-flex align-items-center">
									<div>
										<h4 class="my-1 text-white text-center">Report For North Eastern Region (NER)</h4>
									</div>
									<div class="text-white ms-auto font-35">
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="col">
						<div class="card radius-10 maz-gradient-btn">
							<div class="card-body">
								<div class="d-flex align-items-center">
									<div>
										<h4 style="width: 80%" class="my-1 text-white text-center">Report For Eastern Region (ER)</h4>
									</div>
									<div class="text-dark ms-auto font-35">
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="col">
						<div class="card radius-10 maz-gradient-btn">
							<div class="card-body">
								<div class="d-flex align-items-center">
									<div>
										<h4 class="my-1 text-center text-white">Report For Southern Eastern Region (SR)</h4>
									</div>
									<div class="text-white ms-auto font-35">
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="col">
						<div class="card radius-10 maz-gradient-btn">
							<div class="card-body">
								<div class="d-flex align-items-center">
									<div>
										<h4 class="my-1 text-white text-center">Report For Southern Western Region (WR)</h4>
									</div>
									<div class=" bg-white text-success ms-auto">
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="col">
						<div class="card radius-10 maz-gradient-btn">
							<div class="card-body">
								<div class="d-flex align-items-center">
									<div>
										<h4 class="my-1 text-white">Report For Southern Central Region (CR)</h4>
									</div>
									<div class=" bg-white text-white ms-auto">
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

			</div>
		</div>
	<!--start switcher-->
	
</Layout>
</template>
<script setup>
import Layout from '../shared/Layout.vue';
import BreadCrumb from '../../components/BreadCrumb.vue';
</script>
<style scoped >
.maz-height{
	font-size: 3rem;
    height: 7rem;
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

.col-width-30 {
    width: 4.5%;
}
.col-width-10 {
    width: 10%;
}
</style>
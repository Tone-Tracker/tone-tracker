/**
Author: Mazisi Msebele
Date: 04/06/2024
**/
<template>
    <Layout>
		<!--start page wrapper -->
		<div class="page-wrapper">
			<div class="page-content">

                <BreadCrumb title="Report" icon="bx bx-line-chart"/>
                <div class="row  row-cols-xl-9">
                    <div class="">
                        <h4 class="mb-2 ml-2">Team</h4>
                    </div>
                    <div class="col-img">
                        <div class="gallery">
                            <div class="asc pb-2">TTG Head Office Super User</div>
                            <a target="_blank" href="../../assets/images/avatars/avatar-11.png">
                            <img src="../../assets/images/avatars/avatar-1.png" alt="Cinque Terre" width="600" height="400">
                            </a>
                           
                    </div>
                  </div>
                  <div class="col-img">
                  <div class="gallery">
                    <div class="asc pb-2">TTG Head Office Admin</div>
                    <a target="_blank" href="../../assets/images/avatars/avatar-12.png">
                      <img src="../../assets/images/avatars/avatar-2.png" alt="Forest" width="600" height="400">
                    </a>
                    
                  </div>
                </div>
                <div class="col-img">
                  <div class="gallery">
                    <div class="asc pb-2">TTG Regional Manager</div>
                    <a target="_blank" href="../../assets/images/avatars/avatar-14.png">
                      <img src="../../assets/images/avatars/avatar-3.png" alt="Northern Lights" width="600" height="400">
                    </a>
                    </div>
                </div>
                </div>

                <div class="row mt-6  row-cols-xl-9">
                    <div class="">
                        <h4 class="mb-2 ml-2">Promoters</h4>
                    </div>
                    <div class="col-img">
                        <div class="gallery">
                            <a target="_blank" href="../../assets/images/avatars/avatar-1.png">
                            <img src="../../assets/images/avatars/avatar-1.png" alt="Cinque Terre" width="600" height="400">
                            </a>
                            <div class="desc">Mazisi Msebele</div>
                        </div>
                  </div>
                  <div class="col-img">
                  <div class="gallery">
                    <a target="_blank" href="../../assets/images/avatars/avatar-2.png">
                      <img src="../../assets/images/avatars/avatar-2.png" alt="Forest" width="600" height="400">
                    </a>
                    <div class="desc">Dave Doe</div>
                  </div>
                </div>
                <div class="col-img">
                  <div class="gallery">
                    <a target="_blank" href="../../assets/images/avatars/avatar-3.png">
                      <img src="../../assets/images/avatars/avatar-3.png" alt="Northern Lights" width="600" height="400">
                    </a>
                    <div class="desc">Nkanyiso Ncube</div>
                  </div>
                </div>
                <div class="col-img">
                  <div class="gallery">
                    <a target="_blank" href="../../assets/images/avatars/avatar-4.png">
                      <img src="../../assets/images/avatars/avatar-4.png" alt="Mountains" width="600" height="400">
                    </a>
                    <div class="desc">Rico Nyathi</div>
                  </div>
                  </div>

                  <div class="col-img">
                    <div class="gallery">
                      <a target="_blank" href="../../assets/images/avatars/avatar-5.png">
                        <img src="../../assets/images/avatars/avatar-5.png" alt="Mountains" width="600" height="400">
                      </a>
                      <div class="desc">Rico Nyathi</div>
                    </div>
                    </div>
                    <div class="col-img">
                        <div class="gallery">
                          <a target="_blank" href="../../assets/images/avatars/avatar-6.png">
                            <img src="../../assets/images/avatars/avatar-6.png" alt="Mountains" width="600" height="400">
                          </a>
                          <div class="desc">Rico Nyathi</div>
                        </div>
                        </div>
                </div>

                <div class="col-12 col-lg-12 mt-4 mb-6">
                    <h2 class="mb-4"> <i class='bx bx-check-circle text-primary' ></i> Completed</h2>
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

                

                <div class="card">
                    
                    <div class="card-body" >
                        <div class="my-table" style="padding-left: 7rem;padding-right: 7rem;">
                            <div class="col-12">
                                <h3 class="text-center fs-2 bg-gray">Post campaign analysis</h3>
                            </div>
                            <table class="table table-bordered mb-0 maz-table">
                                <thead>
                                    <tr>
                                        <th scope="col">JOBS</th>
                                        <th scope="col">COMMENT</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Reported By</td>
                                        <td>Mazisi Msebele</td>
                                    </tr>
                                    <tr>
                                        <td>What worked</td>
                                        <td>
                                            <ol>
                                                <li style="list-style:disc;">Lorem Lorem Ispsum Ispsum</li>
                                                <li style="list-style:disc;">Lorem Lorem Ispsum Ispsum</li>
                                                <li style="list-style:disc;">Lorem Lorem Ispsum Ispsum</li>
                                            </ol>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>What didn't work</td>
                                        <td>
                                            <ol>
                                                <li style="list-style:disc;">Lorem Lorem Ispsum Ispsum</li>
                                                <li style="list-style:disc;">Lorem Lorem Ispsum Ispsum</li>
                                                <li style="list-style:disc;">Lorem Lorem Ispsum Ispsum</li>
                                            </ol>
                                        </td>
                                    </tr>
                                    
                                    <tr>
                                        <td>Suggestions</td>
                                        <td>
                                            <ol>
                                                <li style="list-style:disc;">Lorem Lorem Ispsum Ispsum</li>
                                                <li style="list-style:disc;">Lorem Lorem Ispsum Ispsum</li>
                                                <li style="list-style:disc;">Lorem Lorem Ispsum Ispsum</li>
                                            </ol>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="mt-2 text-center cursor-pointer d-flex justify-content-center align-items-center">
                                <span>Load More</span>
                                <i class='bx bx-chevron-down fs-2'></i>
                            </div>
                            
                        </div>
                    </div>
                </div>

               
                <div class="card radius-10 w-100">
                    <div class="card-header">
                        <div class="d-flex align-items-center justify-content-center">
                            <h6 class="mb-0 text-center fs-2">Overall Summary</h6>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="chart-container1">
                            <canvas id="chart8" width="1301" height="380" style="display: block; box-sizing: border-box; height: 380px; width: 1301px;"></canvas>
                        </div>
                    </div>
                </div>
                
                <div class="row mt-6  row-cols-xl-9">
                    <div class="">
                        <h4 class="mb-2 ml-2">Promoters</h4>
                    </div>
                    <div class="col-img">
                        <div class="gallery">
                            <a target="_blank" href="../../assets/images/avatars/avatar-1.png">
                            <img src="../../assets/images/avatars/avatar-1.png" alt="Cinque Terre" width="600" height="400">
                            </a>
                            <div class="desc">Mazisi Msebele</div>
                        </div>
                  </div>
                  <div class="col-img">
                  <div class="gallery">
                    <a target="_blank" href="../../assets/images/avatars/avatar-2.png">
                      <img src="../../assets/images/avatars/avatar-2.png" alt="Forest" width="600" height="400">
                    </a>
                    <div class="desc">Dave Doe</div>
                  </div>
                </div>
                <div class="col-img">
                  <div class="gallery">
                    <a target="_blank" href="../../assets/images/avatars/avatar-3.png">
                      <img src="../../assets/images/avatars/avatar-3.png" alt="Northern Lights" width="600" height="400">
                    </a>
                    <div class="desc">Nkanyiso Ncube</div>
                  </div>
                </div>
                
                <div class="col-img">
                  <div class="gallery">
                    <a target="_blank" href="../../assets/images/avatars/avatar-4.png">
                      <img src="../../assets/images/avatars/avatar-4.png" alt="Mountains" width="600" height="400">
                    </a>
                    <div class="desc">Rico Nyathi</div>
                  </div>
                  </div>

                  <div class="col-img">
                    <div class="gallery">
                      <a target="_blank" href="../../assets/images/avatars/avatar-5.png">
                        <img src="../../assets/images/avatars/avatar-5.png" alt="Mountains" width="600" height="400">
                      </a>
                      <div class="desc">Rico Nyathi</div>
                    </div>
                    </div>
                    <div class="col-img">
                        <div class="gallery">
                          <a target="_blank" href="../../assets/images/avatars/avatar-6.png">
                            <img src="../../assets/images/avatars/avatar-6.png" alt="Mountains" width="600" height="400">
                          </a>
                          <div class="desc">Rico Nyathi</div>
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

div.gallery {
    margin: 5px;
    border: 1px solid #12181A;
    float: left;
    width: 180px;
  }
  
  div.gallery:hover {
    border: 1px solid #777;
  }
  
  div.gallery img {
    width: 100%;
    height: auto;
  }
  
  div.desc {
    padding: 13px;
    text-align: center;
  }
  .col-img {
    flex: 0 0 0%;
}
.mt-6{
    margin-top: 2rem !important;
}
.asc{
    text-align: center;
    background: #12181A ;
    width: 180px;
    font-size: 1.2rem;
    font-weight: 600;
}
.bg-gray{
    background: #22222222 !important;
}

.maz-table{
    background: #575757;
}
</style>
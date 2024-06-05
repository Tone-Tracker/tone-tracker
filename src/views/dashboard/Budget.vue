
<template>
    <Layout>
		<!--start page wrapper -->
		<div class="page-wrapper">
			<div class="page-content">

				<BreadCrumb title="Budget" icon="bx bx-calculator"/>
                <div>
                    <h5>Date: July - August 2024</h5>
                    <h6>(16 Week Period)</h6>
                </div>

                <div class="row mt-4">
                    <div class="col-12 col-lg-12 d-flex">
                       <div class="card radius-10 w-100">
                         <div class="card-header">
                             <div class="d-flex align-items-center">
                                 <div>
                                    <select class="form-select form-select-sm bg-maz-light" aria-label=".form-select-sm example">
										<option selected="selected">July</option>
										<option value="1">August</option>
										<option value="2">September</option>
									</select>
                                 </div>

								 <div class="dropdown ms-auto">
                                    
                                 </div>
                                 <div class="dropdown ms-auto">
                                    <div>
                                        <h6 class="mb-0">Revenue (In Rands)</h6>
                                    </div>
                                 </div>
								 <div class="dropdown ms-auto">
                                    
                                 </div>
								 <div class="dropdown ms-auto">
                                    <select class="form-select form-select-sm bg-maz-light" aria-label=".form-select-sm example">
										<option selected="selected">Daily</option>
										<option value="1">Weekly</option>
									</select>
                                 </div>
                             </div>
                         </div>
                           <div class="card-body">
                            <div class="chart-container1">
                                <canvas id="maz-bar" width="1301" height="380" style="display: block; box-sizing: border-box; height: 380px; width: 1301px;"></canvas>
                            </div>
                           </div>
                           
                       </div>
                    </div>
                  
                 </div>
                 <div class="card radius-10">
					<div class="card-header bg-transparent">
						<div class="d-flex align-items-center">
							<div>
								<h6 class="mb-0">Recent Orders</h6>
							</div>
						
						</div>
					   </div>
					<div class="card-body">
                        <div class="chart-container1">
                            <canvas id="pieChart" width="1301" height="380" style="display: block; box-sizing: border-box; height: 300px; width: 1200px;"></canvas>
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
import { onMounted } from 'vue';

    onMounted(() => {
        barChart();
        pieChart();
    })
const barChart = () => {
    var ctx = document.getElementById('maz-bar').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['1', '6', '2', '5', '7', '12', '23','24','25','26','27','28','29','30','31'],
            datasets: [{
                label: 'Google',
                data: [18, 25, 14, 12, 17, 8, 10, 11, 9, 60, 5, 40, 30, 24, 15],
                backgroundColor: [
                    '#0d6efd'
                ],
                lineTension: 0,
                borderColor: [
                    '#0d6efd'
                ],
                borderWidth: 3,
                backgroundColor: 'rgb(154,58,177)',
            },
            {
                label: 'Facebook',
                
                data: [12, 30, 16, 23, 8, 14, 11, 10, 19, 63, 50, 41, 33, 22, 12],
                backgroundColor: [
                    '#15ca20'
                ],
                tension: 0,
                borderColor: [
                    '#15ca20'
                ],
                borderWidth: 3
            }]
        },
        options: {
            maintainAspectRatio: false,
            barPercentage: 0.6,
            categoryPercentage: 0.5,
            plugins: {
				legend: {
					position:'bottom',
					display: true,
                    labels: {
                    filter: function(item) {
                        return item.text !== 'Facebook' && item.text !== 'Google';
                    }
                }
				}
			},
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

const pieChart = () => {
    var ctx = document.getElementById("pieChart").getContext('2d');

  var gradientStroke1 = ctx.createLinearGradient(0, 0, 0, 300);
      gradientStroke1.addColorStop(0, '#ee0979');
      gradientStroke1.addColorStop(1, '#ff6a00');
    
  var gradientStroke2 = ctx.createLinearGradient(0, 0, 0, 300);
      gradientStroke2.addColorStop(0, '#283c86');
      gradientStroke2.addColorStop(1, '#39bd3c');

  var gradientStroke3 = ctx.createLinearGradient(0, 0, 0, 300);
      gradientStroke3.addColorStop(0, '#7f00ff');
      gradientStroke3.addColorStop(1, '#e100ff');

      var myChart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ["Completed", "Pending", "Process"],
          datasets: [{
            backgroundColor: [
              gradientStroke1,
              gradientStroke2,
              gradientStroke3
            ],

             hoverBackgroundColor: [
              gradientStroke1,
              gradientStroke2,
              gradientStroke3
            ],

            data: [50, 50, 50],
      borderWidth: [1, 1, 1]
          }]
        },
        options: {
          maintainAspectRatio: false,
          cutout: 95,
          plugins: {
            legend: {
                display: false,
             }
          }
          
       }
      });
}
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
.bg-maz-light{
	background: #6F7070 !important;
	color: #fff !important;
	width: 150px;
	border: 0;
	border-radius: 0;
	font-weight: 600;
}
</style>
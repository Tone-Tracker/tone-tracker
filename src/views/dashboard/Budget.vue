
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
								 <!-- <div class="dropdown ms-auto">
                                    <select class="form-select form-select-sm bg-maz-light" aria-label=".form-select-sm example">
										<option selected="selected">Daily</option>
										<option value="1">Weekly</option>
									</select>
                                 </div> -->
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
        horizontalChart();
        itemsSold();
    })


        const itemsSold = () => {
        var ctx = document.getElementById('itemsSold').getContext('2d');
        new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Shirts', 'Bucket hats', 'Key rings', 'Water Bottles'],
            datasets: [{
                label: 'Items Sold',
                data: [65, 59, 80, 81, 56],
                backgroundColor: [
                'rgb(218,74,86)',
                'rgb(218,74,86)',
                'rgb(218,74,86)',
                'rgb(218,74,86)',
                'rgb(218,74,86)',
                'rgb(218,74,86)',
                'rgb(218,74,86)'
                ],
                borderColor: [
                'rgb(218,74,86)',
                'rgb(218,74,86)',
                'rgb(218,74,86)',
                'rgb(218,74,86)',
                'rgb(218,74,86)',
                'rgb(218,74,86)',
                'rgb(218,74,86)'
                ],
                borderWidth: 1
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
                        return item.text !== 'Items Sold';
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
   
   
    const horizontalChart = () => {
        var ctx = document.getElementById('horizontalChart').getContext('2d');
    new Chart(ctx, {
	type: 'bar',
	data: {
		labels: ['Activation 1', 'Activation 2', 'Activation 3', 'Activation 4', 'Activation 5', 'Activation 6', 'Activation 7'],
		datasets: [{
			label: 'Google',
			data: [18, 25, 14, 12, 17, 8, 10],
			backgroundColor: [
				'#fd3550'
			],
			lineTension: 0,
			borderColor: [
				'#fd3550'
			],
			borderWidth: 0
		}
		]
	},
	options: {
		maintainAspectRatio: false,
		barPercentage: 0.5,
		categoryPercentage: 0.7,
		indexAxis: 'y',
		plugins: {
			legend: {
				position:'bottom',
				display: true,
                labels: {
                    filter: function(item) {
                        return item.text !== 'Google';
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
const barChart = () => {
    var ctx = document.getElementById('maz-bar').getContext('2d');
        new Chart(ctx, {
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



</script>
<style>
.maz-height{
	font-size: 3rem;
}
.activation-list-item {
    font-size: 13px;
}

.legend {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  .legend-item {
    display: flex;
    align-items: center;
  }
  .legend-color {
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }
  .non-billable {
    background-color: #8e44ad; /* Purple color */
  }
  .billable {
    background-color: #3498db; /* Blue color */
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
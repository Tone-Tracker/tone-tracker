import $ from 'jquery';
$(function() {


    

  


    



    // chart8
    var ctx = document.getElementById('chart8').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['3L Bottles', '6L Bottles', 'Ice Buckets', 'Bubble Walls', 'Wall Banners', 'Cushions', 'Thrones','Glorifiers 1 Holder', 'Glorifiers 2 Holder', 'Glorifiers 4 Holder', 'Glorifiers 5 Holder', 'Glorifiers 8 Holder', 'Shields', 'Gold Bars', 'Flutes', 'Ring Lights','Clothing Rails','Glow Sticks', 'Claw Machines','Uniforms', 'Carpets'],
            datasets: [{
				type: 'bar',
                label: 'Google',
                data: [6, 20, 14, 12, 17, 8, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
                backgroundColor: [
                    '#008cff'
                ],
                lineTension: 0.4,
                borderColor: [
                    '#008cff'
                ],
                borderWidth: 1
            }]
        },
        options: {
            maintainAspectRatio: false,
			barPercentage: 0.5,
		    categoryPercentage: 0.5,
            plugins: {
				legend: {
					position:'bottom',
					display: true,
				}
			},
            scales: {
                y: {
                    beginAtZero: true,
                    color: 'white',
                },
                x: {
                    color: 'white',
                    size: 10
                }
            }
        }
    });




    // chart9
    var ctx = document.getElementById('chart9').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
            datasets: [{
                label: 'Facebook',
                data: [5, 30, 16, 23, 8, 14, 2],
                backgroundColor: [
                    '#15ca20'
                ],
				fill: {
					target: 'origin',
					above: 'rgb(21 202 32 / 20%)',   // Area will be red above the origin
					//below: 'rgb(21 202 32 / 100%)'   // And blue below the origin
				  }, 
                tension: 0.4,
                borderColor: [
                    '#15ca20'
                ],
                borderWidth: 4
            }]
        },
        options: {
            maintainAspectRatio: false,
			barPercentage: 0.5,
		    categoryPercentage: 0.5,
            plugins: {
				legend: {
					position:'bottom',
					display: true,
				}
			},
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    
});
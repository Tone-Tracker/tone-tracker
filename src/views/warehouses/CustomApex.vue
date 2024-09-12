<template>
    <div>
        <apexchart type="radialBar" :options="chartOptions" :series="series" height="350" ></apexchart> 
    </div>
</template>

<script setup>
import { ref } from 'vue';

// Chart Data and Options
const series = ref([70]); // The percentage value (70%)
const chartOptions = ref({
  chart: {
    type: 'radialBar',
  },
  plotOptions: {
    radialBar: {
      startAngle: -135,
      endAngle: 135,
      hollow: {
        size: '70%',
      },
      track: {
        background: '#e7e7e7',
        strokeWidth: '97%',
        margin: 5, // margin is in pixels
        dropShadow: {
          enabled: true,
          top: 2,
          left: 0,
          blur: 4,
          opacity: 0.15,
        },
      },
      dataLabels: {
        name: {
          offsetY: -10,
          show: true,
          color: '#008FFB',
          fontSize: '17px',
        },
        value: {
          formatter: function (val) {
            return parseInt(val) + "%";
          },
          color: '#111',
          fontSize: '36px',
          show: true,
        },
      },
    },
  },
  labels: ['Cricket'],
});
</script>
<style scoped>
.chart-container {
  min-height: 350px; /* Ensure the container has height */
  min-width: 100%;   /* Adjust width as needed */
  display: flex;
  justify-content: center;
  align-items: center;
}
.apexcharts-svg {
    display: block !important;
  }
  
  .apexcharts-inner {
    display: flex !important;
  }
</style>

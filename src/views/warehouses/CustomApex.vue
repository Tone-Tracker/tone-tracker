<template>
  <div>
    <apexchart type="radialBar" :options="chartOptions" :series="series" height="350" ></apexchart> 
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
const capacity = ref(null);
const series = ref([0]);


const props = defineProps({
  viewedUnit: Object
})
watch(() => props.viewedUnit, (newVal) => {
  capacity.value = newVal?.capacity;
  // Chart Data and Options
  series.value = [capacity.value];
}, { immediate: true });



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
          fontSize: '30px',
          show: true,
        },
      },
      stroke: {
        lineCap: 'round', // This makes the ends of the chart rounded
      },
    },
  },
  labels: [''],
});
</script>

<style scoped>
/* You can adjust the styles as needed */
.apexcharts-svg svg {
  display: block !important;
  max-width: 21.8rem !important;
  width: 427px !important;
}

.apexcharts-inner {
  display: flex !important;
}
</style>

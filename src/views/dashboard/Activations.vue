<template>
    <Layout>
        <!--start page wrapper -->
        <div class="page-wrapper">
            <div class="page-content">
                <div class="row">
                    <div class="col-12 col-lg-12 d-flex">
                        <div class="card p-0 radius-10 w-100">

                            <div class="card-body">
                                <div class="chart-container-1">
                                    <!-- <div id="map" style="height: 100vh;"></div> -->

                                      <GoogleMap
                                        api-key="AIzaSyDhe12nX_E0ya4vk662T-_hAPHH9NuuGkw"
                                        style="width: 100%; height: 800px"
                                        :center="center"
                                        :zoom="9"
                                      >
                                      <Marker v-for="(location, i) in locations" :key="i" :options="{ position: location }">
                                          <InfoWindow>
                                            <div class="info-window-content">
                                              <div class="header">
                                                <h3>Team: 01</h3>
                                                <p>CPC: R 2.00</p>
                                              </div>
                                              <div class="dates">
                                                <p>Start / End date: 22 Jan - 28 Jun</p>
                                                <p>Current Cost: R 25,000.00</p>
                                                <p>Leads generated: 100,000</p>
                                              </div>
                                              <div class="activation">
                                                <h4>{{ location.title }}</h4>
                                                <p>247 New Brunswick Rd Aph 282</p>
                                              </div>
                                            </div>
                                          </InfoWindow>
                                      </Marker>
                                      </GoogleMap>

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
import { onMounted,watch,ref } from 'vue';
import Layout from '../shared/Layout.vue';
import { GoogleMap, Marker,InfoWindow } from 'vue3-google-map'

const center = { lat: -25.6793642, lng: 28.1941785 };
const infowindow = ref(false); // Will be open when mounted

const locations = [
  { lat: -26.0184568, lng: 28.0055974, title: 'Gauteng Activation' },
  { lat: -41.330162, lng: 174.865694, title: 'Eastern Cape Activation' },
  { lat: -25.93312, lng: 28.01213, title: 'North West Activation' },
  { lat: -26.1851663, lng: 28.315154, title: 'Cape Town Activation' },
  { lat: -25.6793642, lng: 28.1941785, title: 'Durban Activation' },
  { lat: -26.038240, lng: 28.213280, title: 'Limpopo Activation' },
]

watch(infowindow, (v) => {
  //alert('infowindow has been ' + (v ? 'opened' : 'closed'));
});



onMounted(() => {
  // initMap();
});
</script>

<style scoped>
/* ///////// */
/* Global styles to target Google Maps InfoWindow */
.gm-style .gm-style-iw-c {
  background: linear-gradient(to right, #6e44ff, #2196f3) !important;
  padding: 20px !important; /* Add padding to create space for the gradient border */
}

.gm-style .gm-style-iw-d {
  overflow: hidden !important;
  background-color: black !important;
}

/* Remove the default close button */
.gm-ui-hover-effect {
  display: none !important;
}
</style>

<style scoped>
.info-window-content {
  font-family: Arial, sans-serif;
  color: white;
  padding: 10px;
  background-color: black;
  border-radius: 8px; /* Slightly smaller than the outer container to show gradient */
  width: 250px;
}

.info-window-content .header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.info-window-content h3 {
  font-size: 18px;
  margin: 0;
}

.info-window-content p {
  font-size: 14px;
  margin: 5px 0;
}

.info-window-content .dates {
  border-top: 1px solid rgba(255, 255, 255, 0.3);
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  padding: 10px 0;
  margin: 10px 0;
}

.info-window-content .activation {
  margin-top: 10px;
}

.info-window-content h4 {
  font-size: 16px;
  margin: 0 0 5px 0;
}
/* /////////////// */
.gm-style-iw-d{
    color:red !important;
}
.maz-height {
    font-size: 3rem;
}

/* set the default transition time */
:root {
    --delay-time: .5s;
  }
  
  #map {
    height: 100%;
  }

  
</style>
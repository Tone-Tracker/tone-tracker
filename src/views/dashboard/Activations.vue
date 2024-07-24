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
                                        :options="{ styles: mapStyles }"

                                      >
                                      <Marker v-for="(location, i) in locations" :key="i" :options="{ position: location }">
                                          <InfoWindow>
                                            <div class="info-window-container">
                                              <div class="info-window-content">
                                              <div class="header">
                                                <h3>Team: 01</h3>
                                                <p class="text-white">CPC: R 2.00</p>
                                              </div>
                                              <div class="dates mb-4">
                                                <p class="text-white">Start / End date: 22 Jan - 28 Jun</p>
                                                <p class="text-white">Current Cost: R 25,000.00</p>
                                                <p class="text-white">Leads generated: 100,000</p>
                                              </div>
                                              <div class="activation">
                                                <h3>{{ location.title }}</h3>
                                                <p class="text-white">247 New Brunswick Rd Aph 282</p>
                                              </div>
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

const mapStyles = [
  {
    elementType: "geometry",
    stylers: [{ color: "#242f3e" }]
  },
  {
    elementType: "labels.text.stroke",
    stylers: [{ color: "#242f3e" }]
  },
  {
    elementType: "labels.text.fill",
    stylers: [{ color: "#746855" }]
  },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }]
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }]
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#263c3f" }]
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [{ color: "#6b9a76" }]
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#38414e" }]
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#212a37" }]
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ color: "#9ca5b3" }]
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#746855" }]
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [{ color: "#1f2835" }]
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [{ color: "#f3d19c" }]
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [{ color: "#2f3948" }]
  },
  {
    featureType: "transit.station",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }]
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#17263c" }]
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#515c6d" }]
  },
  {
    featureType: "water",
    elementType: "labels.text.stroke",
    stylers: [{ color: "#17263c" }]
  }
];

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

<style>
/* Global styles to target Google Maps InfoWindow */
.gm-style .gm-style-iw-c {
  background: linear-gradient(to right, #6e44ff, #2196f3) !important;
  padding: 12px !important; /* Add padding to create space for the gradient border */
  
  border-radius: 35px !important;
}

.gm-style .gm-style-iw-tc::after {
  background: none !important;
}


.gm-style .gm-style-iw-d {
  border-radius: 35px;
  width: 300px;
  padding: 15px;
  padding-top: 5px;
  padding-bottom: 5px;
  overflow: hidden !important;
  background-color: black !important;
}

.gm-style-iw-ch {
  padding-top: 0;
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
  padding: 5px;
  background-color: black;
  border-radius: 8px; /* Slightly smaller than the outer container to show gradient */
  width: 250px;
}

.info-window-content .header {
  /* display: flex;
  justify-content: space-between;
  align-items: center; */
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
</style>

<style scoped>

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
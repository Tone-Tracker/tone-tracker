<template>
  <Layout>
    <div class="page-wrapper">
      <div class="page-content">
        <div class="row">
          <div class="col-12 col-lg-12 d-flex">
            <div class="card p-0 radius-10 w-100">
              <div class="card-body">
                <div class="chart-container-1">
                  <GoogleMap
                    api-key="AIzaSyDhe12nX_E0ya4vk662T-_hAPHH9NuuGkw"
                    style="width: 100%; height: 800px"
                    :center="center"
                    :zoom="9"
                    :options="{ styles: mapStyles }"
                  >
                    <Marker v-for="(location, i) in locations" :key="i" :options="{ position: location }">
                      <InfoWindow>
                        <div class="popup">
                          <div class="inner-container">
                            <h2>Team: 01</h2>
                            <p>CPC: R 2.00</p>
                            <p>Start / End date: 22 Jan - 28 Jun</p>
                            <p>Current Cost: R 25,000.00</p>
                            <p>Leads generated: 100,000</p>
                            <h3>{{ location.title }}</h3>
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
  padding: 0 !important;
  background: transparent !important;
  box-shadow: none !important;
}

.gm-style .gm-style-iw-d {
  overflow: visible !important;
  background-color: transparent !important;
}

.gm-style-iw-tc::after {
  display: none !important;
}

/* Remove the default close button */
.gm-ui-hover-effect {
  display: none !important;
}
</style>


<style scoped>
.popup {
  width: 300px;
  background:linear-gradient(135deg, #00a2ff, #481e7e);
  color: white;
  font-family: Arial, sans-serif;
  padding: 20px;
  padding-bottom: 40px;
  clip-path: 
    polygon(
      20px 0%, 
      calc(100% - 20px) 0%, 
      100% 20px, 
      100% calc(100% - 40px), 
      calc(100% - 20px) calc(100% - 20px),
      calc(50% + 10px) calc(100% - 20px),
      50% 100%,
      calc(50% - 10px) calc(100% - 20px),
      20px calc(100% - 20px),
      0% calc(100% - 40px),
      0% 20px
    );
  position: relative;
  overflow: hidden;
}

.popup::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 20px;
  background: inherit;
  border-radius: 20px;
}

.inner-container {
  position: relative;
  background-color: black;
  padding: 20px 15px 15px 15px;
  border-radius: 10px;
}

h2 {
  margin: 0 0 10px 0;
  font-size: 18px;
}

p {
  margin: 5px 0;
  font-size: 14px;
}

h3 {
  margin: 15px 0 5px 0;
  font-size: 16px;
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
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
                            <h2>{{ location.title }}</h2>
                            <p>CPC: R 2.00</p>
                            <p>Start / End date: {{ location.startDate }} - {{ location.endDate }}</p>
                            <p>Current Cost: R 25,000.00</p>
                            <p>Leads generated: 100,000</p>
                            <h3>{{ location.regionName }} Activation</h3>
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

const activeInfoWindow = ref(null);
const target = ref(null);
const activationStore = useActivation();
const authStore = useAuth();
const staffID = JSON.parse(authStore.user)?.activeUserId;
onClickOutside(target, event => console.log('Outside'))

function openInfoWindow(index) {
  activeInfoWindow.value = index;
}

const activations = ref([]);
let locations = ref([]);

const getAllActivations = () => {

  //get activations for Admins
  const user = JSON.parse(authStore.user);
 
  if(user.role == 'TTG_SUPER_ADMIN' || user.role == 'TTG_HEAD_ADMIN'){  
    activationStore.getAllActivationsAdmins().then(function (response) {
      activations.value = response.data;
      //map activations
      locations.value = activations.value.map(activation => ({
          lat: activation.centralPoint.latitude,
          lng: activation.centralPoint.longitude,
          startDate: activation.startDate,
          endDate: activation.endDate,
          regionName: activation.regionName,
          title: activation.name
        }));

        console.log('test location', locations);
    })
  }




  

}

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
  background: linear-gradient(135deg, #00a2ff, #7000ff);
  color: white;
  font-family: Arial, sans-serif;
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
  padding: 20px;
  padding-bottom: 40px;
  border-radius: 20px;
}

.inner-container {
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

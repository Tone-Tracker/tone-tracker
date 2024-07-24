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
                                        <Marker  v-for="(location, i) in locations" :options="{ position: location }">
                                          <InfoWindow >
                                            <div id="content">
                                              <h3 style="color: #000">{{ location.title }}</h3>
                                              <p style="color: #000">
                                                The API key included in the script element that loads the API has expired or is not recognized by the system. 
                                              You may receive this error after creating a new API key if you try to use the key before it is recognized by the system.
                                               Wait a few minutes and try again, or you may need to generate a new API key in the Cloud Console.
                                              To get an API key, click the button below.
                                              </p>
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
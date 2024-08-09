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
                                    <div id="map" style="height: 100vh;">
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
                                    </div>
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
import { onMounted } from 'vue';
import Layout from '../shared/Layout.vue';

const parser = new DOMParser();

function loadGoogleMapsScript() {
  return new Promise((resolve, reject) => {
    if (typeof google !== 'undefined') {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDhe12nX_E0ya4vk662T-_hAPHH9NuuGkw&libraries=maps,marker&v=beta';
    script.async = true;
    script.defer = true;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

async function initMap() {
    await loadGoogleMapsScript();
  // Request needed libraries.
  const { Map, InfoWindow } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary(
    "marker",
  );
  const map = new Map(document.getElementById("map"), {
    zoom: 12,
    center: { lat: -26.038240, lng: 28.213280 },
    mapId: "4504f8b37365c3d0",
  });
  // Set LatLng and title text for the markers. The first marker (Boynton Pass)
  // receives the initial focus when tab is pressed. Use arrow keys to move
  // between markers; press tab again to cycle through the map controls.
  const activations = [
    {
      position: { lat: -26.038240, lng: 28.213280 },
      title: "Norkem Park",
    },
    {
      position: { lat: -25.6793642, lng: 28.1941785 },
      title: "Norkem Park",
    },
    {
      position: { lat: -26.1851663, lng: 28.315154 },
      title: "Lakeside Mall",
    },
    {
      position: { lat: -25.93312, lng: 28.01213 },
      title: "Chuma Mall",
    },
    {
      position: { lat: -26.0184568, lng: 28.0055974 },
      title: "Bell Rock",
    },
  ];

  activations.forEach(markerData => {
    const marker = new AdvancedMarkerElement({
      map,
      position: markerData.position,
      content: createCustomMarkerContent(markerData.title),
    });

    const infoWindow = new google.maps.InfoWindow({
      content: createInfoWindowContent(markerData.info),
    });

    marker.addListener('click', () => {
      infoWindow.open(map, marker);
    });
  });


  // Create an info window to share between markers.
  const infoWindow = new InfoWindow();

  // Create the markers.
  activations.forEach(({ position, title }, i) => {
    const pin = new PinElement({
      glyph: `${i + 1}`,
      scale: 1.5,
    });
    const marker = new AdvancedMarkerElement({
      position,
      map,
      title: `${i + 1}. ${title}`,
      content: pin.element,
      gmpClickable: true,
    });

    // Add a click listener for each marker, and set up the info window.
    marker.addListener("click", ({ domEvent, latLng }) => {
      const { target } = domEvent;

      infoWindow.close();
      infoWindow.setContent(marker.title);
      infoWindow.open(marker.map, marker);
    });
  });
}

function createCustomMarkerContent(title) {
  const svg = `
    <svg height="50" width="50" viewBox="0 0 24 24" fill="#ff0000" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" />
      <text x="12" y="16" font-size="12" font-weight="bold" text-anchor="middle" fill="#ffffff">${title}</text>
    </svg>`;
  const div = document.createElement('div');
  div.innerHTML = svg;
  return div.firstChild;
}

function createInfoWindowContent(info) {
  return `<div style="padding: 10px; font-size: 14px;">${info}</div>`;
}

onMounted(() => {
  initMap();
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
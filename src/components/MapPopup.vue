<template>
  <div class="map-popup-container" @click="emit('closeAndUpdate', modelValue, +radius)">
    <div class="content-container">
      <div
          ref="mapContainer"
          id="map"
          style="width: 100%; height: 100%; z-index: 1; position: relative;"
          @click.stop
      ></div>
      <div class="slider-container">
        <label for="radius-slider">Radius:</label>
        <input
            id="radius"
            type="range"
            min="100"
            max="20000"
            step="100"
            v-model="radius"
            @click.stop
        />
        <div class="range-indicator">{{ radius/1000 }} km</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import leaflet from "leaflet";
import "leaflet/dist/leaflet.css";
import {onMounted, ref, watch} from "vue";

const props = defineProps<{
  modelValue: { latitude: number; longitude: number };
  radius?: number;
}>();

const radius = ref<number|undefined>(props.radius);
const modelValue = ref<{ latitude: number; longitude: number }>(props.modelValue);

const emit = defineEmits<{
  (event: "closeAndUpdate", location: {
    latitude: number;
    longitude: number;
  }, radius: number): void;
}>();

const mapContainer = ref<HTMLElement | null>(null);

let marker: leaflet.CircleMarker;
let map: leaflet.Map;

watch(
    () => radius.value,
    (radius) => {
      if (marker && radius) {
        marker.setRadius(radius);
      }
    }
);

watch(
    () => modelValue.value,
    () => {
      const latitude = modelValue.value.latitude;
      const longitude = modelValue.value.longitude;
      if (latitude && longitude) {
        if (marker) {
          marker.setLatLng([latitude, longitude]);
          marker.addTo(map);
        }
        map.setView([latitude, longitude]);
      }
    },
    { deep: true }
);

function fetchGroceryStores(latitude: number, longitude: number, radius: number, callback: (arg0: any) => any) {
  const overpassQuery = `
    [out:json][timeout:25];
    (
      node["shop"="supermarket"](around:${radius},${latitude},${longitude});
      node["shop"="convenience"](around:${radius},${latitude},${longitude});
      node["amenity"="marketplace"](around:${radius},${latitude},${longitude});
    );
    out body;
    >;
    out skel qt;
  `;
  const overpassApiUrl = "https://overpass-api.de/api/interpreter";
  fetch(overpassApiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `data=${encodeURIComponent(overpassQuery.trim())}`,
  })
      .then((response) => response.json())
      .then((data) => callback(data.elements))
      .catch((error) => console.error("Error fetching grocery stores:", error));
}

function createCustomMarker(content: string) {
  return leaflet.divIcon({
    className: "custom-marker",
    html: `
      <div class="marker-wrapper" style="
        position: absolute;
        bottom: 0;
        right: 0;
        ">
        <div class="marker-content" style="
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #6EE7B7 0%, #0EA5E9 100%);
          border-radius: 20px;
          box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
          padding: 6px 12px;
          color: #ffffff;
          font-size: 14px;
          font-weight: bold;
          transform-origin: bottom right;
        ">
          ${content}
        </div>
      </div>
    `,
    iconSize: [150, 30],
    iconAnchor: [75, 15],
  });
}

function updateMarkerSize(zoom: number) {
  const markers = document.querySelectorAll(".custom-marker");
  const scaleFactor = Math.max(0.5, Math.min(2.5, 1.2 + 0.1 * (zoom - map.getMaxZoom())));

  markers.forEach((marker) => {
    const markerContent = (marker as HTMLElement).querySelector(".marker-content") as HTMLElement;
    if (markerContent) {
      markerContent.style.transform = `translate(-50%, -50%) scale(${scaleFactor})`;
    }
  });
}


onMounted(() => {
  if (mapContainer.value) {
    map = leaflet.map(mapContainer.value).setView([props.modelValue.latitude, props.modelValue.longitude], 13);
    marker = leaflet.circle([props.modelValue.latitude, props.modelValue.longitude]);
    if (props.radius) {
      marker.setRadius(props.radius);
    }
    marker.addTo(map);

    map.on("click", (e: leaflet.LeafletMouseEvent) => {
      modelValue.value = {latitude: e.latlng.lat, longitude: e.latlng.lng};
    });
    map.on("zoomend", () => {
      updateMarkerSize(map.getZoom());
    });

    leaflet
        .tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 20,
          attribution:
              '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        })
        .addTo(map);

    fetchGroceryStores(
        props.modelValue.latitude,
        props.modelValue.longitude,
        10000,
        (groceryStores) => {
          groceryStores.forEach((store: { lat: number; lon: number; tags: { name: any; }; }) => {
            const storeName = store.tags.name || "Dagligvarebutikk";
            const customIcon = createCustomMarker(storeName);

            leaflet.marker([store.lat, store.lon], { icon: customIcon }).addTo(map);
          });
          updateMarkerSize(map.getZoom());
        }
    );
  }
});
</script>

<style scoped>

.content-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
  width: 60vh;
  height: 60vh;
  border: #181818 2px solid;
  background-color: #ffffff;;
  border-bottom-left-radius: .5rem;
  border-bottom-right-radius: .5rem;
}

.slider-container {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-left: 10px;
  padding-right: 10px;
}
.map-popup-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  z-index: 9999;
}

button {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 9999;
}

label {
  margin-right: 10px;
  font-size: 16px;
  font-weight: bold;
}

.range-indicator {
  margin-left: 10px;
  font-size: 16px;
}

#radius {
  width: 100%;
}

</style>
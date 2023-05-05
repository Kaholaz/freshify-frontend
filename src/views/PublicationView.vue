<template>
  <div>
    <div>
      <h1>Kundeaviser i nærheten</h1>
      <el-button
        class="menu-item-button"
        plain
        style="margin: 10px"
        type="primary"
        @click="showMapPopup = !showMapPopup"
      >
        <el-icon>
          <MapLocation />
        </el-icon>
        <span>Vis kart</span>
      </el-button>
      <teleport style="padding: 10px" to="body">
        <MapPopup
          v-if="showMapPopup"
          :modelValue="{ latitude: params.r_lat, longitude: params.r_lng }"
          :radius="params.r_radius"
          @closeAndUpdate="closeAndUpdate"
        />
      </teleport>
      <link href="https://js-sdk.tjek.com/sgn-sdk-4.x.x.min.css" rel="stylesheet" type="text/css" />
      <div id="list-publications" style="padding: 10px"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import MapPopup from "@/components/MapPopup.vue";
import { MapLocation } from "@element-plus/icons-vue";

const showMapPopup = ref(false);

function closeAndUpdate(location: { longitude: number; latitude: number }, rad: number) {
  showMapPopup.value = false;
  params.value.r_radius = rad;
  params.value.r_lat = location.latitude;
  params.value.r_lng = location.longitude;

  const existingScript = document.getElementById("sgn-sdk");
  if (existingScript) {
    existingScript.remove();
  }
  loadTjekSdk();
}

const oldOpen = XMLHttpRequest.prototype.open;
XMLHttpRequest.prototype.open = function (method, url) {
  if (typeof url === "string" && url.startsWith("https://squid-api.tjek.com/v2/catalogs?")) {
    const searchParams = new URLSearchParams();
    Object.entries(params.value).forEach(([key, value]) => {
      searchParams.append(key, String(value));
    });
    url = import.meta.env.VITE_BACKEND_URI + `publications/dealerfront?${searchParams.toString()}`;

    this.responseType = "json";
    this.addEventListener("readystatechange", function () {
      if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
        const response = new Response(this.response);
        response.json().then((responseJson: any) => {
          const newResponse = responseJson.map((item: any) => {
            return {
              id: item.dealer.id,
              ern: item.dealer.ern,
            };
          });
          const customEvent = new CustomEvent("new-response", { detail: newResponse });
          this.dispatchEvent(customEvent);
        });
      }
    });
  }
  oldOpen.apply(this, [method, url, true]);
};

const businessIds = {
  coopMega: "de79dm",
  bunnpris: "5b11sm",
  kiwi: "257bxm",
  joker: "80742m",
  coopPrix: "f5d5lm",
  rema1000: "faa0Ym",
};

const params = ref({
  r_lat: 63.418901,
  r_lng: 10.40266,
  r_radius: 1500,
  limit: 12,
  order_by: "distance,name",
  types: "paged,incito",
  business_category_ids: "groceries",
});

const loadTjekSdk = () => {
  const script = document.createElement("script");
  script.src = "https://js-sdk.tjek.com/sgn-sdk-4.x.x.min.js";
  script.id = "sgn-sdk";
  script.dataset.apiKey = "LJBx2X";
  script.dataset.trackId = "Sw627u";
  script.dataset.businessId = businessIds.rema1000;
  script.dataset.component = "list-publications";
  script.dataset.localeCode = "nb_NO";
  script.dataset.componentPublicationDisplayUrlParams = "hash";
  script.dataset.publicationHash = "publication";
  script.dataset.componentPublicationsListItemClickBehavior = "open_publication_viewer";
  script.dataset.componentListPublicationsContainer = "#list-publications";
  script.dataset.componentPublicationsViewerPreferredType = "incito";
  script.dataset.componentPublicationDisableShoppingList = "true";
  script.dataset.componentPublicationDisableClose = "false";
  script.dataset.componentPublicationDisableMenu = "false";
  script.dataset.componentPublicationDisableDownload = "false";
  script.dataset.componentPublicationDisableHeader = "false";
  script.dataset.componentPublicationDisableGlobalScrollbar = "false";
  script.dataset.componentPublicationDisablePagedecorations = "false";
  script.dataset.componentPublicationShowHeaderLabels = "true";
  script.dataset.componentPublicationViewerOfferClickBehavior = "overview_modal";
  script.dataset.componentPublicationEnableSidebar = "true";
  script.dataset.componentPublicationSidebarPosition = "right";
  script.dataset.translationKeysPublicationViewerDownloadButton = "Download PDF";
  script.dataset.translationKeysPublicationViewerOfferDateRange =
    "Tilbudet gjelder fra d. {{{from}}} - {{{till}}}";
  script.dataset.translationKeysPublicationViewerMenuDateRange =
    "Tilbudsavisen gelder fra d. {{{from}}} - {{{till}}}";
  script.dataset.componentListPublicationsRequestFilter = "r_lat:60,r_lng:10";
  script.defer = true;
  document.body.appendChild(script);
};

onMounted(() => {
  loadTjekSdk();
});

/**
 *     businessId: dataset.businessId,
 *     mainContainer: dataset.componentPublicationContainer || mainContainer,
 *     listPublicationsContainer: dataset.componentListPublicationsContainer || mainContainer,
 *     publicationId: dataset.componentPublicationId,
 *     publicationIdParam: dataset.publicationIdQueryParam || "publicationid",
 *     pageIdParam: dataset.publicationPageQueryParam || "publicationpage",
 *     publicationHash: dataset.publicationHash || "publication",
 *     displayUrlParams: dataset.componentPublicationDisplayUrlParams,
 *     localeCode: dataset.localeCode,
 *     translationKeys: dataset.translationKeyIncito_publication_viewer,
 *     theme: dataset.componentTheme,
 *     publicationsListClickBehavior: dataset.componentPublicationsListItemClickBehavior || "open_publication_viewer",
 *     offerClickBehavior: dataset.componentPublicationViewerOfferClickBehavior || "shopping_list",
 *     disableShoppingList: dataset.componentPublicationDisableShoppingList === "true",
 *     disableClose: dataset.componentPublicationDisableClose === "true",
 *     disableMenu: dataset.componentPublicationDisableMenu === "true",
 *     disableDownload: dataset.componentPublicationDisableDownload === "true",
 *     disableHeader: dataset.componentPublicationDisableHeader === "true",
 *     disableGlobalScrollbar: dataset.componentPublicationDisableGlobalScrollbar === "true",
 *     disablePageDecorations: dataset.componentPublicationDisablePagedecorations === "true",
 *     showHeaderLabels: dataset.componentPublicationShowHeaderLabels === "true",
 *     enableSidebar: dataset.componentPublicationEnableSidebar === "true",
 *     sidebarPosition: dataset.componentPublicationSidebarPosition === "left" ? "left" : "right",
 *     requestFilter: dataset.componentListPublicationsRequestFilter,
 *     clientFilter: dataset.componentListPublicationsClientFilter
 */
</script>

<style scoped></style>
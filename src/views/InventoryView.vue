<template>
  <div id="inventory" class="inventory-wrapper">
    <h1>Mitt Kjøleskap</h1>
    <div class="inventory-items-list" v-loading="isLoading">
      <ItemCard v-for="item in items" :key="item.id" :item="item" />
      <div v-if="!items && error">Ingenting å vise.</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { ElNotification } from "element-plus";

import type { Item } from "@/services/index";
import { InventoryApi } from "@/services/index";
import { useHouseholdStore } from "@/stores/household";
import { runApiRequest } from "@/utils/comoposable";

import ItemCard from "@/components/ItemCard.vue";

// Define APIs
const inventoryApi = new InventoryApi();

// Defines stores
const householdStore = useHouseholdStore();

// Define refs
let items = ref<Item[] | null>(null); // These will be overwritten if the household id is not null
let error = ref<Error | null>(null); // These will be overwritten if the household id is not null

// Define computed values
const isLoading = computed(() => items.value === null && error.value === null);

// Other script logic
const householdId = householdStore.getHousehold()?.id;

if (householdId) {
  // Load inventory items
  let { data: newItems, error: newError } = runApiRequest(
    inventoryApi.getInventoryItems(householdId)
  );
  items = newItems; // eslint-disable-line
  error = newError; // eslint-disable-line
} else {
  // Show an error because no household was selected
  console.error("No household id was selected. Can not fetch inventory items.");
  error.value = new Error("No household id was selected. Can not fetch inventory items.");
  ElNotification({
    title: "Ingen hjem valgt.",
    message: "Velg et hjem for å se inventaret til hjemmet.",
    type: "error",
  });
}
</script>

<style scoped>
.inventory-wrapper {
  width: 100%;
  height: 100%;
  padding: 2rem;
  margin: 0;
  overflow: hidden;
}

.inventory-items-list {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow-y: auto;
}
</style>

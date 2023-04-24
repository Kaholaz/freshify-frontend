<template>
  <div id="inventory" class="inventory-wrapper">
    <h1>Mitt Kjøleskap</h1>
    <div class="inventory-items-list" v-loading="isLoading">
      <ItemCard
        :class="{ 'warning-age': computed(() => getDaysSinceBought(item) > 5) }"
        v-for="item in items"
        :key="item.id"
        :item="item"
        @use="useItem(item, item.remaining!)"
        @delete="deleteItem(item)"
      />
      <div v-if="!items">Ingenting å vise.</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { ref, computed } from "vue";
import { ElNotification } from "element-plus";

import { ItemState, type Item, type UpdateItem } from "@/services/index";
import { InventoryApi } from "@/services/index";
import { useHouseholdStore } from "@/stores/household";
import { getDaysSinceBought } from "@/utils/item-utils";

import ItemCard from "@/components/ItemCard.vue";

// Define APIs
const inventoryApi = new InventoryApi();

// Defines stores
const householdStore = useHouseholdStore();

// Define refs
const items = ref<Item[] | null>(null);
const error = ref<Error | null>(null);

// Define computed values
const isLoading = computed(() => items.value === null && error.value === null);

// Define callbacks
function useItem(item: Item, amount: number) {
  let newAmount = item.remaining! - amount > 0 ? item.remaining! - amount : 0;

  let updatedItem: UpdateItem = {
    itemId: item.id!,
    remaining: newAmount,
    state: ItemState.USED,
  };

  inventoryApi.updateInventoryItem(item.id!, updatedItem).then(updateItems).catch(handleError);
}

function deleteItem(item: Item) {
  let householdId = householdStore.getHousehold()?.id;
  if (!householdId) {
    console.error(`Could not delete item ${item.type?.name}. No household id was selected.`);

    ElNotification({
      title: "Ingen hjem valgt.",
      message: "Velg et hjem for å slette et element.",
      type: "error",
      duration: 0,
    });

    return;
  }

  inventoryApi
    .deleteInventoryItem(householdId, item.id!)
    .then(() => {
      // This will never happen, because this function is only called when an item is clicked,
      // and items are only shown if they are in items.value.
      if (!items.value) return;

      let newItems = items.value.filter((i) => i.id !== item.id);
      items.value = !newItems.length ? null : newItems;

      console.info(`Deleted item ${item.type?.name}.`);
    })
    .catch(handleError);
}

// Other script logic
function updateItems() {
  items.value = null;

  let householdId = getHouseholdId();
  if (!householdId) return;

  // Load inventory items
  inventoryApi
    .getInventoryItems(householdId)
    .then((response) => response.data)
    .then((data) => (items.value = data))
    .catch(handleError);
}

function getHouseholdId(): number | null {
  let householdId = householdStore.getHousehold()?.id;

  if (!householdId) {
    console.error("No household id was selected. Can not fetch inventory items.");
    error.value = new Error("No household id was selected. Can not fetch inventory items.");

    ElNotification({
      title: "Ingen hjem valgt.",
      message: "Velg et hjem for å se inventaret til hjemmet.",
      type: "error",
      duration: 0,
    });

    return null;
  }
  return householdId;
}

function handleError(err: any) {
  console.log(err);
  let errorMessage = "";

  if (err instanceof Error) {
    errorMessage = err.message;
  }

  if (axios.isAxiosError(err)) {
    let { code, message } = err;
    errorMessage = `[${code || 0}]: ${message}`;
  }

  ElNotification({
    title: "En feil oppstod.",
    message: errorMessage,
    type: "error",
    duration: 0,
  });
}

updateItems();
// TODO: When the household is changed, update the items.
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

.warning-age {
  border: 2px solid red !important;
}
</style>

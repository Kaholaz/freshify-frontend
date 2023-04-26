<template>
  <h1>Mitt kjøleskap</h1>
  <div class="inventory-items-list" v-if="!isLoading">
    <ItemCard
      :class="{
        'warning-age': computed(() => getDaysSinceBought(item) > 5),
        'danger-age': computed(() => getDaysSinceBought(item) > 10),
      }"
      v-for="item in items"
      :key="item.id"
      :item="item"
      @use="useItemDialog(item)"
      @delete="deleteItem(item)"
      style="margin-bottom: 1rem"
    />
    <el-alert v-if="!items?.length" center>
      <el-text>Ingenting å vise.</el-text>
    </el-alert>
  </div>
  <div v-else style="margin-top: 1rem">
    <ShoppingListCardSkeleton></ShoppingListCardSkeleton>
    <ShoppingListCardSkeleton></ShoppingListCardSkeleton>
    <ShoppingListCardSkeleton></ShoppingListCardSkeleton>
  </div>

  <!-- Use item dialog -->
  <el-dialog
    v-if="dialogItem"
    v-model="useItemDialogVisible"
    title="Registrer matbruk"
    width="500px"
  >
    <span>Velg hvor mye av varen du har brukt opp! Resten vil bli registrert som kastet.</span>
    <div class="amount-selection-row">
      <el-button type="info" round @click="dialogAmount = 0"> Ingenting</el-button>
      <el-button type="info" round @click="dialogAmount = 0.25"> 0.25</el-button>
      <el-button type="info" round @click="dialogAmount = 0.5"> 0.5</el-button>
      <el-button type="info" round @click="dialogAmount = 0.75"> 0.75</el-button>
      <el-button type="info" round @click="dialogAmount = 1"> Hele</el-button>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="danger" @click="useItemDialogVisible = false">Avbryt</el-button>
        <el-button type="warning" @click="useItem(dialogItem, dialogAmount)">
          Bruk og kast
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import axios from "axios";
import { ref, computed } from "vue";
import { ElDialog } from "element-plus";

import type { Item, UpdateItem } from "@/services/index";
import { ItemState, InventoryApi } from "@/services/index";
import { useHouseholdStore } from "@/stores/household";
import { getDaysSinceBought } from "@/utils/item-utils";
import { showError } from "@/utils/error-utils";

import ItemCard from "@/components/ItemCard.vue";
import ShoppingListCardSkeleton from "@/components/ShoppingListCardSkeleton.vue";

// Define APIs
const inventoryApi = new InventoryApi();

// Defines stores
const householdStore = useHouseholdStore();

// Define refs
const useItemDialogVisible = ref(false);

// Dialog refs
// The item that is currently selected with the dialog open.
const dialogItem = ref<Item | null>(null);
const dialogAmount = ref<number | null>(null);

const items = ref<Item[] | null>(null);
const error = ref<Error | null>(null);

// Define computed values
const isLoading = computed(() => items.value === null && error.value === null);

// Define callbacks
function deleteItem(item: Item) {
  let householdId = householdStore.getHousehold()?.id;
  if (!householdId) {
    console.error(`Could not delete item ${item.type?.name}. No household id was selected.`);
    showError("Ingen hjem valgt.", "Velg et hjem for å slette et element.", 15000);
    return;
  }

  inventoryApi
    .deleteInventoryItem(householdId, item.id!)
    .then(() => {
      removeItemClientSide(item);
      console.info(`Deleted item ${item.type?.name}.`);
    })
    .catch(handleError);
}

function useItemDialog(item: Item) {
  dialogItem.value = item;
  useItemDialogVisible.value = true;
}

// Other script logic
function useItem(item: Item, amount: number | null) {
  if (amount === null) {
    return showError("Mengde mangler.", "Velg hvor mye du har brukt av matvaren.", 5000);
  }

  let newAmount = item.remaining! - amount > 0 ? item.remaining! - amount : 0;

  let updatedItem: UpdateItem = {
    itemId: item.id!,
    remaining: newAmount,
    state: ItemState.USED,
  };

  let houseHoldId = getHouseholdId();
  if (houseHoldId == null) return;

  inventoryApi
    .updateInventoryItem(houseHoldId, updatedItem)
    .then(() => {
      removeItemClientSide(item);
      console.info(`Used item ${item.type?.name}.`);

      dialogItem.value = null;
      useItemDialogVisible.value = false;
    })
    .catch(handleError);
}

function updateItems() {
  items.value = null;

  let householdId = getHouseholdId();
  if (householdId == null) return;

  // Load inventory items
  inventoryApi
    .getInventoryItems(householdId)
    .then((response) => response.data)
    .then((data) => (items.value = data))
    .catch(handleError);
}

function removeItemClientSide(item: Item) {
  if (!items.value) return;
  if (!items.value.map((i) => i.id).includes(item.id)) return;

  let newItems = items.value?.filter((i) => i.id !== item.id);
  if (!newItems) return;

  items.value = !newItems.length ? [] : newItems;
}

function getHouseholdId(): number | null {
  let householdId = householdStore.getHousehold()?.id;

  if (!householdId) {
    console.error("No household id was selected. Can not fetch inventory items.");
    error.value = new Error("No household id was selected. Can not fetch inventory items.");
    showError("Ingen hjem valgt.", "Velg et hjem for å se inventaret til hjemmet.", 15000);
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

  showError("En feil oppstod.", errorMessage, 0);
}

updateItems();
// TODO: When the household is changed, update the items.
</script>

<style scoped>
.inventory-items-list {
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-y: auto;
}

.warning-age {
  border: 1px solid orange !important;
}

.danger-age {
  border: 1px solid red !important;
}

.amount-selection-row {
  display: flex;
  justify-content: center;
  margin-top: 5px;
}
</style>

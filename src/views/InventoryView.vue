<template>
  <h1>Mitt kjøleskap</h1>
  <OverviewStatisticsBar
    :danger-percentage="dangerPercentage"
    :warning-percentage="warningPercentage"
    :success-percentage="successPercentage"
    style="margin-bottom: 2rem"
    v-if="items?.length"
  >
  </OverviewStatisticsBar>
  <div v-if="!isLoading && items" class="inventory-items-list">
    <ItemCard
      v-for="item in items"
      :key="item.id"
      :item="item"
      style="margin-bottom: 1rem"
      @extend="extendItem(item)"
      @delete="deleteItem(item)"
      @use="useItemDialog(item)"
    />
    <el-alert v-if="!items?.length" center>
      <el-text>Ingenting å vise.</el-text>
    </el-alert>
  </div>
  <div v-else style="margin-top: 1rem">
    <ShoppingListCardSkeleton :count="7"></ShoppingListCardSkeleton>
  </div>

  <!-- Use item dialog -->
  <el-dialog
    v-if="dialogItem"
    v-model="useItemDialogVisible"
    title="Registrer matbruk"
    width="500px"
    id="use-item-dialog"
  >
    <span>Velg hvor mye av varen du har brukt. Resten blir markert som svinn</span>
    <div class="amount-selection-row">
      <el-button round type="info" @click="dialogAmount = 0"> Ingenting</el-button>
      <el-button round type="info" @click="dialogAmount = 0.25"> 0.25</el-button>
      <el-button round type="info" @click="dialogAmount = 0.5"> 0.5</el-button>
      <el-button round type="info" @click="dialogAmount = 0.75" id="use"> 0.75</el-button>
      <el-button round type="info" @click="dialogAmount = 1"> Hele</el-button>
    </div>
    <div class="re-add">
      <el-checkbox v-model="dialogReAdd"
        >Legge til en ny {{ dialogItem.type?.name }} i handlekurven?
      </el-checkbox>
    </div>
    <span class="dialog-footer">
      <el-button type="danger" @click="useItemDialogVisible = false">Avbryt</el-button>
      <el-button type="warning" @click="useItem(dialogItem, dialogAmount)" id="submit">
        Bruk
      </el-button>
    </span>
  </el-dialog>
</template>

<script lang="ts" setup>
import axios from "axios";
import { computed, inject, onMounted, onUnmounted, ref } from "vue";
import { ElDialog, ElMessage } from "element-plus";

import type { CreateShoppingListEntry, Item, UpdateItem } from "@/services/index";
import { InventoryApi, ItemState, ShoppingListApi } from "@/services/index";
import { useHouseholdStore } from "@/stores/household";
import { showError } from "@/utils/error-utils";

import ItemCard from "@/components/ItemCard.vue";
import ShoppingListCardSkeleton from "@/components/ShoppingListCardSkeleton.vue";
import OverviewStatisticsBar from "@/components/OverviewStatisticsBar.vue";
import { getDaysSinceBought } from "@/utils/item-utils";

// Update items when household is updated
const emitter = inject("emitter");
onMounted(() => {
  updateItems();
  emitter.on("household-updated", updateItems);
});

onUnmounted(() => {
  emitter.off("household-updated", updateItems);
});

// Define APIs
const inventoryApi = new InventoryApi();
const shoppingListApi = new ShoppingListApi();

// Defines stores
const householdStore = useHouseholdStore();

// Define refs
const useItemDialogVisible = ref(false);

// Dialog refs
// The item that is currently selected with the dialog open.
const dialogItem = ref<Item | null>(null);
const dialogAmount = ref<number | null>(null);
const dialogReAdd = ref(false);

const items = ref<Item[] | null>(null);
const error = ref<Error | null>(null);

// Define computed values
const isLoading = computed(() => items.value === null && error.value === null);

// Define callbacks
function extendItem(item: Item) {
  let householdId = householdStore.household.id;
  if (!householdId) {
    showError("Ingen hjem valgt.", "Velg et hjem for å slette et element.", 15000);
    return;
  }

  let boughtDate = item.bought?.split("T")[0];
  let today = new Date().toISOString().split("T")[0];

  if (boughtDate === today) {
    showError("Kan ikke forlenge.", "Du kan ikke forlenge en vare som ble kjøpt i dag.", 8000);
    return;
  }

  inventoryApi
    .updateInventoryItem(householdId, {
      itemId: item.id,
      state: item.state || ItemState.INVENTORY,
      remaining: item.remaining,
    })
    .then(() => {
      ElMessage({
        message: `Varigheten til ${item.type?.name} ble forlenget.`,
        type: "success",
      });
      if (item) {
        item.lastChanged = new Date().toISOString();
      }
    })
    .catch(handleError);
}

function deleteItem(item: Item) {
  let householdId = householdStore.household.id;
  if (!householdId) {
    showError("Ingen hjem valgt.", "Velg et hjem for å slette et element.", 15000);
    return;
  }

  inventoryApi
    .deleteInventoryItem(householdId, item.id!)
    .then(() => {
      removeItemClientSide(item);
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

      dialogItem.value = null;
      useItemDialogVisible.value = false;
    })
    .catch(handleError);

  if (dialogReAdd.value) {
    let newShoppingListEntry: CreateShoppingListEntry = {
      itemTypeId: item.type!.id,
      count: 1,
      suggested: !householdStore.isSuperuser(),
    };
    shoppingListApi
      .addItem(houseHoldId, newShoppingListEntry)
      .catch(() => handleError(new Error("Kunne ikke legge til element i handlelisten på nytt.")));
  }
}

const dangerPercentage = ref(0);
const warningPercentage = ref(0);
const successPercentage = ref(0);

function updateItems() {
  let householdId = getHouseholdId();
  if (householdId == null) {
    items.value = null;
    return;
  }

  let totalDanger = 0;
  let totalWarning = 0;
  let totalSuccess = 0;
  // Load inventory items
  inventoryApi
    .getInventoryItems(householdId)
    .then((response) => response.data)
    .then((data) => {
      items.value = data;
      items.value.forEach((item) => {
        if (getDaysSinceBought(item) > 14) {
          totalDanger += 1;
        } else if (getDaysSinceBought(item) > 7) {
          totalWarning += 1;
        } else {
          totalSuccess += 1;
        }
      });
      dangerPercentage.value = (totalDanger / items.value.length) * 100;
      warningPercentage.value = (totalWarning / items.value.length) * 100;
      successPercentage.value = (totalSuccess / items.value.length) * 100;
    })
    .catch((err) => {
      items.value = null;
      handleError(err);
    });
}

function removeItemClientSide(item: Item) {
  if (!items.value) return;
  if (!items.value.map((i) => i.id).includes(item.id)) return;

  let newItems = items.value?.filter((i) => i.id !== item.id);
  if (!newItems) return;

  items.value = !newItems.length ? [] : newItems;
}

function getHouseholdId(): number | null {
  let householdId = householdStore.household?.id;

  if (!householdId) {
    error.value = new Error("No household id was selected. Can not fetch inventory items.");
    showError("Ingen hjem valgt.", "Velg et hjem for å se inventaret til hjemmet.", 15000);
    return null;
  }
  return householdId;
}

function handleError(err: any) {
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
</script>

<style scoped>
.inventory-items-list {
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-y: auto;
}

.amount-selection-row {
  display: flex;
  justify-content: center;
  margin-top: 5px;
}

.re-add {
  margin-top: 25px;
  margin-left: 10px;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 5px;
}
</style>

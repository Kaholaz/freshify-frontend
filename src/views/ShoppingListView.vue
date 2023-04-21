<template>
  <h1 style="font-size: 60px">Handleliste</h1>
  <el-card style="margin-bottom: 1rem">
    <h1>Legg til ny vare</h1>
    <el-row>
      <el-select v-model="newItem.type" style="width: 10rem">
        <el-option
          v-for="type in itemTypes"
          :key="type.id"
          :label="type.name"
          :value="type"
        ></el-option>
      </el-select>
      <el-input
        placeholder="antall"
        style="max-width: 5rem; margin-left: 1rem"
        v-model="newItem.count"
        type="number"
      />
      <div class="spacer" />
      <el-button type="success" @click="addNewItem(newItem)">legg til</el-button>
    </el-row>
  </el-card>
  <el-collapse v-model="drawers">
    <el-collapse-item name="active">
      <template #title>
        <el-text>Varer</el-text>
      </template>
      <div v-if="activeItems.size">
        <ShoppingListCard
          @click="handleClickCheckbox(item)"
          v-for="item in Array.from(activeItems.values()).reverse()"
          :item="item"
          :key="item.id"
        ></ShoppingListCard>
      </div>
      <div v-else>
        <el-alert title="Det er ingen varer i handlelista" type="info" center />
      </div>
    </el-collapse-item>
    <el-collapse-item name="requested">
      <template #title>
        <el-text>Foreslåtte varer</el-text>
      </template>
      <div v-if="requestedItems.size">
        <el-row class="divider-row">
          <div style="flex-grow: 1"></div>
          <el-button @click="acceptAllSuggestions" type="success" plain>Godta alle</el-button>
          <el-button @click="declineAllSuggestions" type="danger" plain>Avslå alle</el-button>
        </el-row>
        <ShoppingListCard
          @click="handleClickCheckbox(item)"
          @accept="acceptSuggestion(item)"
          @decline="acceptSuggestion(item)"
          v-for="item in Array.from(requestedItems.values()).reverse()"
          :item="item"
          :key="item.id"
        ></ShoppingListCard>
      </div>
      <div v-else>
        <el-alert title="Det er ingen forespurte varer" type="info" center />
      </div>
    </el-collapse-item>
    <el-collapse-item name="bought">
      <template #title>
        <el-text>Kjøpte varer</el-text>
      </template>
      <div v-if="boughtItems.size">
        <el-row class="divider-row">
          <div style="flex-grow: 1"></div>
          <el-button @click="completeShopping" type="primary" plain>Avslutt handel</el-button>
        </el-row>
        <ShoppingListCard
          @click="handleClickCheckbox(item)"
          v-for="item in Array.from(boughtItems.values()).reverse()"
          :item="item"
          :key="item.id"
        ></ShoppingListCard>
      </div>
      <div v-else>
        <el-alert title="Husholdningen har ingen kjøpte varer" type="info" center />
      </div>
    </el-collapse-item>
  </el-collapse>
</template>
<script setup lang="ts">
import ShoppingListCard from "@/components/ShoppingListCard.vue";
import type { ItemType, ShoppingListEntry, UserFull } from "@/services";
import { ref } from "vue";
import { ElMessage } from "element-plus";

const itemTypes = [
  {
    name: "Melk",
    id: 0,
  } as ItemType,
  {
    name: "Sjokolade",
    id: 1,
  } as ItemType,
];

const drawers = ref(["active", "requested", "bought"] as string[]);

const newItem = ref({
  type: itemTypes[1],
  count: undefined,
  checked: false,
  suggested: false,
  addedBy: { id: 3, firstName: "Arunan" } as UserFull,
} as ShoppingListEntry);

const activeItems = ref(new Map() as Map<string, ShoppingListEntry>);
const requestedItems = ref(new Map() as Map<string, ShoppingListEntry>);
const boughtItems = ref(new Map() as Map<string, ShoppingListEntry>);

addItem({
  type: { name: "Melk", id: 0 },
  count: 1,
  checked: false,
  suggested: false,
  addedBy: { id: 0, firstName: "Sebastian" } as UserFull,
  id: 0,
} as ShoppingListEntry);

addItem({
  type: { name: "Melk", id: 0 },
  count: 1,
  checked: false,
  suggested: true,
  addedBy: { id: 1, firstName: "Eric" } as UserFull,
  id: 1,
});

function addItem(item: ShoppingListEntry) {
  if (item.suggested) {
    requestedItems.value.set(itemToKey(item), item);
  } else if (!item.checked) {
    activeItems.value.set(itemToKey(item), item);
  } else {
    boughtItems.value.set(itemToKey(item), item);
  }
}

function addNewItem(item: ShoppingListEntry) {
  item.count = parseInt(item.count);
  console.log(item.count);
  if (checkIfExistsAndUpdateCount(item, activeItems.value, item.count)) {
    ElMessage({
      message: "Vare har blitt oppdatert",
      type: "info",
    });
  } else if (checkIfExistsAndUpdateCount(item, requestedItems.value, item.count)) {
    ElMessage({
      message: "Foreslåtte vare har blitt oppdatert",
      type: "info",
    });
  } else {
    console.log("new item");
    activeItems.value.set(itemToKey(item), {
      ...item,
    });
  }
}

function handleClickCheckbox(item: ShoppingListEntry) {
  if (item.checked) {
    item.checked = false;
    boughtItems.value.delete(itemToKey(item));
    if (checkIfExistsAndUpdateCount(item, activeItems.value, item.count)) {
      ElMessage({
        message: "Vare har blitt oppdatert",
        type: "info",
      });
    } else {
      activeItems.value.set(itemToKey(item), item);
    }
    return;
  }
  item.checked = true;
  activeItems.value.delete(itemToKey(item));
  if (!checkIfExistsAndUpdateCount(item, boughtItems.value, item.count)) {
    boughtItems.value.set(itemToKey(item), item);
  }
}

function acceptSuggestion(item: ShoppingListEntry) {
  item.suggested = false;
  requestedItems.value.delete(itemToKey(item));
  activeItems.value.set(itemToKey(item), item);
  console.log("accept suggestion");
}

function declineSuggestion(item: ShoppingListEntry) {
  requestedItems.value.delete(itemToKey(item));
  console.log("decline suggestion");
}

function acceptAllSuggestions() {
  for (let item of requestedItems.value.values()) {
    acceptSuggestion(item);
  }
}

function declineAllSuggestions() {
  for (let item of requestedItems.value.values()) {
    declineSuggestion(item);
  }
}

function completeShopping() {
  console.log("complete shopping");
  boughtItems.value.clear();
}

function itemToKey(item: ShoppingListEntry) {
  return JSON.stringify({ type: item.type?.id, addedBy: item.addedBy?.id });
}

function checkIfExistsAndUpdateCount(
  item: ShoppingListEntry,
  map: Map<string, ShoppingListEntry>,
  count: number
) {
  if (map.has(itemToKey(item))) {
    let previousItem = map.get(itemToKey(item));
    previousItem.count += count;
    map.set(itemToKey(item), previousItem);
    return true;
  }
  return false;
}
</script>
<style scoped>
.divider-row {
  margin-top: 0;
  margin-bottom: 1rem;
}
</style>

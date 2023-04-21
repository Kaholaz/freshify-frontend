<template>
  <h1 style="font-size: 60px">Handleliste</h1>
  <el-card>
    <h1>Legg til ny vare</h1>
    <el-row>
      <el-select v-model="newItem.type">
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
  <el-divider />
  <ShoppingListCard
    @click="handleClickCheckbox(item)"
    v-for="item in Array.from(activeItems.values()).reverse()"
    :item="item"
    :key="item.id"
  ></ShoppingListCard>
  <el-divider />
  <el-row class="divider-row">
    <el-text>Foreslåtte varer</el-text>
    <div style="flex-grow: 1"></div>
    <el-button type="success" plain>Godta alle</el-button>
    <el-button type="danger" plain>Avslå alle</el-button>
  </el-row>
  <ShoppingListCard
    @click="handleClickCheckbox(item)"
    v-for="item in Array.from(requestedItems.values()).reverse()"
    :item="item"
    :key="item.id"
  ></ShoppingListCard>
  <el-divider />
  <el-row class="divider-row">
    <el-text>Kjøpte varer</el-text>
    <div style="flex-grow: 1"></div>
    <el-button type="primary" plain>Avslutt handel</el-button>
  </el-row>
  <ShoppingListCard
    @click="handleClickCheckbox(item)"
    v-for="item in Array.from(boughtItems.values()).reverse()"
    :item="item"
    :key="item.id"
  ></ShoppingListCard>
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

function itemToKey(item: ShoppingListEntry) {
  return JSON.stringify({ type: item.type?.id, addedBy: item.addedBy?.id });
}

function addItem(item: ShoppingListEntry) {
  if (item.suggested) {
    requestedItems.value.set(itemToKey(item), item);
  } else if (!item.checked) {
    activeItems.value.set(itemToKey(item), item);
  } else {
    boughtItems.value.set(itemToKey(item), item);
  }
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
</script>
<style scoped>
.divider-row {
  margin-top: 0;
  margin-bottom: 1rem;
}
</style>

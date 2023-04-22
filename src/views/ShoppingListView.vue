<template>
  <h1 style="font-size: 60px">Handleliste</h1>
  <el-card style="margin-bottom: 1rem">
    <h5>Legg til ny vare</h5>
    <el-form
      ref="ruleFormRef"
      inline
      style="margin-top: 0.5rem"
      :model="newItem"
      :rules="validationRules"
      status-icon
    >
      <el-row>
        <el-form-item label="Vare" prop="itemTypeId" required>
          <el-autocomplete
            v-model="itemTypeAutocomplete"
            :fetch-suggestions="querySearch"
            value-key="name"
            :debounce="300"
            @select="newItem.itemTypeId = $event.id"
            @change="newItem.itemTypeId = undefined"
            placeholder="Vare"
            fit-input-width
          />
        </el-form-item>
        <el-form-item label="Antall" prop="count" required>
          <el-input placeholder="Antall" v-model="newItem.count" type="number" />
        </el-form-item>
        <div class="spacer" />
        <el-button type="primary" @click="validateAndAddNewItem(newItem)">legg til</el-button>
      </el-row>
    </el-form>
  </el-card>
  <el-collapse v-model="drawers">
    <el-collapse-item name="active">
      <template #title>
        <el-text>Varer</el-text>
      </template>
      <div v-if="activeItems.size">
        <ShoppingListCard
          @click="handleClickCheckbox(item)"
          @delete="deleteItem(item)"
          v-for="item in Array.from(activeItems.values()).reverse()"
          :item="item"
          :key="item.id"
        ></ShoppingListCard>
      </div>
      <div v-else>
        <el-alert title="Det er ingen varer i handlelista" type="info" center :closable="false" />
      </div>
    </el-collapse-item>
    <el-collapse-item name="requested">
      <template #title>
        <el-text>Foreslåtte varer</el-text>
      </template>
      <div v-if="requestedItems.size">
        <el-row class="divider-row">
          <div style="flex-grow: 1"></div>
          <el-popconfirm @confirm="acceptAllSuggestions" title="Godkjenn alle varer">
            <template #reference>
              <el-button type="success" plain>Godta alle</el-button>
            </template>
          </el-popconfirm>
          <el-popconfirm @confirm="declineAllSuggestions" title="Slett alle varer">
            <template #reference>
              <el-button type="danger" plain>Avslå alle</el-button>
            </template>
          </el-popconfirm>
        </el-row>
        <ShoppingListCard
          @click="handleClickCheckbox(item)"
          @accept="acceptSuggestion(item)"
          @delete="deleteItem(item)"
          v-for="item in Array.from(requestedItems.values()).reverse()"
          :item="item"
          :key="item.id"
        ></ShoppingListCard>
      </div>
      <div v-else>
        <el-alert title="Det er ingen forespurte varer" type="info" center :closable="false" />
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
          @delete="deleteItem(item)"
          v-for="item in Array.from(boughtItems.values()).reverse()"
          :item="item"
          :key="item.id"
        ></ShoppingListCard>
      </div>
      <div v-else>
        <el-alert
          title="Husholdningen har ingen kjøpte varer"
          type="info"
          center
          :closable="false"
        />
      </div>
    </el-collapse-item>
  </el-collapse>
</template>
<script setup lang="ts">
import ShoppingListCard from "@/components/ShoppingListCard.vue";
import type {
  CreateShoppingListEntry,
  ItemType,
  ShoppinglistBuyBody,
  ShoppingListEntry,
  UpdateShoppingListEntry,
  UserFull,
} from "@/services";
import { ref } from "vue";
import { ElMessage, FormInstance } from "element-plus";
import { ItemTypeApi, ShoppingListApi } from "@/services/index";

const itemTypes = ref([] as ItemType[]);

const drawers = ref(["active", "requested", "bought"] as string[]);

const ruleFormRef = ref<FormInstance>();
const newItem = ref({
  itemTypeId: undefined,
  count: undefined,
  suggested: false,
} as CreateShoppingListEntry);

const validationRules = ref({
  itemTypeId: [
    {
      required: true,
      message: "Vare må velges",
      trigger: "blur",
    },
  ],
  count: [
    {
      required: true,
      message: "Antall må velges",
      trigger: "blur",
    },
    {
      validator: (rule: any, value: any, callback: any) => {
        if (value <= 0) {
          callback(new Error("Antall må være større enn 0"));
        } else {
          callback();
        }
      },
      message: "Antall må være større enn 0",
      trigger: "change",
    },
  ],
});

const activeItems = ref(new Map() as Map<string, ShoppingListEntry>);
const requestedItems = ref(new Map() as Map<string, ShoppingListEntry>);
const boughtItems = ref(new Map() as Map<string, ShoppingListEntry>);

const shoppingListApi = new ShoppingListApi();
const itemTypesApi = new ItemTypeApi();
const testHouseholdId = -7165074982418084000;
const itemTypeAutocomplete = ref(null as any);

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

shoppingListApi.getShoppingList(testHouseholdId).then((response) => {
  response.data.forEach((item) => {
    addItem(item);
  });
});

itemTypesApi.searchItemTypes("").then((response) => {
  itemTypes.value = response.data;
});

async function querySearch(queryString: string, cb: any) {
  const results = await itemTypesApi.searchItemTypes(queryString).then((response) => {
    return response.data;
  });
  cb(results);
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

async function updateItem(item: ShoppingListEntry, showSuccessMessage = true) {
  const updateItem = {
    itemTypeId: item.type?.id,
    count: item.count,
    suggested: item.suggested,
    checked: item.checked,
  } as UpdateShoppingListEntry;
  return shoppingListApi
    .updateShoppingListEntry(testHouseholdId, updateItem)
    .then(() => {
      if (showSuccessMessage) {
        ElMessage({
          message: `Vare ${item.type?.name} har blitt oppdatert`,
          type: "info",
        });
      }
      updateCountIfExists(item, item.count);
      return true;
    })
    .catch(() => {
      ElMessage({
        message: "Vare kunne ikke bli oppdatert",
        type: "error",
      });
      return false;
    });
}

function saveItem(item: CreateShoppingListEntry) {
  return shoppingListApi
    .addItem(testHouseholdId, item)
    .then((response) => {
      ElMessage({
        message: "Vare har blitt oppdatert",
        type: "info",
      });
      addItem(response.data);
    })
    .catch(() => {
      ElMessage({
        message: "En feil oppstod ved lagring av vare",
        type: "error",
      });
    });
}

function deleteLocalItem(item: ShoppingListEntry) {
  if (item.suggested) {
    requestedItems.value.delete(itemToKey(item));
  } else if (!item.checked) {
    activeItems.value.delete(itemToKey(item));
  } else {
    boughtItems.value.delete(itemToKey(item));
  }
}

function deleteItem(item: ShoppingListEntry, showSuccessMessage = true) {
  return shoppingListApi
    .deleteShoppingListEntry(testHouseholdId, item.id)
    .then(() => {
      if (showSuccessMessage) {
        ElMessage({
          message: `Vare ${item.type?.name} har blitt slettet`,
          type: "success",
        });
      }
      deleteLocalItem(item);
      return true;
    })
    .catch(() => {
      ElMessage({
        message: "Vare kunne ikke bli slettet",
        type: "error",
      });
      return false;
    });
}

async function deleteAndMoveItemChecked(item: ShoppingListEntry, checked: boolean) {
  const map = checked ? activeItems.value : boughtItems.value;
  const reverseMap = checked ? boughtItems.value : activeItems.value;
  const cloneItem = { ...item };
  cloneItem.checked = checked;

  if (map.has(itemToKey(cloneItem))) {
    if (await updateItem(cloneItem, false)) {
      deleteLocalItem(item);
      reverseMap.set(itemToKey(cloneItem), cloneItem);
    }
  }
  const drawer = checked ? "active" : "bought";
  if (reverseMap.size == 0 && !drawers.value.includes(drawer)) {
    drawers.value.push(drawer);
  }
}

function validateAndAddNewItem(item: CreateShoppingListEntry) {
  if (!ruleFormRef.value) return;
  ruleFormRef.value.validate((valid) => {
    if (valid) {
      addNewItem(item);
    }
  });
}

function addNewItem(item: CreateShoppingListEntry) {
  item.count = parseInt(item.count);
  console.log(item.count);
  if (activeItems.value.size === 0 && activeItems.value.size === 0) {
    drawers.value.push("active");
  }
  if (activeItems.value.has(itemToKey(item))) {
    updateItem(item);
    return;
  }
  if (requestedItems.value.has(itemToKey(item))) {
    updateItem(item);
    return;
  }
  saveItem(item);
}

async function handleClickCheckbox(item: ShoppingListEntry) {
  if (item.checked) {
    await deleteAndMoveItemChecked(item, false);
  } else {
    await deleteAndMoveItemChecked(item, true);
  }
}

function acceptSuggestion(item: ShoppingListEntry, showSuccessMessage = true) {
  if (activeItems.value.size == 0 && !drawers.value.includes("active")) {
    drawers.value.push("active");
  }
  const cloneItem = { ...item };
  cloneItem.suggested = false;
  return shoppingListApi
    .updateShoppingListEntry(testHouseholdId, {
      id: cloneItem.id,
      count: cloneItem.count,
      suggested: cloneItem.suggested,
      checked: cloneItem.checked,
    })
    .then(() => {
      requestedItems.value.delete(itemToKey(item));
      if (!updateCountIfExists(cloneItem, cloneItem.count)) {
        activeItems.value.set(itemToKey(cloneItem), cloneItem);
      }
      if (showSuccessMessage) {
        ElMessage({
          message: `${cloneItem.type?.name} har blitt lagt til i handlelisten`,
          type: "success",
        });
      }
      return true;
    })
    .catch(() => {
      ElMessage({
        message: "En feil oppstod ved godkjenning av vare",
        type: "error",
      });
      return false;
    });
}

async function acceptAllSuggestions() {
  for (const item of requestedItems.value.values()) {
    if (!(await acceptSuggestion(item, false))) {
      console.log(await acceptSuggestion(item, false));
      console.log("accept all suggestions failed");
      return;
    }
  }

  ElMessage({
    message: "Alle foreslåtte varer har blitt lagt til i handlelisten",
    type: "success",
  });
}

async function declineAllSuggestions() {
  for (const item of requestedItems.value.values()) {
    if (!(await deleteItem(item, false))) {
      return;
    }
  }
  ElMessage({
    message: "Alle foreslåtte varer har blitt fjernet fra handlelisten",
    type: "success",
  });
}

function completeShopping() {
  shoppingListApi
    .markItemsAsBought(testHouseholdId, {
      listEntryIds: Array.from(boughtItems.value.values()).map((item) => item.id),
    } as ShoppinglistBuyBody)
    .then(() => {
      ElMessage({
        message: "Handel fullført",
        type: "success",
      });
      boughtItems.value.clear();
    })
    .catch(() => {
      ElMessage({
        message: "En feil oppstod ved avslutning av handleliste",
        type: "error",
      });
    });
}

function itemToKey(item: ShoppingListEntry) {
  return JSON.stringify({ type: item.type?.id, addedBy: item.addedBy?.id });
}

function updateCountIfExists(item: ShoppingListEntry, count: number | undefined) {
  let map = null;
  if (item.suggested) {
    map = requestedItems.value;
  } else if (!item.checked) {
    map = activeItems.value;
  } else {
    map = boughtItems.value;
  }
  if (map.has(itemToKey(item))) {
    let previousItem = map.get(itemToKey(item));
    previousItem.count += count;
    map.set(itemToKey(item), previousItem);
    return item;
  }
  return null;
}
</script>
<style scoped>
.divider-row {
  margin-top: 0;
  margin-bottom: 1rem;
}
</style>

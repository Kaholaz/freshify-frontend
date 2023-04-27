<template>
  <NavigationWindow>
    <div>
      <h1>Handleliste</h1>
      <el-card v-loading="loadingSubmit" style="margin-bottom: 1rem">
        <h5>Legg til ny vare</h5>
        <el-form
          ref="ruleFormRef"
          :model="newItem"
          :rules="validationRules"
          inline
          label-position="left"
          label-width="70px"
          style="margin-top: 0.5rem"
        >
          <el-row>
            <el-form-item label="Vare" prop="itemTypeId" required>
              <el-autocomplete
                v-model="itemTypeAutocomplete"
                :debounce="300"
                :fetch-suggestions="searchItemType"
                fit-input-width
                placeholder="Vare"
                value-key="name"
                @change="newItem.itemTypeId = undefined"
                @select="newItem.itemTypeId = $event.id"
              />
            </el-form-item>
            <el-form-item label="Antall" prop="count" required>
              <el-input v-model="newItem.count" placeholder="Antall" type="number" />
            </el-form-item>
            <div class="spacer"></div>
            <el-form-item style="margin-right: 0">
              <el-button type="primary" @click="validateAndAddNewItem(newItem)">legg til</el-button>
            </el-form-item>
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
              v-for="item in Array.from(activeItems.values())
                .sort((a, b) => a.type.name.localeCompare(b.type.name))
                .reverse()"
              :key="item.id"
              :item="item"
              @click="handleClickCheckbox(item)"
              @delete="deleteItem(item)"
            ></ShoppingListCard>
          </div>
          <div v-else-if="loading == true">
            <ShoppingListCardSkeleton></ShoppingListCardSkeleton>
          </div>
          <div v-else-if="loading == false && !activeItems.size">
            <el-alert
              :closable="false"
              center
              title="Det er ingen varer i handlelista"
              type="info"
            />
          </div>
        </el-collapse-item>
        <el-collapse-item name="requested">
          <template #title>
            <el-text>Foreslåtte varer</el-text>
          </template>
          <div v-if="suggestedItems.size">
            <el-row class="divider-row">
              <div style="flex-grow: 1"></div>
              <el-popconfirm
                v-if="houseHoldStore.getHouseholdMemberType() === HouseholdUserType.SUPERUSER"
                title="Godkjenn alle varer"
                @confirm="acceptAllSuggestions"
              >
                <template #reference>
                  <el-button plain type="success">Godta alle</el-button>
                </template>
              </el-popconfirm>
              <el-popconfirm
                v-if="houseHoldStore.getHouseholdMemberType() === HouseholdUserType.SUPERUSER"
                title="Slett alle varer"
                @confirm="declineAllSuggestions"
              >
                <template #reference>
                  <el-button plain type="danger">Avslå alle</el-button>
                </template>
              </el-popconfirm>
            </el-row>
            <ShoppingListCard
              v-for="item in Array.from(suggestedItems.values())
                .sort((a, b) => a.type.name.localeCompare(b.type.name))
                .reverse()"
              :key="item.id"
              :item="item"
              @accept="acceptSuggestion(item)"
              @click="handleClickCheckbox(item)"
              @delete="deleteItem(item)"
            ></ShoppingListCard>
          </div>
          <div v-else-if="loading == true">
            <ShoppingListCardSkeleton></ShoppingListCardSkeleton>
          </div>
          <div v-else-if="loading == false && !suggestedItems.size">
            <el-alert :closable="false" center title="Det er ingen forespurte varer" type="info" />
          </div>
        </el-collapse-item>
        <el-collapse-item name="bought">
          <template #title>
            <el-text>Kjøpte varer</el-text>
          </template>
          <div v-if="boughtItems.size">
            <el-row class="divider-row">
              <div style="flex-grow: 1"></div>
              <el-button plain type="primary" @click="completeShopping">Avslutt handel</el-button>
            </el-row>
            <ShoppingListCard
              v-for="item in Array.from(boughtItems.values())
                .sort((a, b) => a.type.name.localeCompare(b.type.name))
                .reverse()"
              :key="item.id"
              :item="item"
              @click="handleClickCheckbox(item)"
              @delete="deleteItem(item)"
            ></ShoppingListCard>
          </div>
          <div v-else-if="loading == true">
            <ShoppingListCardSkeleton></ShoppingListCardSkeleton>
          </div>
          <div v-else-if="loading == false && !boughtItems.size">
            <el-alert
              :closable="false"
              center
              title="Husholdningen har ingen kjøpte varer"
              type="info"
            />
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </NavigationWindow>
</template>

<script lang="ts" setup>
import ShoppingListCard from "@/components/ShoppingListCard.vue";
import type {
  CreateShoppingListEntry,
  ShoppingListEntry,
  UpdateShoppingListEntry,
} from "@/services";
import { HouseholdUserType } from "@/services/index";
import { inject, Ref, ref } from "vue";
import { ElMessage, ElNotification, FormInstance } from "element-plus";
import { HouseholdApi, ItemTypeApi, ShoppingListApi } from "@/services/index";
import ShoppingListCardSkeleton from "@/components/ShoppingListCardSkeleton.vue";
import { useHouseholdStore } from "@/stores/household";
import { useSessionStore } from "@/stores/session";
import { showError } from "@/utils/error-utils";

import NavigationWindow from "@/components/NavigationWindow.vue";

const drawers = ref(["active", "requested", "bought"] as string[]);

const ruleFormRef = ref<FormInstance>();

const newItem = ref({
  itemTypeId: undefined,
  count: 1,
  suggested: false,
} as CreateShoppingListEntry);

const validationRules = ref({
  itemTypeId: [
    {
      required: true,
      message: "Vare må velges",
      trigger: "submit",
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
        if (value < 1) {
          callback(new Error());
        } else {
          callback();
        }
      },
      message: "Antall må være større enn 0",
      trigger: "change",
    },
  ],
});

const activeItems = ref(new Map() as Map<number, ShoppingListEntry>);
const suggestedItems = ref(new Map() as Map<number, ShoppingListEntry>);
const boughtItems = ref(new Map() as Map<number, ShoppingListEntry>);

const shoppingListApi = new ShoppingListApi();
const itemTypesApi = new ItemTypeApi();

const houseHoldStore = useHouseholdStore();

const itemTypeAutocomplete = ref(null as any);
const loading = ref(undefined) as Ref<undefined | boolean>;
const loadingSubmit = ref(false);

const timeout = setTimeout(() => (loading.value = true), 100);
const emitter = inject("emitter");

emitter.on("household-updated", () => {
  getShoppingList();
});

getShoppingList();

function getShoppingList() {
  if (houseHoldStore.household?.id == null) {
    showError("Husholdning ikke valgt", "Vennligst velg en husholdning i menyen", 0);
    clearTimeout(timeout);
    loading.value = false;
    return;
  }
  shoppingListApi
    .getShoppingList(houseHoldStore.household?.id)
    .then((response) => {
      activeItems.value.clear();
      suggestedItems.value.clear();
      boughtItems.value.clear();
      response.data.forEach((item) => {
        setItemLocal(item);
      });
    })
    .catch(() => {
      showError("Noe gikk galt ved henting av handleliste", "Vennligt prøv igjen senere", 0);
    })
    .finally(() => {
      clearTimeout(timeout);
      loading.value = false;
    });
}

async function searchItemType(queryString: string, cb: any) {
  const results = await itemTypesApi.searchItemTypes(queryString).then((response) => {
    return response.data;
  });
  cb(results);
}

function validateAndAddNewItem(item: CreateShoppingListEntry) {
  if (!ruleFormRef.value) return;
  ruleFormRef.value.validate((valid) => {
    if (valid) {
      addNewItem(item);
    }
  });
}

async function addNewItem(item: CreateShoppingListEntry) {
  item.count = parseInt(item.count);
  const id = setTimeout(() => (loadingSubmit.value = true), 100);
  if (activeItems.value.size === 0 && activeItems.value.size === 0) {
    drawers.value.push("active");
  }
  await saveItem(item);
  clearTimeout(id);
  loadingSubmit.value = false;
}

async function handleClickCheckbox(item: ShoppingListEntry) {
  if (item.checked) {
    await deleteAndMoveItemChecked(item, false);
    return;
  }
  await deleteAndMoveItemChecked(item, true);
}

function acceptSuggestion(item: ShoppingListEntry, showSuccessMessage = true) {
  if (activeItems.value.size == 0 && !drawers.value.includes("active"))
    drawers.value.push("active");

  const cloneItem = { ...item };
  cloneItem.suggested = false;

  return shoppingListApi
    .updateShoppingListEntry(houseHoldStore.household.id, {
      id: cloneItem.id,
      count: cloneItem.count,
      suggested: cloneItem.suggested,
      checked: cloneItem.checked,
    })
    .then(() => {
      suggestedItems.value.delete(itemToKey(item));
      setItemLocal(cloneItem);
      if (showSuccessMessage) {
        ElMessage({
          message: `${cloneItem.type?.name} har blitt lagt til i handlelisten`,
          type: "success",
        });
      }
      return true;
    })
    .catch(() => {
      showError("En feil oppstod ved godkjenning av vare", "Vennligt prøv igjen senere", 0);
      return false;
    });
}

async function acceptAllSuggestions() {
  for (const item of suggestedItems.value.values()) {
    if (!(await acceptSuggestion(item, false))) {
      return;
    }
  }

  ElMessage({
    message: "Alle foreslåtte varer har blitt lagt til i handlelisten",
    type: "success",
  });
}

async function declineAllSuggestions() {
  for (const item of suggestedItems.value.values()) {
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
    .markItemsAsBought(houseHoldStore.household?.id)
    .then(() => {
      ElNotification({
        message: "Handleturen er avsluttet. Du finner de kjøpte varene i vareoversikten!",
        type: "success",
        duration: 5000,
      });
      boughtItems.value.clear();
    })
    .catch(() => {
      showError("En feil oppstod ved avslutning av handleliste", "Vennligt prøv igjen senere", 0);
    });
}

const householdApi = new HouseholdApi();

async function saveItem(item: CreateShoppingListEntry) {
  await householdApi.getUsers(houseHoldStore.household.id).then((response) => {
    const users = response.data;
    const user = users.find((user) => user.user.id === useSessionStore().getUser().id);
    item.suggested = user.userType !== "SUPERUSER";
  });
  return shoppingListApi
    .addItem(houseHoldStore.household.id, item)
    .then((response) => {
      ElMessage({
        message: "Var har blitt lagt til",
        type: "success",
      });
      setItemLocal(response.data);
    })
    .catch(() => {
      showError("En feil oppstod ved lagring av vare", "Vennligt prøv igjen senere", 0);
    });
}

async function updateItem(item: ShoppingListEntry, showSuccessMessage = true) {
  const updateItem = {
    id: item.id,
    itemTypeId: item.type?.id,
    count: item.count,
    suggested: item.suggested,
    checked: item.checked,
  } as UpdateShoppingListEntry;

  return shoppingListApi
    .updateShoppingListEntry(houseHoldStore.household.id, updateItem)
    .then(() => {
      if (showSuccessMessage) {
        ElMessage({
          message: `Vare ${item.type?.name} har blitt oppdatert`,
          type: "info",
        });
      }
      setItemLocal(item);
      return true;
    })
    .catch(() => {
      showError("Vare kunne ikke bli oppdatert", "Vennligt prøv igjen senere", 0);
      return false;
    });
}

function deleteItem(item: ShoppingListEntry, showSuccessMessage = true) {
  return shoppingListApi
    .deleteShoppingListEntry(houseHoldStore.household.id, item.id)
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
  const mapAddedTo = checked ? boughtItems.value : activeItems.value;
  let cloneItem = { ...item };
  cloneItem.checked = checked;

  if (await updateItem(cloneItem, false)) {
    await deleteLocalItem(item);
  }
  const drawer = checked ? "active" : "bought";
  if (mapAddedTo.size == 0 && !drawers.value.includes(drawer)) {
    drawers.value.push(drawer);
  }
}

function setItemLocal(item: ShoppingListEntry) {
  if (item.suggested) {
    suggestedItems.value.set(itemToKey(item), item);
  } else if (!item.checked) {
    activeItems.value.set(itemToKey(item), item);
  } else {
    boughtItems.value.set(itemToKey(item), item);
  }
}

function deleteLocalItem(item: ShoppingListEntry) {
  if (item.suggested) {
    suggestedItems.value.delete(itemToKey(item));
  } else if (!item.checked) {
    activeItems.value.delete(itemToKey(item));
  } else {
    boughtItems.value.delete(itemToKey(item));
  }
}

function itemToKey(item: ShoppingListEntry) {
  return item.id as number;
}
</script>
<style>
.divider-row {
  margin-bottom: 1rem;
}
</style>

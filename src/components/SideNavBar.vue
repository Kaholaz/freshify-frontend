<template>
  <el-menu :default-active="defaultActive" router @select="$emit('select')">
    <el-button
      v-if="households?.length == 0"
      style="width: calc(100% - 2rem); margin: 1rem"
      type="primary"
      @click="isCreateHousehold = true"
    >
      <el-icon>
        <HomeFilled />
      </el-icon>
      <span>Legg til husholdning</span>
    </el-button>
    <el-select
      v-else-if="households?.length > 0"
      :model-value="houseHoldStore.household.name"
      style="width: calc(100% - 2rem); margin: 1rem"
      @change="$emit('select')"
    >
      <el-option
        v-for="item in households"
        :key="item.id"
        :label="item.name"
        :value="item"
        @click="houseHoldStore.household = item"
      ></el-option>
      <el-button style="width: 100%" type="primary" @click="isCreateHousehold = true">
        <el-icon>
          <HomeFilled />
        </el-icon>
        <span>Legg til husholdning</span>
      </el-button>
    </el-select>

    <el-menu-item index="/shopping-list">
      <el-icon>
        <List />
      </el-icon>
      <span>Handleliste</span>
    </el-menu-item>
    <el-menu-item index="/inventory">
      <el-icon>
        <Management />
      </el-icon>
      <span>Oversikt</span>
    </el-menu-item>
    <el-menu-item disabled index="/statistics">
      <el-icon>
        <DataAnalysis />
      </el-icon>
      <span>Statistikk</span>
    </el-menu-item>
    <el-menu-item disabled index="/recipies">
      <el-icon>
        <Dish />
      </el-icon>
      <span>Oppskrifter</span>
    </el-menu-item>
    <el-menu-item index="/edit-household">
      <el-icon>
        <Setting />
      </el-icon>
      <span>Rediger husholdning</span>
    </el-menu-item>
  </el-menu>
  <el-dialog v-model="isCreateHousehold" show-close>
    <CreateHouseholdComponent
      v-model:household-name="newHousehold.name"
      @skip="skipCreateHousehold"
      @submit="createHousehold"
    ></CreateHouseholdComponent>
  </el-dialog>
</template>

<script lang="ts" setup>
import router from "@/router";
import { DataAnalysis, Dish, HomeFilled, List, Management, Setting } from "@element-plus/icons-vue";
import { inject, onMounted, ref } from "vue";
import { useHouseholdStore } from "@/stores/household";
import { CreateHousehold, Household, HouseholdApi } from "@/services/index";
import { useSessionStore } from "@/stores/session";
import CreateHouseholdComponent from "@/components/CreateHouseholdComponent.vue";
import { showError } from "@/utils/error-utils";

const defaultActive = ref("/");
onMounted(async () => {
  await router.isReady();
  defaultActive.value = router.currentRoute.value.path;
});

const houseHoldStore = useHouseholdStore();
const houseHoldApi = new HouseholdApi();
const sessionStore = useSessionStore();
const isCreateHousehold = ref(false);
const emitter = inject("emitter");

const households = ref(null as Household[] | null);
const newHousehold = ref({
  name: "",
} as CreateHousehold);

emitter.on("household-removed", () => {
  getHouseholds();
});

getHouseholds();

function getHouseholds() {
  let userId = sessionStore.getUser()?.id;

  // TODO: Fix error handling
  if (!userId) {
    return;
  }

  houseHoldApi.getHouseholds(userId).then((res) => {
    households.value = res.data;
    if (households.value?.length > 0 && !houseHoldStore.household?.id) {
      houseHoldStore.household = households.value[0];
    }
  });
}

function createHousehold() {
  houseHoldApi
    .createHousehold(newHousehold.value)
    .then((res) => {
      if (households.value === null) {
        households.value = [];
      }
      households.value.push(res.data);
      isCreateHousehold.value = false;
      houseHoldStore.household = res.data;
    })
    .catch(() => {
      showError("En uventet feil oppstod", "vennligst prøv igjen senere", 0);
    });
}

function skipCreateHousehold() {
  isCreateHousehold.value = false;
}
</script>

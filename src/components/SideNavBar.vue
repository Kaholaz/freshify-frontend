<template>
  <el-menu :default-active="defaultActive" class="menu" router @select="$emit('select')">
    <el-button
      v-if="houseHoldStore.households?.length == 0"
      style="width: calc(100% - 2rem); margin: 1rem"
      type="primary"
      @click="isCreateHouseholdDialog = true"
    >
      <el-icon>
        <HomeFilled />
      </el-icon>
      <span>Legg til husholdning</span>
    </el-button>
    <el-select
      v-else-if="houseHoldStore.households?.length > 0"
      :model-value="houseHoldStore.household.name"
      style="width: calc(100% - 2rem); margin: 1rem"
    >
      <el-option
        v-for="item in houseHoldStore.households"
        :key="item.id"
        :label="item.name"
        :value="item"
        @click="(houseHoldStore.household = item) && $emit('select')"
      ></el-option>
      <el-option style="padding: 0; margin-bottom: -6px" @click="isCreateHouseholdDialog = true">
        <el-button style="width: 100%" type="primary">
          <el-icon>
            <HomeFilled />
          </el-icon>
          <span>Legg til husholdning</span>
        </el-button>
      </el-option>
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
    <el-menu-item index="/statistics">
      <el-icon>
        <DataAnalysis />
      </el-icon>
      <span>Statistikk</span>
    </el-menu-item>
    <el-menu-item index="/recipes">
      <el-icon>
        <Dish />
      </el-icon>
      <span>Oppskrifter</span>
    </el-menu-item>
    <el-menu-item index="/publication">
      <el-icon>
        <Notebook />
      </el-icon>
      <span>Kundeaviser</span>
    </el-menu-item>
    <el-menu-item index="/edit-household">
      <el-icon>
        <Setting />
      </el-icon>
      <span>Rediger husholdning</span>
    </el-menu-item>
  </el-menu>
  <el-dialog v-model="isCreateHouseholdDialog" show-close style="width: 95%; max-width: 500px">
    <CreateHouseholdComponent
      v-model:household-name="newHousehold.name"
      @skip="skipCreateHousehold"
      @submit="createHousehold"
    ></CreateHouseholdComponent>
  </el-dialog>
</template>

<script lang="ts" setup>
import router from "@/router";
import {
  DataAnalysis,
  Dish,
  HomeFilled,
  List,
  Management,
  Notebook,
  Setting,
} from "@element-plus/icons-vue";
import { onMounted, ref } from "vue";
import { useHouseholdStore } from "@/stores/household";
import { CreateHousehold, HouseholdApi } from "@/services/index";
import CreateHouseholdComponent from "@/components/CreateHouseholdComponent.vue";
import { showError } from "@/utils/error-utils";

const houseHoldStore = useHouseholdStore();
const houseHoldApi = new HouseholdApi();

const defaultActive = ref("/");
const newHousehold = ref({
  name: "",
} as CreateHousehold);
const isCreateHouseholdDialog = ref(false);

onMounted(async () => {
  await router.isReady();
  defaultActive.value = router.currentRoute.value.path;
  houseHoldStore.fetchHouseholds();
});

function createHousehold() {
  houseHoldApi
    .createHousehold(newHousehold.value)
    .then((res) => {
      houseHoldStore.addHousehold(res.data);
      isCreateHouseholdDialog.value = false;
    })
    .catch(() => {
      showError("En uventet feil oppstod", "vennligst prøv igjen senere", 0);
    });
}

function skipCreateHousehold() {
  isCreateHouseholdDialog.value = false;
}
</script>

<style scoped>
.menu {
  height: 100%;
  border-right: 1px solid #ebeef5;
}
</style>

<template>
  <el-menu :default-active="defaultActive" @open="handleOpen" @close="handleClose" router>
    <el-select
      style="width: calc(100% - 2rem); margin: 1rem"
      :placeholder="household.name"
      @change="setHouseHold(household)"
      v-model="household"
      v-if="household"
    >
      <el-option
        v-for="item in households"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      ></el-option>
    </el-select>
    <el-menu-item index="/shopping-list">
      <el-icon>
        <List />
      </el-icon>
      <span>Handleliste</span>
    </el-menu-item>
    <el-menu-item index="/">
      <el-icon>
        <Management />
      </el-icon>
      <span>Oversikt</span>
    </el-menu-item>
    <el-menu-item index="/statistics" disabled>
      <el-icon>
        <DataAnalysis />
      </el-icon>
      <span>Statistikk</span>
    </el-menu-item>
    <el-menu-item index="/recipies" disabled>
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
</template>

<script lang="ts" setup>
import router from "@/router";
import { DataAnalysis, Dish, HomeFilled, List, Management, Setting } from "@element-plus/icons-vue";
import { onMounted, ref } from "vue";
import { useHouseholdStore } from "@/stores/household";
import { Household, HouseholdApi } from "@/services/index";
import { useSessionStore } from "@/stores/session";

const defaultActive = ref("/");
onMounted(async () => {
  await router.isReady();
  defaultActive.value = router.currentRoute.value.path;
  console.log(defaultActive.value);
});

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};

const houseHoldStore = useHouseholdStore();
const houseHoldApi = new HouseholdApi();
const sessionStore = useSessionStore();

const households = ref([]);
const household = ref(houseHoldStore.getHousehold());

houseHoldApi.getHouseholds(10).then((res) => {
  households.value = res.data;
  if (household.value == null) {
    setHouseHold(res.data[0]);
    household.value = res.data[0];
  }
});

function setHouseHold(val: Household) {
  houseHoldStore.setHousehold(val);
}
</script>

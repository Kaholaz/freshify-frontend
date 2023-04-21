<template>
  <el-menu :default-active="defaultActive" @open="handleOpen" @close="handleClose" router>
    <el-sub-menu>
      <template #title>
        <el-icon>
          <HomeFilled />
        </el-icon>
        <span>Husholding</span>
      </template>
      <el-menu-item v-for="household in households" :key="household.id" :index="`${household.id}`">
        {{ household.name }}
      </el-menu-item>
    </el-sub-menu>
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

const defaultActive = ref("/");
onMounted(async () => {
  await router.isReady();
  defaultActive.value = router.currentRoute.value.path;
  console.log(defaultActive.value);
});

import {
  DataAnalysis,
  Dish,
  HomeFilled,
  House,
  List,
  Location,
  Management,
  Setting,
} from "@element-plus/icons-vue";
import { onMounted, ref } from "vue";

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};

const households = [
  {
    id: 1,
    name: "Hjemme",
  },
  {
    id: 2,
    name: "Arbeid",
  },
];
</script>

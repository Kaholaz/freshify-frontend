<template>
  <el-menu default-active="2" @open="handleOpen" @close="handleClose">
    <el-sub-menu>
      <template #title>
        <el-icon>
          <HomeFilled />
        </el-icon>
        <span>Husholding</span>
      </template>
      <el-menu-item
        v-for="household in households"
        :key="household.id"
        :index="`1-${household.id}`"
      >
        {{ household.name }}
      </el-menu-item>
    </el-sub-menu>
    <el-menu-item index="1">
      <el-icon>
        <List />
      </el-icon>
      <span>Handleliste</span>
    </el-menu-item>
    <el-menu-item index="2">
      <el-icon>
        <Management />
      </el-icon>
      <span>Oversikt</span>
    </el-menu-item>
    <el-menu-item index="3" disabled>
      <el-icon>
        <DataAnalysis />
      </el-icon>
      <span>Statistikk</span>
    </el-menu-item>
    <el-menu-item index="4" disabled>
      <el-icon>
        <Dish />
      </el-icon>
      <span>Oppskrifter</span>
    </el-menu-item>
    <el-menu-item index="5">
      <el-icon>
        <Setting />
      </el-icon>
      <span>Rediger husholdning</span>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
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

<script setup lang="ts">
import { RouterView } from "vue-router";
import SideNavBar from "@/components/SideNavBar.vue";
import TopNavBar from "@/components/TopNavBar.vue";
</script>

<template>
  <el-container>
    <el-header>
      <TopNavBar />
    </el-header>
    <el-container>
      <el-aside width="300px">
        <SideNavBar />
      </el-aside>
      <el-main>
        <RouterView />
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped></style>

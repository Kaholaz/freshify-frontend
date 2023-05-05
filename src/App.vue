<script lang="ts" setup>
import { computed, inject, onMounted, ref } from "vue";
import { Expand } from "@element-plus/icons-vue";
import { useToggle } from "@vueuse/core";
import { RouterView } from "vue-router";
import router from "@/router";

import SideNavBar from "@/components/SideNavBar.vue";
import TopNavBar from "@/components/TopNavBar.vue";

const windowSize = ref(window.innerWidth);

onMounted(() => {
  window.addEventListener("resize", () => {
    windowSize.value = window.innerWidth;
  });
});

const collapsed = computed(() => {
  return windowSize.value < 768;
});

const [drawer, drawerToggle] = useToggle();

const isFullScreen = computed(() => {
  console.log("mo");
  console.log(router.currentRoute.value.meta?.fullsScreen);
  if (router.currentRoute.value.meta?.fullScreen === undefined) return true;
  return router.currentRoute.value.meta?.fullScreen;
});

const emitter = inject("emitter");
function onScroll(event: Event) {
  emitter.emit("scroll", event);
}
</script>

<template>
  <el-container style="height: 100vh; display: flex">
    <el-header style="padding: 0">
      <TopNavBar />
    </el-header>
    <div v-if="collapsed" style="flex-shrink: 0; height: fit-content">
      <el-menu v-if="!isFullScreen" style="--el-menu-hover-bg-color: var(--el-menu-bg-color)">
        <el-menu-item>
          <el-button @click="drawerToggle()">
            <el-icon>
              <Expand />
            </el-icon>
            Meny
          </el-button>
        </el-menu-item>
      </el-menu>
    </div>
    <el-container>
      <el-aside v-if="!collapsed && !isFullScreen" width="300px">
        <SideNavBar />
      </el-aside>
      <el-drawer v-else-if="collapsed" v-model="drawer" direction="ltr" size="306px">
        <SideNavBar @select="drawerToggle()" />
      </el-drawer>
      <el-scrollbar style="width: 100%" @scroll="onScroll($event)">
        <el-main>
          <RouterView id="main-view" />
        </el-main>
      </el-scrollbar>
    </el-container>
  </el-container>
</template>

<style scoped>
/* Prevent scrolling on anything but router view */
* {
  overflow: hidden;
}

#main-view * {
  overflow: auto;
}
</style>

<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
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

const isFullScreen = computed(() => router.currentRoute.value.meta?.fullScreen);
</script>

<template>
  <el-container style="height: 100vh; display: flex">
    <el-header>
      <TopNavBar @menu="drawerToggle()" />
    </el-header>
    <div v-if="collapsed">
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
        <SideNavBar class="sidenav" />
      </el-aside>
      <el-drawer v-model="drawer" direction="ltr" size="306px">
        <SideNavBar class="sidenav" @select="drawerToggle()" />
      </el-drawer>
      <el-scrollbar style="width: 100%">
        <el-main>
          <RouterView />
        </el-main>
      </el-scrollbar>
    </el-container>
  </el-container>
</template>

<style scoped>
.sidenav {
  height: 100%;
}
</style>

<script setup lang="ts">
import { RouterView } from "vue-router";
import SideNavBar from "@/components/SideNavBar.vue";
import TopNavBar from "@/components/TopNavBar.vue";
import { computed, onMounted, ref } from "vue";
import { useToggle } from "@vueuse/core";
import { Expand } from "@element-plus/icons-vue";

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
</script>

<template>
  <el-container>
    <el-header>
      <TopNavBar @menu="drawerToggle()" />
    </el-header>
    <div v-if="collapsed">
      <el-menu style="--el-menu-hover-bg-color: var(--el-menu-bg-color)">
        <el-menu-item>
          <el-button @click="drawerToggle()">
            <el-icon>
              <Expand />
            </el-icon>
            Menu
          </el-button>
        </el-menu-item>
      </el-menu>
    </div>
    <el-container>
      <el-aside width="300px" v-if="!collapsed">
        <SideNavBar class="sidenav" />
      </el-aside>
      <el-drawer v-model="drawer" direction="ltr" size="306px">
        <SideNavBar class="sidenav" @select="drawerToggle()" />
      </el-drawer>
      <el-main>
        <RouterView />
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>
.sidenav {
  height: 100%;
}
</style>

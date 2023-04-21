<template>
  <el-menu
    :default-active="activeIndex"
    mode="horizontal"
    :ellipsis="false"
    @select="handleSelect"
    class="menu"
  >
    <el-text type="primary" size="large" class="menu-item-text">
      Legg til nytt medlem i husholdningen
    </el-text>

    <el-button type="primary" class="menu-item-button">
      <el-icon>
        <Plus />
      </el-icon>
    </el-button>
    <div class="flex-grow" />
    <el-button type="danger" class="menu-item-button">
      <span>Slett Husholdning</span>
    </el-button>
  </el-menu>
</template>

<script setup lang="ts">
import { Plus } from "@element-plus/icons-vue";
import { ref } from "vue";

const activeIndex = ref("1");

const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
</script>

<style>
.menu {
  padding: 10px;
}

.flex-grow {
  flex-grow: 1;
}

.menu-item-button {
  margin: auto 1rem;
  align-content: center;
}

.menu-item-text {
  padding-left: 20px;
}
</style>

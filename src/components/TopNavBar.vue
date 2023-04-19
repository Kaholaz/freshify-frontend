<template>
  <el-menu :default-active="activeIndex" mode="horizontal" :ellipsis="false" @select="handleSelect">
    <el-menu-item index="0">LOGO</el-menu-item>
    <div class="flex-grow" />
    <el-menu-item index="1">
      <el-icon>
        <User />
      </el-icon>
      <span>Profil</span>
    </el-menu-item>
    <el-button type="primary" class="menu-item-button">
      <el-icon>
        <TurnOff />
      </el-icon>
      <span>Logg ut</span>
    </el-button>
  </el-menu>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { Switch, TurnOff, User } from "@element-plus/icons-vue";

const activeIndex = ref("1");
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
</script>

<style scoped>
.flex-grow {
  flex-grow: 1;
}

.menu-item-button {
  margin: auto 1rem;
  align-content: center;
}
</style>

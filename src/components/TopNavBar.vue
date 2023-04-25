<template>
  <nav>
    <el-menu
      :default-active="activeIndex"
      mode="horizontal"
      :ellipsis="false"
      @select="handleSelect"
    >
      <el-menu-item index="0">LOGO</el-menu-item>
      <div class="flex-grow" />
      <el-menu-item index="1" v-if="sessionStore.isAuthenticated">
        <el-icon>
          <User />
        </el-icon>
        <span>Profil</span>
      </el-menu-item>
      <el-button class="menu-item-button" v-if="sessionStore.isAuthenticated" @click="logOut">
        <el-icon>
          <TurnOff />
        </el-icon>
        <span>Logg ut</span>
      </el-button>
    </el-menu>
  </nav>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { TurnOff, User } from "@element-plus/icons-vue";
import { useSessionStore } from "@/stores/session";

const activeIndex = ref("1");
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};

const sessionStore = useSessionStore();

function logOut() {
  sessionStore.logOut();
}
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

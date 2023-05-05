<template>
  <nav>
    <el-menu :default-active="activeIndex" :ellipsis="false" mode="horizontal" router>
      <el-menu-item :index="'/inventory'" id="logo-menu-item">
        <img src="@/assets/logo-color.png" alt="logo" id="logo-img" />
      </el-menu-item>
      <div class="flex-grow" />
      <el-menu-item v-if="sessionStore.isAuthenticated" index="/profile">
        <el-icon>
          <User />
        </el-icon>
        <span>Profil</span>
      </el-menu-item>
      <el-button v-if="sessionStore.isAuthenticated" class="menu-item-button" @click="logOut">
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

#logo-menu-item {
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  border: none;
}

#logo-img {
  height: 40px;
}

@media only screen and (max-width: 420px) {
  #logo-img {
    width: 40px;
    object-fit: cover;
    object-position: 0%;
  }
}
</style>

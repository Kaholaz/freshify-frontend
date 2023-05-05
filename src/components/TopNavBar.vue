<template>
  <nav>
    <el-menu
      style="min-height: 60px"
      class="menu solid-menu"
      :default-active="activeIndex"
      :ellipsis="false"
      mode="horizontal"
      router
      id="topNav"
    >
      <el-menu-item :index="'/inventory'" id="logo-menu-item">
        <img src="@/assets/logo-no-background.svg" alt="logo" id="logo-img" />
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
import { inject, onMounted, ref } from "vue";
import { TurnOff, User } from "@element-plus/icons-vue";
import { useSessionStore } from "@/stores/session";
import router from "@/router";

const activeIndex = ref("1");

const sessionStore = useSessionStore();

const emitter = inject("emitter");
</script>

<style scoped>
.flex-grow {
  flex-grow: 1;
}

.menu {
  transition: all 0.5s ease;
  background-color: #186332;
  margin: 0;
}

.solid-menu {
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.invert {
  filter: invert(1) contrast(50%) saturate(0%) brightness(100%);
}

.menu-item-button {
  margin: auto 1rem;
  align-content: center;
}

#logo-menu-item {
  height: 100%;
  display: flex;
  justify-content: center;
  align-self: center;
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

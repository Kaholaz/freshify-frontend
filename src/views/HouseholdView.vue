<template>
  <el-main id="component-name" class="component-name-wrapper">
    <div class="top-bar"><HouseholdTopBar /></div>
    <div>
      <el-row gutter="20">
        <el-col
          v-for="user in users"
          :key="user.id"
          :xs="24"
          :sm="12"
          :md="12"
          :lg="12"
          :xl="16"
          class="mb-5"
        >
          <UserCard :user="user" />
        </el-col>
      </el-row>
    </div>
  </el-main>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { UserFull } from "@/services";
import UserCard from "@/components/UserCard.vue";
import HouseholdTopBar from "@/components/HouseholdTopBar.vue";

const users = ref<UserFull[]>([
  {
    id: 1,
    email: "trond@gmail.com",
    firstName: "Trond",
  } as UserFull,
  {
    id: 2,
    email: "gjøran@gmail.com",
    firstName: "Gjøran",
  } as UserFull,
]);
</script>

<style scoped>
.el-col {
  margin-bottom: 20px;
}

.top-bar {
  margin-bottom: 20px;
}
</style>

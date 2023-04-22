<template>
  <el-main id="component-name" class="component-name-wrapper">
    <h1>{{ householdStore.getHousehold()?.name }}</h1>
    <div class="top-bar"><HouseholdTopBar /></div>
    <div>
      <el-row gutter="20">
        <el-col
          v-for="user in users"
          :key="user.user.id"
          :xs="24"
          :sm="12"
          :md="12"
          :lg="12"
          :xl="16"
          class="mb-5"
        >
          <UserCard :user="user.user" :user-type="user.userType" />
        </el-col>
      </el-row>
    </div>
  </el-main>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { UserFull, Household } from "@/services";
import UserCard from "@/components/UserCard.vue";
import HouseholdTopBar from "@/components/HouseholdTopBar.vue";
import { useHouseholdStore } from "@/stores/household";

const householdStore = useHouseholdStore();

const users = ref([
  {
    user: {
      id: 1,
      email: "tore@gmail.com",
      firstName: "Tore",
    } as UserFull,
    userType: "Superbruker" as String,
  },
  {
    user: {
      id: 2,
      email: "trond@gmail.com",
      firstName: "Trond",
    } as UserFull,
    userType: "Bruker" as String,
  },
]);

onMounted(() => {
  householdStore.setHousehold({
    id: 234,
    name: "Hjemme",
  } as Household);
  console.log("mounted");
});
</script>

<style scoped>
.el-col {
  margin-bottom: 20px;
}

.top-bar {
  margin-bottom: 20px;
}
</style>

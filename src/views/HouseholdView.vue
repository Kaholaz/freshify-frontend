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
          <UserCard :user-name="user.name" />
        </el-col>
      </el-row>
    </div>
  </el-main>
</template>

<script setup lang="ts">
import UserCard from "@/components/UserCard.vue";
import HouseholdTopBar from "@/components/HouseholdTopBar.vue";

const users = [
  {
    id: 1,
    name: "Trond Arild",
  },
  {
    id: 2,
    name: "Kåre Konradsen",
  },
  {
    id: 3,
    name: "Trond Arild",
  },
  {
    id: 4,
    name: "Kåre Konradsen",
  },
  {
    id: 5,
    name: "Kåre Konradsen",
  },
  {
    id: 6,
    name: "Kåre Konradsen",
  },
  {
    id: 7,
    name: "Kåre Konradsen",
  },
  {
    id: 8,
    name: "Kåre Konradsen",
  },
  {
    id: 9,
    name: "Kåre Konradsen",
  },
];
</script>

<style scoped>
.el-col {
  margin-bottom: 20px;
}

.top-bar {
  margin-bottom: 20px;
}
</style>

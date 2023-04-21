<template>
  <main id="component-name" class="component-name-wrapper">
    <div><HouseholdTopBar /></div>
    <div>
    <el-row :gutter="20">
      <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="16" class="mb-5">
        <UserCard user-name="Trond Kåre" />
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="8" class="mb-5">
        <UserCard user-name="Test Testesen"/>
      </el-col>
    </el-row>
  </div>
  </main>


</template>

<script setup lang="ts">
import UserCard from "@/components/UserCard.vue";
import HouseholdTopBar from "@/components/HouseholdTopBar.vue";

const user = [
  {
    id: 1,
    name: "trond arild",
  },
  {
    id: 2,
    name: "Kåre Konradsen",
  },
];
</script>

<style scoped>

</style>

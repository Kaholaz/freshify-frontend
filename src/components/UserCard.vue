<template>
  <el-card
    shadow="never"
    :body-style="{
      padding: '30px',
      overflow: 'hidden',
    }"
    class="relative m-2 w-full max-w-xl overflow-visible"
  >
    <h2 class="mb-5">{{ user.firstName }}</h2>
    <p class="text-[#868e96]">{{ userType }}</p>
    <p class="text-[#868e96]">{{ user.email }}</p>
    <div class="absolute -top-10 right-5">
      <el-icon color="black" size="80">
        <UserFilled />
      </el-icon>
    </div>
    <footer class="mt-2 text-right">
      <el-button v-if="userType == 'Bruker'" type="primary">
        Utnevn til superbruker
      </el-button>
      <el-button v-else type="primary">
        Degrader til bruker
      </el-button>
    </footer>
  </el-card>
</template>

<script setup lang="ts">
import type { UserFull } from "@/services";
import { UserFilled } from "@element-plus/icons-vue";

const props = defineProps<{
  user: UserFull;
  userType: String,
}>();
</script>

<style scoped>

</style>

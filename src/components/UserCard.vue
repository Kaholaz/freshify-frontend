<template>
  <el-card
    shadow="never"
    :body-style="{
      padding: '30px',
      overflow: 'hidden',
    }"
    class="relative m-2 w-full max-w-xl overflow-visible"
  >
    <h2 class="mb-5">{{ props.userName }}</h2>
    <p class="text-[#868e96]">Superbruker</p>
    <div class="absolute -top-10 right-5">
      <el-icon color="black" size="80">
        <UserFilled />
      </el-icon>
    </div>
    <footer class="mt-2 text-right">
      <el-link href="https://vg.no" type="primary" target="_blank">
        Utnevn til superbruker
      </el-link>
    </footer>
  </el-card>
</template>

<script setup lang="ts">
import { UserFilled } from "@element-plus/icons-vue";

const props = defineProps<{
  userName: string;
}>();
</script>

<style scoped></style>

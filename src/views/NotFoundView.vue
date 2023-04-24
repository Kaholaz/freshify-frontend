<template>
  <div class="lg:mx-auto bg-[#f8f9fa] w-full h-full dark:bg-[#242424]">
    <el-empty description="Her er det ingenting" :image-size="400">
      <el-button class="m-5" @click="router.push('/')">Til hjem</el-button>
    </el-empty>
  </div>
</template>
<script setup lang="ts">
import router from "@/router";
</script>

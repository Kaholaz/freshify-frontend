<template>
  <div class="lg:mx-auto bg-[#f8f9fa] w-full h-full dark:bg-[#242424]">
    <el-empty :image-size="400" description="Her er det ingenting">
      <el-button class="m-5" @click="router.push('/')">Til hjem</el-button>
    </el-empty>
  </div>
</template>
<script lang="ts" setup>
import router from "@/router";
</script>

<template>
  <div class="home-view">
    <h1>Freshify</h1>
    <h3>Handle med formål - reduser matsvinnet ditt</h3>
    <el-button type="primary" size="large" @click="router.push('/login')" round>Logg inn</el-button>
    <el-link type="primary" @click="router.push({ name: 'register' })">eller registrer deg</el-link>
  </div>
</template>

<script lang="ts" setup>
import router from "@/router";
</script>

<style>
.home-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
}
</style>

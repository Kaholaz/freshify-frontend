<template>
  <el-card
    shadow="never"
    :body-style="{
      padding: '30px',
      overflow: 'hidden',
    }"
    class="relative m-2 w-full max-w-xl overflow-visible"
  >
    <h2 class="mb-5">Bruker</h2>
    <p class="text-[#868e96]">
      Front-end developer and open source enthusiast. We hope to develop a UI platform that can help
      many people in the future. I still working hard to make this dream come true.
    </p>
    <div class="absolute -top-10 right-5">
      <el-avatar src="https://avatars.githubusercontent.com/u/27342882?v=4" :size="80" />
    </div>
    <footer class="mt-2 text-right">
      <el-link href="https://github.com/ryuhangyeong" type="primary" target="_blank">
        Utnevn til superbruker
      </el-link>
    </footer>
  </el-card>
</template>

<script setup lang="ts"></script>

<style scoped>
.component-name-wrapper {
}
</style>

<template>
  <el-skeleton :count="1" :throttle="50" animated>
    <template #template>
      <el-row align="middle" style="margin-bottom: 4rem">
        <el-col :span="2"></el-col>
        <el-col :span="12" :xs="7">
          <el-row>
            <el-skeleton-item
              style="margin-bottom: 0.5rem; width: 30%"
              variant="h1"
            ></el-skeleton-item>
          </el-row>
          <el-row>
            <el-skeleton-item style="margin: 0.5rem; width: 50%" variant="text"></el-skeleton-item>
          </el-row>
        </el-col>
        <el-col :span="10" :xs="15">
          <el-row>
            <div class="spacer"></div>
            <el-skeleton-item variant="button"></el-skeleton-item>
            <el-skeleton-item style="margin-left: 1rem" variant="button"></el-skeleton-item>
          </el-row>
        </el-col>
      </el-row>
    </template>
  </el-skeleton>
</template>
<script setup lang="ts"></script>

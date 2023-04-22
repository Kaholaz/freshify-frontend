<template>
  <el-skeleton animated :count="3" :throttle="50">
    <template #template>
      <el-row align="middle" style="margin-bottom: 4rem">
        <el-col :span="2"></el-col>
        <el-col :xs="7" :span="12">
          <el-row>
            <el-skeleton-item
              variant="h1"
              style="margin-bottom: 0.5rem; width: 30%"
            ></el-skeleton-item>
          </el-row>
          <el-row>
            <el-skeleton-item variant="text" style="margin: 0.5rem"></el-skeleton-item>
          </el-row>
        </el-col>
        <el-col :xs="15" :span="10">
          <el-row>
            <div class="spacer"></div>
            <el-skeleton-item variant="button"></el-skeleton-item>
            <el-skeleton-item variant="button" style="margin-left: 1rem"></el-skeleton-item>
          </el-row>
        </el-col>
      </el-row>
    </template>
  </el-skeleton>
</template>

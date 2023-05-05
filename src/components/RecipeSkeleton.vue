<template>
  <el-skeleton :count="count" style="width: 100%">
    <template #template>
      <el-skeleton-item style="width: 100%; height: 300px" variant="image" />
      <div style="padding: 14px">
        <el-skeleton-item style="width: 50%" variant="p" />
        <div style="display: flex; align-items: center; justify-items: space-between">
          <el-skeleton-item style="margin-right: 16px" variant="text" />
          <el-skeleton-item style="width: 30%" variant="text" />
        </div>
      </div>
    </template>
  </el-skeleton>
</template>
<script lang="ts" setup>
defineProps({
  count: {
    type: Number,
    required: true,
  },
});
</script>

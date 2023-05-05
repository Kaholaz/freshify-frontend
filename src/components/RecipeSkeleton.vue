<template>
  <el-skeleton style="width: 100%" :count="count">
    <template #template>
      <el-skeleton-item variant="image" style="width: 100%; height: 300px" />
      <div style="padding: 14px">
        <el-skeleton-item variant="p" style="width: 50%" />
        <div style="display: flex; align-items: center; justify-items: space-between">
          <el-skeleton-item variant="text" style="margin-right: 16px" />
          <el-skeleton-item variant="text" style="width: 30%" />
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

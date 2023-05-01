<template>
  <div class="wrapper">
    <el-tooltip content="Estimert godt">
      <div class="success bar start" :style="{ width: props.successPercentage * 100 + '%' }">
        <span v-if="props.successPercentage >= 0.1"> {{ props.successPercentage }}%</span>
      </div>
    </el-tooltip>
    <el-tooltip content="Kan være dårlig">
      <div class="warning bar" :style="{ width: props.warningPercentage * 100 + '%' }">
        <span v-if="props.warningPercentage >= 0.1"> {{ props.warningPercentage }}%</span>
      </div>
    </el-tooltip>
    <el-tooltip content="Bør brukes">
      <div class="danger bar end" :style="{ width: props.dangerPercentage * 100 + '%' }">
        <span v-if="props.dangerPercentage >= 0.1"> {{ props.dangerPercentage }}%</span>
      </div>
    </el-tooltip>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  dangerPercentage: {
    type: number;
    required: true;
  };
  warningPercentage: {
    type: number;
    required: true;
  };
  successPercentage: {
    type: number;
    required: true;
  };
}>();
</script>
<style scoped>
.wrapper {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 2rem;
  border-radius: 10px;
  background-color: #f1f1f1;
}

.bar {
  height: 100%;
  width: 100%;
  transition: width 0.6s ease-in-out;
  padding-left: 0.3rem;
  display: flex;
  align-items: center;
  color: white;
  text-after-overflow: ellipsis;
}

.success {
  background-color: var(--el-color-success);
}

.warning {
  background-color: var(--el-color-warning);
}

.end {
  border-bottom-right-radius: 10px;
  border-top-right-radius: 10px;
}

.start {
  border-bottom-left-radius: 10px;
  border-top-left-radius: 10px;
}

.danger {
  background-color: var(--el-color-danger);
}
</style>

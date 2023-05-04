<template>
  <div class="probability-bar" ref="barRef" @cange="console.log('mo')">
    <div class="spacer"></div>
    <div class="inner-bar" :style="{ height: inPercentage + '%' }">
      <h2>{{ Math.round(inPercentage) }}%</h2>
    </div>
  </div>
  <el-tooltip content="Gjennomsnittlig norsk husholdning">
    <div class="normalHousehold" :style="{ marginTop: -marginBottom - 10 + 'px' }"></div>
    <!-- 10px is half of the width of the triangle -->>
  </el-tooltip>
</template>
<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";

const props = defineProps<{
  percentage: {
    type: number;
    required: true;
  };
  normalHousehold: {
    type: number;
    required: true;
  };
}>();
const barRef = ref<HTMLElement | null>(null);

const barHeight = ref(0 as number);

onMounted(() => {
  if (barRef.value) {
    barHeight.value = barRef.value.clientHeight;
  }
  addEventListener("resize", () => {
    if (barRef.value) {
      barHeight.value = barRef.value.clientHeight;
    }
  });
});

const inPercentage = computed(() => (1 - props.percentage) * 100);

const marginBottom = computed(() => {
  if (barHeight.value) {
    return (1 - props.normalHousehold) * barHeight.value;
  }
  return 0;
});
</script>
<style scoped>
.probability-bar {
  height: 100%;
  padding: 0;
  background-color: #84a98c;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
  width: calc(100% - 1rem);
}

.inner-bar {
  width: 100%;
  background-color: #354f52;
  transition: height 0.6s ease-in-out;
  border-radius: 10px;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.normalHousehold {
  position: absolute;
  color: black;
  height: 0;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-left: 10px solid gray;
  cursor: pointer;
}
</style>

<template>
  <el-card
    class="relative m-2 w-full max-w-xl overflow-visible"
    shadow="never"
    style="height: 11rem"
  >
    <h2 class="mb-5">{{ recipeTitle }}</h2>
    <p class="text-[#868e96]">Tid: ca {{ recipeTime }} min</p>
    <p class="text-[#868e96]">{{ recipeAmountIngredientsOwned }} ingredienser i kjøleskap</p>
    <footer v-if="recipeAllergies?.length > 0" class="mt-2 text-right">
      <header class="mb-5">Allergier:</header>
      <!-- todo: formatering FIX -->
      <p class="text-[#868e96]">{{ allergies }}</p>
    </footer>
  </el-card>
</template>

<script setup lang="ts">
import type { Ref } from "vue";
import { ref, computed, onMounted } from "vue";

// Define APIs and stores

// Define props (will be recipe type)
const props = defineProps<{
  recipeTitle: string;
  recipeTime: number;
  recipeAmountIngredientsOwned: number;
  recipeAllergies: string[];
}>();

// Define emits
/* const emit = defineEmits<{
  (event: "some-event", ...args: any[]): void;
}>(); */

// Define refs
/* const value = ref(null) as Ref<HTMLElement | null>; */

// Define computed values
const allergies = computed(() => {
  return props.recipeAllergies.join(", ");
});

// Define callback functions
/* function onClick() {} */

// Vue hooks
onMounted(() => {});

// Other script logic
</script>

<style scoped>
.recipe-card-wrapper {
}
</style>

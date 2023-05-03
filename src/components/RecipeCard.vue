<template>
  <el-card
    class="relative m-2 w-full max-w-xl overflow-visible"
    shadow="hover"
    style="height: fit-content"
  >
    <div class="top">
      <h2 class="mb-5">{{ recipe?.name }}</h2>
      <el-icon v-if="isBookmarked">
        <Management color="orange" />
      </el-icon>
    </div>
    <div class="content">
      <p class="text-[#868e96]">Tid: ca {{ recipe?.estimatedTime }} min</p>
      <p class="text-[#868e96]">
        <!--Implement this again-->
        0 ingredienser i kjøleskap
      </p>
      <footer class="mt-2 text-right">
        <header class="mb-5">Allergier:</header>
        <p class="text-[#868e96]" v-if="recipe?.allergens?.length! > 0">{{ allergies }}</p>
        <p class="text-[#868e96]" v-else>ingen</p>
      </footer>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import type { Ref } from "vue";
import { ref, computed, onMounted } from "vue";
import type { Recipe, RecipeIngredient, ItemType, AllergenRequest, RecipeCategory } from "@/services/index";
import { Management } from "@element-plus/icons-vue";

// Define APIs and stores

// Define props (will be recipe type)
const props = defineProps<{
  recipe: Recipe;
  isBookmarked: boolean;
}>();

/* type Ingredient = {
  id: number;
  ingredientName: string;
  ingredientAmount: number;
  ingredientUnit: string;
};

type Recipe = {
  id: number;
  recipeTitle: string;
  recipeTime: number;
  recipeAmountIngredientsOwned: number;
  recipeAllergies: string[];
  recipeIngredients?: Ingredient[];
  recipeSteps?: string[];
}; */

// Define emits
/* const emit = defineEmits<{
  (event: "some-event", ...args: any[]): void;
}>(); */

// Define refs
/* const value = ref(null) as Ref<HTMLElement | null>; */

// Define computed values
const allergies = computed(() => {
  let allergies = "";
  props.recipe?.allergens!.forEach(element => {
    allergies += element.name + ", ";
  });
  return allergies.slice(0, -2);
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

.top {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.content {
  margin-top: 13px;
  align-items: center;
}
</style>

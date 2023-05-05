<template>
  <el-card
    class="relative m-2 w-full max-w-xl overflow-visible"
    shadow="hover"
    style="height: fit-content; cursor: pointer"
    :style="{ 'border-color': allIngredientsInFridge ? 'var(--el-color-primary)' : '' }"
  >
    <el-row>
      <img :src="recipe?.image" style="width: 100%" />
      <div class="content">
        <el-row>
          <h2>{{ recipe?.name }}</h2>
          <div class="spacer"></div>
          <el-icon v-if="recipe?.isInHousehold">
            <Management color="orange" />
          </el-icon>
        </el-row>
        <el-row>
          <el-tag
            :key="category.id"
            style="margin-right: 0.2rem"
            v-for="category in props.recipe.categories"
            >{{ category.name }}</el-tag
          >
        </el-row>
        <p>Tid: ca {{ recipe?.estimatedTime }} min</p>
        <p>{{ recipe?.totalIngredientsInFridge }} ingredienser i kjøleskap</p>
        <p v-if="allIngredientsInFridge" style="color: var(--el-color-primary)">
          alle ingredienser er i kjøleskap
        </p>
        <footer class="mt-2 text-right">
          <h5 class="mb-5">Allergier:</h5>
          <p class="text-[#868e96]" v-if="recipe?.allergens?.length! > 0">{{ allergies }}</p>
          <p class="text-[#868e96]" v-else>ingen</p>
        </footer>
      </div>
    </el-row>
  </el-card>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { RecipeDTO } from "@/services/index";
import { Management } from "@element-plus/icons-vue";
import { totalIngredients } from "@/utils/total-ingredients";

// Define props (will be recipe type)
const props = defineProps<{
  recipe: RecipeDTO;
}>();
// Define refs

const allIngredientsInFridge = computed(() => {
  return (
    props.recipe?.totalIngredientsInFridge == totalIngredients(props.recipe?.recipeIngredients)
  );
});

// Define computed values
const allergies = computed(() => {
  let allergies = "";
  props.recipe?.allergens!.forEach((element) => {
    allergies += element.name + ", ";
  });
  return allergies.slice(0, -2);
});
// Other script logic
</script>

<style scoped>
.content {
  margin-top: 13px;
  align-items: center;
}
</style>

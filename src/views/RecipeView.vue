<template>
  <el-col :span="24">
    <h2>{{ currentRecipe?.name }}</h2>
    <h3>
      {{ currentRecipe?.description }}
    </h3>
    <el-row class="ingredients-steps" :gutter="10">
      <el-col :span="12">
        <div class="grid-content ep-bg-purple" />
        <h4>Ingredienser</h4>
        <p v-for="ingredient in currentRecipe?.recipeIngredients" :key="ingredient.id">
          {{ ingredient.amount }} {{ ingredient.unit }}
          {{ ingredient.itemType?.name }}
        </p>
      </el-col>

      <el-col :span="12">
        <div class="grid-content ep-bg-purple-light" />
        <h4>Slik gjør du det</h4>
        <p v-for="(step, index) in recipeSteps" :key="step">{{ index + 1 }} {{ step }}</p>
      </el-col>
    </el-row>
  </el-col>
  <el-divider />

  <el-button type="primary" @click="emit('removeRecipe')">
    <el-icon>
      <Back />
    </el-icon>
    Tilbake til oppskrifter
  </el-button>
  <el-button v-if="!isBookmarked" type="success" @click="emit('bookmarkRecipe', currentRecipe!)">
    Bokmerk oppskriften
  </el-button>
  <el-button v-else type="success" @click="emit('bookmarkRecipe', currentRecipe)">
    Fjern bokmerke
  </el-button>
  <el-button type="success" @click="emit('addIngredientsToShoppingList', currentRecipe)">
    Legg til manglende ingredienser i handleliste
  </el-button>
</template>

<script setup lang="ts">
import { Back } from "@element-plus/icons-vue";
import type { Recipe } from "@/services/index";
import { RecipesApi } from "@/services/index";
import { computed, ref, defineEmits } from "vue";
import router from "@/router";
import { useHouseholdStore } from "@/stores/household";

const recipeApi = new RecipesApi();

const currentRecipe = ref<Recipe>();

const householdStore = useHouseholdStore();

const recipeSteps = computed(() => {
  if (!currentRecipe.value) return [];
  return currentRecipe?.value.steps.split("\n") ?? [];
});

const recipeId = computed(() => {
  return router.currentRoute.value.params.id;
});

recipeApi.getRecipeById(householdStore.household.id, recipeId).then((recipe) => {
  currentRecipe.value = recipe;
});

const emit = defineEmits<{
  (event: "removeRecipe"): void;
  //todo: add recipe to weekmenu
  (event: "bookmarkRecipe", args: Recipe): void;
  (event: "addIngredientsToShoppingList", args: Recipe): void;
}>();
</script>

<style scoped>
.ingredients-steps {
  margin: 1rem 0rem;
  width: fit-content;
}
</style>

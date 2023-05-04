<template>
  <el-page-header @back="goBack">
    <template #breadcrumb>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item to="/recipes"> recipes</el-breadcrumb-item>
        <el-breadcrumb-item>{{ currentRecipe?.name.toLowerCase() }}</el-breadcrumb-item>
      </el-breadcrumb>
    </template>
    <template #extra>
      <el-button v-if="true" type="primary" @click="addToBookmarked">
        Bokmerk oppskriften
      </el-button>
      <el-button v-else type="primary" @click="removeFromBookmarked"> Fjern bokmerke</el-button>
    </template>
  </el-page-header>
  <img :src="currentRecipe?.image" alt="" class="recipe-image" />
  <h1>{{ currentRecipe?.name }}</h1>
  <h3>
    {{ currentRecipe?.description }}
  </h3>
  <el-divider />
  <h4>Ingredienser</h4>
  <p v-for="ingredient in currentRecipe?.recipeIngredients" :key="ingredient.id">
    {{ ingredient.amount }} {{ ingredient.unit }}
    {{ ingredient.itemType?.name }}
  </p>
  <el-button style="margin-top: 1rem" type="primary" @click="addMissingIngredientsToShoppingList">
    Legg til manglende varer på handlelista
  </el-button>

  <el-divider></el-divider>

  <h4>Slik gjør du det</h4>
  <p v-for="(step, index) in recipeSteps" :key="step">{{ index + 1 }} {{ step }}</p>
</template>

<script setup lang="ts">
import type { Recipe } from "@/services/index";
import { HouseholdRecipeApi, RecipesApi } from "@/services/index";
import { computed, onMounted, ref } from "vue";
import router from "@/router";
import { useHouseholdStore } from "@/stores/household";
import { ElMessage } from "element-plus";

const recipeApi = new RecipesApi();
const householdRecipeApi = new HouseholdRecipeApi();

const householdStore = useHouseholdStore();

const currentRecipe = ref<Recipe>();

const recipeSteps = computed(() => {
  if (!currentRecipe.value) return [];
  return currentRecipe?.value?.steps?.split("\n") ?? [];
});

const recipeId = computed(() => {
  return router.currentRoute.value.params.id;
});

onMounted(async () => {
  await router.isReady();
  console.log(recipeId.value);
  fetchRecipe();
});

function fetchRecipe() {
  if (!householdStore.household) return;
  recipeApi.getRecipeById(householdStore.household.id, recipeId.value).then((data) => {
    currentRecipe.value = data.data;
  });
}

function removeFromBookmarked() {
  householdRecipeApi
    .removeHouseholdRecipe(householdStore.household?.id!, currentRecipe.value?.id!)
    .then(() => {
      console.log("remove bookmark: " + currentRecipe.value?.name);
    })
    .catch(() => {
      ElMessage.error("Kunne ikke fjerne bokmerket for oppskrift: " + currentRecipe.value?.name);
    });
}

function addToBookmarked() {
  householdRecipeApi
    .createHouseholdRecipe(householdStore.household?.id!, currentRecipe.value?.id!)
    .then(() => {
      ElMessage.success("Oppskrift bokmerket: " + currentRecipe.value?.name);
    })
    .catch(() => {
      ElMessage.error("Kunne ikke legge til oppskrift i husstanden");
    });
}

function addMissingIngredientsToShoppingList() {
  householdRecipeApi
    .addRecipeToShoppingList(householdStore.household?.id!, currentRecipe.value?.id!)
    .then(() => {
      ElMessage.success(
        "Manglende ingredienser fra oppskrift " +
          currentRecipe.value?.name +
          " lagt til i handlelisten"
      );
    });
}

function goBack() {
  router.back();
}
</script>
<style scoped>
.recipe-image {
  width: 100%;
  max-height: 30rem;
  object-fit: cover;
  margin-top: 1rem;
}
</style>

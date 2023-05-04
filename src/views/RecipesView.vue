<template>
  <div>
    <h1>Oppskrifter</h1>
    <div v-if="bookmarkedRecipes.length > 0 && currentRecipe === undefined">
      <el-divider content-position="left">Bokmerkede oppskrifter</el-divider>

      <el-row :gutter="10" style="width: 100%; margin: 0">
        <el-col
          v-for="recipe in bookmarkedRecipes"
          :key="recipe.id"
          :lg="12"
          :md="24"
          :sm="24"
          :xl="6"
          :xs="6"
        >
          <RecipeCard
            class="recipe-card"
            :recipe="recipe"
            :isBookmarked="true"
            @click="onClick(recipe)"
          />
        </el-col>
        <el-divider content-position="left">Oppskrifter</el-divider>
      </el-row>
    </div>
    <el-row v-if="currentRecipe === undefined" :gutter="10" style="width: 100%; margin: 0">
      <div class="search-bar">
        <el-input
          v-model="recipeSearch"
          class="recipe-search"
          placeholder="Søk etter oppskrift"
          :prefix-icon="Search"
        />
        <el-select placeholder="Allergier" collapse-tags multiple v-model="selectedAllergies">
          <el-option
            v-for="allergen in allergens"
            :key="allergen.id"
            :label="allergen.name"
            :value="allergen.id"
          />
        </el-select>
        <el-select placeholder="Kategori" v-model="selectedCategory">
          <el-option
            v-for="category in categories"
            :key="category.id"
            :label="category.name"
            :value="category.id"
          />
        </el-select>

        <el-button @click="searchRecipes"> Search</el-button>
      </div>
      <!--No recipe selected-->

      <el-col
        v-for="recipe in recipes.sort((a, b) => b.totalIngredientsInFridge! - a.totalIngredientsInFridge!)"
        :key="recipe.id"
        :lg="12"
        :md="24"
        :sm="24"
        :xl="6"
        :xs="6"
      >
        <RecipeCard
          class="recipe-card"
          :recipe="recipe"
          :is-bookmarked="false"
          @click="onClick(recipe)"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import RecipeCard from "@/components/RecipeCard.vue";
import { ref } from "vue";
import type { AllergenRequest, Recipe, RecipeCategory, RecipeDTO } from "@/services/index";
import { Search } from "@element-plus/icons-vue";
import { RecipesApi } from "@/services/apis/recipes-api";
import { HouseholdRecipeApi } from "@/services/apis/household-recipe-api";
import { AllergenApi } from "@/services/apis/allergen-api";
import { RecipeCategoryApi } from "@/services/apis/recipe-category-api";
import { useHouseholdStore } from "@/stores/household";
import router from "@/router";

const recipesApi = new RecipesApi();
const householdRecipeApi = new HouseholdRecipeApi();
const allergenApi = new AllergenApi();
const recipeCategoryApi = new RecipeCategoryApi();
const householdStore = useHouseholdStore();

const recipes = ref<RecipeDTO[]>([]);

recipesApi.getRecipesPaginated(householdStore.household?.id!, true).then((response) => {
  recipes.value = response.data.content;
});

const currentRecipe = ref<Recipe>();
const recipeSearch = ref<string>("");

const bookmarkedRecipes = ref<RecipeDTO[]>([]);

householdRecipeApi.getHouseholdRecipes(householdStore.household?.id!).then((response) => {
  bookmarkedRecipes.value = response.data.map((r) => r.recipe);
});

const allergens = ref<AllergenRequest[]>([]);

const selectedAllergies = ref([] as number[] | undefined);

allergenApi.getAllergens().then((response) => {
  allergens.value = response.data;
  console.log(allergens.value);
});

const categories = ref<RecipeCategory[]>([]);

const selectedCategory = ref<number | undefined>();

recipeCategoryApi.getAllRecipeCategories().then((response) => {
  categories.value = response.data;
  console.log(categories.value);
});

recipeCategoryApi.getAllRecipeCategories().then((response) => {
  categories.value = response.data;
  console.log(categories.value);
});

function onClick(recipeClicked: Recipe) {
  router.push({ name: "recipe-view", params: { id: recipeClicked.id.toString() } });
}

async function searchRecipes() {
  recipesApi
    .getRecipesPaginated(
      householdStore.household?.id!,
      false,
      recipeSearch.value,
      selectedCategory.value,
      selectedAllergies.value,
      undefined,
      undefined
    )
    .then((response) => {
      recipes.value = response.data.content;
    });
}
</script>

<style scoped>
.recipe-card:hover {
  background-color: #f5f5f5;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;
}

.recipe-search {
  margin-bottom: 20px;
  margin-right: 1rem;
}

.search-bar {
  width: 100%;
  margin-bottom: 20px;
  display: flex;
}
</style>

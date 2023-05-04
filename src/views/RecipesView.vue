<template>
  <h1>Oppskrifter</h1>
  <div v-if="bookmarkedRecipes.length > 0 && currentRecipe === undefined">
    <el-divider content-position="left">Bokmerkede oppskrifter</el-divider>
    <el-row :gutter="10" style="width: 100%; margin: 0">
      <el-col
        v-for="recipe in bookmarkedRecipes"
        :key="recipe.id"
        :lg="12"
        :md="12"
        :sm="24"
        :xl="6"
        :xs="24"
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
  <div class="search-bar">
    <el-input
      v-model="recipeSearch"
      @input="searchInputDelayHandler.searchWithDelay(() => searchRecipes())"
      class="recipe-search"
      placeholder="Søk etter oppskrift"
      :prefix-icon="Search"
    />
    <el-select
      placeholder="Allergier"
      collapse-tags
      multiple
      v-model="selectedAllergies"
      @update:modelValue="searchRecipes"
    >
      <el-option
        v-for="allergen in allergens"
        :key="allergen.id"
        :label="allergen.name"
        :value="allergen.id"
      />
    </el-select>
    <el-select
      placeholder="Kategori"
      v-model="selectedCategory"
      @update:modelValue="searchRecipes"
      class="category-picker"
    >
      <el-option
        v-for="category in categories"
        :key="category.id"
        :label="category.name"
        :value="category.id"
      />
    </el-select>
  </div>
  <el-pagination
    v-model:current-page="currentPage"
    layout="prev, pager, next"
    :page-count="totalPages"
    @update:current-page="searchRecipes"
    hide-on-single-page
  ></el-pagination>
  <el-col
    v-for="recipe in recipes.sort((a, b) => b.totalIngredientsInFridge! - a.totalIngredientsInFridge!)"
    :key="recipe.id"
    :lg="12"
    :md="12"
    :sm="24"
    :xl="6"
    :xs="24"
  >
    <RecipeCard
      class="recipe-card"
      :recipe="recipe"
      :is-bookmarked="false"
      @click="onClick(recipe)"
    />
  </el-col>
  <el-pagination
    v-model:current-page="currentPage"
    @update:current-page="searchRecipes"
    layout="prev, pager, next"
    :page-count="totalPages"
    hide-on-single-page
  ></el-pagination>
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
import { InputHandler } from "@/utils/input-delay";

const recipesApi = new RecipesApi();
const householdRecipeApi = new HouseholdRecipeApi();
const allergenApi = new AllergenApi();
const recipeCategoryApi = new RecipeCategoryApi();
const householdStore = useHouseholdStore();

const recipes = ref<RecipeDTO[]>([]);

const totalPages = ref<number>(0);
const currentPage = ref<number>(1);

const currentRecipe = ref<Recipe>();
const recipeSearch = ref<string>("");

const searchInputDelayHandler = new InputHandler(500);

const bookmarkedRecipes = ref<RecipeDTO[]>([]);

const allergens = ref<AllergenRequest[]>([]);
const selectedAllergies = ref([] as number[]);

const categories = ref<RecipeCategory[]>([]);
const selectedCategory = ref<number[]>([]);

allergenApi.getAllergens().then((response) => {
  allergens.value = response.data;
  console.log(allergens.value);
});

recipeCategoryApi.getAllRecipeCategories().then((response) => {
  categories.value = response.data;
});

recipeCategoryApi.getAllRecipeCategories().then((response) => {
  categories.value = response.data;
  console.log(categories.value);
});

householdRecipeApi.getHouseholdRecipes(householdStore.household?.id!).then((response) => {
  bookmarkedRecipes.value = response.data.map((r) => r.recipe);
});

searchRecipes();

function onClick(recipeClicked: Recipe) {
  router.push({ name: "recipe-view", params: { id: recipeClicked.id.toString() } });
}

async function searchRecipes() {
  recipesApi
    .getRecipesPaginated(
      householdStore.household?.id!,
      true,
      recipeSearch.value ? recipeSearch.value : undefined,
      selectedCategory.value ? selectedCategory.value : undefined,
      selectedAllergies.value ? selectedAllergies.value : undefined,
      currentPage.value - 1,
      20
    )
    .then((data) => {
      recipes.value = data.data.content;
      totalPages.value = data.data.totalPages;
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

.category-picker {
  margin-left: 1rem;
}

@media only screen and (max-width: 768px) {
  .search-bar {
    flex-direction: column;
  }
  .category-picker {
    margin-left: 0;
    margin-top: 1rem;
  }
}
</style>

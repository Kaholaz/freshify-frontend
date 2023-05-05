<template>
  <h1>Oppskrifter</h1>
  <el-divider content-position="left">Bokmerkede oppskrifter</el-divider>
  <RecipeContainer
    :recipes="bookmarkedRecipes"
    :totalPages="bookMarkedTotalPages"
    v-model="bookmarkedCurrentPage"
    @search="getBookmarkedRecipes"
  >
    <el-alert title="Du har ingen bokmerkede oppskrifter" type="info" center show-icon></el-alert>
  </RecipeContainer>
  <el-divider content-position="left">Oppskrifter</el-divider>
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
      v-model="selectedCategories"
      @update:modelValue="searchRecipes"
      class="category-picker"
      collapse-tags
      multiple
    >
      <el-option
        v-for="category in categories"
        :key="category.id"
        :label="category.name"
        :value="category.id"
      />
    </el-select>
  </div>
  <RecipeContainer
    :recipes="recipes"
    :totalPages="totalPages"
    v-model="currentPage"
    @search="searchRecipes"
  >
    <el-alert
      title="Fant ingen oppskrifter"
      type="info"
      show-icon
      center
      v-if="recipes.length === 0 && recipeSearch.length > 0"
    ></el-alert>
  </RecipeContainer>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, inject } from "vue";
import type { AllergenRequest, Recipe, RecipeCategory, RecipeDTO } from "@/services/index";
import { Search } from "@element-plus/icons-vue";
import { RecipesApi } from "@/services/apis/recipes-api";
import { HouseholdRecipeApi } from "@/services/apis/household-recipe-api";
import { AllergenApi } from "@/services/apis/allergen-api";
import { RecipeCategoryApi } from "@/services/apis/recipe-category-api";
import { useHouseholdStore } from "@/stores/household";
import { InputHandler } from "@/utils/input-delay";
import RecipeContainer from "@/components/RecipeContainer.vue";
import { showError } from "@/utils/error-utils";

const recipesApi = new RecipesApi();
const householdRecipeApi = new HouseholdRecipeApi();
const allergenApi = new AllergenApi();
const recipeCategoryApi = new RecipeCategoryApi();
const householdStore = useHouseholdStore();

const recipes = ref<RecipeDTO[] | undefined>(undefined);

const totalPages = ref<number>(0);
const currentPage = ref<number>(1);

const currentRecipe = ref<Recipe>();
const recipeSearch = ref<string>("");

const searchInputDelayHandler = new InputHandler(500);

const bookmarkedRecipes = ref<RecipeDTO[] | undefined>(undefined);

const allergens = ref<AllergenRequest[]>([]);
const selectedAllergies = ref([] as number[]);

const categories = ref<RecipeCategory[]>([]);
const selectedCategories = ref<number[]>([]);

const emitter = inject("emitter");

// Update bookmarkes when household is changed
onMounted(() => {
  getBookmarkedRecipes();
  emitter.on("household-updated", getBookmarkedRecipes);
});

onUnmounted(() => {
  emitter.off("household-updated", getBookmarkedRecipes);
});

allergenApi.getAllergens().then((response) => {
  allergens.value = response.data;
  console.log(allergens.value);
});

recipeCategoryApi.getAllRecipeCategories().then((response) => {
  categories.value = response.data;
});

const bookmarkedCurrentPage = ref<number>(1);
const bookMarkedTotalPages = ref<number>(0);

async function getBookmarkedRecipes() {
  if (householdStore.household) {
    const id = setTimeout(() => {
      bookmarkedRecipes.value = undefined;
    }, 100);
    recipesApi
      .getRecipesPaginated(
        householdStore.household?.id,
        true,
        undefined,
        undefined,
        undefined,
        true,
        bookmarkedCurrentPage.value - 1,
        20
      )
      .then((response) => {
        console.log(response.data.content);
        clearTimeout(id);
        bookmarkedRecipes.value = response.data.content;
      })
      .catch(() => {
        showError("Kunne ikke hente bokmerkede oppskrifter", "vennligst prøv igjen senere", 0);
        clearTimeout(id);
        bookmarkedRecipes.value = [];
      });
  }
}

searchRecipes();

async function searchRecipes() {
  const id = setTimeout(() => {
    recipes.value = undefined;
  }, 100);
  recipesApi
    .getRecipesPaginated(
      householdStore.household?.id!,
      true,
      recipeSearch.value ? recipeSearch.value : undefined,
      selectedCategories.value ? selectedCategories.value : undefined,
      selectedAllergies.value ? selectedAllergies.value : undefined,
      false,
      currentPage.value - 1,
      20
    )
    .then((data) => {
      clearTimeout(id);
      recipes.value = data.data.content;
      totalPages.value = data.data.totalPages;
    })
    .catch(() => {
      showError("Kunne ikke hente bokmerkede oppskrifter", "vennligst prøv igjen senere", 0);
      clearTimeout(id);
      recipes.value = [];
    });
}
</script>

<style scoped>
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

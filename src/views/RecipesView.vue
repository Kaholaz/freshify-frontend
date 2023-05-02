<template>
  <div>
    <h1 v-if="currentRecipe === undefined">Oppskrifter</h1>
    <div v-if="bookmarkedRecipes.length > 0 && currentRecipe === undefined">
      <el-divider content-position="left">Bokmerkede oppskrifter</el-divider>

      <el-row :gutter="10" style="width: 100%; margin: 0">
        <el-col
          v-for="recipe in bookmarkedRecipes"
          :key="recipe.id"
          :lg="12"
          :md="24"
          :sm="24"
          :xl="12"
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
    <el-row v-if="currentRecipe === undefined" :gutter="10" style="width: 100%; margin: 0">
      <div class="search-bar">
        <el-input
          v-model="recipeSearch"
          class="recipe-search"
          placeholder="Søk etter oppskrift"
          :prefix-icon="Search"
        />
        <el-dropdown>
          <span class="el-dropdown-link">
            Velg allergi
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>Action 1</el-dropdown-item>
              <el-dropdown-item>Action 2</el-dropdown-item>
              <el-dropdown-item>Action 3</el-dropdown-item>
              <el-dropdown-item disabled>Action 4</el-dropdown-item>
              <el-dropdown-item divided>Action 5</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <!--No recipe selected-->

      <el-col
        v-for="recipe in recipes"
        :key="recipe.id"
        :lg="12"
        :md="24"
        :sm="24"
        :xl="12"
        :xs="24"
      >
        <RecipeCard
          class="recipe-card"
          :recipe="recipe"
          :is-bookmarked="false"
          @click="onClick(recipe)"
        />
      </el-col>

      <!--Recipe selected-->
    </el-row>
    <RecipeSelected
      v-else
      :is-bookmarked="bookmarkedRecipes.includes(currentRecipe!)"
      :current-recipe="currentRecipe!"
      @remove-recipe="removeCurrentRecipe"
      @bookmark-recipe="bookmarkRecipe(currentRecipe!)"
      @add-ingredients-to-shopping-list="addIngredientsToShoppingList(currentRecipe!)"
    />
  </div>
</template>

<script lang="ts" setup>
import RecipeCard from "@/components/RecipeCard.vue";
import RecipeSelected from "@/components/RecipeSelected.vue";
import type { Ref } from "vue";
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { Search } from "@element-plus/icons-vue";

type Ingredient = {
  id: number;
  ingredientName: string;
  ingredientAmount: number;
  ingredientUnit: string;
};

type Recipe = {
  id: number;
  recipeTitle: string;
  recipeDescription: string;
  recipeTime: number;
  recipeAmountIngredientsOwned: number;
  recipeAllergies: string[];
  recipeIngredients?: Ingredient[];
  recipeSteps?: string[];
};

//test recipes, todo: needs ingredients and steps
const recipes = [
  {
    id: 1,
    recipeTitle: "Taco",
    recipeDescription:
      "Taco er for mange selve fredagskosen. Fyll tacoskjell eller tortillalefser med kjøttdeig, grønnsaker, ost, salsa-tacosaus og rømme.",
    recipeTime: 30,
    recipeAmountIngredientsOwned: 5,
    recipeAllergies: ["ingen"],
    recipeIngredients: [
      {
        id: 1,
        ingredientName: "kjøttdeig",
        ingredientAmount: 400,
        ingredientUnit: "g",
      },
      {
        id: 2,
        ingredientName: "taco krydder",
        ingredientAmount: 1,
        ingredientUnit: "pose",
      },
      {
        id: 3,
        ingredientName: "tortilla lefser",
        ingredientAmount: 1,
        ingredientUnit: "pakke",
      },
      {
        id: 4,
        ingredientName: "agurk",
        ingredientAmount: 1,
        ingredientUnit: "stk",
      },
      {
        id: 5,
        ingredientName: "tomat",
        ingredientAmount: 1,
        ingredientUnit: "stk",
      },
      {
        id: 6,
        ingredientName: "rømme",
        ingredientAmount: 1,
        ingredientUnit: "boks",
      },
      {
        id: 7,
        ingredientName: "ost",
        ingredientAmount: 1,
        ingredientUnit: "boks",
      },
    ],
    recipeSteps: [
      "Stek kjøttdeig",
      "Tilsett tacokrydder og vann",
      "Skjær opp grønnsaker",
      "Varm tortilla lefser",
      "Server",
    ],
  } as Recipe,
  {
    id: 2,
    recipeTitle: "Pasta Carbonara",
    recipeDescription:
      "Pasta carbonara er en klassisk italiensk pastarett med egg, bacon og parmesan. Enkelt og veldig godt!",
    recipeTime: 30,
    recipeAmountIngredientsOwned: 5,
    recipeAllergies: ["melk", "egg", "gluten"],
    recipeIngredients: [
      {
        id: 1,
        ingredientName: "bacon",
        ingredientAmount: 200,
        ingredientUnit: "g",
      },
      {
        id: 2,
        ingredientName: "pasta",
        ingredientAmount: 1,
        ingredientUnit: "pakke",
      },
      {
        id: 3,
        ingredientName: "egg",
        ingredientAmount: 2,
        ingredientUnit: "stk",
      },
      {
        id: 4,
        ingredientName: "parmesan",
        ingredientAmount: 1,
        ingredientUnit: "boks",
      },
      {
        id: 5,
        ingredientName: "hvitløk",
        ingredientAmount: 1,
        ingredientUnit: "fedd",
      },
    ],
    recipeSteps: [
      "Kok pasta",
      "Stek bacon",
      "Bland egg og parmesan",
      "Bland pasta, bacon og egg/parmesan",
      "Server",
    ],
  } as Recipe,
];

const currentRecipe = ref<Recipe>();
const recipeSearch = ref<string>("");
//api call: householdrecipes
const bookmarkedRecipes = ref<Recipe[]>([]);

function onClick(recipeClicked: Recipe) {
  console.log("clicked: " + recipeClicked.recipeTitle);
  currentRecipe.value = recipeClicked;
}

function removeCurrentRecipe() {
  //todo: better way of doing this?
  currentRecipe.value = undefined;
}

//todo: what day of the week?
function bookmarkRecipe(recipe: Recipe) {
  if (bookmarkedRecipes.value.includes(recipe)) {
    bookmarkedRecipes.value = bookmarkedRecipes.value.filter((r) => r.id !== recipe.id);
    ElMessage.warning("Fjenrnet bokmerket for oppskrift: " + recipe.recipeTitle);
    console.log("remove bookmark: " + recipe.recipeTitle);
    return;
  }
  bookmarkedRecipes.value.push(recipe);
  ElMessage.success("Oppskrift bokmerket: " + recipe.recipeTitle);
  console.log("add bookmark: " + recipe.recipeTitle);
}

function addIngredientsToShoppingList(recipe: Recipe) {
  recipe.recipeIngredients?.forEach((ingredient) => {
    ElMessage.success("Ingrediens lagt til handleliste: " + ingredient.ingredientName);
    console.log("add ingredient: " + ingredient.ingredientName);
    //api call to add ingredients to shopping list
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

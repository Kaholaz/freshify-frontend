<template>
  <div>
    <h1 v-if="currentRecipe === undefined">Oppskrifter</h1>
    
    <el-row :gutter="10" style="width: 100%; margin: 0">
      <!--No recipe selected-->
      <el-col
        v-if="currentRecipe === undefined"
        v-for="recipe in recipes"
        :key="recipe.id"
        :lg="12"
        :md="24"
        :sm="24"
        :xl="12"
        :xs="24"
      >
        <!--todo: This will be one recipe prop-->
        <RecipeCard
          class="recipe-card"
          :recipe = "recipe"
          @click="onClick(recipe)"
        />
      </el-col>
      <!--Recipe selected-->
      <RecipeSelected v-else :current-recipe="currentRecipe!" @remove-recipe="removeRecipe" @add-recipe-to-week-menu="addRecipeToWeekMenu(currentRecipe)"/>
    </el-row>
    
    
  </div>
</template>

<script lang="ts" setup>
import RecipeCard from "@/components/RecipeCard.vue";
import RecipeSelected from "@/components/RecipeSelected.vue";
import type { Ref } from "vue";
import { ref } from "vue";
import { ElMessage } from "element-plus";

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
    recipeDescription: "Taco er for mange selve fredagskosen. Fyll tacoskjell eller tortillalefser med kjøttdeig, grønnsaker, ost, salsa-tacosaus og rømme.",
    recipeTime: 30,
    recipeAmountIngredientsOwned: 5,
    recipeAllergies: ["kjøtt"],
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
    recipeDescription: "Pasta carbonara er en klassisk italiensk pastarett med egg, bacon og parmesan. Enkelt og veldig godt!",
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
    ]
  } as Recipe,
 
];

//todo: This will be a recipe type
const currentRecipe = ref<Recipe>();


function onClick(recipeClicked: Recipe) {
  console.log("clicked: " + recipeClicked.recipeTitle);
  currentRecipe.value = recipeClicked;
}

function removeRecipe() {
  //todo: better way of doing this?
  currentRecipe.value = undefined;
}

//todo: what day of the week?
function addRecipeToWeekMenu(recipe: Recipe) {
  ElMessage.success("Oppskrift lagt til i ukesmeny");
  console.log("add recipe to week menu: " + recipe.recipeTitle);
}

</script>

<style scoped>
.recipe-card:hover {
  background-color: #f5f5f5;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;
}
</style>

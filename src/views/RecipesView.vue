<template>
  <div>
    <h1>Oppskrifter</h1>
    
    <el-row :gutter="10" style="width: 100%; margin: 0">
      <!--No recipe selected-->
      <el-col
        v-if="currentRecipe.length < 1"
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
          :recipe-title="recipe.recipeTitle"
          :recipe-time="recipe.recipeTime"
          :recipe-amount-ingredients-owned="recipe.recipeAmountIngredientsOwned"
          :recipe-allergies="recipe.recipeAllergies"
          @click="onClick(recipe.recipeTitle)"
        />
      </el-col>
      <!--Recipe selected-->
      <Recipe v-else :current-recipe="currentRecipe" @remove-recipe="removeRecipe"/>
    </el-row>
    
    
  </div>
</template>

<script lang="ts" setup>
import RecipeCard from "@/components/RecipeCard.vue";
import Recipe from "@/components/Recipe.vue";
import { ref } from "vue";

//test recipes
const recipes = {
  taco: {
    id: 1,
    recipeTitle: "Taco",
    recipeTime: 30,
    recipeAmountIngredientsOwned: 5,
    recipeAllergies: ["melk", "egg", "gluten"],
  },
  pizza: {
    id: 2,
    recipeTitle: "Pizza",
    recipeTime: 40,
    recipeAmountIngredientsOwned: 3,
    recipeAllergies: ["gluten"],
  },
  pasta: {
    id: 3,
    recipeTitle: "Pasta",
    recipeTime: 20,
    recipeAmountIngredientsOwned: 7,
    recipeAllergies: ["egg", "gluten"],
  },
  burger: {
    id: 4,
    recipeTitle: "Burger",
    recipeTime: 30,
    recipeAmountIngredientsOwned: 2,
    recipeAllergies: ["gluten"],
  },
  sushi: {
    id: 5,
    recipeTitle: "Sushi",
    recipeTime: 60,
    recipeAmountIngredientsOwned: 1,
    recipeAllergies: [],
  },
};

//todo: This will be a recipe type
const currentRecipe = ref("");


function onClick(recipeTitle: string) {
  console.log("clicked: " + recipeTitle);
  currentRecipe.value = recipeTitle;
}

function removeRecipe() {
  currentRecipe.value = "";
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

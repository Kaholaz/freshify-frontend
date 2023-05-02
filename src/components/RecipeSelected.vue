<template>
  <el-col :lg="24" :md="24" :sm="24" :xl="24" :xs="24">
    <h2>{{ currentRecipe?.recipeTitle }}</h2>
    <h3>
      {{ currentRecipe?.recipeDescription }}
    </h3>
    <el-row class="ingredients-steps" :gutter="10">
      <el-col :span="12"
        ><div class="grid-content ep-bg-purple" />
        <h4>Ingredienser</h4>
        <p v-for="ingredient in currentRecipe?.recipeIngredients" :key="ingredient.id">
          {{ ingredient.ingredientAmount }} {{ ingredient.ingredientUnit }}
          {{ ingredient.ingredientName }}
        </p>
        <!-- <p style="word-wrap: normal">
          Pastasaus: 1 stk løk <br />
          1 ss olivenolje <br />
          1 stk hvitløksfedd <br />
          1 boks hermetiske tomater à 400 g <br />
          1 dl vann <br />
          2 ss oreganokrydder , ev. frisk hakket oregano <br />
          1 stk grønnsaksbuljongterning <br />
          ½ ts salt <br />
          ¼ ts pepper <br />
          1 ts sukker (kan sløyfes) <br />
          Kjøttboller:<br />
          400 g kjøttdeig eller karbonadedeig <br />
          1 stk egg <br />
          100 g parmesan <br />
          2 stk hvitløksfedd <br />
          ¼ ts oreganokrydder <br />
          ¼ ts salt <br />
          ¼ ts pepper <br />
          2 ss olivenolje (gjerne blandet med smør) til steking <br />
          spagetti: <br />
          400 g ukokt spaghetti<br />
        </p> -->
      </el-col>
      <el-col :span="12"
        ><div class="grid-content ep-bg-purple-light" />
        <h4>Slik gjør du det</h4>
        <p v-for="(step, index) in currentRecipe?.recipeSteps" :key="step">
          {{ index + 1 }} {{ step }}
        </p>
        <!-- <p>
          Pastasaus: <br />
          1. Finhakk løk og hvitløk. <br />
          2. Varm oljen i en kjele og fres løk og hvitløk til løken er blank. <br />
          3. Tilsett hermetiske tomater, vann, oregano, buljongterning, salt, pepper og sukker.
          <br />
          4. La sausen småkoke i ca. 10 minutter. <br />
          Kjøttboller: <br />
          1. Bland kjøttdeig, egg, revet parmesan, finhakket hvitløk, oregano, salt og pepper.
          <br />
          2. Form små kjøttboller med en skje og stek dem i olje i en stekepanne. <br />
          3. Legg kjøttbollene i pastasausen og la dem trekke i sausen i ca. 5 minutter. <br />
          Spagetti: <br />
          1. Kok spagettien etter anvisning på pakken. <br />
          2. Server kjøttboller og pastasaus med spagetti og gjerne revet parmesan. <br />
        </p> -->
      </el-col>
    </el-row>
  </el-col>
  <el-button type="primary" @click="emit('removeRecipe')">
    <el-icon>
      <Back />
    </el-icon>
    Tilbake til oppskrifter</el-button
  >
  <el-button v-if="!isBookmarked" type="success" @click="emit('bookmarkRecipe', currentRecipe!)">
    Bokmerk oppskriften</el-button
  >
  <el-button v-else type="success" @click="emit('bookmarkRecipe', currentRecipe)">
    Fjern bokmerke
  </el-button>
  <el-button type="success"> Legg til ingredienser i handleliste</el-button>
</template>

<script setup lang="ts">
import { Back } from "@element-plus/icons-vue";

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

const props = defineProps<{
  currentRecipe: Recipe;
  isBookmarked: boolean;
}>();

const emit = defineEmits<{
  (event: "removeRecipe"): void;
  //todo: add recipe to weekmenu
  (event: "bookmarkRecipe", args: Recipe): void;
}>();
</script>

<style scoped>
.ingredients-steps {
  margin: 1rem 0rem;
  width: fit-content;
}
</style>

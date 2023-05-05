<template>
  <el-card
    :style="{ 'border-color': allIngredientsInFridge ? 'var(--el-color-primary)' : '' }"
    shadow="hover"
    style="height: fit-content; cursor: pointer"
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
            v-for="category in props.recipe.categories"
            :key="category.id"
            style="margin-right: 0.2rem"
            >{{ category.name }}
          </el-tag>
        </el-row>
        <p>Tid: ca {{ recipe?.estimatedTime }} min</p>
        <p>{{ recipe?.totalIngredientsInFridge }} ingredienser i kjøleskap</p>
        <p v-if="allIngredientsInFridge" style="color: var(--el-color-primary)">
          alle ingredienser er i kjøleskap
        </p>
        <footer v-if="recipe?.allergens.length > 0">
          <el-row>
            <el-tag
              v-for="allergen in props.recipe.allergens"
              :key="allergen.id"
              style="margin-right: 0.2rem"
              type="danger"
              >{{ allergen.name }}
            </el-tag>
          </el-row>
        </footer>
      </div>
    </el-row>
  </el-card>
</template>

<script lang="ts" setup>
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

img {
  aspect-ratio: 16/9;
  object-fit: cover;
}
</style>

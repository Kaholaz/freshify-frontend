<template>
  <el-pagination
    v-model:current-page="currentPage"
    layout="prev, pager, next"
    :page-count="totalPages"
    @update:current-page="$emit('search')"
    hide-on-single-page
  >
  </el-pagination>
  <div class="recipe-container" v-if="recipes?.length > 0">
    <RecipeCard
      v-for="recipe in recipes"
      :key="recipe.id"
      class="recipe-card"
      :recipe="recipe"
      :is-bookmarked="false"
      @click="onClick(recipe)"
    />
  </div>
  <div class="recipe-container" v-else-if="recipes === undefined">
    <RecipeSkeleton count="5"></RecipeSkeleton>
  </div>
  <div v-else>
    <slot></slot>
  </div>
  <el-pagination
    v-model:current-page="currentPage"
    @update:current-page="$emit('search')"
    layout="prev, pager, next"
    :page-count="totalPages"
    hide-on-single-page
  ></el-pagination>
</template>
<script setup lang="ts">
import RecipeCard from "@/components/RecipeCard.vue";
import { Recipe, RecipeDTO } from "@/services";
import router from "@/router";
import { computed } from "vue";
import ShoppingListCardSkeleton from "@/components/ShoppingListCardSkeleton.vue";
import RecipeSkeleton from "@/components/RecipeSkeleton.vue";

const props = defineProps<{
  recipes: RecipeDTO[];
  totalPages: number;
  value: number;
}>();

const emit = defineEmits<{
  "update:model": (value: number) => void;
}>();

const currentPage = computed({
  get: () => props.value,
  set: (value) => emit("update:model", value),
});

function onClick(recipeClicked: Recipe) {
  router.push({ name: "recipe-view", params: { id: recipeClicked.id.toString() } });
}
</script>
<style scoped>
.recipe-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  grid-gap: 20px;
  width: 100%;
  transition: 2s;
}
</style>

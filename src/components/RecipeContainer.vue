<template>
  <el-pagination
    v-model:current-page="currentPage"
    :page-count="totalPages"
    hide-on-single-page
    layout="prev, pager, next"
    @update:current-page="$emit('search')"
  >
  </el-pagination>
  <div v-if="recipes?.length > 0" class="recipe-container">
    <RecipeCard
      v-for="recipe in recipes"
      :key="recipe.id"
      :is-bookmarked="false"
      :recipe="recipe"
      class="recipe-card"
      @click="onClick(recipe)"
    />
  </div>
  <div v-else-if="recipes === undefined" class="recipe-container">
    <RecipeSkeleton :count="1"></RecipeSkeleton>
    <RecipeSkeleton :count="1"></RecipeSkeleton>
    <RecipeSkeleton :count="1"></RecipeSkeleton>
    <RecipeSkeleton :count="1"></RecipeSkeleton>
  </div>
  <div v-else>
    <slot></slot>
  </div>
  <el-pagination
    v-model:current-page="currentPage"
    :page-count="totalPages"
    hide-on-single-page
    layout="prev, pager, next"
    @update:current-page="$emit('search')"
  ></el-pagination>
</template>
<script lang="ts" setup>
import RecipeCard from "@/components/RecipeCard.vue";
import { Recipe, RecipeDTO } from "@/services/index";
import router from "@/router";
import { computed } from "vue";
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
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  grid-gap: 20px;
  width: 100%;
  transition: 2s;
}
</style>

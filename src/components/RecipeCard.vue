<template>
  <el-card
    class="relative m-2 w-full max-w-xl overflow-visible"
    shadow="hover"
    style="height: fit-content"
  >
    <el-row>
      <img :src="recipe.image" style="width: 100%" />
      <div class="content">
        <h2>{{ recipe?.name }}</h2>
        <el-icon v-if="isBookmarked">
          <Management color="orange" />
        </el-icon>
        <p>Tid: ca {{ recipe?.estimatedTime }} min</p>
        <p>
          <!--Implement this again-->
          {{ recipe.totalIngredientsInFridge }} ingredienser i kjøleskap
        </p>
        <footer class="mt-2 text-right">
          <h5 class="mb-5">Allergier:</h5>
          <p class="text-[#868e96]" v-if="recipe?.allergens?.length! > 0">{{ allergies }}</p>
          <p class="text-[#868e96]" v-else>ingen</p>
        </footer>
      </div>
    </el-row>
  </el-card>
</template>

<script setup lang="ts">
import type { Ref } from "vue";
import { ref, computed, onMounted } from "vue";
import type {
  Recipe,
  RecipeIngredient,
  ItemType,
  AllergenRequest,
  RecipeCategory,
  RecipeDTO,
} from "@/services/index";
import { Management } from "@element-plus/icons-vue";

// Define APIs and stores

// Define props (will be recipe type)
const props = defineProps<{
  recipe: RecipeDTO;
  isBookmarked: boolean;
}>();
// Define refs

// Define computed values
const allergies = computed(() => {
  let allergies = "";
  props.recipe?.allergens!.forEach((element) => {
    allergies += element.name + ", ";
  });
  return allergies.slice(0, -2);
});
// Vue hooks
onMounted(() => {});

// Other script logic
</script>

<style scoped>
.recipe-card-wrapper {
}

.top {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.content {
  margin-top: 13px;
  align-items: center;
}
</style>

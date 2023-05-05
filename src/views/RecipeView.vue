<template>
  <div v-if="!doesExist">
    <el-alert v-if="!doesExist" center show-icon title="Fant ingen oppskrift" type="info">
    </el-alert>
  </div>
  <div v-else>
    <el-page-header @back="goBack">
      <template #breadcrumb>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item to="/recipes"> recipes</el-breadcrumb-item>
          <el-breadcrumb-item>{{ currentRecipe?.name.toLowerCase() }}</el-breadcrumb-item>
        </el-breadcrumb>
      </template>
      <template #extra>
        <el-button v-if="!isBookmarked" type="primary" @click="addToBookmarked">
          Bokmerk oppskriften
        </el-button>
        <el-button v-else type="primary" @click="removeFromBookmarked"> Fjern bokmerke</el-button>
      </template>
    </el-page-header>
    <img :src="currentRecipe?.image" alt="" class="recipe-image" />
    <h1>{{ currentRecipe?.name }}</h1>
    <el-tag
      v-for="category in currentRecipe?.categories"
      :key="category.id"
      style="margin-right: 0.2rem"
      >{{ category.name }}
    </el-tag>
    <el-tag
      v-for="allergen in currentRecipe?.allergens"
      :key="allergen.id"
      style="margin-right: 0.2rem"
      type="danger"
      >{{ allergen.name }}
    </el-tag>
    <h3>
      {{ currentRecipe?.description }}
    </h3>
    <el-divider />
    <h4>
      <span>
        Ingredienser (<el-input
          id="portion-input"
          v-model="recipePortions"
          type="number"
        ></el-input>
        porsjoner)
      </span>
    </h4>
    <p v-for="ingredient in currentRecipe?.recipeIngredients" :key="ingredient.id">
      {{ ingredient.amount ? (ingredient.amount * recipePortions) / 4 : "??" }}
      {{ ingredient.unit }}
      {{ ingredient.itemType?.name }}
    </p>
    <el-button
      v-if="
        totalIngredients(currentRecipe?.recipeIngredients) !=
        currentRecipe?.totalIngredientsInFridge
      "
      style="margin-top: 1rem"
      type="primary"
      @click="
        updateMissingIngredients();
        addToShoppingDialogVisible = true;
      "
    >
      Legg til manglende varer på handlelista
    </el-button>
    <el-tag v-else style="margin-top: 1rem">Du har alle ingredienser</el-tag>
    <el-divider></el-divider>

    <h4>Slik gjør du det</h4>
    <p v-for="(step, index) in recipeSteps" :key="index">{{ step }}</p>
  </div>
  <el-dialog v-model="addToShoppingDialogVisible">
    <div id="required-ingredients">
      <h5>Manglende ingredienser</h5>
      <p v-for="ingredient in missingIngredients" :key="ingredient.id">
        {{ ingredient.amount }} {{ ingredient!.unit }} {{ ingredient.itemType?.name }}
      </p>
    </div>
    <div id="add-ingredients-draft" style="margin-top: 20px">
      <h5>Velg antall av hver vare som du vil legge til i handlelista:</h5>
      <p v-for="ingredient in missingIngredients" :key="ingredient.id" style="margin-top: 5px">
        {{ ingredient.itemType?.name }}:
        <el-input v-model="missingIngredientsDraft[ingredient.id!]" type="number"></el-input>
      </p>
    </div>
    <div class="buttons" style="margin-top: 18px">
      <el-button type="success" @click="addMissingIngredientsToShoppingList">
        Legg til i handlelista
      </el-button>
      <el-button type="danger" @click="addToShoppingDialogVisible = false">Avbryt</el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import type { RecipeDTO, RecipeIngredient } from "@/services/index";
import {
  HouseholdApi,
  HouseholdRecipeApi,
  InventoryApi,
  RecipesApi,
  ShoppingListApi,
} from "@/services/index";
import router from "@/router";
import { useHouseholdStore } from "@/stores/household";
import { ElMessage } from "element-plus";
import { showError } from "@/utils/error-utils";
import { totalIngredients } from "@/utils/total-ingredients";

const recipeApi = new RecipesApi();
const householdRecipeApi = new HouseholdRecipeApi();
const householdApi = new HouseholdApi();
const inventoryApi = new InventoryApi();
const shoppingListApi = new ShoppingListApi();

// {itemId: amount}
const missingIngredientsDraft = ref({} as Record<number, number>);

const householdStore = useHouseholdStore();

const currentRecipe = ref<RecipeDTO>();
const recipePortions = ref(4);
const addToShoppingDialogVisible = ref(false);

if (householdStore.household) {
  householdApi
    .getUsers(householdStore.household.id!)
    .then((response) => (recipePortions.value = response.data.length));
}

const recipeSteps = computed(() => {
  if (!currentRecipe.value) return [];
  return currentRecipe?.value?.steps?.split("\n") ?? [];
});

const recipeId = computed(() => {
  return router.currentRoute.value.params.id;
});

const missingIngredients = ref<RecipeIngredient[]>([]);

function updateMissingIngredients() {
  inventoryApi.getInventoryItems(householdStore.household?.id!).then((response) => {
    let missingIngredientIDs = response.data.map((item) => item.type?.id).filter((el) => el);
    missingIngredients.value =
      currentRecipe.value?.recipeIngredients?.filter((ingredient) => {
        return !missingIngredientIDs.includes(ingredient.itemType?.id!);
      }) || [];

    missingIngredients.value.forEach((ingredient) => {
      missingIngredientsDraft.value[ingredient.id!] = 1;
    });
  });
}

onMounted(async () => {
  await router.isReady();
  console.log(recipeId.value);
  fetchRecipe();
});

const isBookmarked = ref(false);

const doesExist = ref(true as boolean);

function fetchRecipe() {
  if (!householdStore.household) return;
  recipeApi
    .getRecipeById(householdStore.household.id, recipeId.value)
    .then((data) => {
      currentRecipe.value = data.data;
      isBookmarked.value = data.data.isInHousehold;
      console.log(currentRecipe.value?.totalIngredientsInFridge);
      console.log(currentRecipe.value?.recipeIngredients?.length);
    })
    .catch((error) => {
      console.log(error.response?.status);
      if (error.response?.status == 404) {
        console.log("heiheihei");
        doesExist.value = false;
      } else {
        showError("Kunne ikke hente bokmerkede oppskrifter", "Prøv igjen senere", 0);
      }
    });
}

function removeFromBookmarked() {
  isBookmarked.value = !isBookmarked.value;
  householdRecipeApi
    .removeHouseholdRecipe(householdStore.household?.id!, currentRecipe.value?.id!)
    .then(() => {
      console.log("remove bookmark: " + currentRecipe.value?.name);
    })
    .catch(() => {
      ElMessage.error("Kunne ikke fjerne bokmerket for oppskrift: " + currentRecipe.value?.name);
    });
}

function addToBookmarked() {
  isBookmarked.value = !isBookmarked.value;
  householdRecipeApi
    .createHouseholdRecipe(householdStore.household?.id!, currentRecipe.value?.id!)
    .then(() => {
      ElMessage.success("Oppskrift bokmerket: " + currentRecipe.value?.name);
    })
    .catch(() => {
      ElMessage.error("Kunne ikke legge til oppskrift i husstanden");
    });
}

function addMissingIngredientsToShoppingList() {
  if (!householdStore.household) return;
  for (const itemId in missingIngredientsDraft.value) {
    let count = missingIngredientsDraft.value[itemId];
    console.info(`Create ${count} shopping list entries for item id: ${itemId}`);
    if (!count) continue;
    shoppingListApi
      .addItem(householdStore.household?.id!, {
        itemTypeId: parseInt(itemId),
        count,
        suggested: false,
      })
      .then(() => {
        ElMessage.success("Vare ble lagt til i handlekurven");
      })
      .catch((err) => showError("Kunne ikke legge til ingredienser i handlelisten", err.message));
  }
  addToShoppingDialogVisible.value = false;
}

function goBack() {
  router.back();
}
</script>
<style scoped>
.recipe-image {
  width: 100%;
  max-height: 30rem;
  object-fit: cover;
  margin-top: 1rem;
}

.el-input {
  max-width: 4rem;
}
</style>
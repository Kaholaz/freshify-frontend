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
        <el-dropdown :hide-on-click="false">
          <el-button type="primary">
            Velg allergier<el-icon class="el-icon--right"><arrow-down /></el-icon>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu class="dropdown-menu">
              <el-checkbox
                v-model="glutenChecked"
                class="allergy-checkbox"
                size="large"
                label="Gluten"
              />
              <el-checkbox
                v-model="shellfishChecked"
                class="allergy-checkbox"
                size="large"
                label="Skalldyr"
              />
              <el-checkbox v-model="eggChecked" class="allergy-checkbox" size="large" label="Egg" />
              <el-checkbox
                v-model="fishChecked"
                class="allergy-checkbox"
                size="large"
                label="Fisk"
              />
              <el-checkbox
                v-model="peanutsChecked"
                class="allergy-checkbox"
                size="large"
                label="Peanøtter"
              />
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <el-button> Search </el-button>
      </div>
      <!--No recipe selected-->

      <el-col
        v-for="recipe in recipes.sort((a, b) => b.totalIngredientsInFridge! - a.totalIngredientsInFridge!)"
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
import type {
  Recipe,
  RecipeIngredient,
  ItemType,
  Item,
  AllergenRequest,
  RecipeCategory,
  RecipeDTO,
} from "@/services/index";
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { Search, ArrowDown } from "@element-plus/icons-vue";
import { RecipesApi } from "@/services/apis/recipes-api";
import { ShoppingListApi, InventoryApi } from "@/services/index";
import { useHouseholdStore } from "@/stores/household";

const recipesApi = new RecipesApi();
const inventoryApi = new InventoryApi();
const shoppingListApi = new ShoppingListApi();
const householdStore = useHouseholdStore();

const glutenChecked = ref(false);
const shellfishChecked = ref(false);
const eggChecked = ref(false);
const fishChecked = ref(false);
const peanutsChecked = ref(false);

/* type Ingredient = {
  id: number;
  ingredientName: string;
  ingredientAmount: number;
  ingredientUnit: string;
}; */

/* type Recipe = {
  id: number;
  recipeTitle: string;
  recipeDescription: string;
  recipeTime: number;
  recipeAmountIngredientsOwned: number;
  recipeAllergies: string[];
  recipeIngredients?: Ingredient[];
  recipeSteps?: string[];
}; */

//test recipes, todo: needs ingredients and steps
const recipesTest = [
  {
    id: 1,
    name: "Taco",
    description:
      "Taco er for mange selve fredagskosen. Fyll tacoskjell eller tortillalefser med kjøttdeig, grønnsaker, ost, salsa-tacosaus og rømme.",
    estimatedTime: 30,
    steps: "Stek kjøttdeig, kutt grønnsaker, varm lefser, server",
    /*     recipeAmountIngredientsOwned: 5, */
    recipeIngredients: [
      {
        id: 1,
        itemType: {
          id: 1,
          name: "kjøttdeig",
        } as ItemType,
        amount: 400,
        unit: "g",
      },
      {
        id: 2,
        itemType: {
          id: 2,
          name: "taco krydder",
        } as ItemType,
        amount: 1,
        unit: "pose",
      },
      {
        id: 3,
        itemType: {
          id: 3,
          name: "tortilla lefser",
        } as ItemType,
        amount: 1,
        unit: "pakke",
      },
      {
        id: 4,
        itemType: {
          id: 4,
          name: "agurk",
        } as ItemType,
        amount: 1,
        unit: "stk",
      },
      {
        id: 5,
        itemType: {
          id: 5,
          name: "tomat",
        } as ItemType,
        amount: 1,
        unit: "stk",
      },
      {
        id: 6,
        itemType: {
          id: 6,
          name: "rømme",
        } as ItemType,
        amount: 1,
        unit: "boks",
      },
      {
        id: 7,
        itemType: {
          id: 7,
          name: "tacosaus",
        } as ItemType,
        amount: 1,
        unit: "boks",
      },
    ] as RecipeIngredient[],
    allergens: [
      {
        id: 1,
        name: "gluten",
      } as AllergenRequest,
      {
        id: 2,
        name: "egg",
      } as AllergenRequest,
    ],
  } as Recipe,
];

const recipes = ref<RecipeDTO[]>([]);

recipesApi.getRecipesPaginated(householdStore.household?.id!, 10).then((response) => {
  recipes.value = response.data.content;
});

const currentRecipe = ref<Recipe>();
const recipeSearch = ref<string>("");
//api call: householdrecipes
const bookmarkedRecipes = ref<Recipe[]>([]);

function onClick(recipeClicked: Recipe) {
  console.log("clicked: " + recipeClicked.name);
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
    ElMessage.warning("Fjenrnet bokmerket for oppskrift: " + recipe.name);
    console.log("remove bookmark: " + recipe.name);
    return;
  }
  bookmarkedRecipes.value.push(recipe);
  ElMessage.success("Oppskrift bokmerket: " + recipe.name);
  console.log("add bookmark: " + recipe.name);
}

async function addIngredientsToShoppingList(recipe: Recipe) {
  let inventoryItems: Item[];
  let itemsToAdd = [];
  await inventoryApi.getInventoryItems(householdStore.household?.id!).then((response) => {
    inventoryItems = response.data;
  });
  recipe.recipeIngredients?.forEach((ingredient) => {
    if (inventoryItems?.find((item) => item.type?.id === ingredient.itemType?.id) === undefined) {
      console.log(
        "item: " +
          ingredient.itemType?.name +
          " not found in inventory, will be added to shopping list"
      );
      let ingredientToAdd = {
        ItemTypeId: ingredient.itemType?.id,
        count: 1,
        suggested: false,
      };
      itemsToAdd.push(ingredientToAdd);
    } else {
      console.log(
        "item: " +
          ingredient.itemType?.name +
          " found in inventory, will not be added to shopping list"
      );
    }
  });
  if (itemsToAdd.length > 0) {
    itemsToAdd.forEach((element) => {
      shoppingListApi
        .addItem(householdStore.household?.id!, element)
        .then((response) => {
          if (response.status === 201) {
            ElMessage.success("Ingrediens lagt til handleliste: " + element.ItemTypeId);
          }
        })
        .catch((error) => {
          ElMessage.error(
            "Kunne ikke legge til ingrediens: " + element.ItemTypeId + " i handlelisten"
          );
        });
    });
  }
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

.dropdown-menu {
  display: flex;
  align-items: left;
  flex-direction: column;
  justify-content: left;
}

.allergy-checkbox {
  margin-left: 1rem;
}
</style>

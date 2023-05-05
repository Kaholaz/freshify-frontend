import type { RecipeIngredientResponse } from "@/services";

const blackListItems = {
  Vann: true,
} as { [key: string]: boolean };

export function totalIngredients(ingredients: RecipeIngredientResponse[] | undefined): number {
  if (!ingredients) {
    return 0;
  }
  let total = 0;
  ingredients.forEach((ingredient) => {
    if (!blackListItems[ingredient.itemType!.name]) {
      total++;
    }
  });
  return total;
}

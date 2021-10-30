import {createSelector} from "@ngrx/store";
import {RecipeState} from "./recipe.reducer";
import {Recipe} from "../models/Recipe";

export const recipeSelector = createSelector(
  (state: RecipeState) => state.recipes,
  (recipes: ReadonlyArray<Recipe>) => recipes
);

export const selectedRecipeSelector = createSelector(
  (state: RecipeState) => state.selectedRecipe,
  (recipe: Readonly<Recipe>) => recipe
);

export const recipeIdSelector = (id: string) => {
  createSelector(recipeSelector, (recipes) => {
    return recipes.filter((recipe: Recipe) => recipe.id === id);
  })
};

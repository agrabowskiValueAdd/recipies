import {createFeatureSelector, createSelector} from "@ngrx/store";
import {RecipeState} from "./recipe.reducer";
import {Recipe} from "../models/Recipe";
import * as fromRecipe from './recipe.reducer'

const getRecipeState = createFeatureSelector<RecipeState>('recipes');

export const getAllRecipes = createSelector(
  getRecipeState,
  fromRecipe.getRecipes
);

export const getSelectedRecipe = (state: RecipeState) => state.selectedRecipe;

// to test, this or aboveng
// export const selectedRecipeSelector = createSelector(
//   (state: RecipeState) => state.selectedRecipe,
//   (recipe: Readonly<Recipe>) => recipe
// );

export const recipeIdSelector = (id: string) => {
  createSelector(getAllRecipes, (recipes) => {
    return recipes.filter((recipe: Recipe) => recipe.id === id);
  })
};

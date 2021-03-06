import {createFeatureSelector, createSelector} from "@ngrx/store";
import {RecipeState} from "./recipe.reducer";
import * as fromRecipe from './recipe.reducer'

const getRecipeState = createFeatureSelector<RecipeState>('recipes');

export const getAllRecipes = createSelector(
  getRecipeState,
  fromRecipe.getRecipes
);

export const getSelectedRecipe = createSelector(
  getRecipeState,
  fromRecipe.getSelectedRecipe
);

export const getEditorType = createSelector(
  getRecipeState,
  fromRecipe.getEditorType
);

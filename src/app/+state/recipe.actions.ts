import {createAction, props} from "@ngrx/store";
import {Recipe} from "../models/Recipe";

// load recipes
export const getRecipes = createAction('[Recipes] Get Recipes');

export const getRecipesSuccess = createAction(
  '[Recipes] Get Recipes Success',
  (recipes: ReadonlyArray<Recipe>) => recipes
  // props<{recipes: ReadonlyArray<Recipe>}>()
)

export const selectRecipe = createAction(
  '[Recipes] Select Recipe',
  (recipe: Recipe) => recipe
  // props<{recipe: Recipe}>());
);

export const createRecipe = createAction(
  '[Recipes] Create Recipe',
  (recipe: Recipe) => recipe
);

export const createRecipeSuccess = createAction(
  '[Recipes] Create Recipe Success',
  (recipe: Recipe) => recipe
);

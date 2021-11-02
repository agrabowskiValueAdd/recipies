import {createAction, props} from "@ngrx/store";
import {Recipe} from "../models/Recipe";

// load recipes
export const getRecipes = createAction('[Recipes] Get Recipes');

export const getRecipesSuccess = createAction(
  '[Recipes] Get Recipes Success',
  (recipes: Recipe[]) => ({recipes})
  // props<{recipes: Recipe[]}>()
);

export const selectRecipe = createAction(
  '[Recipes] Select Recipe',
  (recipe: Recipe) => recipe
  // props<{recipe: Recipe}>());
);

export const editRecipe = createAction(
  '[Recipes] Edit Recipe',
  (recipe: Recipe) => recipe
);

export const addRecipe = createAction('[Recipes] Add Recipe');

export const updateRecipe = createAction(
  '[Recipes] Update Recipe',
  (recipe: Recipe) => recipe
);

export const updateRecipeSuccess = createAction(
  '[Recipes] Update Recipe Success',
  (recipe: Recipe) => recipe
);

export const createRecipe = createAction(
  '[Recipes] Create Recipe',
  (recipe: Recipe) => recipe
);

export const createRecipeSuccess = createAction(
  '[Recipes] Create Recipe Success',
  (recipe: Recipe) => recipe
);

export const deleteRecipe = createAction(
  '[Recipes] Delete Recipe',
  // (recipe: Recipe) => recipe
  props<{recipeId: string}>()
);

export const deleteRecipeSuccess = createAction(
  '[Recipe] Delete Recipe Success',
  // (recipe: Recipe) => recipe
  props<{recipeId: string}>()
)

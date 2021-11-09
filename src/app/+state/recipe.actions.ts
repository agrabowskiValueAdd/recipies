import {createAction, props} from "@ngrx/store";
import {Recipe} from "../models/Recipe";

// load recipes
export const GetRecipesCollection = createAction('[Recipes] Get Recipes');

export const GetRecipesCollectionSuccess = createAction(
  '[Recipes] Get Recipes Collection Success',
  (recipes: Recipe[]) => ({recipes})
  // props<{recipes: Recipe[]}>()
);

export const GetRecipesCollectionError = createAction(
  '[Recipes] Get Recipes Collection Error'
);

export const SelectRecipe = createAction(
  '[Recipes] Select Recipe',
  (recipe: Recipe) => recipe
  // props<{recipe: Recipe}>());
);

export const GetRecipeById = createAction(
  '[Recipes] Get Recipe By Id',
  props<{id: string}>()
);

export const GetRecipeByIdSuccess = createAction(
  '[Recipes] Get Recipe By Id Success',
  (recipe: Recipe) => recipe
);

export const GetRecipeByIdError = createAction(
  '[Recipes] Get Recipe By Id Error'
);

export const OpenEditRecipeForm = createAction(
  '[Recipes] Open Edit Recipe Form',
  (recipe: Recipe) => recipe
);

export const OpenAddRecipeForm = createAction('[Recipes] Open Add Recipe Form');

export const UpdateRecipe = createAction(
  '[Recipes] Update Recipe',
  (recipe: Recipe) => recipe
);

export const UpdateRecipeSuccess = createAction(
  '[Recipes] Update Recipe Success',
  (recipe: Recipe) => recipe
);

export const UpdateRecipeError = createAction(
  '[Recipes] Update Recipe Error'
);

export const CreateRecipe = createAction(
  '[Recipes] Create Recipe',
  (recipe: Recipe) => recipe
);

export const CreateRecipeSuccess = createAction(
  '[Recipes] Create Recipe Success',
  (recipe: Recipe) => recipe
);

export const CreateRecipeError = createAction(
  '[Recipes] Create Recipe Error'
);

export const RemoveRecipe = createAction(
  '[Recipes] Remove Recipe',
  // (recipe: Recipe) => recipe
  props<{recipeId: string}>()
);

export const RemoveRecipeSuccess = createAction(
  '[Recipes] Remove Recipe Success',
  // (recipe: Recipe) => recipe
  props<{recipeId: string}>()
);

export const RemoveRecipeError = createAction(
  '[Recipes] Remove Recipe Error'
);

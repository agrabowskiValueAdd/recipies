import {createAction, props} from "@ngrx/store";
import {Recipe} from "../models/Recipe";

// load recipes
export const GetRecipesCollection = createAction('[Recipes] Get Recipes');

export const GetRecipesCollectionSuccess = createAction(
  '[Recipes] Get Recipes Success',
  (recipes: Recipe[]) => ({recipes})
  // props<{recipes: Recipe[]}>()
);

export const SelectRecipe = createAction(
  '[Recipes] Select Recipe',
  (recipe: Recipe) => recipe
  // props<{recipe: Recipe}>());
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

export const CreateRecipe = createAction(
  '[Recipes] Create Recipe',
  (recipe: Recipe) => recipe
);

export const CreateRecipeSuccess = createAction(
  '[Recipes] Create Recipe Success',
  (recipe: Recipe) => recipe
);

export const RemoveRecipe = createAction(
  '[Recipes] Remove Recipe',
  // (recipe: Recipe) => recipe
  props<{recipeId: string}>()
);

export const RemoveRecipeSuccess = createAction(
  '[Recipe] Remove Recipe Success',
  // (recipe: Recipe) => recipe
  props<{recipeId: string}>()
)

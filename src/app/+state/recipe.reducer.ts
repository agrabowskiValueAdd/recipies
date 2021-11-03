import {Recipe} from "../models/Recipe";
import {createReducer, on} from "@ngrx/store";
import * as recipeActions from './recipe.actions'

export interface RecipeState {
  recipes: Recipe[];
  selectedRecipe: Recipe;
  editorType: string;
}

const initialState: RecipeState = {
  recipes: [],
  selectedRecipe: {
    id: '',
    name:'',
    ingredients: [],
    description: '',
    preparationTimeInMinutes: 0
  },
  editorType: ''

}

export const recipeReducer = createReducer(
  initialState,
  on(recipeActions.getRecipesSuccess, (state, {recipes}) => ({...state, recipes})),

  // click on Add Recipe button
  on(recipeActions.addRecipe, (state) => (
    {
      ...state,
      editorType: 'create'
    }
  )),

  on(recipeActions.createRecipeSuccess, (state, recipe) => ({...state, recipes: [...state.recipes, recipe]})),

  on(recipeActions.selectRecipe, (state, recipe) => (
    {
      ...state,
      selectedRecipe: recipe,
      editorType: 'preview'
    }
  )),

  // click on Edit Recipe button
  on(recipeActions.editRecipe, (state, recipe) => (
    {
      ...state,
      selectedRecipe: recipe,
      editorType: 'edit'
    }
  )),

  on(recipeActions.updateRecipeSuccess, (state, updatedRecipe) => (
    {
      ...state,
      recipes: state.recipes.map((r) => {
        if (r.id === updatedRecipe.id) {
          return updatedRecipe;
        }
        return r;
      }),
      selectedRecipe: updatedRecipe,
      editorType: 'preview'
    }
  )),

  on(recipeActions.deleteRecipeSuccess, (state, recipeId) => (
    {
      ...state,
      recipes: state.recipes.filter(recipe => recipe.id !== recipeId)
    }
  ))
)

export const getRecipes = (state: RecipeState) => state.recipes;
export const getSelectedRecipe = (state: RecipeState) => state.selectedRecipe;
export const getEditorType = (state: RecipeState) => state.editorType;

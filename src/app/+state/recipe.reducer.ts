import {Recipe} from "../models/Recipe";
import {createReducer, on} from "@ngrx/store";
import * as fromRecipeActions from './recipe.actions'

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
  on(fromRecipeActions.GetRecipesCollectionSuccess, (state, {recipes}) => ({...state, recipes})),

  // click on Add Recipe button
  on(fromRecipeActions.OpenAddRecipeForm, (state) => (
    {
      ...state,
      editorType: 'create'
    }
  )),

  on(fromRecipeActions.CreateRecipeSuccess, (state, recipe) => (
    {
      ...state,
      recipes: [...state.recipes, recipe],
      selectedRecipe: recipe,
      editorType: 'preview'
    })),

  on(fromRecipeActions.SelectRecipe, (state, recipe) => (
    {
      ...state,
      selectedRecipe: recipe,
      editorType: 'preview'
    }
  )),

  // click on Edit Recipe button
  on(fromRecipeActions.OpenEditRecipeForm, (state, recipe) => (
    {
      ...state,
      selectedRecipe: recipe,
      editorType: 'edit'
    }
  )),

  on(fromRecipeActions.UpdateRecipeSuccess, (state, updatedRecipe) => (
    {
      ...state,
      recipes: state.recipes.map((r) => {
        return updatedRecipe.id === r.id ? updatedRecipe : r;
      }),
      selectedRecipe: updatedRecipe,
      editorType: 'preview'
    }
  )),

  // TO FIX, stan sie nie zmienia
  on(fromRecipeActions.RemoveRecipeSuccess, (state, recipeId) => (
    {
      ...state,
      recipes: state.recipes.filter(recipe => recipe.id !== recipeId)
    }
  )),

  on(fromRecipeActions.GetRecipeByIdSuccess, (state, recipe) => (
    {
      ...state,
      selectedRecipe: recipe,
      editorType: 'preview'
    }
  ))
)

export const getRecipes = (state: RecipeState) => state.recipes;
export const getSelectedRecipe = (state: RecipeState) => state.selectedRecipe;
export const getEditorType = (state: RecipeState) => state.editorType;

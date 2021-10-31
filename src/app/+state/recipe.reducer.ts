import {Recipe} from "../models/Recipe";
import {createReducer, on} from "@ngrx/store";
import * as recipeActions from './recipe.actions'
import {Action} from "rxjs/internal/scheduler/Action";

export interface RecipeState {
  recipes: Recipe[];
  selectedRecipe: Recipe;
  showEditor: boolean;
  showRecipe: boolean;
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
  showEditor: false,
  showRecipe: false
}

export const recipeReducer = createReducer(
  initialState,
  on(recipeActions.getRecipes, (state) => ({...state})),
  on(recipeActions.getRecipesSuccess, (state, {recipes}) => ({...state, recipes})),
  // on(recipeActions.createRecipeSuccess, (state, recipe) => ({...state, recipes: [...state.recipes, recipe]}))
  on(recipeActions.createRecipeSuccess, (state, recipe) => ({...state, recipe})),
  on(recipeActions.selectRecipe, (state, recipe) => ({...state, selectedRecipe: recipe}))
)

export const getRecipes = (state: RecipeState) => state.recipes;
export const getSelectedRecipe = (state: RecipeState) => state.selectedRecipe;

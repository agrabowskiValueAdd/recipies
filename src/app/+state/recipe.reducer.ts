import {Recipe} from "../models/Recipe";
import {createReducer, on} from "@ngrx/store";
import * as recipeActions from './recipe.actions'

export interface RecipeState {
  recipes: ReadonlyArray<Recipe> ;
  selectedRecipe: Readonly<Recipe>;
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
  on(recipeActions.getRecipesSuccess, (state: RecipeState) => ({...state})),
  // on(recipeActions.createRecipeSuccess, (state, recipe) => ({...state, recipes: [...state.recipes, recipe]}))
  on(recipeActions.createRecipeSuccess, (state, recipe) => ({...state, recipe})),
  on(recipeActions.selectRecipe, (state, recipe) => ({...state, selectedRecipe: recipe}))
)

import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {RecipeService} from "../services/recipe.service";
import * as recipeActions from './recipe.actions'
import {catchError, concatMap, exhaustMap, map} from "rxjs/operators";
import {Recipe} from "../models/Recipe";

@Injectable()
export class RecipeEffects {

  loadRecipes$ = createEffect(() => this.action$.pipe(
    ofType(recipeActions.getRecipes),
    exhaustMap(() => this.recipeService.getRecipes().pipe(
      map((recipes: Recipe[]) => recipeActions.getRecipesSuccess(recipes)),
      //catchError
    ))
  )
 );


  createRecipe$ = createEffect(() => this.action$.pipe(
    ofType(recipeActions.createRecipe),
    concatMap((newRecipe: Recipe) => this.recipeService.createRecipe(newRecipe).pipe(
      map((recipe: Recipe) => recipeActions.createRecipeSuccess(recipe)),
      //catchError
    ))
  ))

  constructor(private action$: Actions, private recipeService: RecipeService) {}
}

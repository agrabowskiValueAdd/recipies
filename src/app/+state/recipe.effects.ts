import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {RecipeService} from "../services/recipe.service";
import * as recipeActions from './recipe.actions'
import {catchError, concatMap, exhaustMap, map, mergeMap, tap} from "rxjs/operators";
import {Recipe} from "../models/Recipe";
import {MatSnackBar} from "@angular/material/snack-bar";
import {EMPTY} from "rxjs";

@Injectable()
export class RecipeEffects {
  constructor(private action$: Actions, private recipeService: RecipeService, private snackBar: MatSnackBar) {}

  loadRecipes$ = createEffect(() => this.action$.pipe(
      ofType(recipeActions.getRecipes),
      exhaustMap(() => this.recipeService.getRecipes().pipe(
        map((recipes: Recipe[]) => recipeActions.getRecipesSuccess(recipes)),
        catchError(() => EMPTY)
      ))
    )
  );

  createRecipe$ = createEffect(() => this.action$.pipe(
    ofType(recipeActions.createRecipe),
    concatMap((newRecipe: Recipe) => this.recipeService.createRecipe(newRecipe).pipe(
      map((recipe: Recipe) => recipeActions.createRecipeSuccess(recipe)),
      catchError(() => EMPTY),
      tap(() => this.snackBar.open('Recipe added', 'OK', {duration: 3000}))
    ))
  ));

  updateRecipe$ = createEffect(() => this.action$.pipe(
    ofType(recipeActions.updateRecipe),
    concatMap((updatedRecipe: Recipe) => this.recipeService.updateRecipe(updatedRecipe).pipe(
      map((recipe: Recipe) => recipeActions.updateRecipeSuccess(recipe)),
      catchError(() => EMPTY),
      tap(() => this.snackBar.open('Recipe updated', 'OK', {duration: 3000}))
    ))
  ))

  deleteRecipe$ = createEffect(() => this.action$.pipe(
    ofType(recipeActions.deleteRecipe),
    mergeMap(({recipeId}) => this.recipeService.deleteRecipe(recipeId).pipe(
      map(() => recipeActions.deleteRecipeSuccess({recipeId})),
      catchError(() => EMPTY),
      tap(() => this.snackBar.open('Recipe deleted', 'OK', {duration: 3000}))
    ))
  ))
}

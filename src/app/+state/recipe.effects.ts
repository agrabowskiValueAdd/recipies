import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {RecipeService} from "../services/recipe.service";
import * as fromRecipeActions from './recipe.actions'
import {catchError, concatMap, exhaustMap, map, mergeMap, tap} from "rxjs/operators";
import {Recipe} from "../models/Recipe";
import {MatSnackBar} from "@angular/material/snack-bar";
import {EMPTY, from, of} from "rxjs";

@Injectable()
export class RecipeEffects {
  constructor(private action$: Actions, private recipeService: RecipeService, private snackBar: MatSnackBar) {}

  loadRecipes$ = createEffect(() => this.action$.pipe(
      ofType(fromRecipeActions.GetRecipesCollection),
      exhaustMap(() => this.recipeService.getRecipes().pipe(
        map((recipes: Recipe[]) => fromRecipeActions.GetRecipesCollectionSuccess(recipes)),
        catchError(() => of(fromRecipeActions.GetRecipesCollectionError()))
      ))
    )
  );

  createRecipe$ = createEffect(() => this.action$.pipe(
    ofType(fromRecipeActions.CreateRecipe),
    concatMap((newRecipe: Recipe) => this.recipeService.createRecipe(newRecipe).pipe(
      map((recipe: Recipe) => fromRecipeActions.CreateRecipeSuccess(recipe)),
      catchError(() => of(fromRecipeActions.CreateRecipeError())),
      tap(() => this.snackBar.open('Recipe added', 'OK', {duration: 3000}))
    ))
  ));

  updateRecipe$ = createEffect(() => this.action$.pipe(
    ofType(fromRecipeActions.UpdateRecipe),
    concatMap((updatedRecipe: Recipe) => this.recipeService.updateRecipe(updatedRecipe).pipe(
      map((recipe: Recipe) => fromRecipeActions.UpdateRecipeSuccess(recipe)),
      catchError(() => of(fromRecipeActions.UpdateRecipeError())),
      tap(() => this.snackBar.open('Recipe updated', 'OK', {duration: 3000}))
    ))
  ))

  removeRecipe$ = createEffect(() => this.action$.pipe(
    ofType(fromRecipeActions.RemoveRecipe),
    mergeMap(({recipeId}) => this.recipeService.deleteRecipe(recipeId).pipe(
      map(() => fromRecipeActions.RemoveRecipeSuccess({recipeId})),
      catchError(() => of(fromRecipeActions.RemoveRecipeError())),
      tap(() => this.snackBar.open('Recipe deleted', 'OK', {duration: 3000}))
    ))
  ))

  getRecipeById$ = createEffect(() => this.action$.pipe(
    ofType(fromRecipeActions.GetRecipeById),
    mergeMap(({id}) => this.recipeService.getRecipeById(id).pipe(
      map((recipe: Recipe) => fromRecipeActions.GetRecipeByIdSuccess(recipe)),
      catchError(() => of(fromRecipeActions.GetRecipeByIdError()))
    ))
  ))
}

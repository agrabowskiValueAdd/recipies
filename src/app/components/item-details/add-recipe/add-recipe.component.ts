import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {AddIngredientDialogComponent} from "../../../dialogs/add-ingredient-dialog/add-ingredient-dialog.component";
import {Ingredient} from "../../../models/Ingredient";
import {Recipe} from "../../../models/Recipe";
import {RecipeService} from "../../../services/recipe.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Store} from "@ngrx/store";
import {createRecipe} from "../../../+state/recipe.actions";

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddRecipeComponent {
  ingredients: Ingredient[] = [];

  constructor(private dialog: MatDialog, private changeDetectorRef: ChangeDetectorRef,
              private recipeService: RecipeService, private snackBar: MatSnackBar, private store: Store) { }


  newRecipeForm = new FormGroup({
    name: new FormControl('',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(80)
      ]),
    description: new FormControl('',
      [
        Validators.required,
        Validators.minLength(15),
        Validators.maxLength(255)
      ]),
    preparationTimeInMinutes: new FormControl('',
      [
        Validators.required
      ])
  })

  addRecipe() {
    const newRecipe: Recipe = {...this.newRecipeForm.value, ingredients: this.ingredients};

    this.store.dispatch(createRecipe(newRecipe));
  }

  openAddIngredientDialog() {
    const dialogRef =  this.dialog.open(AddIngredientDialogComponent, {
      width: '350px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.ingredients.push(result);
        this.changeDetectorRef.markForCheck();
      }
    });
  }

  removeIngredient(ingredient: Ingredient) {
    this.ingredients = this.ingredients.filter(i => i.name !== ingredient.name);
    this.changeDetectorRef.markForCheck();
  }

  isFormValid(): boolean {
    return this.newRecipeForm.valid && this.ingredients.length >= 2;
  }

}

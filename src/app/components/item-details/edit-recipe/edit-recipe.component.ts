import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {Ingredient} from "../../../models/Ingredient";
import {MatDialog} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Recipe} from "../../../models/Recipe";
import {AddIngredientDialogComponent} from "../../../dialogs/add-ingredient-dialog/add-ingredient-dialog.component";
import {Store} from "@ngrx/store";
import {RecipeState} from "../../../+state/recipe.reducer";
import * as fromRecipeActions from '../../../+state/recipe.actions';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditRecipeComponent implements OnInit {
  @Input() item: Recipe;

  ingredients: Ingredient[];
  editRecipeForm: FormGroup;

  constructor(private dialog: MatDialog, private changeDetectorRef: ChangeDetectorRef,
              private store: Store<RecipeState>) { }

  ngOnInit(): void {

    this.editRecipeForm = new FormGroup({
      name: new FormControl(this.item.name,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(80)
        ]),
      description: new FormControl(this.item.description,
        [
          Validators.required,
          Validators.minLength(15),
          Validators.maxLength(255)
        ]),
      preparationTimeInMinutes: new FormControl(this.item.preparationTimeInMinutes,
        [
          Validators.required
        ])
    });

    this.ingredients = this.item.ingredients;
  }

  removeIngredient(ingredient: Ingredient) {
    this.ingredients = this.ingredients.filter(i => i.name !== ingredient.name);
  }

  openAddIngredientDialog() {
    const dialogRef =  this.dialog.open(AddIngredientDialogComponent, {
      width: '350px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.ingredients = [...this.ingredients, result];
        this.changeDetectorRef.markForCheck();
      }
    });
  }

  isFormValid(): boolean {
    return this.editRecipeForm.valid && this.ingredients.length >= 2;
  }

  updateRecipe() {
    const updatedRecipe: Recipe = {
      id: this.item.id,
      ...this.editRecipeForm.value,
      ingredients: this.ingredients
    };

    this.store.dispatch(fromRecipeActions.UpdateRecipe(updatedRecipe));
  }

  cancelEdit() {
    this.store.dispatch(fromRecipeActions.SelectRecipe(this.item));
  }

}

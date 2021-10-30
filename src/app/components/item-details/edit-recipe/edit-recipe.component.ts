import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from "../../../models/Ingredient";
import {MatDialog} from "@angular/material/dialog";
import {RecipeService} from "../../../services/recipe.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {Recipe} from "../../../models/Recipe";
import {AddIngredientDialogComponent} from "../../../dialogs/add-ingredient-dialog/add-ingredient-dialog.component";
import {SharedService} from "../../../services/shared.service";

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditRecipeComponent implements OnInit, OnDestroy {
  sub!: Subscription;
  ingredients: Ingredient[] = [];
  editRecipeForm!: FormGroup;
  item!: Recipe;

  constructor(private dialog: MatDialog, private changeDetectorRef: ChangeDetectorRef,
              private recipeService: RecipeService, private snackBar: MatSnackBar,
              private sharedService: SharedService) { }

  ngOnInit(): void {

    // this.getCurrentRecipeFromLocalStorage().then(
    //   res => {
    //     this.item = res;
    //     this.editRecipeForm = new FormGroup({
    //       name: new FormControl(this.item.name,
    //         [
    //           Validators.required,
    //           Validators.minLength(3),
    //           Validators.maxLength(80)
    //         ]),
    //       description: new FormControl(this.item.description,
    //         [
    //           Validators.required,
    //           Validators.minLength(15),
    //           Validators.maxLength(255)
    //         ]),
    //       preparationTimeInMinutes: new FormControl(this.item.preparationTimeInMinutes,
    //         [
    //           Validators.required
    //         ])
    //     });
    //
    //     this.ingredients = this.item.ingredients;
    //     this.changeDetectorRef.markForCheck()
    //   }
    // )


    this.sub = this.sharedService.getSelectedItemId().subscribe(
      (res) => {
        if (res) {
          this.getRecipe(res).then(() => {
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
          })
        }
      })
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getCurrentRecipeFromLocalStorage(): Promise<Recipe> {
    return new Promise((resolve) => {

      const currentRecipe = JSON.parse(<string>localStorage.getItem('currentRecipe'));
      resolve(currentRecipe);
    })
  }

  getRecipe(id: string) {
    return new Promise((resolve, reject) => {
      this.recipeService.getRecipeById(id).subscribe(
        (res) => {
          this.item = res;
          this.changeDetectorRef.markForCheck();
          resolve(res);
        },
        error => {
          reject(error);
        })
    })
  }

  removeIngredient(ingredient: Ingredient) {
    this.ingredients = this.ingredients.filter(i => i.name !== ingredient.name);
    this.changeDetectorRef.markForCheck();
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

  isFormValid(): boolean {
    return this.editRecipeForm.valid && this.ingredients.length >= 2;
  }

  updateRecipe() {
    const updatedRecipe: Recipe = { id: this.item.id, ...this.editRecipeForm.value, ingredients: this.ingredients };

    this.recipeService.updateRecipe(updatedRecipe).subscribe(
      () => {
        this.snackBar.open('Recipe updated', 'OK', {duration: 3000});
      },
      () => {
        this.snackBar.open('Error while updating the recipe', 'OK');
      }
    )
  }

}

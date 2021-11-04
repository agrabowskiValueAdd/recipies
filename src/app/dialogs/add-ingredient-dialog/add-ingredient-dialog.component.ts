import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UniqueNameValidator} from "../../util/unique-name-validator";
import {Store} from "@ngrx/store";
import {RecipeState} from "../../+state/recipe.reducer";

@Component({
  selector: 'app-add-ingredient-dialog',
  templateUrl: './add-ingredient-dialog.component.html',
  styleUrls: ['./add-ingredient-dialog.component.scss']
})
export class AddIngredientDialogComponent {

  constructor(private uniqueNameValidator: UniqueNameValidator, private store: Store<RecipeState>) { }

  newIngredientForm = new FormGroup({
    name: new FormControl('',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(80),
        UniqueNameValidator.createValidator(this.store)
      ]),
    quantity: new FormControl('',
      [
        Validators.required,
        Validators.maxLength(20)
      ])
  })

}

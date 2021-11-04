import {AbstractControl, AsyncValidatorFn, ValidationErrors} from "@angular/forms";
import {RecipeState} from "../+state/recipe.reducer";
import {select, Store} from "@ngrx/store";
import {Observable} from "rxjs";
import * as fromRecipeSelectors from '../+state/recipe.selector'
import {Recipe} from "../models/Recipe";
import {map} from "rxjs/operators";

export class UniqueNameValidator {

  static createValidator(store: Store<RecipeState>): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors> => {
      return store.pipe(select(fromRecipeSelectors.getAllRecipes))

    }
  }

  // validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
  //   return this.store.pipe(select(fromRecipeSelectors.getAllRecipes)).pipe(
  //     map(recipe => recipe.name === control.value ? null : {uniqueName: true})
  //   )
  // }
}

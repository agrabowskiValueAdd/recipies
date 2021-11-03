import {AbstractControl, AsyncValidator, ValidationErrors} from "@angular/forms";
import {RecipeState} from "../+state/recipe.reducer";
import {select, Store} from "@ngrx/store";
import {Observable} from "rxjs";
import * as recipeSelectors from '../+state/recipe.selector'
import {map} from "rxjs/operators";
import {Injectable} from "@angular/core";

@Injectable({ providedIn: 'root' })
export class UniqueNameValidator implements AsyncValidator {
  constructor(private store: Store<RecipeState>) {}

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.store.pipe(select(recipeSelectors.getAllRecipes)).pipe(
      //map(recipe => recipe.name === control.value ? null : {uniqueName: true})
    )
  }
}

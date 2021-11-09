import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {SharedService} from "../../services/shared.service";
import {Observable} from "rxjs";
import {RecipeService} from "../../services/recipe.service";
import {Recipe} from "../../models/Recipe";
import {ActivatedRoute} from "@angular/router";
import {select, Store} from "@ngrx/store";
import {RecipeState} from "../../+state/recipe.reducer";
import * as fromRecipeSelectors from '../../+state/recipe.selector';
import * as fromRecipeActions from '../../+state/recipe.actions';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemDetailsComponent implements OnInit {
  item$: Observable<Recipe>;
  editorType$: Observable<string>;

  constructor(private sharedService: SharedService, private recipeService: RecipeService,
              private route: ActivatedRoute, private store: Store<RecipeState>) {

    this.editorType$ = this.store.pipe(select(fromRecipeSelectors.getEditorType));
    this.item$ = this.store.pipe(select(fromRecipeSelectors.getSelectedRecipe));
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        console.log(params);
        if (params.id) {
          const id = params.id;
          this.store.dispatch(fromRecipeActions.GetRecipeById({id}));
        }
      }
    )
  }

}

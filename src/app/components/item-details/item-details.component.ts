import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {SharedService} from "../../services/shared.service";
import {Observable} from "rxjs";
import {RecipeService} from "../../services/recipe.service";
import {Recipe} from "../../models/Recipe";
import {ActivatedRoute} from "@angular/router";
import {select, Store} from "@ngrx/store";
import {RecipeState} from "../../+state/recipe.reducer";
import * as recipeSelectors from '../../+state/recipe.selector';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemDetailsComponent implements OnInit {
  item$: Observable<Recipe>;
  editorType$: Observable<string>;

  constructor(private sharedService: SharedService, private recipeService: RecipeService,
              private changeDetectorRef: ChangeDetectorRef, private route: ActivatedRoute,
              private store: Store<RecipeState>) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        console.log(params)
      }
    )

    this.editorType$ = this.store.pipe(select(recipeSelectors.getEditorType));
    this.item$ = this.store.pipe(select(recipeSelectors.getSelectedRecipe));
  }

}

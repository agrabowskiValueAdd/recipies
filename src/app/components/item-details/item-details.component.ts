import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {SharedService} from "../../services/shared.service";
import {Observable, Subscription} from "rxjs";
import {RecipeService} from "../../services/recipe.service";
import {Recipe} from "../../models/Recipe";
import {ActivatedRoute} from "@angular/router";
import {select, Store} from "@ngrx/store";
import {RecipeState} from "../../+state/recipe.reducer";
import {recipeIdSelector, recipeSelector} from "../../+state/recipe.selector";

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemDetailsComponent implements OnInit, OnDestroy {
  item: Recipe;
  sub: Subscription;
  editorSub: Subscription;
  editorType: string = '';
  item$: Observable<Recipe>;

  constructor(private sharedService: SharedService, private recipeService: RecipeService,
              private changeDetectorRef: ChangeDetectorRef, private route: ActivatedRoute,
              private store: Store<RecipeState>) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        console.log(params)
      }
    )


    this.sub = this.sharedService.getSelectedItemId().subscribe(
      (res: string) => {
        if (res) {
          this.getItem(res);
          // this.item$ = this.store.pipe(select(recipeIdSelector(res)));
        }}
    )

    this.editorSub = this.sharedService.getEditorVisibility().subscribe(
      (res) => {
        this.editorType = res;
        this.changeDetectorRef.markForCheck();
      }
    )
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.editorSub.unsubscribe();
  }

  getItem(id: string) {
    if (this.editorType !== 'create' && this.editorType !== 'edit') {
      this.recipeService.getRecipeById(id).subscribe(
        (res) => {
          this.item = res;
          this.changeDetectorRef.markForCheck();
          localStorage.setItem('currentRecipe', JSON.stringify(res));
        })
    }
  }

}

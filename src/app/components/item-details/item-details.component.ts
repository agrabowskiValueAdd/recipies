import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {SharedService} from "../../services/shared.service";
import {Subscription} from "rxjs";
import {RecipeService} from "../../services/recipe.service";
import {Recipe} from "../../Recipe";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemDetailsComponent implements OnInit, OnDestroy {
  item!: Recipe;
  sub!: Subscription;
  editorSub!: Subscription;
  editorType: string = '';

  constructor(private sharedService: SharedService, private recipeService: RecipeService,
              private changeDetectorRef: ChangeDetectorRef, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        console.log(params)
      }
    )

    this.sub = this.sharedService.getSelectedItemId().subscribe(
      (res) => {
        if (res) {
          this.getItem(res);
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

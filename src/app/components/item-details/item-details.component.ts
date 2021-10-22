import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {SharedService} from "../../services/shared.service";
import {Subscription} from "rxjs";
import {RecipeService} from "../../services/recipe.service";
import {Recipe} from "../../Recipe";

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
              private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.sub = this.sharedService.getSelectedItem().subscribe(
      (res) => {
        if (res) {
          this.getItem(res);
        }
      })

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
    this.recipeService.getRecipeById(id).subscribe(
      (res) => {
        this.item = res;
        this.changeDetectorRef.markForCheck();
      })
  }

}

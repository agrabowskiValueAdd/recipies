import {ChangeDetectorRef} from '@angular/core';
import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {RecipeService} from "../../services/recipe.service";
import {SharedService} from "../../services/shared.service";
import {Recipe} from "../../models/Recipe";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DeleteConfirmationDialogComponent} from "../../dialogs/confirmation-dialog/delete-confirmation-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {select, Store} from "@ngrx/store";
import * as recipeActions from "../../+state/recipe.actions";
import * as recipeSelectors from '../../+state/recipe.selector';
import {RecipeState} from "../../+state/recipe.reducer";
import {Observable} from "rxjs";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnInit {
  list: Recipe[] = [];
  selectedItemId: string;
  searchValue: string;
  list$: Observable<Recipe[]>;


  constructor(private recipeService: RecipeService, private sharedService: SharedService,
              private changeDetectorRef: ChangeDetectorRef, private snackBar: MatSnackBar,
              private dialog: MatDialog, private store: Store<RecipeState>) {
    this.list$ = this.store.pipe(select(recipeSelectors.getAllRecipes));
  }

  ngOnInit(): void {
    this.store.dispatch(recipeActions.getRecipes());
  }

  selectItem(recipe: Recipe): void {
    this.selectedItemId = recipe.id;
    this.store.dispatch(recipeActions.selectRecipe(recipe));
  }

  deleteRecipe(recipeId: string): void {
    this.store.dispatch(recipeActions.deleteRecipe({recipeId}));

    // this.recipeService.deleteRecipe(id).subscribe(
    //   () => {
    //     this.snackBar.open('Recipe deleted', 'OK', {duration: 3000});
    //     this.list = this.list.filter(item => item.id !== id);
    //     this.changeDetectorRef.markForCheck();
    //   },
    //   error => {
    //     console.log(error)
    //     this.snackBar.open('Error while deleting the recipe', 'OK');
    //   }
    // )
  }

  openDeleteConfirmationDialog(recipeId: string): void {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '250px',
      data: {recipeId}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteRecipe(result.recipeId);
      }
    });
  }

  addRecipeButton(): void {
    this.store.dispatch(recipeActions.addRecipe());
  }

  editRecipe(recipe: Recipe): void {
    // this.sharedService.selectItem(id);
    // this.sharedService.toggleEditor('edit');

    this.selectedItemId = recipe.id;
    this.store.dispatch(recipeActions.editRecipe(recipe));
  }

}

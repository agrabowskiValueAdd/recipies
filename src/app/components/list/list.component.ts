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
import * as recipeSelectors from '../../+state/recipe.selector'
import {RecipeState} from "../../+state/recipe.reducer";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnInit {
  list: Recipe[] = [];
  selectedItemId!: string;
  searchValue!: string;


  list$ = this.store.pipe(select(recipeSelectors.getAllRecipes));


  constructor(private recipeService: RecipeService, private sharedService: SharedService,
              private changeDetectorRef: ChangeDetectorRef, private snackBar: MatSnackBar,
              private dialog: MatDialog, private store: Store<RecipeState>) { }

  ngOnInit(): void {
    this.store.dispatch(recipeActions.getRecipes());
  }

  selectItem(recipe: Recipe): void {
    this.selectedItemId = recipe.id;
    this.sharedService.toggleEditor('');
    this.sharedService.selectItem(this.selectedItemId);

    this.store.dispatch(recipeActions.selectRecipe(recipe));
  }

  deleteRecipe(id: string): void {
    this.recipeService.deleteRecipe(id).subscribe(
      () => {
        this.snackBar.open('Recipe deleted', 'OK', {duration: 3000});
        this.list = this.list.filter(item => item.id !== id);
        this.changeDetectorRef.markForCheck();
      },
      error => {
        console.log(error)
        this.snackBar.open('Error while deleting the recipe', 'OK');
      }
    )
  }

  openDeleteConfirmationDialog(id: string): void {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '250px',
      data: {id}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteRecipe(result.id);
      }
    });
  }

  addRecipeButton(): void {
    this.sharedService.toggleEditor('create');
  }

  editRecipe(id: string): void {
    this.sharedService.selectItem(id);
    this.sharedService.toggleEditor('edit');
  }

}

import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {RecipeService} from "../../services/recipe.service";
import {SharedService} from "../../services/shared.service";
import {Recipe} from "../../models/Recipe";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DeleteConfirmationDialogComponent} from "../../dialogs/confirmation-dialog/delete-confirmation-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {select, Store} from "@ngrx/store";
import * as fromRecipeActions from "../../+state/recipe.actions";
import * as fromRecipeSelectors from '../../+state/recipe.selector';
import {RecipeState} from "../../+state/recipe.reducer";
import {Observable} from "rxjs";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnInit {
  selectedItemId: string;
  searchValue: string;
  list$: Observable<Recipe[]>;

  constructor(private recipeService: RecipeService, private sharedService: SharedService,
              private snackBar: MatSnackBar, private dialog: MatDialog, private store: Store<RecipeState>) {

    this.list$ = this.store.pipe(select(fromRecipeSelectors.getAllRecipes));
  }

  ngOnInit(): void {
    this.store.dispatch(fromRecipeActions.GetRecipesCollection());
  }

  selectItem(recipe: Recipe): void {
    this.selectedItemId = recipe.id;
    this.store.dispatch(fromRecipeActions.SelectRecipe(recipe));
  }

  deleteRecipe(recipeId: string): void {
    this.store.dispatch(fromRecipeActions.RemoveRecipe({recipeId}));
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
    this.store.dispatch(fromRecipeActions.OpenAddRecipeForm());
  }

  editRecipe(recipe: Recipe): void {
    this.selectedItemId = recipe.id;
    this.store.dispatch(fromRecipeActions.OpenEditRecipeForm(recipe));
  }

}

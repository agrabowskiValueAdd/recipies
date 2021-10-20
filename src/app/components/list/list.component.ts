import { ChangeDetectorRef } from '@angular/core';
import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {RecipeService} from "../../services/recipe.service";
import {SharedService} from "../../services/shared.service";
import {Recipe} from "../../Recipe";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DeleteConfirmationDialogComponent} from "../../dialogs/confirmation-dialog/delete-confirmation-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnInit {
  list: Recipe[] = [];
  selectedItemId!: string;

  constructor(private recipeService: RecipeService, private sharedService: SharedService,
              private changeDetectorRef: ChangeDetectorRef, private snackBar: MatSnackBar,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.recipeService.getRecipes().subscribe(
      (res) => {
        this.list = res;
        console.log(this.list)
        this.changeDetectorRef.markForCheck();  // async pipe zamiast tego
      },
      error => {
        console.log(error)
      }
    )
  }

  selectItem(id: string): void {
    this.selectedItemId = id;
    this.sharedService.selectItem(this.selectedItemId);
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

}

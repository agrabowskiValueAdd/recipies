import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from "@angular/material/icon";
import { AuthorDialogComponent } from './dialogs/author-dialog/author-dialog.component';
import { MatDialogModule } from "@angular/material/dialog";
import { ListComponent } from './components/list/list.component';
import { HttpClientModule}  from "@angular/common/http";
import { MatListModule } from "@angular/material/list";
import { ItemDetailsComponent } from './components/item-details/item-details.component';
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { DeleteConfirmationDialogComponent } from './dialogs/confirmation-dialog/delete-confirmation-dialog.component';
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { SearchFilterPipe } from './pipes/search-filter.pipe';
import { ItemEditorComponent } from './components/item-details/item-editor/item-editor.component';
import {TextFieldModule} from "@angular/cdk/text-field";
import { PrepTimePipePipe } from './pipes/prep-time-pipe.pipe';
import { AddIngredientDialogComponent } from './dialogs/add-ingredient-dialog/add-ingredient-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AuthorDialogComponent,
    ListComponent,
    ItemDetailsComponent,
    DeleteConfirmationDialogComponent,
    SearchFilterPipe,
    ItemEditorComponent,
    PrepTimePipePipe,
    AddIngredientDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatDialogModule,
    HttpClientModule,
    MatListModule,
    MatSnackBarModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    TextFieldModule
  ],
  providers: [
    AuthorDialogComponent,
    DeleteConfirmationDialogComponent,
    AddIngredientDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

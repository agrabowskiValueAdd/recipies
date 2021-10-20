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

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AuthorDialogComponent,
    ListComponent,
    ItemDetailsComponent,
    DeleteConfirmationDialogComponent,
    SearchFilterPipe
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
    ReactiveFormsModule
  ],
  providers: [
    AuthorDialogComponent,
    DeleteConfirmationDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

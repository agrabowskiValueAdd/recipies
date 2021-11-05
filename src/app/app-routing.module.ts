import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ItemDetailsComponent} from "./components/item-details/item-details.component";

const routes: Routes = [
  {
    path: '',
    component: ItemDetailsComponent
  },
  {
    path: ':id',
    component: ItemDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

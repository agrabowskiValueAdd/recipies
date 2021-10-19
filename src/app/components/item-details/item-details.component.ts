import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {SharedService} from "../../services/shared.service";
import {Subscription} from "rxjs";
import {RecipieService} from "../../services/recipie.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemDetailsComponent implements OnInit, OnDestroy {
  item: any = {} //dodac interfejs tylko dopytac czy jaki to ma byc, bo crudcrud zwraca inne dane niz w poleceniu
  sub!: Subscription;

  constructor(private sharedService: SharedService, private recipieService: RecipieService,
              private changeDetectorRef: ChangeDetectorRef, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.sub = this.sharedService.getSelectedItem().subscribe(
      (res) => {
        console.log(res)
        this.getItem(res)
      })

    this.openSnackBar();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  getItem(id: string) {
    this.recipieService.getItem(id).subscribe(
      (res) => {
        this.item = res;
        console.log(res);
        this.changeDetectorRef.markForCheck();
      })
  }

  openSnackBar() {
    this.snackBar.open('Title', 'action',
      {
        duration: 3000
      })
  }

}

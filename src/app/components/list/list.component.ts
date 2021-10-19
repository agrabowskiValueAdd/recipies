import { ChangeDetectorRef } from '@angular/core';
import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {RecipieService} from "../../services/recipie.service";
import {SharedService} from "../../services/shared.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnInit {
  list: any = [];
  selectedItemId!: string;

  constructor(private recipieService: RecipieService, private sharedService: SharedService,
              private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.recipieService.getData().subscribe(
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

}

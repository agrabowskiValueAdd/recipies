import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {RecipieService} from "../../services/recipie.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnInit {
  list: any= [];
  selectedItemId!: number;

  constructor(private recipieService: RecipieService) { }

  ngOnInit(): void {
    this.recipieService.getData().subscribe(
      (res) => {
        this.list = res;
      },
      error => {
        console.log(error)
      }
    )
  }

  selectItem(id: number): void {
    this.selectedItemId = id;
  }

}

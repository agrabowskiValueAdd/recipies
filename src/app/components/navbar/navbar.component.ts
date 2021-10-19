import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthorDialogComponent } from "../../dialogs/author-dialog/author-dialog.component";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements OnInit {

  appName: string = 'Unicorns';

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog() {
    this.dialog.open(AuthorDialogComponent, {
      data: {
        name: 'Adam Grabowski'
      },
      width: '350px'
    });
  }

}

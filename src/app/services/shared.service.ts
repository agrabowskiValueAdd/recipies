import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private selectedId = new BehaviorSubject<string>('');

  constructor() { }

  selectItem(id: string) {
    this.selectedId.next(id);
  }

  getSelectedItem() {
    return this.selectedId.asObservable();
  }
}

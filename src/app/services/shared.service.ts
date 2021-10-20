import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private showEditor: boolean = false;
  private selectedIdSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private showEditorSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  selectItem(id: string) {
    this.selectedIdSubject.next(id);
  }

  getSelectedItem() {
    return this.selectedIdSubject.asObservable();
  }

  toggleEditor(show: boolean) {
    this.showEditor = show;
    this.showEditorSubject.next(this.showEditor);
  }

  getEditorVisibility(): Observable<boolean> {
    return this.showEditorSubject.asObservable();
  }
}

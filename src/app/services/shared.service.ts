import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private showEditor: string = '';
  private selectedIdSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private showEditorSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor() { }

  selectItem(id: string) {
    this.selectedIdSubject.next(id);
  }

  getSelectedItem() {
    return this.selectedIdSubject.asObservable();
  }

  toggleEditor(type: string) {
    this.showEditor = type;
    this.showEditorSubject.next(this.showEditor);
  }

  getEditorVisibility(): Observable<string> {
    return this.showEditorSubject.asObservable();
  }
}

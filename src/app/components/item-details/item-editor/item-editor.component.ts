import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-item-editor',
  templateUrl: './item-editor.component.html',
  styleUrls: ['./item-editor.component.scss']
})
export class ItemEditorComponent implements OnInit{
  constructor() { }

  ngOnInit(): void {

  }

  newRecipeForm = new FormGroup({
    name: new FormControl('',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(80)
      ]),
    description: new FormControl('',
      [
        Validators.required,
        Validators.minLength(15),
        Validators.maxLength(255)
      ]),
    preparationTimeInMinutes: new FormControl('',
      [
        Validators.required
      ]),
    ingredients: new FormControl([],
      [
        Validators.minLength(2)
      ])
  })

  addRecipe() {
    console.log(this.newRecipeForm.value)
    this.newRecipeForm.reset();
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Recipe } from "../Recipe";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private apiUrl: string = 'http://localhost:5000';

  constructor(private http: HttpClient) { }

  getRecipes(): Observable<Recipe[]> {
    const url = `${this.apiUrl}/recipes`;
    return this.http.get<Recipe[]>(url);
  }

  getRecipeById(id: string): Observable<Recipe> {
    const url = `${this.apiUrl}/recipes/${id}`;
    return this.http.get<Recipe>(url);
  }

  deleteRecipe(id: string): Observable<Recipe> {
    const url = `${this.apiUrl}/recipes/${id}`;
    return this.http.delete<Recipe>(url);
  }
}
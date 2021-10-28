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

  // returns 10 items by default
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

  createRecipe(recipe: Recipe): Observable<Recipe> {
    const url = `${this.apiUrl}/recipes`;
    return this.http.post<Recipe>(url, recipe);
  }

  updateRecipe(recipe: Recipe): Observable<Recipe> {
    const url = `${this.apiUrl}/recipes/${recipe.id}`;
    return this.http.put<Recipe>(url, recipe);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RecipieService {
  apiUrl: string = 'https://crudcrud.com/api/e2c61f51e093414290dbedaa390038ea';

  constructor(private http: HttpClient ) { }

  getData(): Observable<any> {
    return this.http.get(`${this.apiUrl}/unicorns`);
  }

  getItem(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/unicorns/${id}`);
  }

  deleteItem(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/unicorns/${id}`);
  }
}

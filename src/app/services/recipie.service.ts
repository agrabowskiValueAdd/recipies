import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RecipieService {
  apiUrl: string = 'https://crudcrud.com/api/e2c61f51e093414290dbedaa390038ea/';

  constructor(private http: HttpClient ) { }

  getData() {
    return this.http.get(this.apiUrl + 'unicorns');
  }
}

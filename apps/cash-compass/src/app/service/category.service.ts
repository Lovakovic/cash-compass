import { Injectable } from '@angular/core';
import {Observable } from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "@cash-compass/environments";
import {Category} from "@cash-compass/shared-models";

const { apiUrl } = environment;

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) {
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${apiUrl}/category`);
  }
}

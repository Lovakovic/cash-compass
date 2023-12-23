import { Injectable } from '@angular/core';
import {Observable } from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Category} from "../model/category.model";
import { environment } from "../../../environments/environment";

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

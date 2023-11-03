import {Component, Inject, OnInit} from '@angular/core';
import {CategoryService} from "../service/category.service";
import {Category} from "@cash-compass/shared-models";

@Component({
  selector: 'cash-compass-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = [];

  constructor(@Inject(CategoryService) private categoryService: CategoryService) { }  // Using Inject to make it explicit

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(_categories => this.categories = _categories);
  }
}

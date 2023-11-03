import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CategoryService} from "../../../service/category.service";
import {Subject, takeUntil} from "rxjs";
import {formatDate} from "@angular/common";
import {ExpenseService} from "../../../service/expense.service";
import {Category, Expense} from "@cash-compass/shared-models";

@Component({
  selector: 'cash-compass-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.scss'],
})
export class AddExpenseComponent implements OnInit, OnDestroy {
  expenseForm: FormGroup;
  categories: Category[] = [];

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private fb: FormBuilder,
              private categoryService: CategoryService,
              private expenseService: ExpenseService) {
    const today = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
    this.expenseForm = this.fb.group({
      name: ['', Validators.required],
      amount: ['', Validators.required],
      date: [today, Validators.required],
      category: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.categoryService.getCategories()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(_categories => this.categories = _categories);
  }

  onSubmit(): void {
    if (this.expenseForm.valid) {
      const newExpense: Expense = this.expenseForm.value;
      const selectedCategory = this.categories.find(category => category.id === this.expenseForm.get('category')?.value);
      if (selectedCategory) {
        newExpense.category = selectedCategory;
      }
      this.expenseService.addExpense(newExpense).subscribe(() => {
        const today = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
        this.expenseForm.reset({ date: today });
      });
    }
  }


  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}

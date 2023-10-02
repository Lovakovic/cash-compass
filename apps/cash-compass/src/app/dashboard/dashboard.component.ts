import {Component, OnDestroy} from '@angular/core';
import {ExpenseService} from "../service/expense.service";
import {BehaviorSubject, map, Observable, Subject, takeUntil} from "rxjs";
import {Category, Expense} from "@cash-compass/shared-models";

export interface FilterData {
  searchTerm: string;
  sortOrder: 'cheapest' | 'most-expensive' | 'newest' | 'oldest';
  filterCategory?: Category;
  startDate?: Date;
  endDate?: Date;
}

@Component({
  selector: 'cash-compass-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnDestroy {
  private unsubscribe$ = new Subject<void>();
  expenses$: BehaviorSubject<Expense[]> = new BehaviorSubject<Expense[]>([]);
  totalExpenses = 0;
  earliestDate: Date | undefined;

  constructor(private expenseService: ExpenseService) {
    this.expenseService.getEarliestExpenseDate()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(date => this.earliestDate = date);
    this.expenses$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(expenses => {
        this.totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onFilterChange(filterData: FilterData) {
    const observable$ = this.getObservableBasedOnDates(filterData);

    observable$
      .pipe(
        map(expenses => this.applySearchAndCategoryFilters(expenses, filterData)),
        map(expenses => this.sortExpenses(expenses, filterData)),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(expenses => this.expenses$.next(expenses));
  }

  private getObservableBasedOnDates(filterData: FilterData): Observable<Expense[]> {
    if (filterData.startDate && filterData.endDate) {
      return this.expenseService.getExpensesByDateRange(
        filterData.startDate.toISOString(),
        filterData.endDate.toISOString()
      );
    } else if (filterData.startDate) {
      return this.expenseService.getExpensesByDateRange(
        filterData.startDate.toISOString(),
        new Date().toISOString()
      );
    } else if (filterData.endDate) {
      return this.expenseService.getExpensesByDateRange(
        this.earliestDate?.toISOString() ?? new Date().toISOString(),
        filterData.endDate.toISOString()
      );
    } else {
      return this.expenseService.getExpenses(0, 0);
    }
  }

  private applySearchAndCategoryFilters(expenses: Expense[], filterData: FilterData): Expense[] {
    let filteredExpenses = [...expenses];

    // Case-insensitive search and trim white spaces
    if (filterData.searchTerm) {
      const searchTerm = filterData.searchTerm.toLowerCase().trim();
      filteredExpenses = filteredExpenses.filter(e => e.name.toLowerCase().includes(searchTerm));
    }

    // Category filter
    if (filterData.filterCategory) {
      filteredExpenses = filteredExpenses.filter(e => e.category.id === filterData.filterCategory?.id);
    }

    return filteredExpenses;
  }

  private sortExpenses(expenses: Expense[], filterData: FilterData): Expense[] {
    return expenses.sort((a, b) => {
      switch (filterData.sortOrder) {
        case 'cheapest':
          return a.amount - b.amount || b.addedAt.getTime() - a.addedAt.getTime();
        case 'most-expensive':
          return b.amount - a.amount || b.addedAt.getTime() - a.addedAt.getTime();
        case 'newest':
          return b.date.getTime() - a.date.getTime() || b.addedAt.getTime() - a.addedAt.getTime();
        case 'oldest':
          return a.date.getTime() - b.date.getTime() || a.addedAt.getTime() - b.addedAt.getTime();
        default:
          return 0;
      }
    });
  }
}

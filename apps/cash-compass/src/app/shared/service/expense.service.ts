import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, map, Observable, tap} from "rxjs";
import {environment} from "@cash-compass/environments";
import {Expense} from "../model/expense.model";

const { apiUrl} = environment;

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private expensesSubject = new BehaviorSubject<Expense[]>([]);
  expenses$ = this.expensesSubject.asObservable();

  constructor(private http: HttpClient) {}

  getExpenses(skip = 0, limit = 10): Observable<Expense[]> {
    return this.http.get<Expense[]>(`${apiUrl}/expense?skip=${skip}&limit=${limit}`).pipe(
      map(expenses => expenses.map(expense => this.transformExpenseDates(expense))),
      tap(expenses => this.expensesSubject.next(expenses))
    );
  }

  getExpensesByDateRange(startDate: string, endDate: string): Observable<Expense[]> {
    return this.http.get<Expense[]>(`${apiUrl}/expense/byDateRange?startDate=${startDate}&endDate=${endDate}`).pipe(
      map(expenses => expenses.map(expense => this.transformExpenseDates(expense)))
    );
  }

  getEarliestExpenseDate(): Observable<Date> {
    return this.http.get<Date>(`${apiUrl}/expense/earliest`).pipe(
      map(date => new Date(date))
    );
  }

  addExpense(newExpense: Expense): Observable<Expense> {
    return this.http.post<Expense>(`${apiUrl}/expense`, newExpense).pipe(
      tap(newExpense => {
        const expenses = [newExpense, ...this.expensesSubject.value];
        this.expensesSubject.next(expenses);
      })
    );
  }

  deleteExpense(id: string): Observable<void> {
    return this.http.delete<void>(`${apiUrl}/expense/${id}`).pipe(
      tap(() => {
        const expenses = this.expensesSubject.value.filter(expense => expense.id !== id);
        this.expensesSubject.next(expenses);
      })
    );
  }

  private transformExpenseDates(expense: Expense): Expense {
    return {
      ...expense,
      date: new Date(expense.date),
      addedAt: new Date(expense.addedAt)
    };
  }
}

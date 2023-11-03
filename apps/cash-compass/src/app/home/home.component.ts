import {Component, OnInit} from '@angular/core';
import {ExpenseService} from "../service/expense.service";
import {map, Observable} from 'rxjs';
import {Expense} from "@cash-compass/shared-models";

@Component({
  selector: 'cash-compass-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  readonly appName = '💵 CashCompass 🧭';
  expenses$!: Observable<Expense[]>;

  constructor(private expenseService: ExpenseService) {}

  ngOnInit(): void {
    this.expenseService.getExpenses(0, 5).subscribe();

    this.expenses$ = this.expenseService.expenses$.pipe(
      map(expenses => expenses.map(expense => {
          expense.date = new Date(expense.date);
          expense.addedAt = new Date(expense.addedAt);
          return expense;
        }).sort((a, b) => {
          const dateDifference = b.date.getTime() - a.date.getTime();
          if (dateDifference !== 0) return dateDifference;
          return b.addedAt.getTime() - a.addedAt.getTime();
        }).slice(0, 5)
      )
    );
  }
}

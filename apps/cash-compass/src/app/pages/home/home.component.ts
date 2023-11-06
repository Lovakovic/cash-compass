import {Component, OnDestroy, OnInit} from '@angular/core';
import {ExpenseService} from "../../shared/service/expense.service";
import {Subscription} from 'rxjs';
import {Expense} from "../../shared/model/expense.model";

@Component({
  selector: 'cash-compass-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  readonly appName = '💵 CashCompass 🧭';

  latestExpenses: Expense[] = [];
  private expensesSubscription!: Subscription;

  constructor(private expenseService: ExpenseService) {}

  ngOnInit(): void {
    this.loadLatestExpenses();

    this.expensesSubscription = this.expenseService.expenses$.subscribe(expenses => {
      this.latestExpenses = expenses.slice(0, 5);
    });
  }

  private loadLatestExpenses() {
    this.expenseService.getExpenses(0, 5).subscribe(expenses => {
      this.latestExpenses = [...expenses]
        .sort((a, b) => b.addedAt.getTime() - a.addedAt.getTime());
    });
  }

  ngOnDestroy(): void {
    this.expensesSubscription?.unsubscribe();
  }
}

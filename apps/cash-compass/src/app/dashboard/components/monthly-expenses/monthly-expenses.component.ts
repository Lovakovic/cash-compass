import {Component, Input} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Expense} from "@cash-compass/shared-models";

@Component({
  selector: 'cash-compass-monthly-expenses',
  templateUrl: './monthly-expenses.component.html',
  styleUrls: ['./monthly-expenses.component.css'],
})
export class MonthlyExpensesComponent {
  @Input() expenses$!: BehaviorSubject<Expense[]>;
}

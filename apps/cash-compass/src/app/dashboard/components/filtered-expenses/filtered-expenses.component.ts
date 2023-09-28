import {Component, Input} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Expense} from "@cash-compass/shared-models";

@Component({
  selector: 'cash-compass-filtered-expenses',
  templateUrl: './filtered-expenses.component.html',
  styleUrls: ['./filtered-expenses.component.css'],
})
export class FilteredExpensesComponent {
  @Input() expenses$!: BehaviorSubject<Expense[]>;
}

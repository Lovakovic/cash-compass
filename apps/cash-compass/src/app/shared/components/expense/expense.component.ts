import {AfterViewInit, Component, ElementRef, Input, Renderer2, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import { ExpenseService } from '../../service/expense.service';
import {Expense} from "../../model/expense.model";

@Component({
  selector: 'cash-compass-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss'],
  animations: [
    trigger('expandCollapse', [
      state(
        'collapsed',
        style({ height: '0px', minHeight: '0', visibility: 'hidden' })
      ),
      state(
        'expanded',
        style({ height: '*', minHeight: '30px', visibility: 'visible' })
      ),
      transition('expanded <=> collapsed', [animate('300ms ease-out')]),
    ]),
  ],
})
export class ExpenseComponent implements AfterViewInit {
  @Input() expense!: Expense;
  isExpanded = false;
  @ViewChild('content', { static: false }) content!: ElementRef;

  constructor(private renderer: Renderer2,
              private expenseService: ExpenseService) {}

  ngAfterViewInit(): void {
    if (this.content?.nativeElement) {
      this.renderer.addClass(this.content.nativeElement, 'hidden-content');
    }
  }

  toggleExpand() {
    this.isExpanded = !this.isExpanded;

    if (this.content?.nativeElement) {
      if (!this.isExpanded) {
        this.renderer.addClass(this.content.nativeElement, 'hidden-content');
      } else {
        this.renderer.removeClass(this.content.nativeElement, 'hidden-content');
      }
    }
  }

  onDelete() {
    this.expenseService.deleteExpense(this.expense.id).subscribe();
  }

  get stateName() {
    return this.isExpanded ? 'expanded' : 'collapsed';
  }
}

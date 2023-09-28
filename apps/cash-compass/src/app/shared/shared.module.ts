import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RaisedButtonDirective} from './button/raised-button.directive';
import {OutlineButtonDirective} from './button/outline-button.directive';
import {FlatButtonDirective} from './button/flat-button.directive';
import {ExpenseComponent} from "./components/expense/expense.component";

@NgModule({
  declarations: [
    RaisedButtonDirective,
    OutlineButtonDirective,
    FlatButtonDirective,
    ExpenseComponent
  ],
  imports: [CommonModule],
  exports: [
    RaisedButtonDirective,
    OutlineButtonDirective,
    FlatButtonDirective,
    ExpenseComponent,
  ],
})
export class SharedModule {}

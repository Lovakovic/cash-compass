import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RaisedButtonDirective} from './directives/raised-button.directive';
import {OutlineButtonDirective} from './directives/outline-button.directive';
import {FlatButtonDirective} from './directives/flat-button.directive';
import {ExpenseComponent} from "./components/expense/expense.component";
import {NavbarComponent} from "./components/navbar/navbar.component";
import {RouterLink} from "@angular/router";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    RaisedButtonDirective,
    OutlineButtonDirective,
    FlatButtonDirective,
    ExpenseComponent,
    NavbarComponent,
  ],
  imports: [
    CommonModule,
    RouterLink,
  ],
  exports: [
    RaisedButtonDirective,
    OutlineButtonDirective,
    FlatButtonDirective,
    ExpenseComponent,
    NavbarComponent,
    BrowserAnimationsModule,
  ],
})
export class SharedModule {}

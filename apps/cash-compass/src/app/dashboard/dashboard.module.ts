import {DashboardComponent} from "./dashboard.component";
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MonthlyExpensesComponent} from "./components/monthly-expenses/monthly-expenses.component";
import {SearchComponent} from "./components/search/search.component";
import {NavbarModule} from "../navbar/navbar.module";
import {SharedModule} from "../shared/shared.module";
import {FormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    DashboardComponent,
    MonthlyExpensesComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    NavbarModule,
    SharedModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  exports: [
    DashboardComponent
  ],
  providers: [

  ]
})
export class DashboardModule { }

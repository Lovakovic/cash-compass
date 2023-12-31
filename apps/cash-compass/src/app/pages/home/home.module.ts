import {NgModule} from "@angular/core";
import {HomeComponent} from "./home.component";
import {AddExpenseComponent} from "./components/add-expense/add-expense.component";
import {CommonModule} from "@angular/common";
import {SharedModule} from "../../shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    HomeComponent,
    AddExpenseComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule
  ],
  exports: [
    HomeComponent
  ],
  providers: []
})
export class HomeModule {}

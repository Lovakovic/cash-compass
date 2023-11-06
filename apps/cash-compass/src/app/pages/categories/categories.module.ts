import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {CategoriesComponent} from "./categories.component";
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  declarations: [
    CategoriesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    CategoriesComponent
  ],
  providers: []
})
export class CategoriesModule { }

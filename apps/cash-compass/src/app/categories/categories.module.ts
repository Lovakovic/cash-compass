import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {CategoriesComponent} from "./categories.component";
import {NavbarModule} from "../navbar/navbar.module";

@NgModule({
  declarations: [
    CategoriesComponent
  ],
  imports: [
    CommonModule,
    NavbarModule
  ],
  exports: [
    CategoriesComponent
  ],
  providers: []
})
export class CategoriesModule { }

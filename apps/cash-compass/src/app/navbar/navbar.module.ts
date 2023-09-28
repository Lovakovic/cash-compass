import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {NavbarComponent} from "./navbar.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {SharedModule} from "../shared/shared.module";
import {RouterLink} from "@angular/router";

@NgModule({
  declarations: [
   NavbarComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterLink
  ],
  exports: [
    NavbarComponent,
    BrowserAnimationsModule
  ],
  providers: []
})
export class NavbarModule { }

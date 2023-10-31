import {Route} from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {HomeComponent} from "./home/home.component";
import {CategoriesComponent} from "./categories/categories.component";

export const appRoutes: Route[] = [
  { path: '', component: HomeComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'dashboard', component: DashboardComponent}
];
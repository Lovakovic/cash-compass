import {Route} from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {CategoriesComponent} from "./pages/categories/categories.component";
import {LoginComponent} from "./auth/login/login.component";
import {RegisterComponent} from "./auth/register/register.component";

export const appRoutes: Route[] = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'categories',
    component: CategoriesComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  }
];

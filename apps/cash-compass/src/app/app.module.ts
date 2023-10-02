import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {appRoutes} from './app.routes';
import {HomeModule} from './home/home.module';
import {CategoriesModule} from './categories/categories.module';
import {DashboardModule} from './dashboard/dashboard.module';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HomeModule,
    CategoriesModule,
    DashboardModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {appRoutes} from './app.routes';
import {HomeModule} from './pages/home/home.module';
import {CategoriesModule} from './pages/categories/categories.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthInterceptor} from "./auth/interceptor/auth.interceptor";
import {ErrorInterceptor} from "./auth/interceptor/error.interceptor";
import {AuthModule} from "./auth/auth.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AuthModule,
    HomeModule,
    CategoriesModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

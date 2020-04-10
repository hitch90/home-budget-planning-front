import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from './forms/forms.module';
import { FormsRoutingModule } from './forms/forms-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { ErrorInterceptor } from './services/interceptor';
import { JwtInterceptor } from './services/jwt-interceptor';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { DashboardModule } from './dashboard/dashboard.module';
import { DashboardRoutingModule } from './dashboard/dashboard-routing.module';
import { ListRoutingModule } from './list/list-routing.module';
import { ListModule } from './list/list.module';
import { CategoriesModule } from './categories/categories.module';
import { CategoriesRoutingModule } from './categories/categories-routing.module';
import { AccountsModule } from './accounts/accounts.module';
import { AccountsRoutingModule } from './accounts/accounts-routing.module';
import { NbDialogModule, NbThemeModule } from '@nebular/theme';

@NgModule({
    declarations: [AppComponent, LoginComponent],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        SharedModule,
        FormsModule,
        FormsRoutingModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        NbThemeModule.forRoot({ name: 'default' }),
        NbDialogModule.forRoot(),
        /* app modules */
        DashboardModule,
        DashboardRoutingModule,
        ListRoutingModule,
        ListModule,
        CategoriesModule,
        CategoriesRoutingModule,
        AccountsModule,
        AccountsRoutingModule
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}

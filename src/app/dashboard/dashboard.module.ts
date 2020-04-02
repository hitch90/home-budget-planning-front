import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BalanceComponent } from './balance/balance.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {SharedModule} from '../shared/shared.module';
import { StatsComponent } from './stats/stats.component';
import { CategoriesComponent } from './categories/categories.component';
import { AccountComponent } from './account/account.component';
import { ChartComponent } from './chart/chart.component';
import { ExpenseComponent } from './expense/expense.component';

@NgModule({
    imports: [CommonModule, RouterModule, FontAwesomeModule, SharedModule],
    declarations: [DashboardComponent, BalanceComponent, StatsComponent, CategoriesComponent, AccountComponent, ChartComponent, ExpenseComponent]
})
export class DashboardModule {}

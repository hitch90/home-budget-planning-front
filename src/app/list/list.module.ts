import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from '../shared/shared.module';
import { ListComponent } from './list/list.component';
import { FiltersComponent } from './filters/filters.component';
import { TableModule } from 'primeng/table';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { IncomesComponent } from './incomes/incomes.component';
import { RefillComponent } from './refill/refill.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { ListDirective } from './list/list-directive';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FontAwesomeModule,
        SharedModule,
        TableModule
    ],
    declarations: [
        ListDirective,
        ListComponent,
        FiltersComponent,
        PieChartComponent,
        BarChartComponent,
        IncomesComponent,
        RefillComponent,
        ExpensesComponent
    ],
    entryComponents: [
        IncomesComponent,
        ExpensesComponent,
    ]
})
export class ListModule {}

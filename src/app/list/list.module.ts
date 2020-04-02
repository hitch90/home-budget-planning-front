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
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginatorModule} from '@angular/material/paginator';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FontAwesomeModule,
        SharedModule,
        TableModule,
        MatTableModule,
        MatSortModule,
        MatInputModule,
        MatFormFieldModule,
        MatPaginatorModule,
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

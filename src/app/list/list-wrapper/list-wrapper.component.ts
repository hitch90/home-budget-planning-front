import {Injectable, OnInit, ViewChild} from '@angular/core';
import * as dayjs from 'dayjs';
import { map } from 'rxjs/operators';
import { IncomeService } from '../../services/income.service';
import { ExpenseService } from '../../services/expense.service';
import { CategoryService } from '../../services/category.service';
import {ActivatedRoute} from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {formatValue} from '../../helpers/format-value';

@Injectable()
export class ListWrapperComponent implements OnInit {
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;
    tableData: MatTableDataSource<any>;
    displayedColumns: string[] = ['id', 'name', 'value', 'date', 'category.name', 'account.name'];
    incomesDisplayedColumns: string[] = ['id', 'name', 'value', 'date'];
    
    barChartData = [];
    categories$;
    categories = [];

    constructor(
        private incomeService: IncomeService,
        private expenseService: ExpenseService,
        private categoryService: CategoryService,
        private route: ActivatedRoute,
    ) {}
    
    ngOnInit(): void {
        this.route.paramMap
            .subscribe((data: any) => {
                this.getListData(data.params);
            });
    }

    getListData({ type }) {
        switch (type) {
            case 'expenses':
                this.getCategories();
                this.expenseService.getExpensesInMonths().subscribe((data: any) => {
                    this.barChartData = data;
                });
                this.expenseService.getExpenses().subscribe((data: any) => this.initTable(data));
                break;
            case 'incomes':
                this.incomeService.getIncomesInMonths().subscribe((data: any) => {
                    this.barChartData = data;
                });
                this.incomeService.getIncomes().subscribe((data: any) => this.initTable(data));
                break;
        }
    }
    
    initTable(data) {
        this.tableData = new MatTableDataSource(data.list);
        this.tableData.paginator = this.paginator;
        this.tableData.sort = this.sort;
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.tableData.filter = filterValue.trim().toLowerCase();

        if (this.tableData.paginator) {
            this.tableData.paginator.firstPage();
        }
    }

    parseDate(date) {
        return dayjs(date).format('DD/MM/YYYY');
    }
    
    parseValue(val) {
        return formatValue(val);
    }

    getCategories(): void {
        this.categories$ = this.categoryService
            .findAll()
            .pipe(
                map(categories =>
                    categories.map(item => {
                        item.sum = 0;
                        item.expenses.map(
                            exp => (item.sum += Math.floor(exp.value))
                        );
                        return item;
                     })
                )
            )
            .subscribe((data: any) => {
                this.categories = data;
            });
    }
}

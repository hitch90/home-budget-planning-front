import {Injectable, OnInit} from '@angular/core';
import * as dayjs from 'dayjs';
import { map } from 'rxjs/operators';
import { IncomeService } from '../../services/income.service';
import { ExpenseService } from '../../services/expense.service';
import { CategoryService } from '../../services/category.service';
import {ActivatedRoute} from '@angular/router';

@Injectable()
export class ListWrapperComponent implements OnInit {
    tableData = [];
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
                this.expenseService.getExpenses().subscribe((data: any) => this.tableData = data.list);
                break;
            case 'incomes':
                this.incomeService.getIncomesInMonths().subscribe((data: any) => {
                    this.barChartData = data;
                });
                this.incomeService.getIncomes().subscribe((data: any) => this.tableData = data.list);
                break;
        }
    }

    parseDate(date) {
        return dayjs(date).format('DD/MM/YYYY');
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

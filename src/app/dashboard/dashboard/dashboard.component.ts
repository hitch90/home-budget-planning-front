import { Component, OnDestroy, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { formatValue } from '../../helpers/format-value';
import { combineLatest, Subscription } from 'rxjs';
import { ExpenseService } from '../../services/expense.service';
import { CategoryService } from '../../services/category.service';
import { map } from 'rxjs/operators';
import { ICategory } from '../../interfaces/category';
import { IncomeService } from '../../services/income.service';
import * as dayjs from 'dayjs';

interface MonthYear {
    month: number;
    year: number;
}

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
    balance$: Subscription;
    balance = 0;
    balanceLoading = true;
    expenses$: Subscription;
    incomes$: Subscription;
    expenses = {
        current: 0,
        last: 0
    };
    incomes = {
        current: 0,
        last: 0
    };
    categories$: Subscription;
    categories: ICategory[];
    accounts$: Subscription;
    accounts = [];
    saving = [];
    monthsData = {
        incomes: [],
        expenses: [],
        balance: []
    };
    expensesList = {
        today: { list: [], sum: 0 },
        yesterday: { list: [], sum: 0 },
        dayBeforeYesterday: { list: [], sum: 0 }
    };
    constructor(
        private accountService: AccountService,
        private expenseService: ExpenseService,
        private incomeService: IncomeService,
        private categoryService: CategoryService
    ) {}

    ngOnInit(): void {
        this.balance$ = this.accountService.balance().subscribe(data => {
            this.balance = data;
            this.balanceLoading = false;
        });
        this.accountService.findAll().subscribe(acc => {});
        this.getCurrentMonthExpensesSum();
        this.getLastMonthExpensesSum();
        this.getCategories();
        this.getAccounts();
        this.getBalanceInMonths();
        this.getExpensesFrom3Days();
    }

    ngOnDestroy(): void {
        this.balance$.unsubscribe();
    }

    getExpensesFrom3Days() {
        const today = {
            from: dayjs().format('YYYY-MM-DD 00:00:00'),
            to: dayjs().format('YYYY-MM-DD 23:59:59')
        };
        const yesterday = {
            from: dayjs()
                .add(-1, 'day')
                .format('YYYY-MM-DD 00:00:00'),
            to: dayjs()
                .add(-1, 'day')
                .format('YYYY-MM-DD 23:59:59')
        };
        const dayBeforeYesterday = {
            from: dayjs()
                .add(-4, 'day')
                .format('YYYY-MM-DD 00:00:00'),
            to: dayjs()
                .add(-2, 'day')
                .format('YYYY-MM-DD 23:59:59')
        };
        combineLatest(
            this.expenseService.getExpenses({ from: today.from, to: today.to }),
            this.expenseService.getExpenses({
                from: yesterday.from,
                to: yesterday.to
            }),
            this.expenseService.getExpenses({
                from: dayBeforeYesterday.from,
                to: dayBeforeYesterday.to
            })
        ).subscribe(([todayRes, yesterdayRes, dayBeforeYesterdayRes]: any) => {
            this.expensesList.today = todayRes;
            this.expensesList.yesterday = yesterdayRes;
            this.expensesList.dayBeforeYesterday = dayBeforeYesterdayRes;
        });
    }

    getBalanceInMonths() {
        combineLatest(
            this.expenseService.getExpensesInMonths(),
            this.incomeService.getIncomesInMonths()
        ).subscribe(([expenses, incomes]: any) => {
            const balance = [];
            expenses.map((item, index) => {
                balance[index] = incomes[index] - item;
            });
            this.monthsData.expenses = expenses;
            this.monthsData.incomes = incomes;
            this.monthsData.balance = balance;
        });
    }

    getCurrentMonthExpensesSum(): void {
        const { month, year } = this.getMonthAndYear(0);
        this.getSum('current', month, year);
    }

    getLastMonthExpensesSum(): void {
        const { month, year } = this.getMonthAndYear(1);
        this.getSum('last', month, year);
    }

    getSum(key, month, year): void {
        this.expenses$ = this.expenseService
            .getExpenses({ month: month + 1, year })
            .subscribe(data => {
                this.expenses[key] = this.formatVal(data['sum']);
            });
        this.incomes$ = this.incomeService
            .getIncomes({ month: month + 1, year })
            .subscribe(data => {
                this.incomes[key] = this.formatVal(data['sum']);
            });
    }

    formatVal(val): number {
        return formatValue(val);
    }

    private getMonthAndYear(mod): MonthYear {
        const date = new Date();
        let month = date.getMonth() - mod;
        let year = date.getFullYear();
        if (month === 0) {
            month = 11;
            year -= 1;
        }
        return { month, year };
    }

    getCategories(): void {
        this.categories$ = this.categoryService
            .findAll()
            .pipe(
                map((cat: ICategory[]) => {
                    cat.map((item: ICategory) => {
                        this.expenseService
                            .getExpenses({
                                category: item.id,
                                ...this.getMonthAndYear(-1)
                            })
                            .subscribe((data: any) => {
                                item.sum = data.sum;
                            });
                    });
                    return cat;
                })
            )
            .subscribe((data: any) => {
                this.categories = data;
            });
    }

    getAccounts() {
        this.accounts$ = this.accountService
            .findAll({ type: 'private' })
            .subscribe(data => {
                this.accounts = data;
            });

        this.accounts$ = this.accountService
            .findAll({ type: 'saving' })
            .subscribe(data => {
                this.saving = data;
            });
    }
}

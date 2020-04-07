import { Component, OnDestroy, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { formatValue } from '../../helpers/format-value';
import { combineLatest, Subscription } from 'rxjs';
import { ExpenseService } from '../../services/expense.service';
import { CategoryService } from '../../services/category.service';
import { map } from 'rxjs/operators';
import { ICategory } from '../../interfaces/category';
import { IncomeService } from '../../services/income.service';

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
    categories: ICategory[] = [];
    accounts$: Subscription;
    accounts = [];
    saving = [];
    monthsData = {
        incomes: [],
        expenses: [],
        balance: []
    };
    lastExpensesList = [];
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
        this.getLastExpenses();
    }

    ngOnDestroy(): void {
        this.balance$.unsubscribe();
        this.categories$.unsubscribe();
        this.incomes$.unsubscribe();
        this.expenses$.unsubscribe();
    }

    getLastExpenses() {
        this.expenseService
            .getExpenses({ limit: 5 })
            .subscribe(
                (expenses: any) => (this.lastExpensesList = expenses.list)
            );
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
            .subscribe(
                data => (this.expenses[key] = this.formatVal(data['sum']))
            );
        this.incomes$ = this.incomeService
            .getIncomes({ month: month + 1, year })
            .subscribe(
                data => (this.incomes[key] = this.formatVal(this.calc(data)))
            );
    }

    calc(arr) {
        return arr.reduce(
            (previousValue, income) => previousValue + income.value,
            0
        );
    }

    formatVal(val): number {
        return val ? formatValue(val) : 0;
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
            .findParent()
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

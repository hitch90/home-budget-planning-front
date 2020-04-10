import { Component, OnDestroy, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { formatValue } from '../../helpers/format-value';
import { combineLatest, Subject, Subscription } from 'rxjs';
import { ExpenseService } from '../../services/expense.service';
import { CategoryService } from '../../services/category.service';
import { map, take, takeUntil } from 'rxjs/operators';
import { ICategory } from '../../interfaces/category';
import { IncomeService } from '../../services/income.service';
import { ConfigureModalComponent } from '../configure-modal/configure-modal.component';
import { NbDialogService } from '@nebular/theme';
import { IAccount } from '../../interfaces/account';

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
    private loadData = new Subject<any>();
    private balance$: Subscription;
    private expenses$: Subscription;
    private incomes$: Subscription;
    destroy$: Subject<boolean> = new Subject<boolean>();
    loadData$ = this.loadData.asObservable();
    loadedData = {
        categories: false,
        accounts: false
    };
    balance = 0;
    balanceLoading = true;
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
    accounts: IAccount[] = [];
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
        private categoryService: CategoryService,
        private dialogService: NbDialogService
    ) {}

    ngOnInit(): void {
        this.balance$ = this.accountService.balance()
            .pipe(takeUntil(this.destroy$))
            .subscribe(data => {
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
        this.checkDataIsLoaded();
    }

    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }

    checkDataIsLoaded() {
        this.loadData$
            .pipe(takeUntil(this.destroy$))
            .subscribe(data => {
            this.loadedData = { ...this.loadedData, ...data };
            if (this.loadedData.categories && this.loadedData.accounts) {
                if (!this.categories.length || !this.accounts.length) {
                    this.openSetupModal();
                }
            }
        });
    }

    getLastExpenses() {
        this.expenseService
            .getExpenses({ limit: 5 })
            .pipe(takeUntil(this.destroy$))
            .subscribe(
                (expenses: any) => (this.lastExpensesList = expenses.list)
            );
    }

    getBalanceInMonths() {
        combineLatest(
            this.expenseService.getExpensesInMonths(),
            this.incomeService.getIncomesInMonths()
        )
            .pipe(takeUntil(this.destroy$))
            .subscribe(([expenses, incomes]: any) => {
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
            .pipe(takeUntil(this.destroy$))
            .subscribe(
                data => (this.expenses[key] = this.formatVal(data['sum']))
            );
        this.incomes$ = this.incomeService
            .getIncomes({ month: month + 1, year })
            .pipe(takeUntil(this.destroy$))
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
                }),
                takeUntil(this.destroy$)
            )
            .subscribe((data: any) => {
                this.categories = data;
                this.loadData.next({
                    categories: true
                });
            });
    }

    getAccounts() {
        this.accounts$ = this.accountService
            .findAll({ type: 'private' })
            .pipe(takeUntil(this.destroy$))
            .subscribe(data => {
                this.accounts = data;
                this.loadData.next({
                    accounts: true
                });
            });

        this.accounts$ = this.accountService
            .findAll({ type: 'saving' })
            .pipe(takeUntil(this.destroy$))
            .subscribe(data => (this.saving = data));
    }

    protected openSetupModal() {
        this.dialogService.open(ConfigureModalComponent, {
            closeOnBackdropClick: false,
            closeOnEsc: false,
            context: {
                categories: this.categories,
                accounts: this.accounts
            }
        });
    }
}

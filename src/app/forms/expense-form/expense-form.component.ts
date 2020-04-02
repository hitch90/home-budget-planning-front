import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExpenseService } from '../../services/expense.service';
import { CategoryService } from '../../services/category.service';
import { Observable } from 'rxjs';
import { AccountService } from '../../services/account.service';
import * as dayjs from 'dayjs';

@Component({
    selector: 'app-expense-form',
    templateUrl: './expense-form.component.html',
    styleUrls: ['./expense-form.component.scss']
})
export class ExpenseFormComponent implements OnInit {
    expenseForm: FormGroup;
    status: string;
    categories$: Observable<any>;
    accounts$: Observable<any>;
    constructor(
        private formBuilder: FormBuilder,
        private expenseService: ExpenseService,
        private categoryService: CategoryService,
        private accountService: AccountService
    ) {}

    ngOnInit() {
        this.categories$ = this.categoryService.findAll();
        this.accounts$ = this.accountService.findAll();
        this.expenseForm = this.buildForm();
    }

    private buildForm() {
        return this.formBuilder.group({
            name: ['', Validators.required],
            description: [''],
            category: ['', Validators.required],
            image: [''],
            value: [0, Validators.required],
            currency: ['pln', Validators.required],
            account: ['', Validators.required],
            date: ['', Validators.required]
        });
    }

    submit() {
        const values = this.expenseForm.getRawValue();
        this.expenseService
            .create({
                ...values,
                date: dayjs(values.date).format('YYYY-MM-DD')
            })
            .subscribe(
                () => {
                    this.status = 'ok';
                    this.expenseForm.patchValue({
                        name: '',
                        description: '',
                        category: '',
                        image: '',
                        value: 0,
                        currency: 'pln',
                        account: '',
                        date: ''
                    });
                },
                () => (this.status = 'not-ok')
            );
    }
}

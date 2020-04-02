import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { CategoryService } from '../../services/category.service';
import { AccountService } from '../../services/account.service';
import * as dayjs from 'dayjs';
import { IncomeService } from '../../services/income.service';

@Component({
  selector: 'app-income-form',
  templateUrl: './income-form.component.html',
  styleUrls: ['./income-form.component.scss']
})
export class IncomeFormComponent implements OnInit {
    incomeForm: FormGroup;
    status: string;
    categories$: Observable<any>;
    accounts$: Observable<any>;
    constructor(
        private formBuilder: FormBuilder,
        private incomeService: IncomeService,
        private categoryService: CategoryService,
        private accountService: AccountService
    ) {}

    ngOnInit() {
        this.categories$ = this.categoryService.findAll();
        this.accounts$ = this.accountService.findAll();
        this.incomeForm = this.buildForm();
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
        const values = this.incomeForm.getRawValue();
        this.incomeService
            .create({
                ...values,
                date: dayjs(values.date).format('YYYY-MM-DD')
            })
            .subscribe(
                () => {
                    this.status = 'ok';
                    this.incomeForm.patchValue({
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

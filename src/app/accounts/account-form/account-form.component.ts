import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../services/account.service';

@Component({
    selector: 'app-account-form',
    templateUrl: './account-form.component.html',
    styleUrls: ['./account-form.component.scss']
})
export class AccountFormComponent implements OnInit {
    @Output() addedAccount: EventEmitter<any> = new EventEmitter<any>();
    accountForm: FormGroup;
    status: string;
    constructor(
        private formBuilder: FormBuilder,
        private accountService: AccountService,
    ) {}

    ngOnInit() {
        this.accountForm = this.buildForm();
    }

    private buildForm() {
        return this.formBuilder.group({
            name: ['', Validators.required],
            description: [''],
            image: [''],
            startValue: [0, Validators.required],
            currency: ['pln', Validators.required],
            type: ['', Validators.required],
            color: ['', Validators.required],
        });
    }

    submit() {
        if (this.accountForm.valid) {
            const values = this.accountForm.getRawValue();
            this.accountService.create({ ...values, currentValue: values.startValue }).subscribe(
                () => {
                    this.status = 'ok';
                    this.accountForm.patchValue({
                        name: '',
                        description: '',
                        startValue: 0,
                        currency: 'pln',
                        type: '',
                        color: '',
                    });
                    this.addedAccount.emit();
                },
                () => (this.status = 'not-ok')
            );
        } else {
            this.status = 'not-ok';
        }
    }
}

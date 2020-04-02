import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-transfer-form',
  templateUrl: './transfer-form.component.html',
  styleUrls: ['./transfer-form.component.scss']
})
export class TransferFormComponent implements OnInit {
    accounts$: Observable<any>;
    status: string;
    transferForm: FormGroup;
    
    constructor(
        private formBuilder: FormBuilder,
        private accountService: AccountService
    ) {}

    ngOnInit() {
        this.accounts$ = this.accountService.findAll();
        this.transferForm = this.buildForm();
    }
    private buildForm() {
        return this.formBuilder.group({
            from: ['', Validators.required],
            to: ['', Validators.required],
            value: [0, Validators.required],
        });
    }

    submit() {
        const values = this.transferForm.getRawValue();
        this.accountService
            .transfer(values)
            .subscribe(
                () => {
                    this.status = 'ok';
                    this.transferForm.reset();
                },
                () => (this.status = 'not-ok')
            );
    }
}

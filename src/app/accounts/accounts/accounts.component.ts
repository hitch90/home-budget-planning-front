import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { IAccount } from '../../interfaces/account';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-accounts',
    templateUrl: './accounts.component.html',
    styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {
    accounts: IAccount[] = [];
    accounts$: Subscription;
    constructor(private accountService: AccountService) {}

    ngOnInit(): void {
        this.getAccounts();
    }

    getAccounts() {
        this.accounts$ = this.accountService
            .findAll()
            .subscribe(data => (this.accounts = data));
    }
}

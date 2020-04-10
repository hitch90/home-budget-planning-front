import { Component, OnDestroy, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { IAccount } from '../../interfaces/account';
import { Observable, Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-accounts',
    templateUrl: './accounts.component.html',
    styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit, OnDestroy {
    accountsSub: Subscription;
    accounts: IAccount[];
    destroy$: Subject<boolean> = new Subject<boolean>();
    constructor(private accountService: AccountService) {}

    ngOnInit(): void {
        this.getAccounts();
    }

    getAccounts() {
        this.accountsSub = this.accountService
            .findAll()
            .pipe(takeUntil(this.destroy$))
            .subscribe(data => (this.accounts = data));
    }

    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}

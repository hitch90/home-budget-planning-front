import { Component, Input, OnInit } from '@angular/core';
import { IAccount } from '../../interfaces/account';
import { formatValue } from '../../helpers/format-value';

@Component({
    selector: 'app-account-item',
    templateUrl: './account-item.component.html',
    styleUrls: ['./account-item.component.scss']
})
export class AccountItemComponent implements OnInit {
    @Input() account: IAccount;
    constructor() {}

    ngOnInit(): void {}
    
    value(val) {
        return formatValue(val);
    }
}

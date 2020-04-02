import {Component, Input, OnInit} from '@angular/core';
import { faPiggyBank } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-balance',
    templateUrl: './balance.component.html',
    styleUrls: ['./balance.component.scss']
})
export class BalanceComponent implements OnInit {
    @Input() balance = 0;
    @Input() isLoading = true;
    faPiggyBank = faPiggyBank;

    ngOnInit(): void {
    }
}

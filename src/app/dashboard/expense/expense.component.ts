import { Component, Input } from '@angular/core';
import { IExpanse } from '../../interfaces/expanse';

@Component({
    selector: 'app-expense',
    templateUrl: './expense.component.html',
    styleUrls: ['./expense.component.scss']
})
export class ExpenseComponent {
    @Input() expense: IExpanse;
    constructor() {}
}

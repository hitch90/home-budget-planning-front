import { Component, OnInit } from '@angular/core';
import { ListWrapperComponent } from '../list-wrapper/list-wrapper.component';

@Component({
    selector: 'app-expenses',
    templateUrl: './expenses.component.html',
    styleUrls: ['./expenses.component.scss']
})
export class ExpensesComponent extends ListWrapperComponent {}

import { Component, OnInit } from '@angular/core';
import { ListWrapperComponent } from '../list-wrapper/list-wrapper.component';

@Component({
    selector: 'app-incomes',
    templateUrl: './incomes.component.html',
    styleUrls: ['./incomes.component.scss']
})
export class IncomesComponent extends ListWrapperComponent {}

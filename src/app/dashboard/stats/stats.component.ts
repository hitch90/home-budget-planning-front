import { Component, Input, OnInit } from '@angular/core';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';

interface IExpense {
    last: string;
    current: string;
}

@Component({
    selector: 'app-stats',
    templateUrl: './stats.component.html',
    styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {
    @Input() expense: IExpense;
    @Input() income: IExpense;
    
    iconDown = faArrowDown;
    iconUp = faArrowUp;

    constructor() {}

    ngOnInit(): void {}
}

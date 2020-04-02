import { Component, Input, OnInit } from '@angular/core';
import { ICategory } from '../../interfaces/category';
import { formatValue } from '../../helpers/format-value';

@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
    @Input() categories: ICategory[];
    constructor() {}

    ngOnInit(): void {}

    formatVal(val) {
        return formatValue(val);
    }
    
    getMonth() {
        return new Date().getMonth() + 1;
    }

    getYear() {
        return new Date().getFullYear();
    }
}

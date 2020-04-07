import { Component, Input, OnInit } from '@angular/core';
import { ICategory } from '../../interfaces/category';

@Component({
    selector: 'app-categories-tree',
    templateUrl: './categories-tree.component.html',
    styleUrls: ['./categories-tree.component.scss']
})
export class CategoriesTreeComponent implements OnInit {
    @Input() categories: ICategory[];
    constructor() {}

    ngOnInit(): void {

    }
}

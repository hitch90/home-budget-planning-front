import { Component, Input, OnInit } from '@angular/core';
import { ICategory } from '../../interfaces/category';

@Component({
    selector: 'app-categories-tree-item',
    templateUrl: './categories-tree-item.component.html',
    styleUrls: ['./categories-tree-item.component.scss']
})
export class CategoriesTreeItemComponent implements OnInit {
    @Input() category: ICategory;
    constructor() {}

    ngOnInit(): void {}
}

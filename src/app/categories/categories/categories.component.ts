import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { ICategory } from '../../interfaces/category';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit, OnDestroy {
    categories: ICategory[];
    categories$: Subscription;
    constructor(private categoryService: CategoryService) {}

    ngOnInit(): void {
        this.getCategories();
    }
    
    ngOnDestroy(): void {
        this.categories$.unsubscribe();
    }

    getCategories() {
        this.categories$ = this.categoryService
            .findParent()
            .subscribe(cat => (this.categories = cat));
    }

    updateList() {
        this.getCategories();
    }
    
}

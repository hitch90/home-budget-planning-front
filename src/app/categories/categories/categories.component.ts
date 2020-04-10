import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { ICategory } from '../../interfaces/category';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit, OnDestroy {
    categories: ICategory[] = [];
    categoriesSub: Subscription;
    destroy$: Subject<boolean> = new Subject<boolean>();
    constructor(private categoryService: CategoryService) {}

    ngOnInit(): void {
        this.getCategories();
    }
    
    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }

    getCategories() {
        this.categoriesSub = this.categoryService
            .findParent()
            .pipe(takeUntil(this.destroy$))
            .subscribe(cat => (this.categories = cat));
    }

    updateList() {
        this.getCategories();
    }
    
}

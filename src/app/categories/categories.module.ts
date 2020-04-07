import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { CategoriesTreeComponent } from './categories-tree/categories-tree.component';
import { CategoriesTreeItemComponent } from './categories-tree-item/categories-tree-item.component';

@NgModule({
    imports: [
        BrowserModule,
        RouterModule,
        CommonModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        SharedModule
    ],
    declarations: [
        CategoriesComponent,
        CategoryFormComponent,
        CategoriesTreeComponent,
        CategoriesTreeItemComponent
    ],
    exports: []
})
export class CategoriesModule {}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { ICategory } from '../../interfaces/category';

@Component({
    selector: 'app-category-form',
    templateUrl: './category-form.component.html',
    styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {
    categoryForm: FormGroup;
    categories: ICategory[];
    status: string;

    constructor(
        private formBuilder: FormBuilder,
        private categoryService: CategoryService
    ) {}

    ngOnInit() {
        this.categoryForm = this.buildForm();
        this.getCategories();
    }

    private buildForm() {
        return this.formBuilder.group({
            name: ['', Validators.required],
            description: [''],
            image: [''],
            color: ['#F1F5FC'],
            parentId: [],
            type: ['', Validators.required]
        });
    }

    getCategories() {
        this.categoryService
            .findParent()
            .subscribe(
                (categories: ICategory[]) => (this.categories = categories)
            );
    }

    submit() {
        const values = this.categoryForm.getRawValue();
        this.categoryService
            .create({
                ...values
            })
            .subscribe(
                () => {
                    this.status = 'ok';
                    this.categoryForm.patchValue({
                        name: '',
                        description: '',
                        image: '',
                        color: '#F1F5FC',
                        type: '',
                    });
                },
                () => (this.status = 'not-ok')
            );
    }
}

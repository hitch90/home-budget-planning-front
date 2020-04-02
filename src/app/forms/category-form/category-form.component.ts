import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {
    categoryForm: FormGroup;
    status: string;

    constructor(
        private formBuilder: FormBuilder,
        private categoryService: CategoryService,
    ) {}

    ngOnInit() {
        this.categoryForm = this.buildForm();
    }

    private buildForm() {
        return this.formBuilder.group({
            name: ['', Validators.required],
            description: [''],
            image: [''],
        });
    }

    submit() {
        const values = this.categoryForm.getRawValue();
        this.categoryService
            .create({
                ...values,
            })
            .subscribe(
                () => {
                    this.status = 'ok';
                    this.categoryForm.patchValue({
                        name: '',
                        description: '',
                        image: '',
                    });
                },
                () => (this.status = 'not-ok')
            );
    }
}

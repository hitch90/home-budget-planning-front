import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { Observable } from 'rxjs';
import { AccountService } from '../../services/account.service';
import * as dayjs from 'dayjs';
import { RefillService } from 'src/app/services/refill.service';

@Component({
  selector: 'app-refill-form',
  templateUrl: './refill-form.component.html',
  styleUrls: ['./refill-form.component.scss']
})
export class RefillFormComponent implements OnInit {
  refillForm: FormGroup;
  status: string;
  categories$: Observable<any>;
  accounts$: Observable<any>;
  constructor(
      private formBuilder: FormBuilder,
      private refillService: RefillService,
      private categoryService: CategoryService,
      private accountService: AccountService
  ) {}

  ngOnInit() {
      this.categories$ = this.categoryService.findAll();
      this.accounts$ = this.accountService.findAll();
      this.refillForm = this.buildForm();
  }

  private buildForm() {
      return this.formBuilder.group({
          name: ['Tankowanie', Validators.required],
          description: [''],
          category: ['', Validators.required],
          image: [''],
          value: [0, Validators.required],
          currency: ['pln', Validators.required],
          account: ['', Validators.required],
          date: ['', Validators.required],
          unitValue: [0, Validators.required],
          mileage: [0, Validators.required],
          fuel: [0, Validators.required],
          car: ['astra', Validators.required],
      });
  }

  submit() {
      const values = this.refillForm.getRawValue();
      this.refillService
          .create({
              ...values,
              date: dayjs(values.date).format('YYYY-MM-DD')
          })
          .subscribe(
              () => {
                  this.status = 'ok';
                  this.refillForm.patchValue({
                      name: 'Tankowanie',
                      description: '',
                      category: '',
                      image: '',
                      value: 0,
                      currency: 'pln',
                      account: '',
                      date: '',
                      unitValue: 0,
                      mileage: 0,
                      fuel: 0,
                      car: 'astra',
                  });
              },
              () => (this.status = 'not-ok')
          );
    }
  }

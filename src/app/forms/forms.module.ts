import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsComponent } from './forms/forms.component';
import { IncomeFormComponent } from './income-form/income-form.component';
import { ExpenseFormComponent } from './expense-form/expense-form.component';
import { AccountFormComponent } from './account-form/account-form.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import { MatDatepickerModule, MatFormFieldModule, MatNativeDateModule } from '@angular/material';
import { CategoryFormComponent } from './category-form/category-form.component';
import { TransferFormComponent } from './transfer-form/transfer-form.component';
import { RefillFormComponent } from './refill-form/refill-form.component';
;

@NgModule({
    imports: [
        BrowserModule,
        RouterModule,
        CommonModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        SharedModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatNativeDateModule
    ],
    declarations: [
        FormsComponent,
        IncomeFormComponent,
        ExpenseFormComponent,
        AccountFormComponent,
        CategoryFormComponent,
        TransferFormComponent,
        RefillFormComponent
    ],
    exports: []
})
export class FormsModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { AccountsComponent } from './accounts/accounts.component';
import { AccountsListComponent } from './accounts-list/accounts-list.component';
import { AccountItemComponent } from './account-item/account-item.component';
import { AccountFormComponent } from './account-form/account-form.component';

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
        AccountsComponent,
        AccountsListComponent,
        AccountItemComponent,
        AccountFormComponent
    ],
    exports: []
})
export class AccountsModule {}

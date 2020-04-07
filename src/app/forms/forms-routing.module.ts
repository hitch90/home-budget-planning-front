import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsComponent } from './forms/forms.component';
import { IncomeFormComponent } from './income-form/income-form.component';
import { ExpenseFormComponent } from './expense-form/expense-form.component';
import { AccountFormComponent } from './account-form/account-form.component';
import { TransferFormComponent } from './transfer-form/transfer-form.component';
import { RefillFormComponent } from './refill-form/refill-form.component';
import { AuthGuard } from '../services/auth.guard';

const routes: Routes = [
    {
        path: 'add',
        component: FormsComponent,
        canActivate : [AuthGuard],
        children: [
            {
                path: 'income',
                component: IncomeFormComponent
            },
            {
                path: 'expense',
                component: ExpenseFormComponent
            },
            {
                path: 'account',
                component: AccountFormComponent
            },
            {
                path: 'transfer',
                component: TransferFormComponent
            },
            {
                path: 'refill',
                component: RefillFormComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FormsRoutingModule {}

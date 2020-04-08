import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../services/auth.guard';
import { AccountsComponent } from './accounts/accounts.component';

const routes: Routes = [
    {
        path: 'accounts',
        component: AccountsComponent,
        canActivate : [AuthGuard],
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccountsRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from '../services/auth.guard';

const routes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        pathMatch: 'full',
        redirectTo: '/dashboard'
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate : [AuthGuard],
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule {}

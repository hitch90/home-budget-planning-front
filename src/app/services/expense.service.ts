import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { IExpanse } from '../interfaces/expanse';
import * as dayjs from 'dayjs';

@Injectable({
    providedIn: 'root'
})
export class ExpenseService {
    private expensesRoute =
        environment.api_url + '/' + environment.routes.expenses;
    private expenseRoute =
        environment.api_url + '/' + environment.routes.expense;
    constructor(private httpClient: HttpClient) {}

    findAll(limit = 0): Observable<any> {
        return this.httpClient.get(this.expensesRoute + `?limit=${limit}`);
    }

    findOne(id: number): Observable<any> {
        return this.httpClient.get(this.expenseRoute + '/' + id);
    }

    create(expense: IExpanse): Observable<any> {
        return this.httpClient.post(this.expenseRoute, expense);
    }

    delete(id: number) {
        return this.httpClient.delete(this.expenseRoute + `/${id}`);
    }

    getExpenses(filters = null) {
        let query = '';
        if (filters !== null) {
            const objectArray = Object.entries(filters);
            query = '?filters=true';
            objectArray.forEach(([key, value], index) => {
                query = `${query}&${key}=${value}`;
            });
        }
        return this.httpClient.get(this.expensesRoute + query);
    }
    
    getExpensesInMonths() {
        return this.httpClient.get(this.expensesRoute + '/months');
    }
}

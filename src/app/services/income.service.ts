import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import * as dayjs from 'dayjs';

@Injectable({
  providedIn: 'root'
})
export class IncomeService {
    private incomesRoute = environment.api_url + '/' + environment.routes.incomes;
    private incomeRoute = environment.api_url + '/' + environment.routes.income;
    constructor(
        private httpClient: HttpClient
    ) { }

    findAll(limit = 0) {
        return this.httpClient.get(this.incomesRoute + `?limit=${limit}`);
    }
    
    delete(id: number) {
        return this.httpClient.delete(this.incomeRoute + `/${id}`);
    }
    
    create(income) {
        return this.httpClient.post(this.incomeRoute, income);
    }

    getIncomes(filters = null) {
        let query = '?filters=true';
        if (filters !== null) {
            const objectArray = Object.entries(filters);
            objectArray.forEach(([key, value], index) => {
                let val: any = value;
                if (key === 'from' || key === 'to') {
                    val = dayjs(val).format('YYYY-MM-DD');
                }
                query = `${query}&${key}=${val}`;
            });
        }
        return this.httpClient.get(this.incomesRoute + query);
    }
    
    getIncomesInMonths() {
        return this.httpClient.get(this.incomesRoute + '/months');
    }
}

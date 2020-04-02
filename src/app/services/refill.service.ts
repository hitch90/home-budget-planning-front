import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { IExpanse } from '../interfaces/expanse';
import * as dayjs from 'dayjs';
import { IRefill } from '../interfaces/refill';

@Injectable({
    providedIn: 'root'
})
export class RefillService {
    private refillRoute = environment.api_url + '/' + environment.routes.fuel;

    constructor(private httpClient: HttpClient) {}

    findAll(limit = 0): Observable<any> {
        return this.httpClient.get(this.refillRoute + `?limit=${limit}`);
    }

    consumption(since?: any): Observable<any> {
        return this.httpClient.get(
            this.refillRoute + `/consumption${since ? '?since=' + since : ''}`
        );
    }

    consumptionByMonth(month) {
        return this.httpClient.get(
            this.refillRoute + `/consumption?month=${month}`
        );
    }

    findOne(id: number): Observable<any> {
        return this.httpClient.get(this.refillRoute + `/id/${id}`);
    }

    create(refill: IRefill): Observable<any> {
        return this.httpClient.post(this.refillRoute, refill);
    }

    delete(id: number) {
        return this.httpClient.delete(this.refillRoute + `/id/${id}`);
    }

    getByFilters(filters) {
        const objectArray = Object.entries(filters);
        let query = '?filters=true';
        objectArray.forEach(([key, value], index) => {
            let val: any = value;
            if (key === 'from' || key === 'to') {
                val = dayjs(val).format('YYYY-MM-DD');
            }
            query = `${query}&${key}=${val}`;
        });
        return this.httpClient.get(this.refillRoute + query);
    }

    fuelPrice() {
        return this.httpClient.get(
            'https://www.globalpetrolprices.com/api_gpp.php?cnt=PL&ind=gp&prd=latest&uid=1638&uidc=6df3421a821772519b2d1f9abb223199',
            { responseType: 'text' }
        );
    }
}

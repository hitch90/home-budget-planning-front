import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { ICategory } from '../interfaces/category';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    categoryRoute = environment.api_url + '/' + environment.routes.category;
    categoriesRoute = environment.api_url + '/' + environment.routes.categories;
    constructor(private httpClient: HttpClient) {}

    findAll(limit: number = 0): Observable<ICategory[]> {
        return this.httpClient.get<ICategory[]>(
            this.categoriesRoute + `?limit=${limit}`
        );
    }

    findParent(): Observable<ICategory[]> {
        return this.httpClient.get<ICategory[]>(
            this.categoriesRoute + `?parent=null`
        );
    }

    create(category) {
        return this.httpClient.post(this.categoryRoute, category);
    }

    delete(id) {
        return this.httpClient.delete(this.categoryRoute + `/${id}`);
    }
}

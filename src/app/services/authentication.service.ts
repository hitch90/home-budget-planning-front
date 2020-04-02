import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<string>;
    public currentUser: Observable<string>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<string>(localStorage.getItem('access_token'));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): string {
        return this.currentUserSubject.value;
    }

    login({username, password}) {
        return this.http
            .post<any>(`${environment.api_url}/auth/login`, {
                username,
                password
            })
            .pipe(
                map(user => {
                    localStorage.setItem('access_token', user.access_token);
                    this.currentUserSubject.next(user.access_token);
                    return user.access_token;
                })
            );
    }

    logout() {
        localStorage.removeItem('access_token');
        this.currentUserSubject.next(null);
    }
}

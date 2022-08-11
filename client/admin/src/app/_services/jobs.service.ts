import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';

@Injectable({ providedIn: 'root' })
export class JobsService {
    private userSubject: BehaviorSubject<any>;
    public user: Observable<any>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('user')));
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): any {
        return this.userSubject.value;
    }



    save(data) {
        return this.http.post<any>(`api/admin/users`, data)
            .pipe(map(res => {
                return res;
            }));
    }


    getAll() {
        return this.http.get<any[]>(`/api/admin/users`);
    }

    getById(id: string) {
        return this.http.get<any>(`/api/admin/users/${id}`);
    }

    delete(id: string) {
        return this.http.delete<any>(`/api/admin/users/${id}`);
    }


    update(id, params) {
        return this.http.put(`/api/admin/users/${id}`, params)
            .pipe(map(res => {
                return res;
            }));
    }

}
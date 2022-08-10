import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { User } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class UsersService {

    constructor(
        private http: HttpClient
    ) {
    }


    getUserData() {
        return this.http.get<any[]>(`/api/site/profile`);
    }

}
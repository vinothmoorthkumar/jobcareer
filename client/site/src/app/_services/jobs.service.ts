import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { User } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class JobsService {

    constructor(
        private http: HttpClient
    ) {
    }


    getAllJobs() {
        return this.http.get<any[]>(`/api/site/jobs`);
    }

   
}
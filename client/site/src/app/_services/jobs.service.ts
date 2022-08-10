import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
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


    getAllJobs(data) {
        let params= new HttpParams();
        if(data.search){
            params=params.append('search',data.search)
        }
        if(data.auth){
            return this.http.get<any[]>(`/api/site/jobs/auth`,{params:params});
        }else{
            return this.http.get<any[]>(`/api/site/jobs`,{params:params});
        }
    }

    applyJob(id) {
        return this.http.get<any[]>(`/api/site/applyJob?id=${id}`);
    }

}
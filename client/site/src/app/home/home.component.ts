import { Component } from '@angular/core';

import { JobsService, AccountService } from '@app/_services';

@Component({ templateUrl: 'home.component.html',styleUrls:["home.component.css"] })
export class HomeComponent {
    jobs:any=[];
    user;
    searchData:any="";
    constructor(private jobService: JobsService,public accountService:AccountService) {
        this.accountService.user.subscribe(x => this.user = x);
    }


    ngOnInit():void {
        this.getData();
    }

    getData(){
        let filter={}
        if(this.searchData){
            filter['search']=this.searchData;
        }
        this.jobService.getAllJobs(filter).subscribe(res=>{
            let result:any=res;
            this.jobs=result.data;
            console.log("this.jobs",this.jobs)
        },err=>{

        })
    }

    logout() {
        this.accountService.logout();
    }

}
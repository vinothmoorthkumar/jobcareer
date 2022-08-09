import { Component } from '@angular/core';

import { JobsService } from '@app/_services';

@Component({ templateUrl: 'home.component.html',styleUrls:["home.component.css"] })
export class HomeComponent {
    jobs:any=[];
    constructor(private jobService: JobsService) {
    }


    ngOnInit():void {
        this.getData();
    }

    getData(){
        this.jobService.getAllJobs().subscribe(res=>{
            let result:any=res;
            this.jobs=result.data;
            console.log("this.jobs",this.jobs)
        },err=>{

        })
    }

}
import { Component } from '@angular/core';

import { JobsService } from '@app/_services';

@Component({ templateUrl: 'home.component.html',styleUrls:["home.component.css"] })
export class HomeComponent {
    jobs:any=[];
    searchData:any="";
    constructor(private jobService: JobsService) {
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

}
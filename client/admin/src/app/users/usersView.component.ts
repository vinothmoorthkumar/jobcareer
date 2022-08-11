﻿import { User } from '@app/_models';
import { JobsService, AlertService } from '@app/_services';
import { Component, Inject } from '@angular/core';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
    templateUrl: 'usersView.component.html',
    styleUrls: ['users.component.css']
})
export class UsersViewComponent {
    name: string;
    editObj:any={};
    constructor(private alertService: AlertService,private jobService: JobsService, public dialog: MatDialog) {
    }

    ngOnInit():void {
        console.log("usr view")
        this.getData();
    }


    displayedColumns: string[] = ['name', 'email', 'action'];
    dataSource = [];


    saveData(data){
        this.jobService.save(data)
            .pipe(first())
            .subscribe(
                data => {
                    this.getData();
                    this.alertService.success('User added successfully', { keepAfterRouteChange: true });
                },
                error => {
                });
    }

    getData(){
        this.jobService.getAll().subscribe(res=>{
            let result:any =res;
            this.dataSource=result.data;
        },err=>{

        })
    }

    editData(id){
        // this.jobService.getById(id).subscribe(res=>{
        //     const dialogRef = this.dialog.open(JobsDialog, {
        //         data:res.data,
        //         height: '80%',
        //         width: '50%',
        //     });
        //     dialogRef.afterClosed().subscribe(result => {
        //         this.updateData(result.data);
        //     });

        // },err=>{

        // })
    }


    updateData(data){
        this.jobService.update(data._id,data)
        .pipe(first())
        .subscribe(
            data => {
                this.getData();
                this.alertService.success('User added successfully', { keepAfterRouteChange: true });
            },
            error => {
            });
    }

    deleteData(id){
        this.jobService.delete(id)
        .pipe(first())
        .subscribe(
            data => {
                this.getData();
                this.alertService.success('User added successfully', { keepAfterRouteChange: true });
            },
            error => {
            });
    }
}

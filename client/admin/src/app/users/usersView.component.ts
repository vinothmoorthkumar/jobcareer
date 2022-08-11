import { User } from '@app/_models';
import { UsersService, AlertService } from '@app/_services';
import { Component, Inject } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { first, map } from 'rxjs/operators';

@Component({
    templateUrl: 'usersView.component.html',
    styleUrls: ['users.component.css']
})
export class UsersViewComponent {
    name: string;
    editObj:any={};
    userId;
    constructor(private activatedRoute: ActivatedRoute,private alertService: AlertService,private usersService: UsersService, public dialog: MatDialog) {
        // this.userId = activatedRoute.params.pipe(map(p => p.id));

        this.userId = this.activatedRoute.snapshot.paramMap.get('id');
        // this.activatedRoute.queryParams.subscribe(params => {
        //     console.log("D",params)
        //     this.userId = params['id'];
        // });
    }

    ngOnInit():void {
        this.getData();
    }


    dataSource = [];


    saveData(data){
        this.usersService.save(data)
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
        this.usersService.getById(this.userId).subscribe(res=>{
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
        this.usersService.update(data._id,data)
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
        this.usersService.delete(id)
        .pipe(first())
        .subscribe(
            data => {
                this.getData();
                this.alertService.success('User added successfully', { keepAfterRouteChange: true });
            },
            error => {
            });
    }

    dateConvert(date){
        return new Date(`${date.month}/${date.day}/${date.year}`)
    }
}

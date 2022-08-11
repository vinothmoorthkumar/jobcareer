import { User } from '@app/_models';
import { UsersService, AlertService } from '@app/_services';
import { Component, Inject } from '@angular/core';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';




@Component({
    templateUrl: 'users.component.html',
    styleUrls: ['users.component.css']
})
export class UsersComponent {
    name: string;
    editObj:any={};
    constructor(private alertService: AlertService,private usersService: UsersService, public dialog: MatDialog) {
    }

    ngOnInit():void {
        this.getData();
    }


    displayedColumns: string[] = ['name', 'email', 'action'];
    dataSource = [];


    saveData(data){
        this.usersService.save(data)
            .pipe(first())
            .subscribe(
                data => {
                    this.getData();
                    // this.alertService.success('User added successfully', { keepAfterRouteChange: true });
                },
                error => {
                });
    }

    getData(){
        this.usersService.getAll().subscribe(res=>{
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
                // this.alertService.success('User added successfully', { keepAfterRouteChange: true });
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
                // this.alertService.success('User added successfully', { keepAfterRouteChange: true });
            },
            error => {
            });
    }
}

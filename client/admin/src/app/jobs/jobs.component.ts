import { User } from '@app/_models';
import { JobsService, AlertService } from '@app/_services';
import { Component, Inject } from '@angular/core';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';




@Component({
    templateUrl: 'jobs.component.html',
    styleUrls: ['jobs.component.css']
})
export class JobsComponent {
    name: string;
    editObj:any={};
    constructor(private alertService: AlertService,private jobService: JobsService, public dialog: MatDialog) {
    }

    ngOnInit():void {
        this.getData();
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(JobsDialog, {
            height: '80%',
            width: '50%',
        });

        dialogRef.afterClosed().subscribe(result => {
            this.saveData(result.data);
        });
    }

    displayedColumns: string[] = ['companyName', 'jobTitle', 'action'];
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
        this.jobService.getById(id).subscribe(res=>{
            const dialogRef = this.dialog.open(JobsDialog, {
                data:res.data,
                height: '80%',
                width: '50%',
            });
            dialogRef.afterClosed().subscribe(result => {
                this.updateData(result.data);
            });

        },err=>{

        })
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


@Component({
    selector: 'job-dialog',
    templateUrl: 'job.model.html',
    styleUrls: ['jobs.component.css']
})

export class JobsDialog {
    public FormGroup: FormGroup;

    constructor(
        public dialogRef: MatDialogRef<JobsDialog>,
        @Inject(MAT_DIALOG_DATA) public data,
    ) { }

    onNoClick(): void {
        this.dialogRef.close({event:"close"});
    }

    ngOnInit() {
        this.FormGroup = new FormGroup({
            companyName: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
            jobTitle: new FormControl('', [Validators.required, Validators.maxLength(200)]),
            jobDescription: new FormControl('', [Validators.required, Validators.maxLength(200)])
        });

        if(this.data){
            let obj={
                companyName:this.data.companyName,
                jobTitle:this.data.jobTitle,
                jobDescription:this.data.jobDescription,
            }
            this.FormGroup.setValue(obj);
        }
    }

    public checkError = (controlName: string, errorName: string) => {
        return this.FormGroup.controls[controlName].hasError(errorName);
    }

    onSubmit() {
        let obj={event:"save",data:this.FormGroup.value}
        if(this.data){
         obj['event']="update";
         obj['data']['_id']=this.data._id;
        }
        this.dialogRef.close(obj);
    }
}
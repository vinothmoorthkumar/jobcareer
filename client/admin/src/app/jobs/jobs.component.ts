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
                    this.alertService.success('User added successfully', { keepAfterRouteChange: true });
                },
                error => {
                    // this.alertService.error(error);
                });
    }

    getData(){
        this.jobService.getAll().subscribe(res=>{
            let result:any =res;
            this.dataSource=result.data;
            console.log("####",result)
        },err=>{

        })
    }


    editData(){
        
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
    }

    public checkError = (controlName: string, errorName: string) => {
        return this.FormGroup.controls[controlName].hasError(errorName);
    }

    onSubmit() {
        this.dialogRef.close({event:"save",data:this.FormGroup.value});
        // console.log('this.FormGroup.value',this.FormGroup.value)
    }
}
import { User } from '@app/_models';
import { AccountService } from '@app/_services';
import { Component, Inject } from '@angular/core';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';

export interface PeriodicElement {
    name: string;
    position: number;
    weight: number;
    symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
    { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
    { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
    { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
    { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
    { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
    { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
    { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
    { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
    { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
    { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];


@Component({
    templateUrl: 'jobs.component.html',
    styleUrls: ['jobs.component.css']
})
export class JobsComponent {
    animal: string;
    name: string;
    constructor(private accountService: AccountService, public dialog: MatDialog) {
    }


    openDialog(): void {
        const dialogRef = this.dialog.open(JobsDialog, {
            height: '80%',
            width: '50%',
            data: { name: this.name, animal: this.animal },
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            this.animal = result;
        });
    }

    displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
    dataSource = ELEMENT_DATA;
}


@Component({
    selector: 'job-dialog',
    templateUrl: 'job.model.html',
    styleUrls: ['jobs.component.css']
})

export class JobsDialog {
    public addShopFormGroup: FormGroup;

    constructor(
        public dialogRef: MatDialogRef<JobsDialog>,
        @Inject(MAT_DIALOG_DATA) public data,
    ) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

    ngOnInit() {
        this.addShopFormGroup = new FormGroup({
            // companyName: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
            // JobTitle: new FormControl('', [Validators.required, Validators.maxLength(200)])
            companyName: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
            jobTitle: new FormControl('', [Validators.required, Validators.maxLength(200)]),
            jobDescription: new FormControl('', [Validators.required, Validators.maxLength(200)])
        });
    }

    public checkError = (controlName: string, errorName: string) => {
        return this.addShopFormGroup.controls[controlName].hasError(errorName);
    }

    onSubmit() {

    }
}
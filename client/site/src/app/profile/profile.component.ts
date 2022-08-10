import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { UsersService, AlertService } from '@app/_services';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less']
})
export class ProfileComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  loading = false;
  profileData;
  model: NgbDateStruct;
  especialDates:NgbDateStruct[]=[
    {year:2018,month:6,day:1},
    {year:2018,month:6,day:10}]

  constructor(private formBuilder: FormBuilder, public usersService:UsersService, public alertService:AlertService) { }

  ngOnInit(): void {
    this.getData();

    this.form = this.formBuilder.group({
      mobile: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      name: ['', Validators.required],
      higherLevel:[''],
      schoolname:[''],
      schoolDate:[''],
      workExp: new FormArray([])
      
    });

    this.form.controls['email'].disable();
  }

  get workExp() : FormArray {
    return this.form.get("workExp") as FormArray
  }

 
  newExp(): FormGroup {
    return this.formBuilder.group({
      companyName: '',
      jobTitle: '',
      startDate:'',
      endDate:'',
      skills:'',
      industry:'',
    })
  }
 
  addExp() {
    this.workExp.push(this.newExp());
  }
 
  removeExp(i:number) {
    this.workExp.removeAt(i);
  }

  getData(){
    this.usersService.getUserData().subscribe(res=>{
      let result:any=res;
      this.profileData=result.data;
      this.form.setValue({
        mobile:this.profileData.mobile,
        email:this.profileData.email,
        name:this.profileData.name,
        higherLevel:this.profileData.higherLevel||"",
        schoolname:this.profileData.schoolname||"",
        schoolDate:this.profileData.schoolDate||"",
        workExp:[]
      });

      if(this.profileData && this.profileData.workExp){
        this.profileData.workExp.forEach(element => {
          this.workExp.push(this.formBuilder.group({
            companyName: element.companyName,
            jobTitle: element.jobTitle,
            startDate:element.startDate,
            endDate:element.endDate,
            skills:element.skills,
            industry:element.industry

          }));
        });

      }



  },err=>{

  })
  }


  myClass(date:NgbDateStruct)
{
    let isSelected=this.especialDates
         .find(d=>d.year==date.year && d.month==date.month && d.day==date.day)
    return isSelected?'classSelected':'classNormal'
}
  isWeekend(date: NgbDateStruct) {
    const d = new Date(date.year, date.month - 1, date.day);
    return d.getDay() === 0 || d.getDay() === 6;
  }

  isDisabled(date: NgbDateStruct, current: {month: number}) {
    return date.month !== current.month;
  }

  onSubmit(){
    this.submitted = true;
    this.loading = true;
    console.log("this.form.value",this.form.value)
    this.usersService.updateUserData(this.form.value)
    .pipe(first())
    .subscribe(
        data => {
          this.loading = false;

            this.alertService.success('Updated successful', { keepAfterRouteChange: true });
            // this.router.navigate(['../login'], { relativeTo: this.route });
        },
        error => {
            this.alertService.error(error);
            this.loading = false;
        });
    // this.accountService.register(this.form.value)
    // .pipe(first())
    // .subscribe(
    //     data => {
    //         this.alertService.success('Registration successful', { keepAfterRouteChange: true });
    //         this.router.navigate(['../login'], { relativeTo: this.route });
    //     },
    //     error => {
    //         this.alertService.error(error);
    //         this.loading = false;
    //     });
  }

  get f() { return this.form.controls; }

}

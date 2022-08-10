import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less']
})
export class ProfileComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  loading = false;


  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      password: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      name: ['', Validators.required],
    });
  }

  onSubmit(){
    this.submitted = true;
    this.loading = true;
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
import { Component } from '@angular/core';
import { AccountService, AlertService } from '@app/_services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({ templateUrl: 'layout.component.html' })

export class LayoutComponent {
    form: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    constructor(
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService
    ) {
        // redirect to home if already logged in
        if (this.accountService.userValue) {
            this.router.navigate(['/']);
        }
    }


    ngOnInit() {
        // this.accountService.logout();

        this.form = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }


      // convenience getter for easy access to form fields
      get f() { return this.form.controls; }

      onSubmit() {
          this.submitted = true;
  
          // reset alerts on submit
          this.alertService.clear();
  
          // stop here if form is invalid
          if (this.form.invalid) {
              return;
          }
  
          this.loading = true;
          this.accountService.login(this.f.email.value, this.f.password.value)
              .pipe(first())
              .subscribe(
                  data => {
                      this.router.navigate([this.returnUrl]);
                  },
                  error => {
                      this.alertService.error(error);
                      this.loading = false;
                  });
      }
}
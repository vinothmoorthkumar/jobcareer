import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';

// used to create fake backend
// import { fakeBackendProvider } from './_helpers';

import { AppRoutingModule } from './app-routing.module';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AppComponent } from './app.component';
import { AlertComponent } from './_components';
import { HomeComponent } from './home';;
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { FormsModule } from '@angular/forms';;
import { NavComponent } from './nav/nav.component'
;import { RegisterComponent } from './account/register.component'
;import { LoginComponent } from './account/login.component'
import { ProfileComponent } from './profile/profile.component'

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        FormsModule,
        NgbModule    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        NavComponent ,
        ProfileComponent,
        RegisterComponent,
        LoginComponent   ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        {
            provide: LocationStrategy,
            useClass: HashLocationStrategy
        }
        // provider used to create fake backend
        // fakeBackendProvider
    ],
    exports:[
        CommonModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule { };
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { ProfileComponent } from './profile/profile.component';

import { LoginComponent } from './account/login.component';
import { RegisterComponent } from './account/register.component';
import { NavComponent } from './nav/nav.component';

import { AuthGuard } from './_helpers';


const routes: Routes = [
    // { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { 
        path: '',
        component: NavComponent, 
        children: [
          { path: '', component: HomeComponent },
          { path: 'profile', component: ProfileComponent },
        ]
    },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
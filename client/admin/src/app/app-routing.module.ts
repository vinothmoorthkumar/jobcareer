import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JobsComponent } from './jobs/jobs.component';
import { LoginComponent } from './account/login.component';
import { NavComponent } from './nav/nav.component';
import { AuthGuard } from './_helpers';
import { UsersComponent } from './users/users.component';
import { UsersViewComponent } from './users/usersView.component';
import { AppliedComponent } from './applications/applications.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { 
        path: '',
        component: NavComponent, 
        canActivate: [AuthGuard],
        children: [
          { path: '', component: JobsComponent },
          { path: 'jobs', component: JobsComponent },
          { path: 'users', component: UsersComponent },
          { path: 'users-view/:id', component: UsersViewComponent },
          { path: 'applications', component: AppliedComponent },
        ]
    },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
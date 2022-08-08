import { Component } from '@angular/core';

import { User } from '@app/_models';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    user: User;

}
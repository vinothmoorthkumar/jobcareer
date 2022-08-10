import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.less']
})
export class NavComponent implements OnInit {
  user
  constructor(public accountService:AccountService) { 
    this.accountService.user.subscribe(x => this.user = x);
  }

  ngOnInit(): void {
    console.log("nav com")
  }

  logout() {
    this.accountService.logout();
  }
}

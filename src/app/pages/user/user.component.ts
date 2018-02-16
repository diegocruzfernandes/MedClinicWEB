import { Router } from '@angular/router';
import { UsersAuthService } from './../../services/user.auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{

  constructor(
    private usersAuthService:UsersAuthService,
    private router: Router
  ) { }

  ngOnInit() {
    if(!this.usersAuthService.userAuthenticate)
     this.router.navigateByUrl("/login")
  }

}

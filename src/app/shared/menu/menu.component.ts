import { Router } from '@angular/router';
import { UserModel } from './../../services/user.model';
import { UsersAuthService } from './../../services/user.auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  user: UserModel = new UserModel();

  constructor(private userAuthService: UsersAuthService, private router: Router) { }

  ngOnInit() {
      this.userAuthService.GetUserData().subscribe(
        u => this.user = u
      );    
  }

  logout(){
    this.userAuthService.LogOut();
    this.router.navigateByUrl('/login');  
  }
}
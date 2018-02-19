import { Response } from '@angular/http/src/static_response';
import { Router } from '@angular/router';
import { UsersAuthService } from './../../services/user.auth.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/pages/user/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{

  user: any = [];

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    let userId  = localStorage.getItem('id');
    if(!userId){
      console.log("ERRO: Usuario não contem ID");
    }
    console.log(userId)       
    this.userService.getData(Number.parseInt(userId))
    .map((res:Response) => res.json())
    .subscribe(
      (d:any) => { this.user = d; console.log(d) },
      error => console.log('Error' + error)
  )}
}

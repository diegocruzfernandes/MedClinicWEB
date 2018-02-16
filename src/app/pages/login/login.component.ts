import { LoginService } from './login.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserModel } from './../../services/user.model';
import { Login } from './login.model';
import { Router } from '@angular/router';
import { UsersAuthService } from './../../services/user.auth.service';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';
import { environment } from './../../../environments/environment.prod';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public form: FormGroup;
  private userLogin: Login = new Login();
  
  constructor(

    private loginService: LoginService,
    private router: Router,
    private fb: FormBuilder, 
    private userAuthService: UsersAuthService
    
  ) {
    this.form = this.fb.group({
      username: ['', Validators.compose([
        Validators.email,
        Validators.minLength(5),
        Validators.maxLength(160),
        Validators.required
      ])]
      ,
      password: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.required
      ])]
    });
  }


  ngOnInit() {
   
    if(this.userAuthService.userAuthenticate) {
      if(this.loginService.validUser()){
        this.router.navigateByUrl('/schedule/list');
      }
    } 
  }

  submit() {
   
    this.userLogin.username = this.form.value["username"];
    this.userLogin.password = this.form.value["password"];

    if(this.loginService.authenticate(this.userLogin) )
      this.router.navigateByUrl('/schelude/list');
  } 

}

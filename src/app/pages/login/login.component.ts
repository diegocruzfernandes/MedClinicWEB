import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { UserModel } from './../../services/user.model';
import { Login } from './login.model';
import { UsersAuthService } from './../../services/user.auth.service';
import { environment } from './../../../environments/environment.prod';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  showMenu: boolean = false;
  public form: FormGroup;
  private userLogin: Login = new Login();

  constructor(
    private loginService: LoginService,
    private router: Router,
    private fb: FormBuilder,
    private userAuthService: UsersAuthService,
    private authService: UsersAuthService
  ) {
    this.form = this.fb.group({
      username: ['', Validators.compose([
        Validators.email,
        Validators.minLength(5),
        Validators.maxLength(160),
        Validators.required
      ])],
      password: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.required
      ])]
    });
  }

  ngOnInit() {
  }

  submit() {
    this.userLogin.username = this.form.value["username"];
    this.userLogin.password = this.form.value["password"];
    this.loginService.authenticate(this.userLogin)
    this.authService.showMenuEmitter.subscribe(
      show => {
      this.showMenu = show;
        this.router.navigateByUrl('/schedule');
      }
    );
  }
}
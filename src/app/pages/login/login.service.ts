import { Login } from './login.model';
import { environment } from './../../../environments/environment.prod';
import { Router } from '@angular/router';
import { UsersAuthService } from './../../services/user.auth.service';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

@Injectable()
export class LoginService {

  private serviceUrl: string = environment.apiUrl;
  LoginChange: Observable<any>;
  LoginChangeObserver: Observer<any>;

  constructor(
    private http: Http,
    private userAuth: UsersAuthService,
    private router: Router
  ) {
    this.LoginChange = new Observable((observer: Observer<any>) => {
      this.LoginChangeObserver = observer;
    });
  }

  getHeaders(): any {
    const token = localStorage.getItem('token');
    const headers = new Headers({ 'Authorization': `Bearer ${token}` });
    const options = new RequestOptions({ headers: headers });
    return options;
  }

  authenticate(userLogin: Login): boolean {
    return this.userAuth.authenticate(userLogin.username, userLogin.password) 
  }

  validUser(): boolean {
    const token = localStorage.getItem('token');

    if (this.userAuth.TokenIsValid(token)) {
      this.userAuth.doLogin(true);
      console.log("Valid User: Está ATIVO!");
      return true;
    } else {
      console.log("Valid User: NÂO ATIVO!");
      this.userAuth.doLogin(false);
      return false;
    }
  }
}

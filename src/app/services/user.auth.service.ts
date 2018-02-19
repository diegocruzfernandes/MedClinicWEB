import { Observable } from 'rxjs/Observable';
import { retry } from 'rxjs/operators/retry';
import { window } from 'rxjs/operator/window';
import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { UserModel } from './user.model';
import { DateTools } from 'app/shared/dateTools';
import { environment } from './../../environments/environment.prod';

@Injectable()
export class UsersAuthService {

    public userAuthenticate: boolean = false;
    user: Observable<UserModel>;
    showMenuEmitter = new EventEmitter<boolean>();
    private serviceUrl: string = environment.apiUrl;

    constructor(
        private http: Http,
        private dateTool: DateTools
    ) { }

    GetUserData(): Observable<UserModel> {
        let newUser: UserModel = new UserModel();
        newUser.token = localStorage.getItem('token');
        newUser.id = localStorage.getItem('id');
        newUser.nickname = localStorage.getItem('nickname');
        newUser.dateLogin = localStorage.getItem('dateLogin');
        return new Observable<UserModel>(observer => {
            observer.next(newUser);
            observer.complete();
        });
    }

    SetUserData(userData: UserModel) {
        localStorage.setItem('token', userData.token);
        localStorage.setItem('id', userData.id);
        localStorage.setItem('nickname', userData.nickname);
        localStorage.setItem('dateLogin', Date.now().toString());
    }

    LogOut() {
        localStorage.clear();
        this.showMenuEmitter.emit(false);
        this.userAuthenticate = false;
    }

    TokenIsValid(token: String) {
        let response: boolean = false;
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });

        return this.http
            .post(this.serviceUrl + '/v1/account/valid', token)
    }

    authenticate(user: string, pass: string) {
        var dt = "grant_type=password&email=" + user + "&password=" + pass;
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.serviceUrl + '/v1/account', dt, options)
            .subscribe(
            (data: any) => {
                let body = data.json();
                if (body.success) {
                    let user: UserModel = new UserModel();
                    user.token = body.token;
                    user.id = body.user.id;
                    user.nickname = body.user.name;
                    let thisNow = new Date();
                    user.dateLogin = this.dateTool.JsonToDateSimple(thisNow);
                    this.SetUserData(user);
                    this.doLogin(true);
                } else {
                    console.log("Usuário ou senha inválido!")
                    alert("Usuário ou senha inválido!");
                    this.doLogin(false);
                    return false;  
                 }               
            },
            error => {
                console.log(error);
                this.doLogin(false);
                alert("Usuário ou senha inválido!");
            });
    }

    doLogin(login: boolean) {
        this.userAuthenticate = login;
        this.showMenuEmitter.emit(login);
    }
}
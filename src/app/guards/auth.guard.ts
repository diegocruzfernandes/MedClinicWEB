import { Observable } from 'rxjs/Observable';
import { UsersAuthService } from './../services/user.auth.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'

@Injectable()
export class AuthGuard implements CanActivate {
    
    constructor(
        private usersAuthService: UsersAuthService,
        private router: Router
      ) { }

      canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
      ): Observable<boolean> | boolean {

        console.log('AuthGuard');
        if(this.usersAuthService.userAuthenticate){
            
            console.log("AuthAguard:ATIVADO!");
            return true;
        }
        console.log("AuthAguard: INATIVO!");
        this.router.navigate(['/login']);
        return false;
      }
}
import { Router } from '@angular/router';
import { UsersAuthService } from './services/user.auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  showMenu: boolean = false;

  constructor(private authService: UsersAuthService, private router:Router) {
  }

  ngOnInit() {
    this.authService.showMenuEmitter.subscribe(
      show => this.showMenu = show
    );  
  }
}

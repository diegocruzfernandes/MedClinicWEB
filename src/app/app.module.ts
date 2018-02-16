import { AuthGuard } from './guards/auth.guard';
import { UsersAuthService } from './services/user.auth.service';
import { LoginService } from './pages/login/login.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app.routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import 'rxjs/add/operator/map';

import { SheduleModule } from 'app/pages/schedule/schedule.module';
import { UserModule } from 'app/pages/user/user.module';
import { AdminModule } from './pages/admin/admin.module';
import { PatientModule } from './pages/patient/patient.module';

import { AppComponent } from './app.component';
import { MenuComponent } from './shared/menu/menu.component';
import { LoginComponent } from './pages/login/login.component';
import { ConnService } from 'app/services/conn.service';
import { PagenotfoundComponent } from './shared/pagenotfound/pagenotfound.component';


//import 'rxjs/add/operator/map';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    LoginComponent,
    PagenotfoundComponent    
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    UserModule,
    SheduleModule,        
    AdminModule,
    PatientModule,
    AppRoutingModule  
  ],
  providers: [AuthGuard, ConnService, LoginService, UsersAuthService],
  bootstrap: [AppComponent]
  
})
export class AppModule { }

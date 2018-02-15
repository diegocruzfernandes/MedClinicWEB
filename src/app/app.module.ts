import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app.routing.module';

import { SheduleModule } from 'app/pages/schedule/schedule.module';
import { UserModule } from 'app/pages/user/user.module';
import { AdminModule } from './pages/admin/admin.module';
import { PatientModule } from './pages/patient/patient.module';

import { AppComponent } from './app.component';
import { MenuComponent } from './shared/menu/menu.component';
import { LoginComponent } from './pages/login/login.component';
import { ConnService } from 'app/services/conn.service';


//import 'rxjs/add/operator/map';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    LoginComponent    
  ],
  imports: [
    BrowserModule,
    UserModule,
    SheduleModule,        
    AdminModule,
    PatientModule,
    AppRoutingModule  
  ],
  providers: [ConnService],
  bootstrap: [AppComponent]
  
})
export class AppModule { }

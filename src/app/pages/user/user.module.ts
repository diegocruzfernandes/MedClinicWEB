import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UserComponent } from 'app/pages/user/user.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UserService } from './user.service';
import { UserRoutingModule } from 'app/pages/user/user.routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule  ,
    UserRoutingModule  
  ],
  exports: [],
  declarations: [
    UserComponent,   
    UserFormComponent    
  ],
  providers: [UserService]
})
export class UserModule { }

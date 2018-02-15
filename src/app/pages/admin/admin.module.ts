import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import 'rxjs/add/operator/map';

import { AdminComponent } from 'app/pages/admin/admin.component';
import { DoctorFormComponent } from 'app/pages/admin/doctors/doctor-form/doctor-form.component';
import { TypeConsultComponent } from 'app/pages/admin/type-consult/type-consult.component';
import { TypeConsultListComponent } from './type-consult/type-consult-list/type-consult-list.component';
import { TypeConsultFormComponent } from './type-consult/type-consult-form/type-consult-form.component';
import { SecretaryListComponent } from './secretary/secretary-list/secretary-list.component';
import { SecretaryFormComponent } from './secretary/secretary-form/secretary-form.component';
import { SecretaryComponent } from './secretary/secretary.component';
import { DoctorsListComponent } from './doctors/doctors-list/doctors-list.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { DoctorService } from './doctors/doctor.service';
import { AdminRoutingModule } from 'app/pages/admin/admin.routing.module';
import { ConnService } from 'app/services/conn.service';
import { TypeConsultyService } from './type-consult/type-consult.service';
import { SecretaryService } from './secretary/secretaty.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    AdminRoutingModule
  ],
  exports: [],
  declarations: [
    AdminComponent,
    DoctorsComponent,
    DoctorFormComponent,
    DoctorsListComponent,
    SecretaryComponent,
    SecretaryFormComponent,
    SecretaryListComponent,
    TypeConsultComponent, 
    TypeConsultFormComponent,
    TypeConsultListComponent
  ],
  providers: [DoctorService, ConnService, SecretaryService, TypeConsultyService ]
})
export class AdminModule { }

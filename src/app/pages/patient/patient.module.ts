import { DateTools } from 'app/shared/dateTools';
import { ConnService } from './../../services/conn.service';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import 'rxjs/add/operator/map';

import { PatientRoutingModule } from 'app/pages/patient/patient.routing.module';
import { PatientComponent } from 'app/pages/patient/patient.component';
import { PatientListComponent } from './patient-list/patient-list.component';
import { PatientService } from 'app/pages/patient/patient.service';
import { PatientFormComponent } from 'app/pages/patient/patient-form/patient-form.component';
import { AddScheduleComponent } from './add-schedule/add-schedule.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TextMaskModule,
    HttpModule,
    ReactiveFormsModule,   
    PatientRoutingModule
  ],
  exports: [],
  declarations: [
      PatientComponent,
      PatientListComponent,
      PatientFormComponent,
      AddScheduleComponent    ,
      
  ],
  providers: [ConnService, PatientService, DateTools ]
})
export class PatientModule {
    constructor() { }
 }
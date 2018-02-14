import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import 'rxjs/add/operator/map';
import { PatientRoutingModule } from 'app/pages/patient/patient.routing.module';
import { PatientComponent } from 'app/pages/patient/patient.component';
import { PatientListComponent } from './patient-list/patient-list.component';
import { PatientService } from 'app/pages/patient/patient.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    PatientRoutingModule
  ],
  exports: [],
  declarations: [
      PatientComponent,
      PatientListComponent    
  ],
  providers: [ PatientService ]
})
export class PatientModule {
    constructor() {
        console.log("CTO: Patient Module")
        
    }
 }
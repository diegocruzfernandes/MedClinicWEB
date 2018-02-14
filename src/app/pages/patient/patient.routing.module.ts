import { PatientListComponent } from './patient-list/patient-list.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { PatientComponent } from './patient.component';

const patientgRoutes: Routes = [
    { path: '', component: PatientComponent, children: [
        {path: 'list', component:PatientListComponent}
    ]}
];

@NgModule({
    imports: [RouterModule.forChild(patientgRoutes)],
    exports: [RouterModule]
})

export class PatientRoutingModule { 
   
    constructor() {
        console.log("CTO: Patient routing Module")
        
    }
}
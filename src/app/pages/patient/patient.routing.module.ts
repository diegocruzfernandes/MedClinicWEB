import { PatientFormComponent } from 'app/pages/patient/patient-form/patient-form.component';
import { PatientListComponent } from './patient-list/patient-list.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { PatientComponent } from './patient.component';
import { AddScheduleComponent } from 'app/pages/patient/add-schedule/add-schedule.component';

const patientgRoutes: Routes = [
    {
        path: '', component: PatientComponent, children: [
            { path: 'list', component: PatientListComponent },
            { path: 'form', component: PatientFormComponent },
            { path: 'edit/:id', component: PatientFormComponent },
            { path: 'addschedule/:id', component: AddScheduleComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(patientgRoutes)],
    exports: [RouterModule]
})

export class PatientRoutingModule { }

import { TypeConsultListComponent } from './type-consult/type-consult-list/type-consult-list.component';
import { SecretaryListComponent } from './secretary/secretary-list/secretary-list.component';
import { SecretaryComponent } from './secretary/secretary.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { AdminComponent } from 'app/pages/admin/admin.component';
import { DoctorsComponent } from 'app/pages/admin/doctors/doctors.component';
import { DoctorFormComponent } from 'app/pages/admin/doctors/doctor-form/doctor-form.component';
import { DoctorsListComponent } from './doctors/doctors-list/doctors-list.component';
import { SecretaryFormComponent } from 'app/pages/admin/secretary/secretary-form/secretary-form.component';
import { TypeConsultComponent } from 'app/pages/admin/type-consult/type-consult.component';
import { TypeConsultFormComponent } from 'app/pages/admin/type-consult/type-consult-form/type-consult-form.component';


const AdmingRoutes: Routes = [
    { path: '', component: AdminComponent, children: [
        { path: 'doctor', component: DoctorsComponent },  
        { path: 'doctor/list', component: DoctorsListComponent }, 
        { path: 'doctor/form', component: DoctorFormComponent },
        { path: 'doctor/form:id', component: DoctorFormComponent },  
        { path: 'secretary', component: SecretaryComponent },  
        { path: 'secretary/list', component: SecretaryListComponent },  
        { path: 'secretary/form', component: SecretaryFormComponent },  
        { path: 'typeconsult', component: TypeConsultComponent },  
        { path: 'typeconsult/list', component: TypeConsultListComponent },  
        { path: 'typeconsult/form', component: TypeConsultFormComponent },    
    ]}
];

@NgModule({
    imports: [RouterModule.forChild(AdmingRoutes)],
    exports: [RouterModule]
})

export class AdminRoutingModule { }
import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from 'app/pages/login/login.component';

const appRoutes: Routes = [
   
    { path: 'user', loadChildren: 'app/pages/user/user.module#UserModule'},    
    { path: 'admin', loadChildren: 'app/pages/admin/admin.module#AdminModule'},
    { path: 'schedule', loadChildren: 'app/pages/schedule/schedule.module#SheduleModule'},
    { path: 'patient', loadChildren: 'app/pages/patient/patient.module#PatientModule'},   
    { path: 'login', component: LoginComponent},
    { path: '', redirectTo:'/schedule/list', pathMatch:'full' }
    
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
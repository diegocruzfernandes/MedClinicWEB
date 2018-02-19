import { PagenotfoundComponent } from './shared/pagenotfound/pagenotfound.component';
import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from 'app/pages/login/login.component';
import { AuthGuard } from 'app/guards/auth.guard';

const appRoutes: Routes = [
    { path: 'schedule', loadChildren: 'app/pages/schedule/schedule.module#SheduleModule', canActivate: [AuthGuard]},
    { path: 'admin', loadChildren: 'app/pages/admin/admin.module#AdminModule', canActivate: [AuthGuard] },  
    { path: 'user', loadChildren: 'app/pages/user/user.module#UserModule', canActivate: [AuthGuard]},    
    { path: 'patient', loadChildren: 'app/pages/patient/patient.module#PatientModule', canActivate: [AuthGuard]},
    { path: 'login', component: LoginComponent},     
    { path: '', redirectTo:'/login', pathMatch:'full' },
    { path: '**', component: PagenotfoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule { 

    constructor() { }
 }
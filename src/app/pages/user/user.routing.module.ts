import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { UserComponent } from 'app/pages/user/user.component';
import { UserFormComponent } from './user-form/user-form.component';

const userRotingRoutes: Routes = [
    { path: '', component: UserComponent, children: [
        { path: 'form', component: UserFormComponent }    
    ]}
];

@NgModule({
    imports: [RouterModule.forChild(userRotingRoutes)],
    exports: [RouterModule]
})

export class UserRoutingModule { }
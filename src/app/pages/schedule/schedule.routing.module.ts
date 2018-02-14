import { ScheduleFormComponent } from './schedule-form/schedule-form.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { ScheduleComponent } from 'app/pages/schedule/schedule.component';
import { ScheduleListComponent } from 'app/pages/schedule/schedule-list/schedule-list.component';


const scheduleRotingRoutes: Routes = [
    { path: '', component: ScheduleComponent, children: [
        { path: 'new', component: ScheduleFormComponent },            
        { path: 'list', component: ScheduleListComponent }      
    ]},
    
];

@NgModule({
    imports: [RouterModule.forChild(scheduleRotingRoutes)],
    exports: [RouterModule]
})

export class ScheduleRoutingModule { }
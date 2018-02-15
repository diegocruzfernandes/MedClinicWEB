import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TextMaskModule } from 'angular2-text-mask';
import { ScheduleService } from './schedule.service';
import { ScheduleComponent } from './schedule.component';
import { ScheduleRoutingModule } from 'app/pages/schedule/schedule.routing.module';
import { ScheduleFormComponent } from 'app/pages/schedule/schedule-form/schedule-form.component';
import { ScheduleListComponent } from './schedule-list/schedule-list.component';

@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      TextMaskModule,
      ReactiveFormsModule,
      ScheduleRoutingModule            
    ],
    exports: [],
    declarations: [  
        ScheduleComponent,
        ScheduleFormComponent,
        ScheduleListComponent    
    ],
    providers: [ScheduleService]
  })
  export class SheduleModule { }
  
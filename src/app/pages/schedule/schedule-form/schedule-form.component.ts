import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { ScheduleService } from 'app/pages/schedule/schedule.service';
import { Schedule } from './../schedule.model';

@Component({
  selector: 'app-schedule-form',
  templateUrl: './schedule-form.component.html',
  styleUrls: ['./schedule-form.component.css'],
  providers: [ScheduleService]
})
export class ScheduleFormComponent implements OnInit {

  inscription: Subscription;
  data: Schedule;
  public form: FormGroup;

  constructor(
    private route: ActivatedRoute, 
    private scheduleService: ScheduleService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      doctorId: [''],
      patientId: [''],
      Initial: ['', Validators.compose([
        Validators.required
      ])],
      Finish: ['', Validators.compose([
        Validators.required
      ])],
      TypeConsultId: [''],
      StatusId: ['']
    })
   }

  ngOnInit() {
    
  }
  
}

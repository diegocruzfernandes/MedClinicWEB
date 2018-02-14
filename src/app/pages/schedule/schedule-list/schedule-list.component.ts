import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

import { ScheduleService } from 'app/pages/schedule/schedule.service';
import { SheduleModule } from 'app/pages/schedule/schedule.module';
import { Schedule } from './../schedule.model';

@Component({
  selector: 'app-schedule-list',
  templateUrl: './schedule-list.component.html',
  styleUrls: ['./schedule-list.component.css']
})
export class ScheduleListComponent implements OnInit {

  data: Schedule[];
  page: number = 1;
  pagePrevious: boolean = false;
  
  constructor( private scheduleService: ScheduleService, private router:Router) {    
  }

  ngOnInit() {
    this.GetAllData(this.page)
  }

  Edit(id:number){
    console.log(id);
    this.router.navigate(['/schedule', id, 'editar']);
  }
  Delete(id:number){
    this.router.navigateByUrl("/shedule/form/"+id);
  }

  NextPage() {
    if (this.data.length >= 1)
      this.page = this.page + 1;
    this.GetAllData(this.page)
  }

  PreviewPage() {
    if (this.page <= 1) {
      this.pagePrevious = false;
      this.page = 1;
    } else {
      this.pagePrevious = true;
      this.page = this.page - 1;
    }
    this.GetAllData(this.page)
  }

  GetAllData(page: number) {
    this.scheduleService.getAllData(10, this.page).subscribe(
      d => { this.data = d; },
      error => console.log('Error' + error)
    )
  }

}

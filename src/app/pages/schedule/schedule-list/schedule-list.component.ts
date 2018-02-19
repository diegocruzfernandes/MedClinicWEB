import { Response } from '@angular/http';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ScheduleService } from 'app/pages/schedule/schedule.service';
import { SheduleModule } from 'app/pages/schedule/schedule.module';
import { Schedule } from './../schedule.model';
import { DoctorService } from './../../admin/doctors/doctor.service';

@Component({
  selector: 'app-schedule-list',
  templateUrl: './schedule-list.component.html',
  styleUrls: ['./schedule-list.component.css']
})
export class ScheduleListComponent implements OnInit {

  page: number = 1;
  pagePrevious: boolean = false;
  doctors: any;
  doctorIdSelect: number = -1;
  statusIdSelect: number = -1;
  texteFind: string;
  scheduleList: Schedule[];
  isRequesting: boolean;

  constructor(
    private scheduleService: ScheduleService,
    private router: Router,
    private doctorService: DoctorService  
  ) {  }

  ngOnInit() {  
    this.isRequesting = true;
    this.GetAllData(this.page)
    this.doctorService.getAllData(10, 1).subscribe(
      doctor => {
        this.doctors = doctor;
        this.doctors;
      this.isRequesting  =false;
    });
  }

  AddConsult(id: number) {
    this.router.navigate(['/schedule', id, 'form', true]);
  }

  Edit(id: number) {
    this.router.navigate(['/schedule/form/', id]);
  }
  Delete(id: number) {
    this.scheduleService.removeData(id);
    let index = this.scheduleList.findIndex(i => i.id === id);
    this.scheduleList.splice(index, 1);
  }

  NextPage() {
    if (this.scheduleList.length >= 1)
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
      d => { this.scheduleList = d; },
      error => console.log('Error' + error)
    )
  }

  search(text: string) {  
    if (text != null || text != ""){  
      this.scheduleService.findDetails(10,this.page, text, this.doctorIdSelect, this.statusIdSelect)
      .map((resp: Response) => resp.json())
      .subscribe(resp => this.scheduleList = resp );      
    this.page = 1;
    }
  }
}
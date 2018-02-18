
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { PatientService } from 'app/pages/patient/patient.service';
import { Patient } from './../patient.model';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {

  patienties: Patient[] = [];
  page: number = 1;
  pagePrevious: boolean = false;

  constructor(
    private patientService: PatientService,
    private router: Router

  ) { }

  ngOnInit() {
    this.GetAllData(this.page)
  }

  Edit(id: number) {
    console.log(id);
    this.router.navigate(['/patient/edit/', id]);
  }

  Delete(id: number) {
    this.patientService.removeData(id);
    let index = this.patienties.findIndex(i => i.id === id);
    this.patienties.splice(index, 1);
  }

  AddSchedule(id: number) {
    console.log('%c ADD', 'background: #222; color: #bada55');
    this.router.navigate(['patient/addschedule', id]);
  }

  NextPage() {
    if (this.patienties.length >= 1)
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
    this.patientService.getAllData(10, this.page).subscribe(
      d => { this.patienties = d },
      error => console.log('Error' + error)
    )
  }

  search(data: string) {
    if (data == null || data == "") {
      this.GetAllData(this.page);
    } else {
      this.patientService.findData(data, 10, this.page).subscribe(
        d => { this.patienties = d },
        error => console.log('Error' + error)        
      )
      this.page = 1;
    }
  }
}

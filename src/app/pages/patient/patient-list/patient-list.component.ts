import { Patient } from './../patient.model';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PatientService } from 'app/pages/patient/patient.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {

  patienties: Patient[] = [];
  page: number = 1;
  pagePrevious: boolean = false;

  constructor(private patientService: PatientService, private router: Router) { }

  ngOnInit() {
    this.GetAllData(this.page)
  }

  Edit(id: number) {
    console.log(id);
    this.router.navigate(['/patient/form', id, 'editar']);
  }
  Delete(id: number) {
    this.router.navigateByUrl("/patient/form/" + id);
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

}

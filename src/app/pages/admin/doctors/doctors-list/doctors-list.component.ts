import { Router } from '@angular/router';
import { DoctorService } from './../doctor.service';
import { Component, OnInit } from '@angular/core';
import { Doctor } from 'app/pages/admin/doctors/doctor.model';

@Component({
  selector: 'app-doctors-list',
  templateUrl: './doctors-list.component.html',
  styleUrls: ['./doctors-list.component.css']
})
export class DoctorsListComponent implements OnInit {

  //public doctors: Doctor[] = new Array<Doctor>();
  doctors: Doctor[] = [] ;

  constructor(private doctorService:DoctorService, private router:Router) { }

  ngOnInit() {
    this.doctorService.getAllData(10,1).subscribe(
      d => {this.doctors = d; console.log(this.doctors);} ,
      error => console.log('Error' + error)
    )
  }

  Edit(id:number){
    console.log(id);
    this.router.navigate(['/doctor/edit/', id]);
  }

  Delete(id:number){
    this.doctorService.removeData(id);
    let index = this.doctors.findIndex(i => i.id === id);
    this.doctors.splice(index, 1);
  }

}
